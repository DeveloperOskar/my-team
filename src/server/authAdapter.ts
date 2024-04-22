import { and, eq } from "drizzle-orm";
import { type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { accounts, sessions, users, verificationTokens } from "./db/schema";

type NewUser = typeof users.$inferInsert;
type NewSession = typeof sessions.$inferInsert;
type NewAccount = typeof accounts.$inferInsert;
type NewVerificationToken = typeof verificationTokens.$inferInsert;

type NonNullableProps<T> = {
  [P in keyof T]: null extends T[P] ? never : P;
}[keyof T];

export function stripUndefined<T>(obj: T): Pick<T, NonNullableProps<T>> {
  const result = {} as T;
  for (const key in obj) if (obj[key] !== undefined) result[key] = obj[key];
  return result;
}

export default function MyTeamPGAdapter(
  client: InstanceType<typeof NeonHttpDatabase>,
) {
  return {
    async createUser(data: NewUser) {
      return await client
        .insert(users)
        .values({ ...data, id: crypto.randomUUID() })
        .returning()
        .then((res) => res[0] ?? null);
    },
    async getUser(id: string) {
      return await client
        .select()
        .from(users)
        .where(eq(users.id, id))
        .then((res) => res[0] ?? null);
    },
    async getUserByEmail(email: string) {
      return await client
        .select()
        .from(users)
        .where(eq(users.email, email))
        .then((res) => res[0] ?? null);
    },
    async getUserByAccount(account: NewAccount) {
      const dbAccount =
        (await client
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.providerAccountId, account.providerAccountId),
              eq(accounts.provider, account.provider),
            ),
          )
          .leftJoin(users, eq(accounts.userId, users.id))
          .then((res) => res[0])) ?? null;

      return dbAccount?.user ?? null;
    },
    async updateUser(user: NewUser) {
      if (!user.id) {
        throw new Error("No user id.");
      }

      return await client
        .update(users)
        .set(user)
        .where(eq(users.id, user.id))
        .returning()
        .then((res) => res[0]);
    },
    async deleteUser(userId: string) {
      await client
        .delete(users)
        .where(eq(users.id, userId))
        .returning()
        .then((res) => res[0] ?? null);
    },
    async linkAccount(account: NewAccount) {
      return stripUndefined(
        await client
          .insert(accounts)
          .values(account)
          .returning()
          .then((res) => res[0]),
      );
    },
    async unlinkAccount(account: NewAccount) {
      const res = await client
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider),
          ),
        )
        .returning()
        .then((res) => res[0] ?? null);

      if (!res) {
        return null;
      }

      const { type, provider, providerAccountId, userId } = res;

      return { provider, type, providerAccountId, userId };
    },
    async createSession(data: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }) {
      return await client
        .insert(sessions)
        .values(data)
        .returning()
        .then((res) => res[0]);
    },
    async getSessionAndUser(sessionToken: string) {
      return await client
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .innerJoin(users, eq(users.id, sessions.userId))
        .then((res) => res[0] ?? null);
    },
    async updateSession(data: NewSession) {
      return await client
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .returning()
        .then((res) => res[0]);
    },
    async deleteSession(sessionToken: string) {
      const session = await client
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .returning()
        .then((res) => res[0] ?? null);

      return session;
    },
    async createVerificationToken(token: NewVerificationToken) {
      return await client
        .insert(verificationTokens)
        .values(token)
        .returning()
        .then((res) => res[0]);
    },
    async useVerificationToken(token: NewVerificationToken) {
      try {
        return await client
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token),
            ),
          )
          .returning()
          .then((res) => res[0] ?? null);
      } catch (err) {
        throw new Error("No verification token found.");
      }
    },
  };
}

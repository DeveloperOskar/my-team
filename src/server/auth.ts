import { type Adapter } from "next-auth/adapters";
import { env } from "@/env";
import { db } from "@/server/db";
import MyTeamPGAdapter from "./authAdapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isAdmin: boolean;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    isAdmin: boolean;
  }
}

const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/sign-in",
    verifyRequest: "/verify-request",
  },
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          isAdmin: user.isAdmin,
        },
      };
    },
  },
  adapter: MyTeamPGAdapter(db) as unknown as Adapter,

  providers: [
    Resend({
      apiKey: env.AUTH_RESEND_KEY,
      from: "no-reply@my-team.se",
    }),
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      account(account) {
        const refresh_token_expires_at =
          Math.floor(Date.now() / 1000) +
          Number(account.refresh_token_expires_in);
        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          refresh_token_expires_at,
        };
      },
    }),
  ],
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);

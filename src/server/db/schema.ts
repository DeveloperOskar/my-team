import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  smallint,
  numeric,
  varchar,
  boolean,
  unique,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `${name}`);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  isAdmin: boolean("isAdmin").default(false).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const foodUnit = pgEnum("food_unit", ["ml", "g"]);
export const clientGoal = pgEnum("client_goal", ["gain", "lose", "maintain"]);
export const muscleGroup = pgEnum("muscleGroup", [
  "chest",
  "legs",
  "triceps",
  "biceps",
  "back",
  "shoulders",
  "abs",
  "cardio",
  "fullBody",
  "other",
]);

export const coachingFoods = createTable("coachingFoods", {
  id: serial("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  name: text("name").notNull(),
  brand: text("brand").default("").notNull(),
  unit: foodUnit("unit").notNull(),
  servingSize: smallint("serving_size").notNull(),
  protein: numeric("protein").notNull(),
  carbs: numeric("carbs").notNull(),
  fat: numeric("fat").notNull(),
  kcal: numeric("kcal").notNull(),
  liked: boolean("liked").default(false).notNull(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const systemFoods = createTable("systemFoods", {
  id: serial("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  name: text("name").notNull(),
  unit: foodUnit("unit").notNull(),
  servingSize: smallint("serving_size").notNull(),
  protein: numeric("protein").notNull(),
  carbs: numeric("carbs").notNull(),
  fat: numeric("fat").notNull(),
  kcal: numeric("kcal").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const userSystemFoodsLikes = createTable(
  "userSystemFoodLikes",
  {
    id: serial("id").primaryKey().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),

    systemFoodId: serial("system_food_id")
      .notNull()
      .references(() => systemFoods.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    liked: boolean("liked").notNull(),
  },
  (t) => ({
    unq: unique().on(t.systemFoodId, t.userId),
  }),
);

export const coachingClients = createTable("coachingClients", {
  id: serial("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().default(""),
  extraInfo: text("extraInfo").default("").notNull(),
  height: numeric("height").default("0"),
  currentWeight: numeric("current_weight").default("0"),
  goal: clientGoal("goal").notNull(),
  backgroundColor: text("background_color").notNull(),
  textColor: text("text_color").notNull(),
  protein: numeric("protein").notNull(),
  carbs: numeric("carbs").notNull(),
  fat: numeric("fat").notNull(),
  kcal: numeric("kcal").notNull(),

  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const coachingClientsRelations = relations(
  coachingClients,
  ({ many }) => ({
    weightIns: many(coachingClientsWeights),
  }),
);

export const coachingClientsWeights = createTable("coachingClientsWeights", {
  id: serial("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  weight: numeric("weight").notNull(),
  clientId: serial("client_id")
    .notNull()
    .references(() => coachingClients.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const coachingClientsWeightsRelations = relations(
  coachingClientsWeights,
  ({ one }) => ({
    client: one(coachingClients, {
      fields: [coachingClientsWeights.clientId],
      references: [coachingClients.id],
    }),
  }),
);

export const coachingExercises = createTable("coachingExercises", {
  id: serial("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  name: text("name").notNull(),
  muscleGroup: muscleGroup("muscle_group").notNull(),
  link: text("link").default("").notNull(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

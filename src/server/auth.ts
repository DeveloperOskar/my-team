import { type Adapter } from "next-auth/adapters";
import { env } from "@/env";
import { db } from "@/server/db";
import MyTeamPGAdapter from "./authAdapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import FaceBook from "next-auth/providers/facebook";
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { sendVerificationRequest } from "./sendVerificationRequest";

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
      sendVerificationRequest,
    }),
    FaceBook({
      clientId: env.AUTH_FACEBOOK_ID,
      clientSecret: env.AUTH_FACEBOOK_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);

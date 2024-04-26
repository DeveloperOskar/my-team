import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { db } from "@/server/db";
import MyTeamPGAdapter from "./authAdapter";
import Email, {
  SendVerificationRequestParams,
} from "next-auth/providers/email";

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

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "sign-in",
  },
  callbacks: {
    session: ({ session, user, token }) => {
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
    // {
    //   id: "http-email",
    //   type: "email",
    //   sendVerificationRequest,
    // },
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

async function sendVerificationRequest(
  params: SendVerificationRequestParams,
): Promise<void> {
  // Call the cloud Email provider API for sending emails
  const { url, identifier } = params;
  const response = await fetch("https://api.resend.com/v3/emails", {
    // The body format will vary depending on provider, please see their documentation
    body: JSON.stringify({
      personalizations: [{ to: [{ identifier }] }],
      from: { email: "noreply@company.com" },
      subject: "Sign in to Your page",
      content: [
        {
          type: "text/plain",
          value: `Please click here to authenticate - ${url}`,
        },
      ],
    }),
    headers: {
      // Authentication will also vary from provider to provider, please see their docs.
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(JSON.stringify(errors));
  }
}

"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

const NextAuthSessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthSessionProvider;

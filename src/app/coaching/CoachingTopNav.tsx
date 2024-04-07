import React from "react";
import CoachingTopNavLink from "./CoachingTopNavLink";
import CoachingAvatar from "./CoachingAvatar";
import { getServerAuthSession } from "@/server/auth";

const CoachingTopNav = async () => {
  const session = await getServerAuthSession();
  return (
    <nav className="mb-6 flex shrink items-center justify-between">
      <div className=" flex h-full shrink items-center gap-4">
        <CoachingTopNavLink href="/coaching/data/foods" text="Livsmedel" />
        <CoachingTopNavLink href="/coaching/data/clients" text="Klienter" />
        <CoachingTopNavLink href="/coaching/data/exercises" text="Övningar" />
      </div>

      <CoachingAvatar session={session} />
    </nav>
  );
};

export default CoachingTopNav;

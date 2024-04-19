"use client";

import React from "react";
import CoachingTopNavLink from "./CoachingTopNavLink";
import CoachingAvatar from "./CoachingAvatar";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const CoachingTopNav = () => {
  const { data } = useSession();
  const pathname = usePathname();

  return (
    <nav className="flex shrink items-center  justify-between pb-6 ">
      <div className=" flex h-full shrink items-center gap-4">
        {pathname.includes("/coaching/data") && (
          <>
            <CoachingTopNavLink href="/coaching/data/foods" text="Livsmedel" />
            <CoachingTopNavLink href="/coaching/data/clients" text="Klienter" />
            <CoachingTopNavLink
              href="/coaching/data/exercises"
              text="Övningar"
            />
          </>
        )}

        {pathname.includes("/coaching/tools") && (
          <>
            <CoachingTopNavLink
              href="/coaching/tools/meal-plan"
              text="Måltidsplaneraren"
            />
            <CoachingTopNavLink
              href="/coaching/tools/exercise-plan"
              text="Träningsplaneraren"
            />
          </>
        )}
      </div>

      <CoachingAvatar session={data} />
    </nav>
  );
};

export default CoachingTopNav;

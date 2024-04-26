import React from "react";
import CoachingAvatar from "./CoachingAvatar";
import { headers } from "next/headers";
import { auth } from "@/server/auth";
import CoachingTopNavLinks from "./CoachingTopNavLinks";

const CoachingTopNav = async () => {
  const session = await auth();
  const headersList = headers();
  const activePath = headersList.get("x-pathname");

  return (
    <>
      <nav className="hidden h-[65px] w-full  items-center justify-between pb-6 lg:flex">
        <CoachingTopNavLinks initialPath={activePath ?? ""} />

        <CoachingAvatar session={session} />
      </nav>
    </>
  );
};

export default CoachingTopNav;

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import MobileCoachingNavDialog from "./mobileCoachingNavDialog";
import { headers } from "next/headers";
import { auth } from "@/server/auth";

const MobileCoachingNav = async () => {
  const session = await auth();
  const headersList = headers();
  const activePath = headersList.get("x-pathname");

  return (
    <nav className="flex items-center justify-between gap-6 bg-white px-6 py-3 shadow lg:hidden">
      <span className="text-2xl font-semibold">MyTeam</span>

      <MobileCoachingNavDialog
        session={session}
        initialPath={activePath ?? ""}
      />
    </nav>
  );
};

export default MobileCoachingNav;

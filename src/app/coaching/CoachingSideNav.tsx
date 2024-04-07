import React from "react";
import CoachingNavbarLink from "./CoachingSideNavLink";
import { AreaChart, Database, LogOut, Settings, Wrench } from "lucide-react";

const CoachingSideNav = () => {
  return (
    <nav className="flex shrink flex-col justify-between gap-3 border-r bg-white px-3 py-4">
      <div className="flex flex-col gap-3">
        <CoachingNavbarLink href="/coaching" text="Hem" Icon={<AreaChart />} />

        <CoachingNavbarLink
          href="/coaching/data/foods"
          text="Data"
          Icon={<Database />}
        />

        <CoachingNavbarLink
          href="/tools/meal-plan"
          text="Verktyg"
          Icon={<Wrench />}
        />
      </div>

      <div className="flex flex-col gap-3">
        <CoachingNavbarLink
          href="/tools/meal-plan"
          text="Verktyg"
          Icon={<Settings />}
        />
        <CoachingNavbarLink signOut href="" text="Logga ut" Icon={<LogOut />} />
      </div>
    </nav>
  );
};

export default CoachingSideNav;

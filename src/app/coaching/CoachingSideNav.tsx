import React from "react";
import CoachingNavbarLink from "./CoachingSideNavLink";
import { AreaChart, Database, LogOut, Settings, Wrench } from "lucide-react";

const CoachingSideNav = () => {
  return (
    <nav className=" hidden h-screen shrink  flex-col justify-between gap-3 border-r bg-white px-3 py-4 lg:flex">
      <div className="flex flex-col gap-3">
        <CoachingNavbarLink
          activeKey="/home"
          href="/coaching"
          text="Hem"
          Icon={<AreaChart />}
        />

        <CoachingNavbarLink
          activeKey="/coaching/data"
          href="/coaching/data/foods"
          text="Data"
          Icon={<Database />}
        />

        <CoachingNavbarLink
          activeKey="/coaching/tools"
          href="/coaching/tools/meal-plan"
          text="Verktyg"
          Icon={<Wrench />}
        />
      </div>

      <div className="flex flex-col gap-3">
        <CoachingNavbarLink
          activeKey="/coaching/settings"
          href="/tools/meal-plan"
          text="Verktyg"
          Icon={<Settings />}
        />
        <CoachingNavbarLink
          activeKey="/logout"
          signOut
          href=""
          text="Logga ut"
          Icon={<LogOut />}
        />
      </div>
    </nav>
  );
};

export default CoachingSideNav;

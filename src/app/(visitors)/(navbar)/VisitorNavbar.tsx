import React from "react";
import NavbarSessionButtons from "./NavbarSessionButtons";
import NavbarLink from "./NavbarLink";
import { auth } from "@/server/auth";
import Image from "next/image";

const VisitorNavbar = async () => {
  const session = await auth();

  return (
    <nav className="sticky top-0 flex h-[65px] w-full items-center border-b bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="relative h-[35px] w-[35px]">
              <Image alt="MyTeam" src={"/my-team-email-logo.jpg"} fill />
            </div>
            <span className="text-2xl font-bold ">MyTeam</span>
          </div>

          <div className="flex items-center gap-3">
            <NavbarLink href={"/"} text={"Hem"} activePath={"/"} />
            <NavbarLink href={"/about"} text={"Om oss"} activePath={"/about"} />
            <NavbarLink
              href={"/pricing"}
              text={"Priser"}
              activePath={"/pricing"}
            />
            <NavbarLink
              href={"/functions"}
              text={"Funktioner"}
              activePath={"/functions"}
            />
          </div>
        </div>

        <NavbarSessionButtons session={session} />
      </div>
    </nav>
  );
};

export default VisitorNavbar;

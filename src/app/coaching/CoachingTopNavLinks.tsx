"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const CoachingTopNavLinks: React.FC<{ initialPath: string }> = ({
  initialPath,
}) => {
  const [activePath, setActivePath] = React.useState<string>(initialPath);
  const pathName = usePathname();

  useEffect(() => {
    setActivePath(pathName);
  }, [pathName]);

  return (
    <div className=" flex shrink items-center gap-4">
      {activePath?.includes("/coaching/data") && (
        <>
          <CoachingTopNavLink
            href="/coaching/data/foods"
            text="Livsmedel"
            pathName={activePath}
          />
          <CoachingTopNavLink
            href="/coaching/data/clients"
            text="Klienter"
            pathName={activePath}
          />
          <CoachingTopNavLink
            href="/coaching/data/exercises"
            text="Övningar"
            pathName={activePath}
          />
        </>
      )}

      {activePath?.includes("/coaching/tools") && (
        <>
          <CoachingTopNavLink
            href="/coaching/tools/meal-plan"
            text="Måltidsplaneraren"
            pathName={activePath}
          />
          <CoachingTopNavLink
            href="/coaching/tools/exercise-plan"
            text="Träningsplaneraren"
            pathName={activePath}
          />
        </>
      )}
    </div>
  );
};

const CoachingTopNavLink: React.FC<{
  href: string;
  text: string;
  pathName: string;
}> = ({ href, text, pathName }) => {
  return (
    <Link
      className={cn(
        " font-semibold text-muted-foreground transition-colors duration-100 hover:text-blue-500",
        pathName === href && "text-blue-500 ",
      )}
      href={href}
    >
      {text}
    </Link>
  );
};

export default CoachingTopNavLinks;

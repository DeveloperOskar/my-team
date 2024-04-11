"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { Button } from "@/app/_components/ui/button";

const CoachingNavbarLink: React.FC<{
  Icon: React.ReactNode;
  text: string;
  href: string;
  signOut?: boolean;
  activeKey: string;
}> = ({ Icon, text, href, activeKey, signOut = false }) => {
  const handleSignOut = () => {
    alert("You have been signed out");
  };
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={20}>
        {!signOut ? (
          <Link href={href}>
            <TooltipTrigger
              className={cn(
                "rounded-full p-2 transition-colors",
                pathname.includes(activeKey)
                  ? "bg-black text-secondary"
                  : "text-secondary-foreground/70",
              )}
            >
              {Icon}
            </TooltipTrigger>
          </Link>
        ) : (
          <TooltipTrigger
            onClick={handleSignOut}
            className={cn(
              "rounded-full p-2 transition-colors",
              pathname.includes(activeKey)
                ? "bg-black text-secondary"
                : "text-secondary-foreground/70",
            )}
          >
            {Icon}
          </TooltipTrigger>
        )}

        <TooltipContent side="right">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CoachingNavbarLink;

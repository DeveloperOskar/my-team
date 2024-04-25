"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavbarLink: React.FC<{
  href: string;
  text: string;
  activePath: string;
}> = ({ activePath, href, text }) => {
  const pathName = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "font-semibold text-muted-foreground transition-colors duration-150 hover:text-blue-500",
        pathName === activePath && "text-blue-500",
      )}
    >
      {text}
    </Link>
  );
};

export default NavbarLink;

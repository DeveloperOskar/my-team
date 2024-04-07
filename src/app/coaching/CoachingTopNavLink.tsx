"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const CoachingTopNavLink: React.FC<{ href: string; text: string }> = ({
  href,
  text,
}) => {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        " text-muted-foreground font-semibold transition-colors duration-100 hover:text-blue-500",
        pathname === href && "text-blue-500 ",
      )}
      href={href}
    >
      {text}
    </Link>
  );
};

export default CoachingTopNavLink;

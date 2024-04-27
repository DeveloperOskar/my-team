"use client";

import { Button, buttonVariants } from "@/app/_components/ui/button";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const NavbarSessionButtons: React.FC<{ session: Session | null }> = ({
  session,
}) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4">
      {session?.user ? (
        <>
          <Button onClick={handleSignOut} variant={"outline"}>
            Logga ut
          </Button>{" "}
          <Link
            href={"/coaching/data/foods"}
            className={buttonVariants({
              variant: "default",
            })}
          >
            Gå till applikationen
          </Link>
        </>
      ) : (
        <>
          <Link
            href={"sign-up"}
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Bli medlem
          </Link>
          <Link
            className={buttonVariants({
              variant: "default",
            })}
            href={"sign-in"}
          >
            Logga in
          </Link>
        </>
      )}
    </div>
  );
};

export default NavbarSessionButtons;

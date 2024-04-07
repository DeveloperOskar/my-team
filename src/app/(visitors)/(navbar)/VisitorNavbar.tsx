"use client";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const VisitorNavbar = () => {
  const router = useRouter();
  const session = useSession();

  console.log(session.data);

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <nav className="flex h-[65px] w-screen items-center border-b">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-2xl font-bold ">MyTeam2</span>

        <div className="flex items-center gap-4">
          {session.data?.user ? (
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
      </div>
    </nav>
  );
};

export default VisitorNavbar;

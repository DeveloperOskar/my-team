"use client";
import React from "react";

import Image from "next/image";
import { z } from "zod";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { signIn } from "next-auth/react";

const SignInForm = () => {
  const handleSignInWithGoogle = async () => {
    await signIn("google");
  };
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Logga in</h1>
        <p className="text-muted-foreground text-balance">
          Skriv in din E-post för att logga in
        </p>
      </div>

      <Button
        onClick={handleSignInWithGoogle}
        type="button"
        variant="outline"
        className="flex items-center gap-1"
      >
        <Image
          width={20}
          height={20}
          src="./google.svg"
          alt="logga in med google"
        />
        Google
      </Button>
    </>
  );
};

export default SignInForm;

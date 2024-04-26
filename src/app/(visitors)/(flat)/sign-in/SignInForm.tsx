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
  const [email, setEmail] = React.useState("");

  const handleSignInWithGoogle = async () => {
    await signIn("google");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("email", {
      email,
    });
  };

  return (
    <>
      <div>
        <div className="mb-5 w-[340px]">
          <h1 className="text-3xl font-bold">Logga in</h1>
          <p className="text-balance text-muted-foreground">
            Skriv in din E-post för att logga in
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">E-post</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Ange din epost"
            />
          </div>

          <Button className="mt-4 w-full">Logga in</Button>
        </form>

        <div className="mt-5 flex w-full items-center gap-3">
          <Separator className=" my-4 block w-auto  grow" />
          <p className="text-sm text-muted-foreground">Eller använd</p>
          <Separator className="   my-4 block w-auto grow " />
        </div>

        <div className="mt-5 flex flex-col">
          <Button
            onClick={handleSignInWithGoogle}
            type="button"
            variant="outline"
            className="flex w-full items-center gap-1"
          >
            <Image
              width={20}
              height={20}
              src="./google.svg"
              alt="logga in med google"
            />
            Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignInForm;

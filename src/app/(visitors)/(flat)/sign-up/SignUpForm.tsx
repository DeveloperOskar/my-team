"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SignInForm = () => {
  const [email, setEmail] = React.useState("");

  const handleSignUpWithGoogle = async () => {
    await signIn("google", {
      callbackUrl: `${window.location.origin}/coaching/data/foods`,
      redirect: true,
    });
  };
  const handleSignUpWithFacebook = async () => {
    await signIn("facebook", {
      callbackUrl: `${window.location.origin}/coaching/data/foods`,
      redirect: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn("resend", {
      email,
      redirect: true,
      callbackUrl: `${window.location.origin}/coaching/data/foods`,
    });
  };

  return (
    <>
      <div>
        <div className="mb-5 min-w-[300px] md:w-[340px]">
          <h1 className="text-3xl font-bold">Registrera dig</h1>
          <p className="text-balance text-muted-foreground">
            Har du redan ett konto?{" "}
            <Link
              className=" text-blue-500 transition-colors duration-150"
              href="/sign-in"
            >
              Logga in
            </Link>
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
          <p className="text-sm text-muted-foreground">Eller med</p>
          <Separator className="   my-4 block w-auto grow " />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleSignUpWithGoogle}
            type="button"
            variant="outline"
            className="flex w-full items-center gap-1"
          >
            <Image
              width={20}
              height={20}
              src={"./google.svg"}
              alt="logga in med google"
            />
            Google
          </Button>

          <Button
            onClick={handleSignUpWithFacebook}
            type="button"
            variant="outline"
            className="flex w-full items-center gap-1"
          >
            <Image
              width={25}
              height={25}
              src={"./facebook.svg"}
              alt="logga in med google"
            />
            Facebook
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignInForm;

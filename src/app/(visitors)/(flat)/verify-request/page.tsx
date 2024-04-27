import { buttonVariants } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const VerifyRequestPage = async () => {
  return (
    <main className="flex  h-screen w-screen flex-col items-center gap-20 bg-gray-50 p-10">
      <h1 className="text-5xl font-bold">MyTeam</h1>
      <Card className="max-w-[500px] p-6 text-center">
        <p className="text-3xl font-bold">Kolla din e-post!</p>
        <p className=" mt-1.5  text-center text-muted-foreground">
          Vi har skickat en länk till din e-post för att logga in på MyTeam.
          Vänligen logga in på din e-post och följ länken för att fortsätta.
        </p>

        <Link
          href={"/"}
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "default",
            }),
            "mt-8 w-full",
          )}
        >
          Gå tillbaka
        </Link>
      </Card>
    </main>
  );
};

export default VerifyRequestPage;

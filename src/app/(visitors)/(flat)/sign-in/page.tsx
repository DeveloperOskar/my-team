import { cn } from "@/lib/utils";
import { buttonVariants } from "@/app/_components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SignInForm from "./SignInForm";

export default function Home() {
  return (
    <main className=" h-screen lg:grid lg:grid-cols-2 ">
      <div className=" relative">
        <Image
          className=" object-cover"
          src={"/placeholder.svg"}
          alt="a personal trainer helping"
          fill
        />
      </div>

      <div className="relative flex flex-col items-center justify-center gap-4 p-4 lg:px-8">
        <Link
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "absolute right-4 top-4",
          )}
          href={"/"}
        >
          Tillbaka
        </Link>
        <SignInForm />
      </div>
    </main>
  );
}
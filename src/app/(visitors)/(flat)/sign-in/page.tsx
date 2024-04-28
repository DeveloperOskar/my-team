import { cn } from "@/lib/utils";
import { buttonVariants } from "@/app/_components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SignInForm from "./SignInForm";

const SignInPage = () => {
  return (
    <main className=" h-screen lg:grid lg:grid-cols-2">
      <div className="relative  hidden h-full w-full lg:block ">
        <div className="absolute z-20 flex h-full w-full flex-col justify-between bg-black bg-opacity-60 p-10">
          <h1 className=" text-4xl font-bold text-white">MyTeam</h1>

          <div className="text-white">
            <q className="text-lg">
              MyTeam har verkligen revolutionerat hur jag arbetar som tränare.
              Tidigare spenderade jag timmar på att handskriva och justera och
              skapa kostscheman/träningscheman för mina idrottare, men nu kan
              jag göra det på en bråkdel av tiden. Det har verkligen frigjort
              mig att fokusera mer på att stötta och guida mina atleter mot sina
              mål.
            </q>
          </div>
        </div>
        <Image
          className="position h-full w-full object-cover "
          src={"/sign-in-bg.jpg"}
          alt="a personal trainer helping"
          fill
        />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center gap-4 p-4 lg:px-8">
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
};

export default SignInPage;

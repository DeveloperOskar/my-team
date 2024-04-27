import { cn } from "@/lib/utils";
import { buttonVariants } from "@/app/_components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <main className=" h-screen lg:grid lg:grid-cols-2">
      <div className="relative  hidden h-full w-full lg:block ">
        <div className="absolute z-20 flex h-full w-full flex-col justify-between bg-black bg-opacity-60 p-10">
          <h1 className=" text-4xl font-bold text-white">MyTeam</h1>

          <div className="text-white">
            <q className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              voluptate. Dolor, illo odio tempora commodi reprehenderit
              praesentium iste placeat temporibus deserunt et blanditiis itaque
              earum facere ex quae provident necessitatibus.
            </q>
          </div>
        </div>
        <Image
          className="position h-full w-full object-cover "
          src={"/sign-up-placeholder.jpg"}
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

        <SignUpForm />
      </div>
    </main>
  );
};

export default SignUpPage;

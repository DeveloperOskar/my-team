"use client";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import HeroImage from "./hero-placeholder.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      className={cn(
        "container relative mx-auto flex flex-col gap-8 px-4  pt-10 transition-opacity ease-in-out lg:block lg:h-[calc(100vh-65px)] lg:gap-0 lg:px-8 lg:pt-0",
      )}
    >
      <div
        className="absolute inset-x-0 top-[-50px] -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#282828] to-[#000000] opacity-30 sm:left-[calc(50%-30rem)]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>

      <div className="z-50 flex h-full lg:max-w-[77%] xl:max-w-[65%]">
        <div className="flex flex-col justify-center gap-8 text-center lg:text-start">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl">
            Ta din coaching <br /> till nästa nivå
          </h1>
          <p className=" text-lg text-secondary-foreground lg:text-xl">
            Med vår plattform kan du skapa skräddarsydda kostplaner för dina
            klienter på ett ögonblick. Spar tid, få mer intäkter, öka
            kundnöjdheten och ta din coachingverksamhet till nya höjder med
            MyTeam. Börja din resa mot framgång idag!
          </p>

          <div className="flex items-center justify-center gap-5 lg:justify-start">
            <Button size="lg" className=" text-base">
              Bli medlem
            </Button>
            <Button variant="link" className=" text-base">
              Läs mer
            </Button>
          </div>
        </div>

        <svg
          className="hidden fill-white lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="0,0 90,0 50,100 0,100"></polygon>
        </svg>
      </div>

      <div className=" right-0 top-0 -z-20 h-full lg:absolute lg:w-[37%] xl:w-[46%]">
        <Image
          priority
          className="h-full w-auto rounded-lg object-cover lg:rounded-none lg:rounded-br-lg lg:rounded-tr-lg"
          src={HeroImage}
          alt="personal trainer giving instructions"
        />
      </div>
    </section>
  );
};

export default Hero;

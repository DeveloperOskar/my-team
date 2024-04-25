"use client";

import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "../_components/ui/button";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import CoachingAvatar from "./CoachingAvatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CoachingRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const MobileCoachingNav = () => {
  const [open, setIsOpen] = React.useState(false);
  const { data } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <nav className="flex items-center justify-between gap-6 bg-white px-6 py-3 shadow lg:hidden">
      <span className="text-2xl font-semibold">MyTeam</span>
      <AlertDialog open={open}>
        <div className="flex items-center gap-4">
          <CoachingAvatar session={data} />

          <Button onClick={() => setIsOpen(true)} variant="outline" size="icon">
            <Menu />
          </Button>
        </div>

        <AlertDialogContent className=" flex h-screen w-screen max-w-none flex-col sm:rounded-none">
          <span className="text-2xl font-semibold">MyTeam</span>

          <Accordion type="single" collapsible className="pl-3">
            <AccordionItem value="data" className="border-b-0">
              <AccordionTrigger className="py-2 text-lg font-semibold">
                Data
              </AccordionTrigger>

              <AccordionContent>
                <div className="flex flex-col gap-3 pl-3 text-base ">
                  {CoachingRoutes.data.map((route) => (
                    <Link
                      key={route.href}
                      className={cn(
                        " underline-offset-2  hover:underline",
                        route.href === pathname && "underline",
                      )}
                      href={route.href}
                    >
                      {route.text}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tools" className="border-b-0">
              <AccordionTrigger className="py-2 text-lg font-semibold">
                Verktyg
              </AccordionTrigger>

              <AccordionContent>
                <div className="flex flex-col gap-3 pl-3 text-base ">
                  {CoachingRoutes.tools.map((route) => (
                    <Link
                      key={route.href}
                      className={cn(
                        " underline-offset-2  hover:underline",
                        route.href === pathname && "underline",
                      )}
                      href={route.href}
                    >
                      {route.text}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-auto flex flex-col gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Stäng
            </Button>
            <Button size="lg" onClick={() => setIsOpen(false)}>
              Logga ut
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  );
};

export default MobileCoachingNav;

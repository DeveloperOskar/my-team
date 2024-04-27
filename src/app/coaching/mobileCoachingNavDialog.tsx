"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "../_components/ui/button";
import { Menu } from "lucide-react";
import CoachingAvatar from "./CoachingAvatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import Link from "next/link";
import { CoachingRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { type Session } from "next-auth";
import { usePathname } from "next/navigation";

const mobileCoachingNavDialog: React.FC<{
  session: Session | null;
  initialPath: string;
}> = ({ session, initialPath }) => {
  const [open, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState(initialPath);
  const pathname = usePathname();

  useEffect(() => {
    setActivePath(pathname);
    setIsOpen(false);
  }, [pathname]);

  return (
    <AlertDialog open={open}>
      <div className="flex items-center gap-4">
        <CoachingAvatar session={session} />

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
                      route.href === activePath && "underline",
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
                      route.href === activePath && "underline",
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
          <Button size="lg" variant="outline" onClick={() => setIsOpen(false)}>
            Stäng
          </Button>
          <Button size="lg" onClick={() => setIsOpen(false)}>
            Logga ut
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default mobileCoachingNavDialog;

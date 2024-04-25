import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import CoachingSideNav from "./CoachingSideNav";
import CoachingTopNav from "./CoachingTopNav";
import { Toaster } from "@/app/_components/ui/toaster";
import NextAuthSessionProvider from "../_components/providers/NextAuthSessionProvider";
import MobileCoachingNav from "./mobileCoachingNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen w-screen">
          <NextAuthSessionProvider>
            <TRPCReactProvider>
              <CoachingSideNav />

              <div className="flex h-full w-full grow flex-col   bg-neutral-50 pb-6 lg:p-6 ">
                <MobileCoachingNav />
                <CoachingTopNav />

                <main className="h-[calc(100%-70px)] w-full px-6 pt-6 lg:p-0  ">
                  {children}
                </main>
              </div>

              <Toaster />
            </TRPCReactProvider>
          </NextAuthSessionProvider>
        </div>
      </body>
    </html>
  );
}

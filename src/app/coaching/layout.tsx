import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import CoachingSideNav from "./CoachingSideNav";
import CoachingTopNav from "./CoachingTopNav";
import { Toaster } from "@/app/_components/ui/toaster";
import MobileCoachingNav from "./mobileCoachingNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" overflow-hidden">
        <div className="grid grid-cols-1 bg-neutral-50 lg:grid-cols-[auto_1fr] ">
          <TRPCReactProvider>
            <CoachingSideNav />

            <div className="h-screen pb-6 lg:p-6 ">
              <MobileCoachingNav />
              <CoachingTopNav />

              <main className="h-[calc(100%-65px)] px-6 pt-6 lg:p-0">
                {children}
              </main>
            </div>

            <Toaster />
          </TRPCReactProvider>
        </div>
      </body>
    </html>
  );
}

import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import CoachingSideNav from "./CoachingSideNav";
import CoachingTopNav from "./CoachingTopNav";
import { Toaster } from "@/app/_components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <TRPCReactProvider>
          <div className="flex h-screen w-screen">
            <CoachingSideNav />

            <div className="flex h-screen grow flex-col   bg-neutral-50 p-6">
              <CoachingTopNav />

              <main className="h-[calc(100%-70px)]">{children}</main>
            </div>
          </div>

          {/* <Toaster /> */}
        </TRPCReactProvider>
      </body>
    </html>
  );
}

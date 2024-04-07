import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import CoachingSideNav from "./CoachingSideNav";
import CoachingTopNav from "./CoachingTopNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <div className="0 flex min-h-screen w-screen">
            <CoachingSideNav />

            <div className="flex grow flex-col bg-neutral-50 p-6">
              <CoachingTopNav />
              <main className="grow">{children}</main>
            </div>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

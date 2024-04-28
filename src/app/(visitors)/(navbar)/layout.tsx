import "@/styles/globals.css";
import VisitorNavbar from "./VisitorNavbar";

export const metadata = {
  title: "MyTeam - Coaching made easy",
  description:
    "En plattform för att underlätta coachning av lag och personer. Du kan skapa kostscheman och träningscheman",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        <VisitorNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

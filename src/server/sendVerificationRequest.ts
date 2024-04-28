import MagicLinkEmailTemplate, {
  type MagicLinkProps,
} from "@/emails/magic-link";
import { type EmailConfig } from "next-auth/providers/email";
import { render } from "@react-email/render";

export async function sendVerificationRequest(params: {
  identifier: string;
  url: string;
  expires: Date;
  provider: EmailConfig;
  token: string;
  theme: {
    colorScheme?: "auto" | "dark" | "light";
    logo?: string;
    brandColor?: string;
    buttonText?: string;
  };
  request: Request;
}) {
  const { identifier: to, provider, url, theme } = params;
  const { host } = new URL(url);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: `Logga in hos MyTeam`,
      html: render(MagicLinkEmailTemplate({ url })),
      text: text({ url, host }),
    }),
  });

  if (!res.ok)
    throw new Error("Resend error: " + JSON.stringify(await res.json()));
}

function text({ url, host }: { url: string; host: string }) {
  return `Logga in till MyTeam. Kopiera länken för att logga in: ${url}`;
}

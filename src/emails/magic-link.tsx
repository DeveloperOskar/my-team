import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export interface MagicLinkProps {
  url: string;
}

const logoUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}/my-team-email-logo.svg`
    : `http://localhost:3000/my-team-email-logo.svg`;

export const MagicLinkEmailTemplate = ({ url }: MagicLinkProps) => (
  <Html>
    <Head />
    <Preview>Logga in till MyTeam</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${logoUrl}`}
          width="42"
          height="42"
          alt="MyTeam"
          style={logo}
        />
        <Heading style={heading}>MyTeam</Heading>
        <Section style={buttonContainer}>
          <Button style={button} href={url}>
            Logga in hos MyTeam
          </Button>
        </Section>
        <Text style={paragraph}>
          Länken är giltig i 24 timmar. Om du inte har begärt denna länk,
          vänligen ignorera detta meddelande.
        </Text>

        <Text style={paragraph}>
          Om knappen inte fungerar kan du kopiera länken nedan och klistra in i
          din webbläsare:
        </Text>

        <code style={code}>{url}</code>
        <Hr style={hr} />
        <Link href="https://my-team.se" style={reportLink}>
          MyTeam
        </Link>
      </Container>
    </Body>
  </Html>
);

MagicLinkEmailTemplate.PreviewProps = {
  url: "https://my-team.se/auth/code/123123123",
} as MagicLinkProps;

export default MagicLinkEmailTemplate;

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "36px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#000000",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "1px 4px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "14px",
  borderRadius: "4px",
  color: "#3b82f6",
};

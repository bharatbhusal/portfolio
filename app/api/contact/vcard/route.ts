import { NextResponse } from "next/server";
import { getPersonalInfo } from "@/models/personal-info";
import { getSocialLinks } from "@/models/social-links";

/**
 * vCard API Route
 * Generates a vCard (VCF) file for contact information
 * Compatible with iOS and Android devices
 */

export async function GET() {
  const info = await getPersonalInfo();
  if (!info) {
    return NextResponse.json({ error: "No personal info found" }, { status: 404 });
  }

  const socialLinks = await getSocialLinks();
  const socialMap = Object.fromEntries(
    socialLinks.filter((s) => s.enabled && s.url).map((s) => [s.platform, s.url])
  );

  const vCardContent = generateVCard(info, socialMap);
  const filename = `${info.name.first.toLowerCase()}_${info.name.last.toLowerCase()}_contact.vcf`;

  return new NextResponse(vCardContent, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function generateVCard(
  info: NonNullable<Awaited<ReturnType<typeof getPersonalInfo>>>,
  social: Record<string, string>,
): string {
  const { name, email, phone, portfolio, title, tagline } = info;

  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name.full}`,
    `N:${name.last};${name.first};;;`,
    `TITLE:${title}`,
    email ? `EMAIL;TYPE=INTERNET,Personal:${email}` : null,
    phone ? `TEL;TYPE=CELL:${phone}` : null,
    portfolio ? `URL;TYPE=Portfolio:${portfolio}` : null,
    social.github ? `URL;TYPE=GitHub:${social.github}` : null,
    social.twitter ? `URL;TYPE=Twitter:${social.twitter}` : null,
    social.linkedin ? `URL;TYPE=LinkedIn:${social.linkedin}` : null,
    social.telegram ? `URL;TYPE=Telegram:${social.telegram}` : null,
    social.instagram ? `URL;TYPE=Instagram:${social.instagram}` : null,
    social.substack ? `URL;TYPE=Substack:${social.substack}` : null,
    tagline ? `NOTE:${tagline}` : null,
    `REV:${new Date().toISOString()}`,
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");

  return vCard;
}

export async function POST() {
  return GET();
}

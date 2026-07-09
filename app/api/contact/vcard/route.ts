import { NextResponse } from "next/server";
import { contactInfo } from "@/config/contact-info";

/**
 * vCard API Route
 * Generates a vCard (VCF) file for contact information
 * Compatible with iOS and Android devices
 */

export async function GET() {
  const vCardContent = generateVCard();

  return new NextResponse(vCardContent, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${contactInfo.name.first.toLocaleLowerCase()}_${contactInfo.name.last.toLocaleLowerCase()}_contact.vcf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
/**
 * Generate vCard 3.0 format content
 * Updated for structured contactInfo fields
 */
function generateVCard(): string {
  const { name, email, phone, portfolio, social, title, tagline } = contactInfo;

  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",

    // Name
    `FN:${name.full}`,
    `N:${name.last};${name.first};;;`,

    // Title/Organization
    `TITLE:${title}`,

    // Emails
    email ? `EMAIL;TYPE=INTERNET,Personal:${email}` : null,

    // Phones
    phone ? `TEL;TYPE=CELL:${phone}` : null,

    // Portfolio (instead of website)
    portfolio ? `URL;TYPE=Portfolio:${portfolio}` : null,

    // Social Profiles
    social?.github ? `URL;TYPE=GitHub:${social.github}` : null,
    social?.twitter ? `URL;TYPE=Twitter:${social.twitter}` : null,
    social?.linkedin ? `URL;TYPE=LinkedIn:${social.linkedin}` : null,
    social?.telegram ? `URL;TYPE=Telegram:${social.telegram}` : null,
    social?.instagram ? `URL;TYPE=Instagram:${social.instagram}` : null,
    social?.substack ? `URL;TYPE=Substack:${social.substack}` : null,

    // Note or tagline
    tagline ? `NOTE:${tagline}` : null,

    // Last updated timestamp
    `REV:${new Date().toISOString()}`,

    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");

  return vCard;
}
/**
 * POST method (alias for GET)
 */
export async function POST() {
  return GET();
}

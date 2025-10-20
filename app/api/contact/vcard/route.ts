import { NextRequest, NextResponse } from "next/server";
import { contactInfo } from "@/config/contact-info";

/**
 * vCard API Route
 * Generates a vCard (VCF) file for contact information
 * Compatible with iOS and Android devices
 */

export async function GET(request: NextRequest) {
  // Generate vCard content (Version 3.0 for better compatibility)
  const vCardContent = generateVCard();

  // Return with proper headers for vCard file
  return new NextResponse(vCardContent, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${contactInfo.name.first}_${contactInfo.name.last}.vcf"`,
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
}

/**
 * Generate vCard 3.0 format content
 * More compatible with both iOS and Android
 */
function generateVCard(): string {
  const { name, email, phone, website, social, title, address } = contactInfo;

  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",

    // Name
    `FN:${name.full}`,
    `N:${name.last};${name.first};;;`,

    // Title/Organization
    `TITLE:${title}`,
    `ORG:${name.full}`,

    // Contact Information
    `EMAIL;TYPE=INTERNET,WORK:${email}`,
    phone ? `TEL;TYPE=CELL:${phone}` : null,

    // Website
    `URL:${website}`,

    // Address (if provided)
    address.street && address.city
      ? `ADR;TYPE=WORK:;;${address.street};${address.city};${address.state};${address.zipCode};${address.country}`
      : null,

    // Social Media URLs (as additional URLs)
    `URL;TYPE=GitHub:${social.github}`,
    `URL;TYPE=Twitter:${social.twitter}`,
    `URL;TYPE=LinkedIn:${social.linkedin}`,
    `URL;TYPE=Telegram:${social.telegram}`,
    `URL;TYPE=Instagram:${social.instagram}`,

    // Note with bio
    `NOTE:${contactInfo.tagline}`,

    // Photo URL (will be downloaded by some devices)
    `PHOTO;VALUE=URL:${website}/bharatbhusal.jpeg`,

    // Revision timestamp
    `REV:${new Date().toISOString()}`,

    "END:VCARD",
  ]
    .filter(Boolean) // Remove null entries
    .join("\r\n"); // vCard spec requires CRLF line endings

  return vCard;
}

// Also support POST method for consistency
export async function POST(request: NextRequest) {
  return GET(request);
}

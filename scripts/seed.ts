import { MongoClient } from "mongodb";
import careerData from "../data/careerData";
import educationData from "../data/educationData";
import { contactInfo } from "../config/contact-info";
import { socialLinks } from "../data/aboutMe";

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/resume";

async function seed() {
  const client = await MongoClient.connect(DATABASE_URL);
  const db = client.db();

  console.log("Seeding database...");

  // Seed personal info
  const personalInfo = {
    name: contactInfo.name,
    email: contactInfo.email,
    phone: contactInfo.phone,
    website: contactInfo.website,
    portfolio: contactInfo.portfolio,
    title: contactInfo.title,
    tagline: contactInfo.tagline,
    bio: contactInfo.bio,
    keywords: contactInfo.keywords,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const existingPersonalInfo = await db.collection("personal_info").countDocuments();
  if (existingPersonalInfo === 0) {
    await db.collection("personal_info").insertOne(personalInfo);
    console.log("✓ Seeded personal info");
  } else {
    console.log("→ Personal info already exists, skipping");
  }

  // Seed education
  const existingEducation = await db.collection("education_items").countDocuments();
  if (existingEducation === 0) {
    const educationDocs = educationData.map((item) => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await db.collection("education_items").insertMany(educationDocs);
    console.log(`✓ Seeded ${educationDocs.length} education entries`);
  } else {
    console.log("→ Education already exists, skipping");
  }

  // Seed career
  const existingCareer = await db.collection("career_items").countDocuments();
  if (existingCareer === 0) {
    const careerDocs = careerData.map((item) => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await db.collection("career_items").insertMany(careerDocs);
    console.log(`✓ Seeded ${careerDocs.length} career entries`);
  } else {
    console.log("→ Career already exists, skipping");
  }

  // Seed social links
  const existingSocialLinks = await db.collection("social_links").countDocuments();
  if (existingSocialLinks === 0) {
    const socialDocs = socialLinks.map((link) => ({
      platform: link.type,
      url: link.link,
      handle: link.handle || "",
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await db.collection("social_links").insertMany(socialDocs);
    console.log(`✓ Seeded ${socialDocs.length} social links`);
  } else {
    console.log("→ Social links already exists, skipping");
  }

  console.log("\nSeeding complete!");
  await client.close();
}

seed().catch(console.error);

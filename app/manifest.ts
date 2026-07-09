import type { MetadataRoute } from "next";
import { siteConfig, contactInfo } from "@/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${contactInfo.name.full} - ${contactInfo.title}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon.jpg",
        sizes: "any",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/apple-icon.jpg",
        sizes: "any",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
  };
}

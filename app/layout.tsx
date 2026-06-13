import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/global.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout";
import { siteConfig, contactInfo } from "@/config";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author }],
  openGraph: {
    title: `${contactInfo.name.full} - ${contactInfo.title}`,
    description: contactInfo.bio,
    url: siteConfig.url,
    type: "website",
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${contactInfo.name.full} - ${contactInfo.title}`,
    description: contactInfo.bio,
    images: [siteConfig.ogImage],
    site: siteConfig.twitterHandle,
  },
  icons: {
    icon: siteConfig.ogImage,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} min-h-screen transition-colors duration-300 bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={siteConfig.defaultTheme}
          enableSystem
          disableTransitionOnChange={false}
        >
          <Header />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

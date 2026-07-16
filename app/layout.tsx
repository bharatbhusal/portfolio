import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "@/global.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { StoreProvider } from "@/components/providers/store-provider";
import { NotificationProvider } from "@/components/shared/NotificationProvider";
import Header from "@/components/layout/Header";
import { contactInfo } from "@/config/contact-info";
import { siteConfig } from "@/config/site-config";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: contactInfo.name.full }],
  category: "portfolio",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${contactInfo.name.full} - ${contactInfo.title}`,
    description: contactInfo.bio,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${contactInfo.name.full} - ${contactInfo.title}`,
    description: contactInfo.bio,
    images: [siteConfig.ogImage],
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
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
          <StoreProvider>
            <AuthProvider>
              <NotificationProvider>
                <Header />
                <main className="min-h-screen">{children}</main>
              </NotificationProvider>
            </AuthProvider>
          </StoreProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

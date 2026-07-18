import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "@/global.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { StoreProvider } from "@/components/providers/store-provider";
import { NotificationProvider } from "@/components/shared/NotificationProvider";
import Header from "@/components/layout/Header";
import { siteConfig } from "@/config/site-config";
import { getProfileImageId } from "@/services/image";
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

export async function generateMetadata(): Promise<Metadata> {
  let imageId: string | null = null;
  try {
    imageId = await getProfileImageId();
  } catch {
    imageId = null;
  }
  const favicon = imageId ? `/api/image?id=${imageId}` : "/api/fallback-icon";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: "Portfolio",
      template: "%s | Portfolio",
    },
    description: "Software Engineer Portfolio",
    category: "portfolio",
    manifest: "/manifest.webmanifest",
    icons: {
      icon: favicon,
      apple: favicon,
    },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [siteConfig.ogImage],
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  };
}

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

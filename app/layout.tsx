import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import Explore from "@/components/layout/Explore";
import "@/global.css";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig, contactInfo } from "@/config";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* SEO Meta Tags */}
        <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="keywords" content={siteConfig.keywords.join(", ")} />
        <meta name="author" content={siteConfig.author} />

        {/* Custom Font: Poppins */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />

        {/* Open Graph Meta Tags for Social Media Sharing */}
        <meta
          property="og:title"
          content={`${contactInfo.name.full} - ${contactInfo.title}`}
        />
        <meta property="og:description" content={contactInfo.bio} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${contactInfo.name.full} - ${contactInfo.title}`}
        />
        <meta name="twitter:description" content={contactInfo.bio} />
        <meta name="twitter:image" content={siteConfig.ogImage} />
        <meta name="twitter:site" content={siteConfig.twitterHandle} />

        {/* Canonical URL for SEO */}
        <link rel="canonical" href={siteConfig.url} />

        {/* Favicon */}
        <link rel="icon" type="image/jpeg" href={siteConfig.ogImage} />
      </head>
      <body className="min-h-screen transition-colors duration-300 bg-background text-foreground overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme={siteConfig.defaultTheme}
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Navigation and Theme controls - Fixed position */}
          <Explore />
          <ThemeSwitcher />

          {/* Main content - Full screen */}
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

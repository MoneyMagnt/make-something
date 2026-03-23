import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { Providers } from "./providers";

const manrope = localFont({
  src: "./fonts/Manrope-Bold.ttf",
  display: "swap",
  variable: "--font-zyra-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "Zyra Growth Studio | growth systems for brands in ghana",
    template: "%s",
  },
  description:
    "zyra is a ghana growth studio building seo, content, influencer, and founder website systems that turn attention into revenue.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Zyra Growth Studio | growth systems for brands in ghana",
    description:
      "zyra is a ghana growth studio building seo, content, influencer, and founder website systems that turn attention into revenue.",
    siteName: "Zyra Growth Studio",
    images: [
      {
        url: `${SITE_URL}/og.jpg`,
        width: 1200,
        height: 630,
        alt: "zyra growth studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zyra Growth Studio | growth systems for brands in ghana",
    description:
      "zyra is a ghana growth studio building seo, content, influencer, and founder website systems that turn attention into revenue.",
    images: [`${SITE_URL}/og.jpg`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const themeBootScript = `
(() => {
  try {
    const root = document.documentElement;
    const theme = root.classList.contains("dark") ? "dark" : "light";
    root.style.colorScheme = theme;
    root.dataset.themeReady = "true";
  } catch {}
})();
`;

async function getInitialThemeClass(): Promise<"light" | "dark"> {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("make_something_theme_mode")?.value;
  if (cookieTheme === "dark" || cookieTheme === "light") {
    return cookieTheme;
  }
  return "light";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialTheme = await getInitialThemeClass();

  return (
    <html lang="en" className={`${initialTheme} ${manrope.variable}`} data-theme-ready="false" suppressHydrationWarning>
      <head>
        <script
          id="theme-boot"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeBootScript }}
        />
      </head>
      <body className="min-h-screen overflow-x-clip bg-background text-foreground font-sans antialiased">
        <a href="#main-content" className="skip-link">
          skip to main content
        </a>
        <Providers initialTheme={initialTheme}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}

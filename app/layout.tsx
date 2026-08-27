import type { Metadata, Viewport } from "next";
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
    default: "Zyra Growth Studio | helping growing brands get noticed",
    template: "%s",
  },
  description:
    "zyra helps growing brands in ghana get noticed, look credible online, and turn attention into inquiries, ticket sales, and customers.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Zyra Growth Studio | helping growing brands get noticed",
    description:
      "zyra helps growing brands in ghana get noticed, look credible online, and turn attention into inquiries, ticket sales, and customers.",
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
    title: "Zyra Growth Studio | helping growing brands get noticed",
    description:
      "zyra helps growing brands in ghana get noticed, look credible online, and turn attention into inquiries, ticket sales, and customers.",
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
    const storageKey = "make_something_theme_mode";
    const savedTheme = localStorage.getItem(storageKey);
    const cookieTheme = document.cookie
      .split(";")
      .map((value) => value.trim())
      .find((value) => value.startsWith(storageKey + "="))
      ?.split("=")[1];
    const theme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : cookieTheme === "dark" || cookieTheme === "light"
        ? cookieTheme
        : "light";

    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
    root.dataset.themeReady = "true";
  } catch {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`light ${manrope.variable}`} data-theme-ready="false" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="rj8tdAyRHZdy83fPMeC0oM7HF71IFjrAVwvKzDIGBhU" />
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
        <Providers initialTheme="light">{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}

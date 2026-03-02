import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-zyra-manrope",
});

export const metadata: Metadata = {
  title: "zyra",
  description: "we build demand systems that turn attention into revenue.",
  metadataBase: new URL("https://skill-deploy-fazf432rq2.vercel.app"),
  openGraph: {
    title: "zyra",
    description: "we build demand systems that turn attention into revenue.",
    siteName: "zyra",
  },
  twitter: {
    card: "summary_large_image",
    title: "zyra",
    description: "we build demand systems that turn attention into revenue.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const themeBootScript = `
(() => {
  try {
    const key = "make_something_theme_mode";
    const stored = window.localStorage.getItem(key);
    const cookieMatch = document.cookie.match(/(?:^|; )make_something_theme_mode=(light|dark)(?:;|$)/);
    const cookieTheme = cookieMatch ? cookieMatch[1] : null;
    const theme =
      stored === "light" || stored === "dark"
        ? stored
        : cookieTheme === "light" || cookieTheme === "dark"
          ? cookieTheme
          : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
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
    <html lang="en" className={`${initialTheme} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script
          id="theme-boot"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeBootScript }}
        />
      </head>
      <body className="min-h-screen overflow-x-clip bg-background text-foreground font-sans antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}

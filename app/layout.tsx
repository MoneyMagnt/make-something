import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "./providers";

const manrope = localFont({
  src: "./fonts/Manrope-Bold.ttf",
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
        <Providers initialTheme={initialTheme}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "zyra",
  description: "build your first app with ai. look what i made!",
  metadataBase: new URL("https://makesomething.so"),
  openGraph: {
    title: "zyra",
    description: "look what i made!",
    siteName: "zyra",
  },
  twitter: {
    card: "summary_large_image",
    title: "zyra",
    description: "look what i made!",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className="min-h-screen overflow-x-clip bg-background text-foreground font-sans antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}

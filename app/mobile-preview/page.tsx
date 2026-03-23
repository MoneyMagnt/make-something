import type { Metadata } from "next";
import MobilePreviewPageClient from "@/components/MobilePreviewPageClient";

export const metadata: Metadata = {
  title: {
    absolute: "Mobile Preview | Zyra Growth Studio",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function MobilePreviewPage() {
  return <MobilePreviewPageClient />;
}

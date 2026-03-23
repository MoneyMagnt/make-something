import type { Metadata } from "next";
import ServicesFigmaPreviewPage from "@/components/service-pages/ServicesFigmaPreviewPage";

export const metadata: Metadata = {
  title: {
    absolute: "Services Figma Preview | Zyra Growth Studio",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ServicesFigmaPreviewRoute() {
  return <ServicesFigmaPreviewPage />;
}

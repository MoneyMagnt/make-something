import { VENUS_LANDING_METADATA } from "@/lib/venusEvent";

export const metadata = VENUS_LANDING_METADATA;

export default function VenusLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

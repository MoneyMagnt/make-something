import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminPortalPage from "@/components/AdminPortalPage";

export const metadata: Metadata = {
  title: {
    absolute: "Admin Portal | Zyra Growth Studio",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PrivateAdminPage() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "";
  const isLocalHost = host.startsWith("127.0.0.1") || host.startsWith("localhost");

  if (!isLocalHost) {
    redirect("/");
  }

  return <AdminPortalPage />;
}

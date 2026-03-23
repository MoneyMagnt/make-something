import type { Metadata } from "next";
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

export default function PrivateAdminPage() {
  return <AdminPortalPage />;
}

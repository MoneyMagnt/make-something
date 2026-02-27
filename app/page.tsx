"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/visitor");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-slate-900">
      redirecting...
    </div>
  );
}

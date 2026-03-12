import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIMARY_HOST = "www.zyragh.com";
const REDIRECT_HOSTS = new Set([
  "zyragh.com",
  "zyragh.vercel.app",
  "skill-deploy-fazf432rq2.vercel.app",
]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase();

  if (!host || !REDIRECT_HOSTS.has(host)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.host = PRIMARY_HOST;

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/:path*",
};

import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "VENUS with Mhan Like Greg, 23 October 2026 at Jet BBlack Lounge";
export const size = { width: 1440, height: 2560 };
export const contentType = "image/jpeg";

export default async function EventsOgImage() {
  const flyer = await readFile(
    join(process.cwd(), "public", "events/venus/mhan-like-greg-preview.jpg"),
  );
  return new Response(flyer, { headers: { "Content-Type": contentType } });
}

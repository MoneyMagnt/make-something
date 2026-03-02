import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "zyra growth studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const iconSvg = await readFile(join(process.cwd(), "app/icon.svg"), "utf8");
  const iconDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(iconSvg)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconDataUri}
          width={220}
          height={220}
          alt=""
          style={{ display: "flex" }}
        />
      </div>
    ),
    size
  );
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "zyra growth studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [manropeBold, sunPng] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/Manrope-Bold.ttf")),
    readFile(join(process.cwd(), "app/fonts/sun-emoji.png")),
  ]);

  const sunDataUri = `data:image/png;base64,${sunPng.toString("base64")}`;

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
          gap: 24,
          background: "#0a0a0a",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sunDataUri}
          width={120}
          height={120}
          alt=""
          style={{ display: "flex" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: 96,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            zyra
          </div>
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: 36,
              fontWeight: 700,
              color: "#a5f3fc",
              letterSpacing: "-0.01em",
              lineHeight: 1.15,
              display: "flex",
              alignItems: "center",
            }}
          >
            we build demand systems that turn attention into revenue.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Manrope",
          data: manropeBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}

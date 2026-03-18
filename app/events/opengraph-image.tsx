import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "xeno the rev hosts venus | free passes live";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function pngToDataUri(relativePath: string) {
  const buffer = await readFile(join(process.cwd(), "public", relativePath));
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export default async function EventsOgImage() {
  const venusLogo = await pngToDataUri("VENUS_logo.PNG");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 18% 18%, rgba(129,140,248,0.34), transparent 26%), radial-gradient(circle at 86% 14%, rgba(236,72,153,0.26), transparent 24%), linear-gradient(145deg, #12072b 0%, #131f4d 48%, #090f24 100%)",
          color: "white",
          padding: "56px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0)), radial-gradient(circle at 50% 100%, rgba(129,140,248,0.2), transparent 38%)",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: 34,
            padding: "42px 44px",
            background: "rgba(8, 15, 36, 0.46)",
            backdropFilter: "blur(12px)",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 22,
                letterSpacing: 2.8,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: "#22d3ee",
                  boxShadow: "0 0 18px rgba(34,211,238,0.7)",
                }}
              />
              tickets live
            </div>
            <div
              style={{
                display: "flex",
                padding: "12px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.08)",
                fontSize: 20,
                color: "rgba(255,255,255,0.82)",
              }}
            >
              27 march 2026 · accra
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={venusLogo}
              alt="VENUS"
              width={420}
              height={190}
              style={{ objectFit: "contain", objectPosition: "left center" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 760 }}>
              <div style={{ fontSize: 30, letterSpacing: 2.4, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
                nightlife experience by zyra
              </div>
              <div style={{ fontSize: 56, lineHeight: 1.04, fontWeight: 700 }}>
                xeno the rev hosts venus
              </div>
              <div style={{ fontSize: 28, color: "rgba(255,255,255,0.78)" }}>
                free pass access is live before standard entry starts
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 22, textTransform: "uppercase", letterSpacing: 2.2, color: "rgba(255,255,255,0.68)" }}>
                glass lounge
              </div>
              <div style={{ fontSize: 24, color: "rgba(255,255,255,0.86)" }}>
                tap for lineup, venue, and access
              </div>
            </div>
            <div style={{ fontSize: 24, color: "#67e8f9", fontWeight: 700 }}>
              zyragh.com/events
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}




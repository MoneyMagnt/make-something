import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "VENUS with Mhan Like Greg, free entry on 23 October 2026 at Jet BBlack Lounge, Accra";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function EventsOgImage() {
  const flyer = await readFile(
    join(process.cwd(), "public", "events/venus/mhan-like-greg-preview.jpg"),
  );
  const flyerUrl = `data:image/jpeg;base64,${flyer.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        background: "linear-gradient(125deg, #14070a 0%, #530c0e 58%, #120508 100%)",
        color: "#f8f0df",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 790,
          padding: "55px 60px",
        }}
      >
        <div style={{ display: "flex", color: "#f0d28d", fontSize: 22, letterSpacing: 5 }}>
          +233EVENTS PRESENTS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#f0d28d", fontSize: 92, fontWeight: 900, letterSpacing: -5 }}>
            VENUS
          </div>
          <div style={{ display: "flex", fontSize: 41, fontWeight: 700, lineHeight: 1.1 }}>
            with Mhan Like Greg
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 24 }}>
          <div style={{ display: "flex", color: "#f0d28d", fontWeight: 800 }}>
            FREE ENTRY · 23 OCTOBER · 9PM
          </div>
          <div style={{ display: "flex" }}>Jet BBlack Lounge · Accra</div>
        </div>
      </div>
      {/* The official host flyer stays intact on the right side of the share card. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={flyerUrl}
        alt=""
        width={355}
        height={630}
        style={{ width: 355, height: 630, objectFit: "cover", objectPosition: "center top" }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 790,
          width: 55,
          height: 630,
          background: "linear-gradient(90deg, #530c0e, transparent)",
        }}
      />
    </div>,
    size,
  );
}

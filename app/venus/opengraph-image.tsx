import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "+233Events opens Jet BBlack Lounge with VENUS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function imageToDataUri(relativePath: string) {
  const buffer = await readFile(join(process.cwd(), "public", relativePath));
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export default async function VenusOgImage() {
  const [venusMark, eventsLogo, manrope] = await Promise.all([
    imageToDataUri("events/venus/venus-mark.png"),
    imageToDataUri("233-events-logo.png"),
    readFile(join(process.cwd(), "app", "fonts", "Manrope-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          color: "#123b55",
          padding: "50px 56px",
          fontFamily: "Manrope",
          background:
            "radial-gradient(circle at 82% 18%, rgba(245,0,150,.55), transparent 27%), radial-gradient(circle at 12% 82%, rgba(0,169,214,.48), transparent 30%), linear-gradient(145deg,#f5fa78 0%,#a9edc8 48%,#56d5dd 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.28,
            backgroundImage:
              "linear-gradient(135deg,rgba(255,255,255,.9) 0 12%,transparent 12% 48%,rgba(18,59,85,.22) 48% 52%,transparent 52% 76%,rgba(255,255,255,.7) 76% 100%)",
            backgroundSize: "150px 150px",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            position: "relative",
            border: "2px solid rgba(255,255,255,.78)",
            borderRadius: 36,
            background: "rgba(255,255,255,.43)",
            boxShadow: "0 28px 80px rgba(18,59,85,.22)",
            padding: "34px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "58%",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={eventsLogo} alt="" width={104} height={58} style={{ objectFit: "contain" }} />
              <div style={{ width: 2, height: 34, background: "rgba(18,59,85,.25)" }} />
              <div style={{ display: "flex", fontSize: 18, letterSpacing: 2.2, textTransform: "uppercase" }}>
                milestone opening
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 17 }}>
              <div style={{ display: "flex", fontSize: 64, lineHeight: 0.96, letterSpacing: -3.2 }}>
                Accra, meet VENUS.
              </div>
              <div style={{ display: "flex", maxWidth: 610, fontSize: 27, lineHeight: 1.25 }}>
                +233Events officially opens Jet BBlack Lounge with an unforgettable celebration of a major milestone.
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  padding: "12px 18px",
                  borderRadius: 999,
                  color: "white",
                  background: "#f50096",
                  fontSize: 20,
                  letterSpacing: 1.4,
                }}
              >
                GET TICKETS NOW
              </div>
              <div style={{ display: "flex", fontSize: 20 }}>11 SEP 2026 · 9PM</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "42%",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 350,
                height: 350,
                borderRadius: 999,
                border: "22px solid rgba(255,255,255,.52)",
                background: "linear-gradient(135deg,#f50096 0%,#ffffff 28%,#00a9d6 54%,#f5fa78 76%,#f50096 100%)",
                boxShadow: "inset 0 0 38px rgba(255,255,255,.9),0 26px 56px rgba(18,59,85,.2)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={venusMark}
              alt=""
              width={480}
              height={345}
              style={{ position: "relative", objectFit: "contain", filter: "drop-shadow(0 24px 18px rgba(18,59,85,.3))" }}
            />
            <div
              style={{
                display: "flex",
                position: "absolute",
                right: 8,
                bottom: 0,
                fontSize: 18,
                letterSpacing: 1.5,
              }}
            >
              zyragh.com/venus
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Manrope", data: manrope, style: "normal", weight: 700 }],
    }
  );
}

import { ImageResponse } from "next/og";
import { salon } from "@/config/salon";

export const alt = `${salon.name}: ${salon.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social sharing card generated from the salon config. Replace with a designed image if you prefer. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#2b2428",
          color: "#fbf7f2",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#dcbb84" }}>
          {`Beauty salon in ${salon.city}`}
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>{salon.name}</div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 28, color: "#f3dfdb" }}>{salon.tagline}</div>
      </div>
    ),
    size,
  );
}

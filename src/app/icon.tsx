import { ImageResponse } from "next/og";
import { salon } from "@/config/salon";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon drawn from the logo initials in config. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2b2428",
          color: "#dcbb84",
          fontSize: 30,
          fontWeight: 700,
          borderRadius: 32,
        }}
      >
        {salon.logo.initials}
      </div>
    ),
    size,
  );
}

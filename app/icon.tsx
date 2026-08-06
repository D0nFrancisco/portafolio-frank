import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          background: "#0a0a0b",
          color: "#7c93ff",
          fontFamily: "sans-serif",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        F
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#0a0a0b",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#7c93ff", marginBottom: 28 }}>{profile.role}</div>
        <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>
          {profile.tagline}
        </div>
        <div style={{ fontSize: 26, marginTop: 44, color: "#a1a1aa" }}>{profile.name}</div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { OG_IMAGE_SIZE, OG_CONTENT_TYPE, OG_COLORS, OgFrame } from "@/lib/og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgFrame>
        <div style={{ fontSize: 28, color: OG_COLORS.accent, marginBottom: 28 }}>{profile.role}</div>
        <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>
          {profile.tagline}
        </div>
        <div style={{ fontSize: 26, marginTop: 44, color: OG_COLORS.muted }}>{profile.name}</div>
      </OgFrame>
    ),
    { ...size },
  );
}

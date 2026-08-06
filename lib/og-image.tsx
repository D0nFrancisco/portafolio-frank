import type { ReactNode } from "react";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// next/og's ImageResponse renders outside the app's CSS, so it can't read
// the theme tokens in app/globals.css — these mirror the dark theme's
// values as plain literals, on purpose, for every generated icon/OG image.
export const OG_COLORS = {
  bg: "#0a0a0b",
  fg: "#f4f4f5",
  accent: "#7c93ff",
  muted: "#a1a1aa",
};

export function OgFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background: OG_COLORS.bg,
        color: OG_COLORS.fg,
        fontFamily: "sans-serif",
      }}
    >
      {children}
    </div>
  );
}

export function Monogram({ fontSize }: { fontSize: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: OG_COLORS.bg,
        color: OG_COLORS.accent,
        fontFamily: "sans-serif",
        fontSize,
        fontWeight: 700,
      }}
    >
      F
    </div>
  );
}

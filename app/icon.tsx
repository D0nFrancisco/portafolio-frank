import { ImageResponse } from "next/og";
import { Monogram } from "@/lib/og-image";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<Monogram fontSize={20} />, { ...size });
}

import { ImageResponse } from "next/og";
import { getProjectBySlug, getProjectSlugParams } from "@/content/projects";
import { OG_IMAGE_SIZE, OG_CONTENT_TYPE, OG_COLORS, OgFrame } from "@/lib/og-image";
import type { AppLocale } from "@/i18n/routing";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams(): { slug: string }[] {
  return getProjectSlugParams();
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(locale, slug);
  const label = locale === "es" ? "Caso de estudio" : "Case study";

  return new ImageResponse(
    (
      <OgFrame>
        <div style={{ fontSize: 26, color: OG_COLORS.accent, marginBottom: 24 }}>{label}</div>
        <div style={{ fontSize: 68, fontWeight: 700 }}>{project?.name ?? "Project"}</div>
        <div style={{ fontSize: 28, marginTop: 32, color: OG_COLORS.muted, maxWidth: 960 }}>
          {project?.oneLiner}
        </div>
      </OgFrame>
    ),
    { ...size },
  );
}

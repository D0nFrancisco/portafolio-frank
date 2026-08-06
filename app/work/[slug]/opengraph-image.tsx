import { ImageResponse } from "next/og";
import { getProjectBySlug, getProjectStaticParams, type ProjectParams } from "@/content/projects";
import { OG_IMAGE_SIZE, OG_CONTENT_TYPE, OG_COLORS, OgFrame } from "@/lib/og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_CONTENT_TYPE;

export { getProjectStaticParams as generateStaticParams };

export default async function OpengraphImage({ params }: { params: Promise<ProjectParams> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return new ImageResponse(
    (
      <OgFrame>
        <div style={{ fontSize: 26, color: OG_COLORS.accent, marginBottom: 24 }}>Case study</div>
        <div style={{ fontSize: 68, fontWeight: 700 }}>{project?.name ?? "Project"}</div>
        <div style={{ fontSize: 28, marginTop: 32, color: OG_COLORS.muted, maxWidth: 960 }}>
          {project?.oneLiner}
        </div>
      </OgFrame>
    ),
    { ...size },
  );
}

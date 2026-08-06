import { ImageResponse } from "next/og";
import { projects } from "@/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

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
        <div style={{ fontSize: 26, color: "#7c93ff", marginBottom: 24 }}>Case study</div>
        <div style={{ fontSize: 68, fontWeight: 700 }}>{project?.name ?? "Project"}</div>
        <div style={{ fontSize: 28, marginTop: 32, color: "#a1a1aa", maxWidth: 960 }}>
          {project?.oneLiner}
        </div>
      </div>
    ),
    { ...size },
  );
}

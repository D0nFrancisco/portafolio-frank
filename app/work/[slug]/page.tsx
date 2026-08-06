import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CaseStudyHeader } from "@/components/work/CaseStudyHeader";
import { CaseStudyBody } from "@/components/work/CaseStudyBody";
import { projects } from "@/content/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.oneLiner,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <Container as="article" className="py-20">
      <Link
        href="/work"
        className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        All work
      </Link>

      <CaseStudyHeader project={project} />
      <CaseStudyBody project={project} />
    </Container>
  );
}

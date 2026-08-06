import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CaseStudyHeader } from "@/components/work/CaseStudyHeader";
import { CaseStudyBody } from "@/components/work/CaseStudyBody";
import { projects, getProjectBySlug, getProjectStaticParams, type ProjectParams } from "@/content/projects";
import { cn } from "@/lib/cn";
import { cardHoverClass } from "@/lib/styles";

export { getProjectStaticParams as generateStaticParams };

export async function generateMetadata({
  params,
}: {
  params: Promise<ProjectParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.oneLiner,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<ProjectParams> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];

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

      <div className="mt-4 border-t border-border pt-10">
        <Link
          href={`/work/${nextProject.slug}`}
          className={cn("group flex items-center justify-between gap-4", cardHoverClass)}
        >
          <div>
            <p className="text-xs text-fg-subtle">Next project</p>
            <p className="mt-1 text-lg font-semibold text-fg">{nextProject.name}</p>
          </div>
          <ArrowRight
            className="h-4 w-4 flex-none text-fg-subtle transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </Container>
  );
}

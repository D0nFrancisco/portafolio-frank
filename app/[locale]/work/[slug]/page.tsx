import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { CaseStudyHeader } from "@/components/work/CaseStudyHeader";
import { CaseStudyBody } from "@/components/work/CaseStudyBody";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import { getProjects, getProjectBySlug, getProjectSlugParams } from "@/content/projects";
import { localeAlternates } from "@/lib/alternates";
import { cn } from "@/lib/cn";
import { cardHoverClass } from "@/lib/styles";
import type { AppLocale } from "@/i18n/routing";

type Params = { locale: AppLocale; slug: string };

export function generateStaticParams(): { slug: string }[] {
  return getProjectSlugParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(locale, slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.oneLiner,
    alternates: { languages: localeAlternates(`/work/${slug}`) },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(locale, slug);
  if (!project) notFound();

  const projects = getProjects(locale);
  const nextProject = projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];
  const t = await getTranslations({ locale, namespace: "caseStudy" });

  return (
    <Container as="article" className="py-20">
      <Link
        href="/work"
        className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        {t("allWork")}
      </Link>

      <CaseStudyHeader project={project} locale={locale} />
      <ProjectGallery images={project.images} locale={locale} />
      <CaseStudyBody project={project} locale={locale} />

      <div className="mt-4 border-t border-border pt-10">
        <Link
          href={`/work/${nextProject.slug}`}
          className={cn("group flex items-center justify-between gap-4", cardHoverClass)}
        >
          <div>
            <p className="text-xs text-fg-subtle">{t("nextProject")}</p>
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

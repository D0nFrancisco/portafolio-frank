import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { getProjects } from "@/content/projects";
import type { AppLocale } from "@/i18n/routing";

export async function FeaturedWork({ locale }: { locale: AppLocale }) {
  const projects = getProjects(locale);
  const t = await getTranslations({ locale, namespace: "featuredWork" });

  return (
    <section className="border-b border-border py-20">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              {t("viewAll")}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

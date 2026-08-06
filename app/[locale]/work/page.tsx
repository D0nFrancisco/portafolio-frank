import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { getProjects } from "@/content/projects";
import { localeAlternates } from "@/lib/alternates";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { languages: localeAlternates("/work") },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ locale: AppLocale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = getProjects(locale);
  const t = await getTranslations({ locale, namespace: "work" });

  return (
    <Container as="section" className="py-20">
      <Reveal>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

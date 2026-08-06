import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/content/projects";
import type { AppLocale } from "@/i18n/routing";

export async function CaseStudyHeader({ project, locale }: { project: Project; locale: AppLocale }) {
  const t = await getTranslations({ locale, namespace: "caseStudy" });

  return (
    <header className="border-b border-border pb-10">
      <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{project.name}</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">{project.oneLiner}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
        >
          {t("viewSource")}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
          >
            {t("liveDemo")}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </header>
  );
}

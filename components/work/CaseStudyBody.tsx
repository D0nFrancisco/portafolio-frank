import { getTranslations } from "next-intl/server";
import type { Project } from "@/content/projects";
import type { AppLocale } from "@/i18n/routing";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border py-10 last:border-b-0">
      <h2 className="text-sm font-mono uppercase tracking-widest text-fg-subtle">{title}</h2>
      <div className="mt-4 max-w-2xl">{children}</div>
    </section>
  );
}

export async function CaseStudyBody({ project, locale }: { project: Project; locale: AppLocale }) {
  const t = await getTranslations({ locale, namespace: "caseStudy" });

  return (
    <div>
      <Section title={t("problem")}>
        <p className="text-base leading-relaxed text-fg-muted">{project.problem}</p>
      </Section>

      <Section title={t("approach")}>
        <p className="text-base leading-relaxed text-fg-muted">{project.approach}</p>
      </Section>

      <Section title={t("challenges")}>
        <ul className="flex flex-col gap-3">
          {project.challenges.map((challenge) => (
            <li key={challenge} className="flex gap-3 text-base leading-relaxed text-fg-muted">
              <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-fg-subtle" aria-hidden="true" />
              {challenge}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t("result")}>
        <p className="text-base leading-relaxed text-fg-muted">{project.result}</p>
      </Section>

      <Section title={t("learnings")}>
        <p className="text-base leading-relaxed text-fg-muted">{project.learnings}</p>
      </Section>
    </div>
  );
}

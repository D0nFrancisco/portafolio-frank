import type { Project } from "@/content/projects";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border py-10 last:border-b-0">
      <h2 className="text-sm font-mono uppercase tracking-widest text-fg-subtle">{title}</h2>
      <div className="mt-4 max-w-2xl">{children}</div>
    </section>
  );
}

export function CaseStudyBody({ project }: { project: Project }) {
  return (
    <div>
      <Section title="Problem">
        <p className="text-base leading-relaxed text-fg-muted">{project.problem}</p>
      </Section>

      <Section title="Approach">
        <p className="text-base leading-relaxed text-fg-muted">{project.approach}</p>
      </Section>

      <Section title="Challenges">
        <ul className="flex flex-col gap-3">
          {project.challenges.map((challenge) => (
            <li key={challenge} className="flex gap-3 text-base leading-relaxed text-fg-muted">
              <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-fg-subtle" aria-hidden="true" />
              {challenge}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Result">
        <p className="text-base leading-relaxed text-fg-muted">{project.result}</p>
      </Section>

      <Section title="What I learned">
        <p className="text-base leading-relaxed text-fg-muted">{project.learnings}</p>
      </Section>
    </div>
  );
}

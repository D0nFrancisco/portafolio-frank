import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/content/projects";

export function CaseStudyHeader({ project }: { project: Project }) {
  return (
    <header className="border-b border-border pb-10">
      <p className="font-mono text-sm text-fg-subtle">{project.year}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {project.name}
      </h1>
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
          View source on GitHub
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
          >
            Live demo
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </header>
  );
}

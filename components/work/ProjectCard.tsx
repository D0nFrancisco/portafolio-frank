import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { cardHoverClass } from "@/lib/styles";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className={cn("group flex flex-col gap-4", cardHoverClass)}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-fg">{project.name}</h3>
        <ArrowUpRight
          className="h-4 w-4 flex-none text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>
      <p className="text-sm leading-relaxed text-fg-muted">{project.oneLiner}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {project.stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </Link>
  );
}

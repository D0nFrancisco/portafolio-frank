import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies for every project — the problem, the approach, and what was actually hard about it.",
};

export default function WorkPage() {
  return (
    <Container as="section" className="py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Work"
          title="Case studies, not project cards"
          description="Each project below includes the problem it solved, how it was built, what went wrong along the way, and what I'd do differently now."
        />
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

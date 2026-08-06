import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/content/profile";

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-b border-border py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="About" title="What I actually work on" />
        </Reveal>

        <div className="mt-10 grid gap-12 sm:grid-cols-[1.3fr_1fr]">
          <Reveal delay={0.05}>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-fg-muted">
              {profile.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6">
              {profile.stack.map((group) => (
                <div key={group.category}>
                  <p className="mb-3 text-sm font-medium text-fg">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

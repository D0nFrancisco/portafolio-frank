export type SocialLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  tagline: string;
  summary: string[];
  stack: { category: string; items: string[] }[];
  social: {
    github: SocialLink;
    linkedin: SocialLink;
    email: SocialLink;
  };
};

export const profile: Profile = {
  name: "Frank Gualdron",
  role: "Backend & Systems Developer",
  location: "Remote",
  email: "fdavid1704@gmail.com",
  tagline:
    "I build backend systems and internal tooling — from Linux automation to REST APIs — and I'm extending that into full-stack work with Next.js.",
  summary: [
    "I work mostly on the backend: shell automation on Linux, REST APIs in Java/Spring Boot, and relational data in MySQL. I care about scripts and services that keep running unattended and fail loudly when something's actually wrong, instead of silently.",
    "Recently I've been building the frontend half of that skill set with Next.js and TypeScript, so I can ship a feature end to end instead of handing off the UI.",
    "I learn new tools by shipping something real with them, not just by finishing a course — every project on this site started because I wanted to solve an actual problem I had.",
  ],
  stack: [
    {
      category: "Backend & Systems",
      items: ["Linux / Bash", "Java", "Spring Boot", "MySQL", "Cron / Shell scripting"],
    },
    {
      category: "Frontend",
      items: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
    },
    {
      category: "Cloud & Tooling",
      items: ["Google Cloud", "Docker", "Git / GitHub", "Node.js"],
    },
  ],
  social: {
    github: { label: "GitHub", href: "https://github.com/D0nFrancisco" },
    // TODO: replace with the real LinkedIn URL before deploying.
    linkedin: { label: "LinkedIn", href: "https://linkedin.com/in/TU_USUARIO" },
    email: { label: "Email", href: "mailto:fdavid1704@gmail.com" },
  },
};

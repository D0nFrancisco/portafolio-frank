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

// Every claim here should be defensible in a technical interview — sourced
// from the CV, not inferred. See CONTENT_REVIEW.md for the reasoning.
export const profile: Profile = {
  name: "Frank Gualdrón",
  role: "Software Developer",
  location: "Bucaramanga, Colombia",
  email: "fdavid1704@gmail.com",
  tagline: "Software developer focused on backend, Linux, and web development.",
  summary: [
    "I care about building software that's maintainable, well-structured, and built to last. That means scripts that keep running unattended, and APIs with validation and error handling that make sense to whoever calls them.",
    "Most of what I've built so far is backend and systems work: Bash automation on Linux, a REST API in Java and Spring Boot backed by PostgreSQL, and a Next.js/Tailwind frontend to round out the stack.",
    "I'm currently studying Systems Development Technology at Unidades Tecnológicas de Santander, and building personal projects alongside it to put what I'm learning into practice.",
  ],
  stack: [
    {
      category: "Backend & Systems",
      items: ["Java", "Spring Boot 3.2", "JPA / Hibernate", "PostgreSQL", "Maven"],
    },
    {
      category: "Linux & Automation",
      items: ["Bash Shell Scripting", "awk / sed / grep", "Cron Jobs", "Server Administration"],
    },
    {
      category: "Frontend & Web",
      items: ["JavaScript (ES6+)", "PHP", "HTML5 / CSS3", "Next.js 14", "Tailwind CSS v4"],
    },
  ],
  social: {
    github: { label: "GitHub", href: "https://github.com/D0nFrancisco" },
    // TODO: replace with the real LinkedIn URL once the account is unrestricted.
    linkedin: { label: "LinkedIn", href: "https://linkedin.com/in/TU_USUARIO" },
    email: { label: "Email", href: "mailto:fdavid1704@gmail.com" },
  },
};

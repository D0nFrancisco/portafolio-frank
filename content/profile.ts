import type { AppLocale } from "@/i18n/routing";

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

// Fields that don't change with language: technology names aren't
// translated (nobody writes "Bota de Resorte" for Spring Boot), and the
// contact details are the same regardless of who's reading them.
const shared = {
  name: "Frank Gualdrón",
  location: "Bucaramanga, Colombia",
  email: "fdavid1704@gmail.com",
  social: {
    github: { label: "GitHub", href: "https://github.com/D0nFrancisco" },
    // TODO: replace with the real LinkedIn URL once the account is unrestricted.
    linkedin: { label: "LinkedIn", href: "https://linkedin.com/in/TU_USUARIO" },
    email: { label: "Email", href: "mailto:fdavid1704@gmail.com" },
  },
};

// Every claim here should be defensible in a technical interview — sourced
// from the CV, not inferred. See CONTENT_REVIEW.md for the reasoning. The
// Spanish version is a faithful translation of the English, not a separate
// rewrite, so the two languages can never end up telling different stories.
const content: Record<AppLocale, Pick<Profile, "role" | "tagline" | "summary" | "stack">> = {
  en: {
    role: "Software Developer",
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
  },
  es: {
    role: "Desarrollador de Software",
    tagline: "Desarrollador de software enfocado en backend, Linux y desarrollo web.",
    summary: [
      "Me interesa construir software mantenible, bien estructurado y pensado para durar. Eso significa scripts que siguen funcionando sin supervisión, y APIs con validación y manejo de errores que tengan sentido para quien las consuma.",
      "La mayor parte de lo que he construido hasta ahora es trabajo de backend y sistemas: automatización en Bash sobre Linux, una API REST en Java y Spring Boot con PostgreSQL, y un frontend en Next.js/Tailwind para completar el stack.",
      "Actualmente curso la Tecnología en Desarrollo de Sistemas Informáticos en las Unidades Tecnológicas de Santander, y construyo proyectos personales en paralelo para poner en práctica lo que voy aprendiendo.",
    ],
    stack: [
      {
        category: "Backend y Sistemas",
        items: ["Java", "Spring Boot 3.2", "JPA / Hibernate", "PostgreSQL", "Maven"],
      },
      {
        category: "Linux y Automatización",
        items: ["Bash Shell Scripting", "awk / sed / grep", "Cron Jobs", "Administración de Servidores"],
      },
      {
        category: "Frontend y Web",
        items: ["JavaScript (ES6+)", "PHP", "HTML5 / CSS3", "Next.js 14", "Tailwind CSS v4"],
      },
    ],
  },
};

export function getProfile(locale: AppLocale): Profile {
  return { ...shared, ...content[locale] };
}

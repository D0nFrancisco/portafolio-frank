export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  stack: string[];
  github: string;
  demo?: string;
  problem: string;
  approach: string;
  challenges: string[];
  result: string;
  learnings: string;
};

// Every problem/approach/challenge/result/learning below is sourced from
// the CV — nothing here is a metric, result, or difficulty that can't be
// backed up in a technical interview. See CONTENT_REVIEW.md.
export const projects: Project[] = [
  {
    slug: "sysguard",
    name: "SysGuard",
    oneLiner:
      "A Bash tool that monitors CPU, RAM, disk, and network traffic on Linux, with color-coded alerts and automatic HTML reports.",
    stack: ["Bash Shell Scripting", "awk / sed / grep", "Cron Jobs", "HTML5 / CSS3"],
    github: "https://github.com/D0nFrancisco/sysguard",
    problem:
      "I wanted a way to keep an eye on a Linux machine's health — CPU, memory, disk, and network traffic — without installing a full monitoring stack for a single box, using only tools already available on any Linux system.",
    approach:
      "SysGuard is a Bash script built around standard Unix text-processing tools (awk, sed, grep) to parse system data. It raises color-coded ANSI alerts in the terminal so problems are visible at a glance, and generates HTML/CSS reports for a record outside the terminal. It runs unattended on a schedule via cron, with alert thresholds that can be adjusted without touching the source code.",
    challenges: [
      "Keeping alert thresholds configurable from outside the script, so they can be tuned per machine without editing and redeploying the code itself.",
      "Generating readable HTML/CSS reports from inside a Bash script — there's no templating engine to lean on, so the output has to be assembled by hand.",
      "Using awk/sed/grep instead of a general-purpose language to parse system data, which keeps the tool dependency-free but means every transformation has to be expressed as a text-processing pipeline.",
    ],
    result:
      "A monitoring script that runs unattended via cron, reports CPU, RAM, disk, and network status through both terminal alerts and generated HTML reports, and can be retuned without changing the code.",
    learnings:
      "Bash plus core Unix tools can go further than expected for system monitoring without pulling in a heavier runtime — the trade-off is that everything, including HTML output, has to be built by hand.",
  },
  {
    slug: "taskflow",
    name: "TaskFlow",
    oneLiner:
      "A layered Spring Boot REST API for task management with business rules, soft delete, and centralized error handling.",
    stack: ["Java", "Spring Boot 3.2", "JPA / Hibernate", "PostgreSQL", "Maven"],
    github: "https://github.com/D0nFrancisco/taskflow",
    problem:
      "I wanted to build a REST API with the structure of a real service: proper business rules, real error handling, and clean layering, not just CRUD endpoints. Task management was a domain simple enough to reason about end to end.",
    approach:
      "TaskFlow is a layered Spring Boot service using JPA/Hibernate over PostgreSQL, with standardized endpoints for creating, updating, filtering by status or priority, and querying overdue tasks. Deleting a task is a soft delete rather than a hard removal. State transitions follow explicit business rules instead of accepting any value, and the API validates input and handles exceptions globally instead of per endpoint.",
    challenges: [
      "Modeling state transitions as business rules instead of letting any status change freely — deciding which transitions should even be allowed for a task.",
      "Soft delete changes how every other query has to behave: filtering, counting, and listing all need to account for records that are 'deleted' but still in the table.",
      "Keeping error handling and input validation consistent and centralized, instead of duplicated per endpoint.",
    ],
    result:
      "A REST API with layered architecture, real business rules around task state, soft delete, global exception handling, and standardized endpoints — including a dedicated query for overdue tasks.",
    learnings:
      "The real design work in an API like this is the rules: what counts as a valid state transition, and how deletion should behave once records can be soft-deleted. Those decisions end up shaping almost every other endpoint.",
  },
  {
    slug: "weathernow",
    name: "WeatherNow",
    oneLiner:
      "A bilingual Next.js weather app with autocomplete search, automatic geolocation, and a 5-day forecast, deployed on Vercel.",
    stack: ["Next.js 14", "Tailwind CSS v4", "OpenWeatherMap API", "Vercel"],
    // TODO: add the live Vercel URL once the current version is deployed.
    github: "https://github.com/D0nFrancisco/weathernow",
    problem:
      "I wanted a real frontend project built on a third-party API, with a bilingual interface and the features people expect from a weather app, not just a single hardcoded city lookup.",
    approach:
      "WeatherNow is a Next.js 14 app styled with Tailwind CSS v4 that consumes the OpenWeatherMap API for current conditions and a 5-day forecast. It includes autocomplete city search, automatic geolocation on load, a Spanish/English interface, and a responsive layout, deployed to production on Vercel.",
    challenges: [
      "Covering every piece of UI text in both Spanish and English, including labels and error states, so the interface didn't end up half-translated.",
      "Wiring up automatic geolocation as a starting point while still supporting manual search with autocomplete as the primary flow.",
      "Handling the practical side of shipping to production: environment variables and deployment configuration on Vercel, which running it locally never required.",
    ],
    result:
      "A deployed, bilingual weather app with autocomplete search, geolocation, and a 5-day forecast — live on Vercel rather than only running locally.",
    learnings:
      "Bilingual UI and location-aware features change how you think about a user's entry point. A real visit starts from their location or a search, not a hardcoded city typed into a demo.",
  },
];

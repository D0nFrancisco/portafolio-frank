export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  year: string;
  stack: string[];
  github: string;
  demo?: string;
  problem: string;
  approach: string;
  challenges: string[];
  result: string;
  learnings: string;
};

// Case-study content is a first draft grounded in what each project actually
// does. The `challenges`/`learnings` fields are written from the feature set
// itself, not invented metrics — review and adjust them to match how it
// actually went before publishing.
export const projects: Project[] = [
  {
    slug: "sysguard",
    name: "SysGuard",
    oneLiner: "A lightweight Bash monitor for CPU, RAM, disk and process health on Linux.",
    year: "2025",
    stack: ["Bash", "Linux", "Shell Scripting", "Cron Jobs"],
    github: "https://github.com/D0nFrancisco/sysguard",
    problem:
      "I wanted visibility into a Linux machine's resource usage without standing up a full monitoring stack for a single box. Most options were either too heavy (Prometheus + Grafana for one machine) or too opaque to reason about end to end.",
    approach:
      "SysGuard is a Bash script scheduled via cron that polls standard Linux tools (/proc, top, df, ps) on an interval, compares the results against configurable thresholds, writes timestamped reports, and raises an alert when a threshold is crossed.",
    challenges: [
      "Parsing command output reliably — top/ps/df formatting isn't identical across distros and versions — without pulling in a heavier language runtime just to get structured data.",
      "Deciding what actually counts as a meaningful alert: a single CPU spike isn't a real signal, so the script needed to avoid alert fatigue from momentary blips.",
      "Making failures loud instead of silent. Cron jobs run unattended at odd hours, so the script needed real exit codes and logging, not a script that fails quietly and looks fine from the outside.",
    ],
    result:
      "A monitor that runs unattended on a schedule and gives an honest read of machine health using nothing but POSIX tools and Bash — no runtime, no dependencies to keep patched.",
    learnings:
      "Shell scripting rewards defensiveness. Quoting variables, validating input, and handling a missing command gracefully matters more here than in a memory-safe language, because in Bash the default failure mode is silence.",
  },
  {
    slug: "taskflow",
    name: "TaskFlow",
    oneLiner: "A layered Spring Boot REST API for task management with real validation and error handling.",
    year: "2025",
    stack: ["Java", "Spring Boot", "MySQL", "REST API", "Maven"],
    github: "https://github.com/D0nFrancisco/taskflow",
    problem:
      "I wanted to understand how a production-shaped Java backend is actually structured — not another CRUD walkthrough, but one with real validation and consistent error handling. Task management was the domain because it's simple enough to reason about end to end.",
    approach:
      "A layered Spring Boot service (controller / service / repository) backed by MySQL via Spring Data JPA, with request validation at the API boundary and centralized exception handling instead of per-endpoint try/catch blocks.",
    challenges: [
      "Getting error responses consistent across every endpoint — replaced scattered try/catch blocks with a single @ControllerAdvice so every failure mode returns the same response shape.",
      "Keeping validation at the DTO boundary (Bean Validation) instead of letting database constraints leak straight into API error messages.",
      "Actually understanding what Spring Boot's autoconfiguration wires up, instead of treating it as a black box — traced through the generated beans to see what was happening and why.",
    ],
    result:
      "A working REST API with predictable, consistently-shaped error responses, validated input, and a Maven build a new contributor could pick up without guessing at conventions.",
    learnings:
      "Most of the real design work in a CRUD API isn't the CRUD — it's the error handling and the validation boundary. That's what makes an API predictable for whoever has to call it.",
  },
  {
    slug: "weathernow",
    name: "WeatherNow",
    oneLiner: "A Next.js weather app built to handle a third-party API's failure modes, not just its happy path.",
    year: "2025",
    stack: ["JavaScript", "Next.js", "Tailwind CSS", "REST API"],
    github: "https://github.com/D0nFrancisco/weathernow",
    problem:
      "I wanted a small real frontend project focused on consuming a third-party REST API properly — handling rate limits, bad input and network failures — instead of the happy-path version most tutorials show.",
    approach:
      "A Next.js app that queries the OpenWeatherMap API for current conditions and forecast by city, with explicit loading and error states and a responsive Tailwind layout.",
    challenges: [
      "Handling the API's real failure modes — unknown city names, rate limiting, timeouts — so the UI communicates what went wrong instead of breaking silently.",
      "Keeping the API key server-side instead of shipping it in the client bundle.",
      "Building the fetch/loading/error state by hand without a data-fetching library, specifically to understand what tools like React Query or SWR are abstracting away.",
    ],
    result:
      "A weather app that degrades gracefully when the API or the network doesn't cooperate, instead of just breaking — and the first project where I worked directly with Next.js and Tailwind.",
    learnings:
      "Keeping the API key server-side here is the direct reason this portfolio's own contact form runs through a Next.js Server Action instead of calling a third-party endpoint straight from the client.",
  },
];

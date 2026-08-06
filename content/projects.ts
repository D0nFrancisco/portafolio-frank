import type { AppLocale } from "@/i18n/routing";

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

type ProjectContent = Pick<
  Project,
  "oneLiner" | "problem" | "approach" | "challenges" | "result" | "learnings"
>;

// Slug, name, stack and links don't change with language — technology names
// and project names aren't translated, and a link is a link.
const projectsShared: Array<Pick<Project, "slug" | "name" | "stack" | "github" | "demo">> = [
  {
    slug: "sysguard",
    name: "SysGuard",
    stack: ["Bash Shell Scripting", "awk / sed / grep", "Cron Jobs", "HTML5 / CSS3"],
    github: "https://github.com/D0nFrancisco/sysguard",
  },
  {
    slug: "taskflow",
    name: "TaskFlow",
    stack: ["Java", "Spring Boot 3.2", "JPA / Hibernate", "PostgreSQL", "Maven"],
    github: "https://github.com/D0nFrancisco/taskflow",
  },
  {
    slug: "weathernow",
    name: "WeatherNow",
    stack: ["Next.js 14", "Tailwind CSS v4", "OpenWeatherMap API", "Vercel"],
    github: "https://github.com/D0nFrancisco/weathernow",
    // demo: "", // TODO: add the live Vercel URL once the current version is deployed.
  },
];

// Every problem/approach/challenge/result/learning below is sourced from
// the CV — nothing here is a metric, result, or difficulty that can't be
// backed up in a technical interview. See CONTENT_REVIEW.md. The Spanish
// entries are a faithful translation of the English ones, not a separate
// rewrite — same claims, same facts, both languages tell the same story.
const projectsContent: Record<AppLocale, ProjectContent[]> = {
  en: [
    {
      // SysGuard
      oneLiner:
        "A Bash tool that monitors CPU, RAM, disk, and network traffic on Linux, with color-coded alerts and automatic HTML reports.",
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
      // TaskFlow
      oneLiner:
        "A layered Spring Boot REST API for task management with business rules, soft delete, and centralized error handling.",
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
      // WeatherNow
      oneLiner:
        "A bilingual Next.js weather app with autocomplete search, automatic geolocation, and a 5-day forecast, deployed on Vercel.",
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
  ],
  es: [
    {
      // SysGuard
      oneLiner:
        "Una herramienta en Bash que monitorea CPU, RAM, disco y tráfico de red en Linux, con alertas por colores y reportes HTML automáticos.",
      problem:
        "Quería una forma de vigilar la salud de una máquina Linux — CPU, memoria, disco y tráfico de red — sin instalar un stack de monitoreo completo para un solo equipo, usando solo herramientas ya disponibles en cualquier sistema Linux.",
      approach:
        "SysGuard es un script en Bash construido alrededor de herramientas estándar de procesamiento de texto de Unix (awk, sed, grep) para analizar los datos del sistema. Genera alertas ANSI por colores en la terminal para que los problemas sean visibles de un vistazo, y produce reportes en HTML/CSS como registro fuera de la terminal. Corre sin supervisión según una programación vía cron, con umbrales de alerta ajustables sin tocar el código fuente.",
      challenges: [
        "Mantener los umbrales de alerta configurables desde fuera del script, para poder ajustarlos por máquina sin editar y volver a desplegar el código.",
        "Generar reportes HTML/CSS legibles desde dentro de un script de Bash — no hay un motor de plantillas en el que apoyarse, así que la salida hay que ensamblarla a mano.",
        "Usar awk/sed/grep en lugar de un lenguaje de propósito general para analizar los datos del sistema, lo que mantiene la herramienta libre de dependencias pero implica expresar cada transformación como un pipeline de procesamiento de texto.",
      ],
      result:
        "Un script de monitoreo que corre sin supervisión vía cron, reporta el estado de CPU, RAM, disco y red tanto por alertas en terminal como por reportes HTML generados, y se puede reconfigurar sin cambiar el código.",
      learnings:
        "Bash junto con las herramientas centrales de Unix puede llegar más lejos de lo esperado para monitoreo de sistemas sin recurrir a un runtime más pesado — la contrapartida es que todo, incluida la salida HTML, hay que construirlo a mano.",
    },
    {
      // TaskFlow
      oneLiner:
        "Una API REST en capas con Spring Boot para gestión de tareas, con reglas de negocio, soft delete y manejo centralizado de errores.",
      problem:
        "Quería construir una API REST con la estructura de un servicio real: reglas de negocio reales, manejo de errores de verdad y una separación en capas limpia, no solo endpoints CRUD. La gestión de tareas era un dominio lo bastante simple para razonar sobre él de principio a fin.",
      approach:
        "TaskFlow es un servicio en capas con Spring Boot que usa JPA/Hibernate sobre PostgreSQL, con endpoints estandarizados para crear, actualizar, filtrar por estado o prioridad, y consultar tareas vencidas. Eliminar una tarea es un soft delete en vez de un borrado definitivo. Las transiciones de estado siguen reglas de negocio explícitas en lugar de aceptar cualquier valor, y la API valida las entradas y maneja las excepciones de forma global en lugar de por endpoint.",
      challenges: [
        "Modelar las transiciones de estado como reglas de negocio en vez de dejar que cualquier cambio pase libremente — decidir qué transiciones deberían siquiera estar permitidas para una tarea.",
        "El soft delete cambia cómo se tiene que comportar cada otra consulta: filtrar, contar y listar necesitan tener en cuenta los registros que están 'eliminados' pero siguen en la tabla.",
        "Mantener el manejo de errores y la validación de entradas consistentes y centralizados, en lugar de duplicados por endpoint.",
      ],
      result:
        "Una API REST con arquitectura en capas, reglas de negocio reales alrededor del estado de las tareas, soft delete, manejo global de excepciones y endpoints estandarizados — incluyendo una consulta dedicada para tareas vencidas.",
      learnings:
        "El verdadero trabajo de diseño en una API así son las reglas: qué cuenta como una transición de estado válida, y cómo debería comportarse la eliminación una vez que los registros se pueden eliminar de forma blanda (soft delete). Esas decisiones terminan definiendo casi todos los demás endpoints.",
    },
    {
      // WeatherNow
      oneLiner:
        "Una aplicación de clima en Next.js, bilingüe, con búsqueda con autocompletado, geolocalización automática y pronóstico a 5 días, desplegada en Vercel.",
      problem:
        "Quería un proyecto de frontend real construido sobre una API de terceros, con una interfaz bilingüe y las funciones que la gente espera de una app de clima, no solo una búsqueda de una sola ciudad fija en el código.",
      approach:
        "WeatherNow es una aplicación en Next.js 14 con estilos en Tailwind CSS v4 que consume la API de OpenWeatherMap para el clima actual y el pronóstico a 5 días. Incluye búsqueda de ciudades con autocompletado, geolocalización automática al cargar, una interfaz en español/inglés y un diseño responsive, desplegada en producción en Vercel.",
      challenges: [
        "Cubrir cada texto de la interfaz tanto en español como en inglés, incluyendo etiquetas y estados de error, para que la interfaz no quedara traducida a medias.",
        "Integrar la geolocalización automática como punto de partida sin dejar de dar prioridad a la búsqueda manual con autocompletado como flujo principal.",
        "Resolver el lado práctico de llevar el proyecto a producción: variables de entorno y configuración de despliegue en Vercel, algo que correrlo en local nunca exigió.",
      ],
      result:
        "Una app de clima bilingüe y desplegada, con búsqueda con autocompletado, geolocalización y pronóstico a 5 días — funcionando en vivo en Vercel y no solo en local.",
      learnings:
        "Una interfaz bilingüe y las funciones que dependen de la ubicación cambian la forma de pensar el punto de entrada de un usuario real. Una visita real empieza desde su ubicación o una búsqueda, no desde una ciudad fija escrita en una demo.",
    },
  ],
};

export function getProjects(locale: AppLocale): Project[] {
  return projectsShared.map((shared, i) => ({ ...shared, ...projectsContent[locale][i] }));
}

export function getProjectBySlug(locale: AppLocale, slug: string): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

// Slugs are locale-independent, so this doesn't need a locale — shared by
// app/[locale]/work/[slug]/page.tsx and its opengraph-image.tsx sibling.
export function getProjectSlugParams(): { slug: string }[] {
  return projectsShared.map((project) => ({ slug: project.slug }));
}

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
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "next-intl", "OpenWeatherMap API", "Vercel"],
    github: "https://github.com/D0nFrancisco/weathernow-v2",
    demo: "https://weathernow-v2.vercel.app/es",
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
        "A bilingual, server-rendered weather app — current conditions, hourly and 7-day forecast — rebuilt from the ground up as a deliberately small, well-engineered product instead of a feature-maximal demo.",
      problem:
        "The first version of WeatherNow worked, but it fetched data client-side, treated the API key as a client-side concern, and had grown its feature list with no real testing story behind it. I wanted to rebuild it properly: correct data on first paint, a validated boundary against a third-party API, and enough automated coverage that a regression in search or forecast rendering couldn't ship unnoticed.",
      approach:
        "WeatherNow v2 is a Next.js 16 App Router app in strict TypeScript. Weather data is fetched server-side in the page itself — no client-side fetch waterfall — against the OpenWeatherMap One Call API 3.0 and Geocoding API, with the key kept server-only and never exposed as `NEXT_PUBLIC_*`. Every external response is validated with Zod at the boundary before it reaches a component. Locale-prefixed routing (`/en`, `/es`) is handled by next-intl, and the only client-side state left is the °C/°F and light/dark preference and the search box. Search hits a server-side geocode proxy, debounced and cancelled via `AbortController` on every keystroke; a query parser recognizes a trailing country reference in free text — an ISO code, an alias, or a country name in English or Spanish, derived from `Intl.DisplayNames` rather than a hand-maintained list — and reduces it to the strict format the API actually requires.",
      challenges: [
        "Parsing free-text country qualifiers (\"Bogotá, Colombia\", \"Madrid ES\", \"New York USA\") into the strict `City,CC` format OpenWeatherMap requires, with a fallback retry on the bare city name in case the qualifier was actually a state.",
        "Making sure a slower, older search request could never overwrite the state set by a newer one — solved with `AbortController` and proven with a test that simulates the out-of-order response, not just assumed to work.",
        "Adding a per-condition accent color to the hero temperature without letting it regress the two WCAG-AA-verified base surfaces — the accent is independently contrast-checked in both themes and scoped only to the hero figure, its icon, and a low-opacity halo, never a surface, border, or body text.",
      ],
      result:
        "A rebuilt, deployed weather app with server-rendered forecasts, a schema-validated API boundary, bilingual locale-prefixed routing, and a test suite (Vitest + Testing Library for units/components, Playwright + axe-core for e2e and accessibility) covering the full data-transform layer and the interaction paths that actually break — debounce, caching, stale-result retention, and request race conditions.",
      learnings:
        "A rebuild is a chance to fix architecture, not just add features. Moving data-fetching server-side and validating the API boundary with Zod eliminated a whole class of bugs the first version's client-side fetch never surfaced, and writing a test for the actual race condition in search — not just the happy path — is what turns 'seems to work' into 'proven to work.'",
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
        "Una app de clima bilingüe y renderizada en servidor — condiciones actuales, pronóstico por horas y a 7 días — reconstruida desde cero como un producto deliberadamente pequeño y bien ingenierado, no una demo maximalista en funciones.",
      problem:
        "La primera versión de WeatherNow funcionaba, pero traía los datos del lado del cliente, trataba la clave de la API como una preocupación de cliente, y había ido sumando funciones sin una historia real de pruebas detrás. Quería reconstruirla bien: datos correctos desde el primer render, un límite validado frente a una API de terceros, y suficiente cobertura automatizada para que una regresión en la búsqueda o el pronóstico no pudiera llegar a producción sin ser detectada.",
      approach:
        "WeatherNow v2 es una app de Next.js 16 con App Router en TypeScript estricto. Los datos del clima se obtienen del lado del servidor directamente en la página — sin cascada de fetches en el cliente — contra la One Call API 3.0 y la Geocoding API de OpenWeatherMap, con la clave restringida al servidor y nunca expuesta como `NEXT_PUBLIC_*`. Cada respuesta externa se valida con Zod en el límite antes de llegar a un componente. El enrutamiento con prefijo de idioma (`/en`, `/es`) lo maneja next-intl, y el único estado del lado del cliente que queda es la preferencia °C/°F y claro/oscuro, más la caja de búsqueda. La búsqueda pasa por un proxy de geocodificación del lado del servidor, con debounce y cancelación vía `AbortController` en cada tecla; un parser de consultas reconoce una referencia de país al final del texto libre — un código ISO, un alias, o el nombre de un país en inglés o español, derivado de `Intl.DisplayNames` en lugar de una lista mantenida a mano — y la reduce al formato estricto que la API realmente requiere.",
      challenges: [
        "Interpretar calificadores de país en texto libre (\"Bogotá, Colombia\", \"Madrid ES\", \"New York USA\") y reducirlos al formato estricto `City,CC` que exige OpenWeatherMap, con un reintento automático sobre el nombre de ciudad solo en caso de que el calificador fuera en realidad un estado.",
        "Garantizar que una solicitud de búsqueda más lenta y antigua nunca pudiera sobrescribir el estado establecido por una más reciente — resuelto con `AbortController` y comprobado con una prueba que simula la respuesta fuera de orden, no solo asumido como correcto.",
        "Añadir un color de acento por condición climática a la temperatura principal sin que eso arriesgara las dos superficies base ya verificadas contra WCAG-AA — el acento se verifica de forma independiente en ambos temas y se limita solo a la cifra principal, su ícono y un halo decorativo de baja opacidad, nunca a una superficie, borde o texto de cuerpo.",
      ],
      result:
        "Una app de clima reconstruida y desplegada, con pronósticos renderizados en servidor, un límite de API validado por esquema, enrutamiento bilingüe con prefijo de idioma, y una suite de pruebas (Vitest + Testing Library para unidades/componentes, Playwright + axe-core para e2e y accesibilidad) que cubre toda la capa de transformación de datos y las rutas de interacción que realmente fallan — debounce, caché, retención de resultados ante errores, y condiciones de carrera en las solicitudes.",
      learnings:
        "Una reconstrucción es una oportunidad para arreglar la arquitectura, no solo sumar funciones. Mover la obtención de datos al servidor y validar el límite de la API con Zod eliminó toda una clase de errores que el fetch del lado del cliente de la primera versión nunca dejaba ver, y escribir una prueba para la condición de carrera real en la búsqueda — no solo el camino feliz — es lo que convierte un \"parece que funciona\" en un \"está comprobado que funciona\".",
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

import type { AppLocale } from "@/i18n/routing";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

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
  // Optional: most projects don't have screenshots yet. When present, the
  // first image is the primary/preview shot; any images after it are
  // rendered grouped together as a continuation (e.g. a report split
  // across several captures).
  images?: ProjectImage[];
};

type ProjectContent = Pick<
  Project,
  "oneLiner" | "problem" | "approach" | "challenges" | "result" | "learnings" | "images"
>;

// Slug, name, stack and links don't change with language — technology names
// and project names aren't translated, and a link is a link.
const projectsShared: Array<Pick<Project, "slug" | "name" | "stack" | "github" | "demo">> = [
  {
    slug: "sysguard",
    name: "SysGuard",
    stack: ["Bash Shell Scripting", "awk / sed / grep", "Cron Jobs", "systemd", "HTML5 / CSS3"],
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
// the CV, or — for SysGuard — the project's own README, and nothing here
// is a metric, result, or difficulty that can't be backed up in a
// technical interview. See CONTENT_REVIEW.md. The Spanish entries are a
// faithful translation of the English ones, not a separate rewrite —
// same claims, same facts, both languages tell the same story.
const projectsContent: Record<AppLocale, ProjectContent[]> = {
  en: [
    {
      // SysGuard
      oneLiner:
        "A dependency-free Bash tool that monitors CPU, RAM, disk, and network health on Linux — three-level threshold alerts with a persistent cooldown, CSV history, an interactive terminal dashboard, and self-contained HTML reports, built to run unattended via cron or systemd.",
      problem:
        "A small server doesn't need a full Prometheus-and-Grafana stack just to know if its disk is filling up, but a script that only prints percentages isn't enough either. I wanted the middle ground: real alerting with configurable thresholds, a record of what happened, and a way to run it unattended — installable on any Linux box using nothing but the tools already on it.",
      approach:
        "SysGuard is a Bash CLI (check, dashboard, report, history, processes, network, system) built around two library files every subcommand shares: lib/metrics.sh is the single source of truth for CPU/RAM/swap/disk/network/load, and lib/thresholds.sh is the only place that decides OK/WARNING/CRITICAL and picks the worst disk — so check, the dashboard, and the HTML report can never disagree about a machine's state. Alert state persists in a flock-protected file so a metric stuck in WARNING doesn't re-notify on every run, and a recovery is logged exactly once. History is a pruned CSV with 24h/7d aggregates, reports/status.html is self-contained HTML/CSS with no JavaScript, and notifications go through a small webhook abstraction that new providers can plug into without touching the alerting logic.",
      challenges: [
        "Keeping a persistent, race-safe alert cooldown: two overlapping cron runs must never fight over data/alerts.state, a stuck WARNING shouldn't re-notify every run, and a recovery has to log exactly once — solved with flock around the state file.",
        "Autodetecting every real filesystem across arbitrary hosts while filtering out pseudo-filesystems (tmpfs, proc, overlay, cgroup, and others) instead of relying on a hardcoded list of mount points.",
        "Getting real automated coverage for a Bash tool with no framework to lean on — writing a ~30-line assertion helper and testing against actual /proc data, including a regression for a df header that changes under a translated locale.",
      ],
      result:
        "A monitoring tool with a full CLI (check, dashboard, report, history, processes, network, system), three-level threshold alerts with cooldown and recovery tracking, pruned CSV history with aggregates, self-contained HTML reports, optional webhook notifications, standard exit codes for cron/systemd integration, and its own test suite covering config validation, threshold logic, and real metric parsing.",
      learnings:
        "Centralizing metrics and threshold logic in two library files that every subcommand calls through — instead of letting check, dashboard, and report each compute CPU or disk state their own way — is what kept them from silently drifting apart as the tool grew from a single script into seven subcommands.",
      images: [
        {
          src: "/images/work/sysguard/sysguard-terminal.png",
          alt: "Four SysGuard terminal panes: the `processes` command listing top CPU and memory consumers, `check` running a one-off health check, `help` printing the command list, and the interactive `dashboard` showing live CPU/RAM/disk/network gauges.",
          width: 1904,
          height: 1029,
        },
        {
          src: "/images/work/sysguard/sysguard-report-1.png",
          alt: "Top half of a SysGuard HTML report: overall host status, CPU/RAM/swap/disk health cards, system information, and the start of the filesystems table.",
          width: 1018,
          height: 898,
        },
        {
          src: "/images/work/sysguard/sysguard-report-2.png",
          alt: "Bottom half of the same SysGuard HTML report, continuing the filesystems table and showing top processes by CPU and the resource history for the last 24 hours.",
          width: 1055,
          height: 790,
        },
      ],
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
        "Una herramienta en Bash sin dependencias que monitorea CPU, RAM, disco y red en Linux — alertas de tres niveles con cooldown persistente, historial en CSV, un dashboard interactivo en terminal y reportes HTML autocontenidos, pensada para correr sin supervisión vía cron o systemd.",
      problem:
        "Un servidor pequeño no necesita un stack completo de Prometheus y Grafana para saber si el disco se está llenando, pero un script que solo imprime porcentajes tampoco alcanza. Quería el punto intermedio: alertas reales con umbrales configurables, un registro de lo que pasó, y una forma de correrlo sin supervisión — instalable en cualquier máquina Linux usando solo las herramientas que ya trae.",
      approach:
        "SysGuard es una CLI en Bash (check, dashboard, report, history, processes, network, system) construida alrededor de dos archivos de librería que comparten todos los subcomandos: lib/metrics.sh es la única fuente de verdad para CPU/RAM/swap/disco/red/load, y lib/thresholds.sh es el único lugar que decide OK/WARNING/CRITICAL y elige el peor disco — así check, el dashboard y el reporte HTML nunca pueden discrepar sobre el estado de una máquina. El estado de las alertas se persiste en un archivo protegido con flock, para que una métrica atascada en WARNING no vuelva a notificar en cada corrida y una recuperación se registre una sola vez. El historial es un CSV podado con agregados de 24h/7d, reports/status.html es HTML/CSS autocontenido sin JavaScript, y las notificaciones pasan por una pequeña abstracción de webhook en la que se pueden agregar nuevos proveedores sin tocar la lógica de alertas.",
      challenges: [
        "Mantener un cooldown de alertas persistente y a prueba de carreras: dos corridas de cron solapadas no pueden pelear por data/alerts.state, una métrica atascada en WARNING no debe volver a notificar en cada corrida, y una recuperación tiene que registrarse una sola vez — resuelto con flock sobre el archivo de estado.",
        "Autodetectar todos los sistemas de archivos reales en hosts arbitrarios filtrando los pseudo-filesystems (tmpfs, proc, overlay, cgroup, entre otros) en vez de depender de una lista fija de puntos de montaje.",
        "Lograr cobertura de pruebas real para una herramienta en Bash sin ningún framework de por medio — escribir un helper de aserciones de ~30 líneas y probar contra datos reales de /proc, incluyendo una regresión para un encabezado de df que cambia bajo un locale traducido.",
      ],
      result:
        "Una herramienta de monitoreo con una CLI completa (check, dashboard, report, history, processes, network, system), alertas de tres niveles con cooldown y seguimiento de recuperación, historial en CSV podado con agregados, reportes HTML autocontenidos, notificaciones opcionales por webhook, exit codes estándar para integrarse con cron/systemd, y su propia suite de pruebas que cubre validación de configuración, lógica de umbrales y el parseo real de métricas.",
      learnings:
        "Centralizar la lógica de métricas y umbrales en dos archivos de librería por los que pasan todos los subcomandos — en vez de dejar que check, dashboard y report calculen cada uno el estado de CPU o disco a su manera — es lo que evitó que se fueran desalineando en silencio a medida que la herramienta creció de un solo script a siete subcomandos.",
      images: [
        {
          src: "/images/work/sysguard/sysguard-terminal.png",
          alt: "Cuatro paneles de terminal con SysGuard: el comando `processes` listando los procesos que más CPU y memoria consumen, `check` corriendo un chequeo puntual, `help` mostrando la lista de comandos, y el `dashboard` interactivo con medidores en vivo de CPU/RAM/disco/red.",
          width: 1904,
          height: 1029,
        },
        {
          src: "/images/work/sysguard/sysguard-report-1.png",
          alt: "Mitad superior de un reporte HTML de SysGuard: estado general del host, tarjetas de salud de CPU/RAM/swap/disco, información del sistema y el inicio de la tabla de sistemas de archivos.",
          width: 1018,
          height: 898,
        },
        {
          src: "/images/work/sysguard/sysguard-report-2.png",
          alt: "Mitad inferior del mismo reporte HTML de SysGuard, con la continuación de la tabla de sistemas de archivos y los procesos por CPU y el historial de recursos de las últimas 24 horas.",
          width: 1055,
          height: 790,
        },
      ],
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

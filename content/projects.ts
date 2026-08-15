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
    stack: ["Java 17", "Spring Boot 4", "Spring Security + JWT", "PostgreSQL 16", "Flyway", "Maven"],
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
        "A Spring Boot REST API for personal task management — JWT auth, ownership-scoped queries, an enforced status state machine, and idempotent soft deletes — built on Flyway migrations with a multi-layer test suite instead of stopping at CRUD.",
      problem:
        "Task list apps are a common portfolio project, but most stop at CRUD. I wanted to build the parts that actually come up in a backend interview: ownership and auth, a consistent error contract, pagination that holds up on a larger dataset, migrations instead of letting Hibernate infer the schema, and a test suite that exercises the business rules instead of just asserting the Spring context boots.",
      approach:
        "TaskFlow is a layered Spring Boot 4 service — controllers handle HTTP only, DTOs validate input with Jakarta Validation, all business rules live in the service layer, and Spring Data JPA Specifications compose the optional, combinable filters (status, priority, search) behind paginated list and overdue-task queries. Auth is stateless JWT (jjwt) over Spring Security, with every task query scoped to the authenticated user's id at the repository level. Status changes — through either a full update or the dedicated PATCH /status endpoint — go through the same small state machine: a COMPLETED task can only move to CANCELLED, and a CANCELLED task has to pass back through PENDING before it can be COMPLETED again. Delete is a soft delete (an is_active flag) that's idempotent — deleting an already-deleted task still returns 200. The schema is fully owned by Flyway migrations, with ddl-auto set to validate so Hibernate can never silently drift it, and a composite (owner_id, is_active) index backs the hot path every list/filter query hits.",
      challenges: [
        "Enforcing the same status state machine identically whether a client goes through the full PUT update or the dedicated PATCH /status endpoint, instead of letting the two code paths validate transitions differently.",
        "Making soft delete idempotent and consistent everywhere at once — deleting an already-gone task had to return 200 not 404, and every other query (list, filter, count, overdue) had to exclude soft-deleted rows without duplicating that logic per query.",
        "Keeping cross-user ownership airtight without leaking existence: a task ID that belongs to another user has to 404, not 403, since a 403 would confirm the task exists — enforced in the repository query itself, not as a check bolted on after fetching.",
      ],
      result:
        "A REST API with layered architecture, JWT auth, an enforced status state machine, idempotent soft delete, ownership-scoped queries that return 404 instead of leaking existence, Flyway-managed migrations, paginated/filterable/searchable task listing, a dedicated overdue-tasks query, and a consistent error contract across validation, business-rule, auth, and 404 responses — backed by unit tests (business rules, JWT), @WebMvcTest controller tests, and @DataJpaTest/integration tests against a real PostgreSQL via Testcontainers.",
      learnings:
        "The state machine and the soft delete are two decisions that end up touching almost every other layer of the API — once tasks can be soft-deleted, every list, filter, and count query has to know about it, and once status transitions are restricted, both the full-update and the status-only endpoint have to agree on the same rules or they drift apart. Centralizing those decisions in the service layer, instead of letting each endpoint reimplement them, is what kept them consistent.",
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
        "Una API REST en Spring Boot para gestión personal de tareas — autenticación JWT, consultas con alcance por dueño, una máquina de estados aplicada a las transiciones, y soft delete idempotente — construida sobre migraciones de Flyway con una suite de pruebas en varias capas en lugar de quedarse solo en CRUD.",
      problem:
        "Las apps de lista de tareas son un proyecto de portafolio común, pero la mayoría se queda en CRUD. Quería construir las partes que de verdad aparecen en una entrevista de backend: dueño y autenticación, un contrato de errores consistente, paginación que aguante un dataset más grande, migraciones en vez de dejar que Hibernate infiera el esquema, y una suite de pruebas que ejercite las reglas de negocio en vez de solo comprobar que el contexto de Spring arranca.",
      approach:
        "TaskFlow es un servicio en capas con Spring Boot 4 — los controladores solo manejan HTTP, los DTOs validan la entrada con Jakarta Validation, todas las reglas de negocio viven en la capa de servicio, y las Specifications de Spring Data JPA componen los filtros opcionales y combinables (estado, prioridad, búsqueda) detrás de las consultas paginadas de listado y de tareas vencidas. La autenticación es JWT sin estado (jjwt) sobre Spring Security, con cada consulta de tareas limitada al id del usuario autenticado a nivel de repositorio. Los cambios de estado — ya sea por una actualización completa o por el endpoint dedicado PATCH /status — pasan por la misma máquina de estados pequeña: una tarea COMPLETED solo puede pasar a CANCELLED, y una tarea CANCELLED tiene que volver a pasar por PENDING antes de poder completarse de nuevo. Eliminar es un soft delete (un flag is_active) que es idempotente — eliminar una tarea ya eliminada sigue devolviendo 200. El esquema es propiedad completa de las migraciones de Flyway, con ddl-auto en validate para que Hibernate nunca pueda desalinearlo en silencio, y un índice compuesto (owner_id, is_active) respalda el camino caliente que golpea cada consulta de listado/filtro.",
      challenges: [
        "Aplicar la misma máquina de estados de forma idéntica sin importar si el cliente usa la actualización completa por PUT o el endpoint dedicado PATCH /status, en lugar de dejar que los dos caminos de código validen las transiciones de forma distinta.",
        "Hacer que el soft delete fuera idempotente y consistente en todas partes a la vez — eliminar una tarea ya eliminada tenía que devolver 200 y no 404, y cada otra consulta (listar, filtrar, contar, vencidas) tenía que excluir los registros eliminados sin duplicar esa lógica en cada consulta.",
        "Mantener el aislamiento entre usuarios hermético sin filtrar existencia: un ID de tarea que pertenece a otro usuario tiene que devolver 404, no 403, porque un 403 confirmaría que la tarea existe — aplicado directamente en la consulta del repositorio, no como una verificación añadida después de obtener el registro.",
      ],
      result:
        "Una API REST con arquitectura en capas, autenticación JWT, una máquina de estados aplicada a las transiciones, soft delete idempotente, consultas con alcance por dueño que devuelven 404 en vez de filtrar existencia, migraciones gestionadas con Flyway, listado de tareas paginado/filtrable/buscable, una consulta dedicada para tareas vencidas, y un contrato de errores consistente en las respuestas de validación, reglas de negocio, autenticación y 404 — respaldada por pruebas unitarias (reglas de negocio, JWT), pruebas de controlador con @WebMvcTest, y pruebas @DataJpaTest/de integración contra una PostgreSQL real vía Testcontainers.",
      learnings:
        "La máquina de estados y el soft delete son dos decisiones que terminan tocando casi todas las demás capas de la API — una vez que las tareas se pueden eliminar de forma blanda, cada consulta de listado, filtro y conteo tiene que saberlo, y una vez que las transiciones de estado están restringidas, tanto el endpoint de actualización completa como el de solo-estado tienen que coincidir en las mismas reglas o terminan desalineándose. Centralizar esas decisiones en la capa de servicio, en vez de dejar que cada endpoint las reimplemente, es lo que las mantuvo consistentes.",
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

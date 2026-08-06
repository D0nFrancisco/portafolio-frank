# REDESIGN_PLAN.md

Plan completo de reconstrucción del portafolio, a partir de `PORTFOLIO_AUDIT.md`. No se escribe código hasta que este plan se apruebe. Cada decisión importante lleva su justificación al lado — si no estás de acuerdo con alguna, dímelo y la cambiamos antes de empezar.

---

## 1. Posicionamiento y narrativa

Antes de tocar componentes, hay que decidir **qué historia cuenta el portafolio**, porque todo lo demás (arquitectura, copy, secciones) se deriva de eso.

Con la información real disponible (Linux/Bash, Java/Spring Boot, MySQL, Next.js/Tailwind, Google Cloud, Docker), el candidato es un **desarrollador backend-first con base sólida en sistemas Linux, que está construyendo capacidad full-stack**. Esa es una historia honesta y vendible. No vamos a fingir 5 años de experiencia senior ni inflar 3 proyectos personales — vamos a presentarlos con el rigor de razonamiento (trade-offs, qué se aprendió, qué se haría distinto) que es justamente la señal que distingue a alguien con criterio de alguien que solo terminó un tutorial. Eso es más persuasivo para un hiring manager que un proyecto exagerado.

**Principio rector para todo el rediseño**: cada elemento en pantalla debe responder "¿esto ayuda a un reclutador a decidir que vale la pena una llamada?". Si la respuesta es no, no entra.

---

## 2. Arquitectura y stack tecnológico

Se mantiene **Next.js (App Router) + TypeScript + Tailwind**, no porque ya esté instalado, sino porque es el stack correcto: es exactamente lo que usan/construyen Vercel, Linear, Stripe y compañía, y dominarlo de verdad (Server Components, Server Actions, metadata API, `next/og`) es en sí mismo una señal técnica para ese público. Se corrige cómo se usa, no se cambia por otra cosa.

| Decisión | Elegido | Justificación |
|---|---|---|
| Framework | Next.js 16, App Router, **100% TypeScript** (`.tsx`/`.ts`, cero `.js`/`.jsx`) | Ya estaba, es el correcto. Se elimina la mezcla de extensiones y la ausencia de tipado real detectada en la auditoría (3.5, 3.6). |
| Estilos | Tailwind v4 **usado de verdad** vía clases + tokens de tema (`@theme` en `globals.css`), sin objetos `style={{}}` salvo valores realmente dinámicos (ej. ancho de una barra con dato real) | Hoy Tailwind está instalado pero 0% usado (3.1). Usarlo correctamente elimina la duplicación masiva de estilos inline (3.2) y centraliza la identidad visual en un solo lugar. |
| Iconos | `lucide-react` | Reemplaza los emoji (1.4, 4.6): iconos consistentes entre SO/navegador, escalables, con soporte real de `aria-hidden`/`aria-label`. |
| Animación | `motion` (sucesor de Framer Motion) + `IntersectionObserver` nativo para reveals, envuelto en un único componente `<Reveal>` | Se usa solo para: aparición al hacer scroll (una vez, no en loop), transición de foco/estado, y una transición de página sutil. Nunca decorativo. Respeta `prefers-reduced-motion` siempre. |
| Tipografía | Una sola familia variable, autoalojada con `next/font` (ej. Geist Sans o Inter Variable) + su contraparte mono (ej. Geist Mono) solo para tags de tecnología/código, no para "efecto hacker" | Un solo tipo de letra bien ejecutado, con escala modular real, en vez de tamaños tecleados a mano por componente (1.7). |
| Formulario de contacto | **Server Action** de Next.js (no `fetch` desde cliente) + validación con `zod` en servidor, reenviado a un proveedor de email (Formspree/Resend) desde el servidor | Elimina el endpoint hardcodeado en el bundle de cliente, agrega validación real, funciona con progressive enhancement (sin JS el form sigue funcionando), y es una demostración directa de dominio de App Router — algo que un reclutador de Vercel reconoce al instante. |
| Contenido | Módulos TypeScript tipados en `content/` (no MDX, no CMS) | Con 3 proyectos y una bio, un CMS es sobre-ingeniería. Contenido tipado = autocompletado, cero riesgo de romper el build por un typo de estructura, cero dependencias extra. Si el número de proyectos crece mucho a futuro, migrar a MDX es un cambio localizado, no una reescritura. |
| Internacionalización | **Se elimina para v1** (ver sección 13, es una decisión abierta) | El toggle de idioma actual generó dos bugs reales (contraste de `lang` estático vs contenido dinámico, sin persistencia). Implementarlo bien (rutas `/en /es`, `generateMetadata` por locale) es viable pero es trabajo extra que no aporta a la conversión con las empresas objetivo (Stripe, Vercel, Shopify, Cloudflare, Linear, GitHub, Google — todas operan en inglés). Recomiendo **inglés como único idioma en v1** y dejar la arquitectura lista para añadir `next-intl` con rutas propias en una fase 2 si de verdad lo necesitas para oportunidades locales. |
| Testing | Ninguno obligatorio en v1; opcional un smoke test de Playwright para el form de contacto en fase 5 | Para un portafolio de 4-5 rutas, una suite de tests es más costo de mantenimiento que valor. Se prioriza tiempo en contenido y accesibilidad real. |
| Estado global | Ninguno (ni Redux ni Zustand ni Context de idioma) | Todo el estado necesario (menú móvil abierto, foco) es local a un componente. Un "sistema de estado" para un portafolio de 4 páginas sería la clase de sobre-ingeniería que el propio brief pide evitar. |

**Se elimina por completo**: `CustomCursor`, `Particles`, `ScrollProgress`, `Terminal`, `TypeWriter` — los cuatro gimmicks identificados en la auditoría (1.8, 4.7) que consumían JS de cliente en cada página sin aportar a la decisión de contratar. Ningún reemplazo: su ausencia es la mejora.

---

## 3. Estructura de carpetas y componentes

```
app/
  layout.tsx                    # fuentes, metadata base, shell (Header/Footer)
  page.tsx                      # Home
  globals.css                   # @theme tokens de Tailwind (color, spacing, radius, type scale)
  robots.ts
  sitemap.ts
  manifest.ts
  opengraph-image.tsx           # OG image generada dinámicamente (next/og)
  not-found.tsx
  error.tsx
  work/
    page.tsx                    # listado de proyectos ("Selected work")
    [slug]/
      page.tsx                  # case study individual
      opengraph-image.tsx       # OG image propia por proyecto
  contact/
    page.tsx
    actions.ts                  # Server Action: valida (zod) + envía

components/
  ui/                            # primitivas puras, sin conocimiento del dominio
    Button.tsx
    Badge.tsx
    Container.tsx
    SectionHeading.tsx
  layout/
    Header.tsx
    Footer.tsx
    MobileNav.tsx
  home/
    Hero.tsx
    About.tsx
    FeaturedWork.tsx
    ContactCta.tsx
  work/
    ProjectCard.tsx
    CaseStudyHeader.tsx
    CaseStudyBody.tsx
    TechList.tsx
  contact/
    ContactForm.tsx
  motion/
    Reveal.tsx                  # único wrapper de scroll-reveal; respeta prefers-reduced-motion

content/
  profile.ts                    # nombre, rol, bio, socials, ubicación
  projects.ts                   # Project[] tipado — nivel case-study

lib/
  metadata.ts                   # helpers para construir metadata por ruta
  validation.ts                 # esquemas zod (form de contacto)
  structured-data.ts            # builder de JSON-LD (Person, CreativeWork)

public/
  resume.pdf                    # CV descargable (pendiente de que lo compartas)
  og-fallback.png
  favicon.ico / apple-touch-icon.png / icon.svg  # set real, no el de scaffold
```

**Regla de responsabilidad única** (pedida explícitamente): `content/` nunca importa React ni JSX — son solo datos tipados. `components/ui/` nunca importa de `content/` — son primitivas genéricas reutilizables. Las páginas en `app/` son las únicas que componen `content` + `components` juntos. Esto hace que cambiar el copy no toque componentes, y cambiar el diseño de una primitiva no toque contenido.

**Se elimina**: `ProjectCard.jsx` y `TypeWriter.jsx` actuales (archivos huérfanos, nunca importados — 3.4) se reescriben desde cero con este propósito real. `LangContext.jsx` se elimina (ver decisión de i18n).

---

## 4. Sistema de diseño

Se abandona por completo la paleta morado→rosa con gradiente clippeado y las tarjetas "glass" — es el patrón visual más reconocible de plantillas Tailwind/shadcn y generadores de IA (1.1–1.3, 4.6), y es explícitamente lo que pediste evitar.

**Dirección visual**: casi monocromático + un solo acento, mucho espacio en blanco, jerarquía tipográfica fuerte, bordes sutiles en vez de sombras/glow, movimiento solo en cambios de estado reales. Es el hilo común entre Vercel, Stripe, Linear, Raycast, Clerk, Supabase, Framer, GitHub y Apple — no se copia ningún layout de estos, se toma el principio: la simplicidad bien ejecutada lee como "esta persona tiene criterio", que es exactamente lo que un hiring manager de ese nivel busca.

- **Color**: base neutra (casi-blanco / casi-negro) con soporte real de light y dark (no solo un dark hardcodeado como hoy — un tema con paridad real en ambos modos es una señal de cuidado, y corrige el riesgo de contraste detectado en la auditoría). Un único color de acento (a definir: azul/índigo desaturado, o un color de marca personal si tienes uno) usado solo en links, foco y el único CTA primario — nunca degradado de dos tonos.
- **Tipografía**: una familia variable autoalojada, escala modular real definida una sola vez como tokens de Tailwind (`text-xs` → `text-6xl`), pesos limitados a 400/500/600/700, cifras tabulares para cualquier número real que se muestre.
- **Espaciado**: escala base de 8px definida en el tema, no valores en px tecleados a mano por componente.
- **Iconografía**: `lucide-react`, trazo 1.5px, tamaños consistentes (20/24px), siempre `aria-hidden` cuando es decorativo.
- **Radio y elevación**: escala de 2-3 radios (ej. 8/12/16px), bordes de 1px de bajo contraste como recurso principal; sombra reservada para elevación real (menú móvil, dropdown), nunca como "glow" decorativo en hover.
- **Movimiento**: reveal de sección al hacer scroll (una sola vez), transición de foco/hover con `transform`/`opacity` de bajo costo, nada en loop infinito, `prefers-reduced-motion: reduce` respetado globalmente vía CSS y en la config de `motion`.

---

## 5. Estrategia de UX y secciones

**Home (una sola página, scroll narrativo)**:
1. **Hero** — responde en <5s quién eres, qué haces, por qué contratarte. Sin frase-cliché, con especificidad real (stack, tipo de problemas que resuelves). CTA primario a "Ver proyectos", secundario a "Contacto" + link directo a CV.
2. **Selected work** — 2-3 proyectos destacados en formato preview (no la tarjeta genérica actual), cada uno enlaza a su case study completo en `/work/[slug]`.
3. **About** — bio corta, específica, con datos verificables (qué has construido, con qué herramientas, qué tipo de problemas te interesan). Sin "apasionado por la tecnología" ni frases intercambiables.
4. **Contact CTA** — un único cierre claro, no una tarjeta con glow.

**`/work`** — listado completo si a futuro hay más de 3 proyectos (hoy podría incluso redirigir a home si el contenido es poco, a decidir en fase 2).

**`/work/[slug]`** — cada proyecto como case study real, con la estructura exacta que pediste: **Problema → Solución/Enfoque → Stack → Retos → Resultado → Qué aprendí**. Esto es lo que reemplaza la tarjeta plana actual (2.5) y es, con diferencia, el cambio de mayor impacto en percepción de seniority.

**`/contact`** — formulario con validación real por campo, estado de envío anunciado con `aria-live`, honeypot anti-spam, sin remover el `outline` sin reemplazo (foco visible siempre).

**Qué se elimina y por qué**:
- Barras de progreso de skills con porcentaje autoasignado → se reemplaza por una lista de stack agrupada (Backend & Sistemas / Frontend / Cloud & DevOps) sin números inventados. Misma información, sin la señal de "portafolio de bootcamp" (4.4).
- Badge de "Nivel: Intermedio/Avanzado" en cada proyecto → eliminado. Que la profundidad del case study hable por el nivel, no una etiqueta autoasignada (4.3).
- Terminal decorativa, cursor personalizado, partículas, barra de progreso de scroll → eliminados sin reemplazo (1.8, 4.7).
- Emoji como iconografía → reemplazado por `lucide-react` en todos los usos funcionales (badges de contacto, categorías de skills, bullets de retos/resultado).
- Instagram como canal de contacto profesional → se reemplaza por LinkedIn (pendiente de que me pases la URL). Si quieres conservar Instagram igual, se puede dejar como canal secundario, pero no como reemplazo de LinkedIn (4.2).

**Qué se crea y por qué**:
- CV descargable enlazado en Header/Footer — hoy no existe ningún enlace a un PDF de CV; es el activo más directamente accionable para un reclutador y hoy falta por completo.
- Case studies individuales por proyecto (`/work/[slug]`) — hoy no existen, es la sección de mayor impacto para diferenciar seniority de pensamiento sobre 3 proyectos pequeños.
- Sección de stack agrupado sin porcentajes.
- OG image dinámica por página vía `next/og` — hoy compartir el link no genera ninguna preview.

---

## 6. Cómo diferenciarse de las plantillas típicas React/Tailwind

Esto es explícito porque es uno de los objetivos centrales:

1. **Un acento, no un degradado.** Los degradados de texto morado→rosa son la firma visual #1 de plantillas Tailwind/shadcn y de generadores de IA. Un solo color de acento usado con disciplina es más difícil de clonar y lee como decisión, no como default.
2. **Ritmo visual variable entre secciones**, no la fórmula "badge píldora + heading + párrafo gris + dos botones" repetida idéntica en cada página (1.2). Cada sección del home tiene su propia composición.
3. **Copy específico y verificable** en vez de descripciones de una línea tipo landing de producto. "Construí un monitor de recursos en Bash que corre por cron y me alertaba de X" en vez de "Monitor de sistema en Bash que analiza CPU, RAM...".
4. **Interacciones con estado real** (foco de teclado visible, transiciones ligadas a acción del usuario) en vez de decorado ambiental (partículas, cursor, glow).
5. **Sin bordes/sombras "glass morphism" genéricas** — bordes de 1px de bajo contraste, consistente con Linear/Vercel/Raycast, en vez de `rgba(255,255,255,0.03)` + glow morado en cada tarjeta.
6. **Densidad de información real por proyecto** (case study completo) — la mayoría de plantillas de portafolio se quedan en la tarjeta con 2 líneas; el case study profundo es, hoy, poco común y es justo lo que un hiring manager técnico sí lee.

---

## 7. Percepción de reclutador / hiring manager

- **Above the fold** responde quién/qué/por qué en <5 segundos, sin scroll.
- **CV descargable + LinkedIn** siempre visibles (header y footer) — hoy ninguno de los dos existe.
- **Case studies con razonamiento real** (trade-offs, decisiones, qué harías distinto) — comunica criterio, que es lo que distingue mid/senior de junior en una lectura rápida, incluso con proyectos personales pequeños.
- **Cero señales de plantilla/IA/bootcamp** identificadas en la auditoría (gradiente cliché, barras %, niveles autoasignados, gimmicks decorativos) — todas eliminadas.
- **Evidencia visual real por proyecto** (captura de pantalla o GIF corto del proyecto corriendo) — hoy no existe ninguna imagen real en el sitio. Esto no lo puedo generar yo: necesito que corras cada proyecto y me pases capturas, o lo dejamos como pendiente explícito antes de publicar.
- **Metadata de "quién eres" reforzada estructuralmente**: JSON-LD `Person`, título/descripción por página, OG image con tu nombre y rol — para que incluso el link compartido en Slack/LinkedIn ya comunique profesionalismo antes de que abran el sitio.

---

## 8. SEO

- `generateMetadata`/`metadata` export por ruta (hoy solo existe uno global — 3.7).
- Open Graph + Twitter Card en cada ruta, con imagen generada dinámicamente vía `next/og` (`opengraph-image.tsx`), incluyendo una por cada case study.
- `robots.ts`, `sitemap.ts`, `manifest.ts` (convenciones de archivo de Next.js), `metadataBase` apuntando al dominio real de producción (necesito que me confirmes el dominio).
- JSON-LD `Person` en el layout raíz + `CreativeWork`/`SoftwareSourceCode` por case study.
- HTML semántico correcto: un solo `<h1>` por página, orden de encabezados sin saltos, landmarks (`header`/`nav`/`main`/`footer`).
- Canonical URLs explícitas por ruta.

## 9. Accesibilidad (WCAG AA+)

- Contraste verificado (ratio real calculado, no estimado) para cada combinación texto/fondo del sistema de diseño final, en ambos modos (claro/oscuro).
- `:focus-visible` real y consistente en todo elemento interactivo — corrige el `outline: none` sin reemplazo detectado (2.3).
- Navegación completa por teclado, incluyendo menú móvil (con focus trap y cierre por `Escape`).
- `prefers-reduced-motion` respetado en toda animación.
- Iconos decorativos con `aria-hidden="true"`; icono funcional siempre con `aria-label`.
- Formulario: labels asociados correctamente, errores anunciados vía `aria-live`, mensajes de error específicos por campo.
- `<html lang>` correcto y consistente con el idioma real del contenido (se resuelve solo con la decisión de ir a un único idioma en v1 — ver sección 13).

## 10. Rendimiento

- Server Components por defecto; `'use client'` solo donde hay interacción real (menú móvil, formulario, wrapper de motion) — hoy `Particles`/`CustomCursor`/`ScrollProgress` corrían JS de cliente en cada ruta sin necesidad.
- Fuentes autoalojadas con `next/font`, sin peticiones a Google Fonts en runtime.
- `next/image` para toda imagen real que se agregue (capturas de proyectos, foto de perfil si se incluye), con dimensiones explícitas y `priority` en la imagen LCP del hero si aplica.
- Cero canvas/partículas en loop, cero listeners de `mousemove` globales (el mayor costo de CPU detectado en la arquitectura actual).
- Objetivo Lighthouse: 100 Performance / 100 Accessibility / 100 SEO / 100 Best Practices — realista dado que el sitio es simple una vez fuera los gimmicks y agregada la metadata.

## 11. Responsive

Breakpoints objetivo verificados manualmente en cada fase: 320, 375, 390, 768, 1024, 1440, 4K (`2560+` con `max-width` de contenedor para no estirar línea de texto en pantallas grandes). El sistema de diseño usa la escala de espaciado/tipografía con `clamp()` centralizado en los tokens de Tailwind, no valores puntuales por componente como hoy.

---

## 12. Roadmap por fases (commits lógicos)

| Fase | Contenido | Resultado verificable |
|---|---|---|
| **0 — Fundación** | Reset de `package-lock.json`, `tsconfig` estricto, ESLint limpio, tokens de Tailwind (`@theme`), fuentes vía `next/font`, shell base (`Header`, `Footer`, `Container`), primitivas `ui/` | `npm run build` pasa limpio, layout base visible |
| **1 — Home** | Hero, About, Featured work (preview), Contact CTA con el copy real extraído + reescrito | Home completo, responsive, sin JS decorativo |
| **2 — Work** | Listado `/work` + plantilla de case study `/work/[slug]` + los 3 proyectos con estructura Problema/Solución/Stack/Retos/Resultado/Aprendizaje | 3 case studies navegables desde Home |
| **3 — Contact** | `ContactForm` + Server Action + validación zod + estados accesibles | Envío funcional, validado, accesible |
| **4 — SEO + A11y + Perf** | Metadata por ruta, OG images dinámicas, JSON-LD, sitemap/robots/manifest, auditoría de contraste, pase de Lighthouse | Lighthouse 100/100/100/100 |
| **5 — Pulido final** | Revisión cross-browser, QA en los 7 breakpoints, limpieza de restos de scaffold, CV enlazado, verificación final de copy | Listo para producción |

Cada fase = uno o pocos commits lógicos, cada uno justificado, como pediste.

---

## 13. Decisiones confirmadas (2026-08-06)

1. **Idioma**: inglés único para v1. Todo el copy se escribe pensando en mercado internacional. i18n queda fuera de alcance salvo que aporte valor claro más adelante.
2. **LinkedIn**: se usa un placeholder temporal `https://linkedin.com/in/TU_USUARIO` en header/footer/contacto. El usuario lo reemplaza por su URL real antes del despliegue final — queda marcado con `TODO` en `content/profile.ts`.
3. **Instagram**: eliminado del contacto profesional. La presencia profesional se centra en **GitHub, LinkedIn, email**. Cualquier red futura solo se agrega si aporta valor profesional.

## 14. Principios adicionales incorporados al plan (2026-08-06)

- **Contenido y credibilidad por encima de efectos visuales.** Ante la duda entre agregar una interacción y agregar una frase de contexto real en un case study, gana el contexto.
- **Cada decisión de UX/diseño se justifica** en el código (comentario breve solo cuando la razón no es obvia) y se puede justificar aquí en el plan si se pide.
- **Cada proyecto es un caso de estudio**, nunca una tarjeta con una línea de descripción.
- **Filtro de inclusión para cada sección**: antes de construirla, se responde *"¿esto aumenta la probabilidad de conseguir una entrevista?"*. Si la respuesta es no, se elimina o se rediseña. Esto aplica retroactivamente a todo lo ya planeado (por eso ya no hay cursor personalizado, partículas, terminal ni barras de progreso con porcentaje).
- **Reemplazo de proyectos débiles**: evaluado contra los únicos 3 proyectos con datos reales disponibles (SysGuard, TaskFlow, WeatherNow) — ninguno se descarta, porque no tengo datos de ningún otro proyecto del usuario para sustituirlo, y los tres cubren categorías técnicas distintas y complementarias (sistemas/Bash, backend/Spring Boot, consumo de API con frontend). La estrategia para que "aporten valor a un reclutador" no es reemplazarlos sino **profundizarlos como case studies reales** (decisión ya reflejada en la sección 5). Si en el futuro el usuario tiene un proyecto más sólido, se agrega o sustituye sin fricción porque `content/projects.ts` es un array tipado independiente del layout.
- Los campos de "retos" y "qué aprendí" de cada case study se redactan como borrador técnico razonado a partir de las características reales de cada proyecto (no se inventan métricas de negocio ni resultados no verificables). Quedan marcados para revisión y personalización con la voz real del usuario antes de publicar.

No se bloquea la implementación por las decisiones de LinkedIn/dominio/CV/capturas pendientes — quedan como `TODO` explícitos en el contenido y no impiden avanzar por fases.

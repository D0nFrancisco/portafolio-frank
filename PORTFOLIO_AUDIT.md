# PORTFOLIO_AUDIT.md

Auditoría crítica completa del portafolio de Frank David Gualdron (`portafolio-frank`).
Stack detectado: Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript (parcial).

Este documento **no modifica código**. Es solo el diagnóstico, tal como se pidió. La implementación empieza únicamente cuando se apruebe `REDESIGN_PLAN.md`.

---

## 0. Hallazgo crítico previo a todo lo demás

Antes de hablar de diseño o UX hay algo más urgente: **el proyecto, tal como está en este checkout, no funciona.**

De los 10 archivos en `components/` y el único archivo en `context/`, **los 11 están vacíos (0 bytes)**:

```
components/Navbar.js          0 bytes
components/HeroSection.js     0 bytes
components/Footer.jsx         0 bytes
components/Particles.jsx      0 bytes
components/CustomCursor.jsx   0 bytes
components/ScrollProgress.jsx 0 bytes
components/Terminal.jsx       0 bytes
components/CounterStat.jsx    0 bytes
components/TypeWriter.jsx     0 bytes
components/ProjectCard.jsx    0 bytes
context/LangContext.jsx       0 bytes
```

`app/layout.tsx` importa y renderiza `LangProvider`, `Navbar`, `Footer`, `CustomCursor`, `ScrollProgress` y `Particles` — todos vacíos. `app/page.jsx`, `app/proyectos/page.jsx` y `app/contacto/page.jsx` dependen de `useLang()` (definido en el `LangContext` vacío) para renderizar **absolutamente todo su texto** (`t.sobre.*`, `t.proyectos.*`, `t.contacto.*`). Sin ese contexto, `useLang` no existe, y la app se cae en el primer render de cualquier página. Hoy, si alguien clona este repo y corre `npm run dev`, obtiene una pantalla en blanco o un crash, no un portafolio.

Adicionalmente:

- `package-lock.json` también está en 0 bytes → instalación no reproducible.
- `AGENTS.md` y `CLAUDE.md` están vacíos.
- El propio directorio `.git/` está corrupto: `HEAD`, `config`, `index`, `COMMIT_EDITMSG` son todos de 0 bytes y `git log`/`git status` fallan con "no es un repositorio git". **No hay historial de versiones al que volver.** Si no existe un remoto (GitHub) ni un backup, es muy probable que el código real de estos 11 archivos — incluyendo todo el copy en español/inglés del sitio — se haya perdido de forma permanente en esta máquina.

Todos estos archivos comparten exactamente el mismo timestamp (`4 may 12:40`), lo que indica un evento único (sync fallido, restauración incompleta, `git checkout` interrumpido, etc.), no una decisión de diseño.

**Implicación para esta auditoría:** puedo analizar en detalle el Hero, Navbar, Footer, Terminal, cursor personalizado, partículas, contador y tarjetas de proyecto solo de forma indirecta (por lo que importan/usan las páginas y por los nombres/props). No puedo evaluar el copy real del Hero, del Footer ni los textos completos de `LangContext` porque no existen en disco. Lo marco explícitamente en cada sección en vez de inventar contenido que no pude leer.

**Antes de cualquier otra cosa, confirma:**
1. ¿Existe un repositorio remoto en GitHub con el historial real? (así podemos recuperar el contenido en vez de reescribirlo desde cero a ciegas)
2. ¿Hay una versión desplegada (Vercel u otro) que pueda revisar para ver el estado real en producción?

Si la respuesta a ambas es no, el rediseño de todas formas soluciona esto (se reescribe todo desde cero), pero quiero que sepas que esto no es una "mejora", es una **reconstrucción**, porque no hay nada que conservar de esos 11 archivos.

---

## 1. Problemas visuales

Evaluado a partir de los estilos inline completos que sí existen en `app/page.jsx`, `app/proyectos/page.jsx` y `app/contacto/page.jsx` (representativos del lenguaje visual del sitio).

### 1.1 Paleta "gradiente morado→rosa sobre negro" — el cliché más reconocible de 2023-2025
`#0a0a0a` de fondo, texto en gradiente `#c084fc → #ec4899` con `background-clip: text`, bordes `rgba(168,85,247, x)`, badges morados translúcidos. Esta combinación específica (fondo casi negro + heading con gradiente clippeado morado/rosa + badge píldora translúcida) es la estética por defecto de miles de landing pages hechas con plantillas de Tailwind/shadcn y de generadores tipo v0/Framer AI. Un hiring manager de Vercel, Linear o Stripe la reconoce en menos de un segundo porque la ve todos los días. **No transmite identidad propia — transmite "plantilla".**

### 1.2 Badge-píldora + heading con gradiente + párrafo gris + dos botones
Este patrón exacto se repite en Home, Proyectos y Contacto sin variación (eyebrow badge → `<h1>` con gradiente → `<p style="color:#6b7280">` → CTA). Es literalmente el layout de referencia de cualquier plantilla SaaS de Framer/Webflow. Repetirlo en las 3 páginas del sitio, sin variación de ritmo ni de composición, hace que el sitio entero se sienta como una sola plantilla clonada tres veces en vez de un portafolio con identidad.

### 1.3 Tarjetas "glass" con glow morado al hover
`background: rgba(255,255,255,0.03)`, borde `rgba(168,85,247,0.08→0.4)`, `translateY(-4px到-6px)`, `box-shadow: 0 20px 40px rgba(147,51,234,0.15)`. Es el patrón de tarjeta más visto en Dribbble/Behance bajo la etiqueta "dark SaaS UI" desde 2022. El usuario mismo lo pidió eliminar explícitamente ("tarjetas que parecen copiadas de Dribbble") y es exactamente lo que hay hoy, repetido en proyectos, skills y contacto.

### 1.4 Emoji como sistema de iconos
🛡️ 📋 🌤️ 🐧 🌐 ☁️ 📧 💻 📸 📍 ✅ se usan como iconografía principal en tarjetas de proyecto, categorías de skills y tarjetas de contacto. Los emoji:
- se renderizan distinto en Windows/Mac/Linux/Android (inconsistencia visual real, no cosmética),
- no se pueden alinear ópticamente con precisión como un SVG,
- leen como "prototipo rápido", no como producto terminado,
- son ilegibles para un lector de pantalla si no llevan `aria-hidden` + texto alternativo (no lo llevan).

### 1.5 Barras de progreso de skills con porcentajes inventados
`Docker 50%`, `Node.js 55%`, `Next.js 65%`, `Linux/Bash 85%`... Un número de "dominio" auto-asignado no es verificable, no significa nada objetivamente (¿qué es "73% de React"?) y es uno de los elementos más citados en foros de reclutamiento como señal de portafolio de bootcamp/junior. Visualmente además son barras planas de color sólido sin ningún dato real detrás — puro decorado.

### 1.6 Cero imágenes, cero capturas, cero mockups
`public/` solo contiene los 5 SVG por defecto de `create-next-app` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`), no usados en ninguna página, y sobrantes del scaffold. **No hay ni una sola imagen real en todo el proyecto**: ni foto de perfil, ni capturas de los 3 proyectos, ni diagramas, ni OG image. Un portafolio que describe proyectos solo con texto y un emoji no da ninguna prueba visual del trabajo — es la diferencia entre "dice que construyó esto" y "muestra que lo construyó".

### 1.7 Inconsistencia tipográfica menor pero real
Los pesos de fuente (`700`, `800`), tamaños (`clamp(1.8rem,4vw,2.8rem)` en home vs `clamp(2rem,5vw,3.5rem)` en proyectos/contacto para lo que debería ser la misma jerarquía de H1/H2) y el `fontWeight` de los badges (`500` en unos, ausente/heredado en otros) varían de página a página sin un sistema tipográfico declarado. No hay una escala tipográfica definida en ningún lugar (ni Tailwind config, ni CSS variables) — cada número está tecleado a mano.

### 1.8 Gimmicks visuales de "quiero parecer avanzado"
La arquitectura actual (aunque vacía hoy) declara: cursor personalizado (`CustomCursor`), fondo de partículas animado global (`Particles`, renderizado en cada página incluyendo el formulario de contacto), barra de progreso de scroll (`ScrollProgress`) y un widget de terminal falsa al final del home (`Terminal`). Son cuatro piezas decorativas superpuestas en un sitio de 3 páginas. Esto es exactamente lo que el propio brief pide eliminar ("partículas", "efectos innecesarios", "animaciones molestas") — y hoy existen como decisión arquitectónica, no como accidente.

---

## 2. Problemas de UX

### 2.1 Navegación actualmente inexistente
`Navbar.js` está vacío, así que hoy no hay navegación visible en ninguna página. Cuando se reconstruya: no hay evidencia en el código de un indicador de página activa, ni de un menú mobile (`hamburger`), ni de skip-link para accesibilidad. Se debe diseñar desde cero.

### 2.2 Selector de idioma sin implementación visible ni estrategia de persistencia
El sitio es bilingüe (`lang: 'es' | 'en'` en `proyectos/page.jsx`, estructura `{es, en}` en los datos), pero no hay ningún componente de switch de idioma en el código actual (probablemente vivía en el `Navbar` vacío). Tampoco hay evidencia de persistencia (`localStorage`, cookie, o `URL` con `/en/...`), lo que significa que si existía, el idioma se perdía en cada recarga o navegación con `Link`. Esto también rompe SEO: **`app/layout.tsx` fija `<html lang="es">` de forma estática**, así que si el usuario ve el sitio en inglés, el atributo `lang` sigue diciendo "es" — error de accesibilidad (lectores de pantalla eligen el motor de voz equivocado) y de SEO (Google indexa mal contenido en inglés marcado como español).

### 2.3 Estados de interacción solo por hover, cero soporte de teclado
Cada tarjeta, botón e input maneja su estado visual con `useState` + `onMouseEnter/onMouseLeave` (o `onFocus/onBlur` solo en los inputs del formulario). Ningún botón, tarjeta o link tiene un estilo `:focus-visible`. Peor: en `contacto/page.jsx`, `inputStyle()` fija `outline: 'none'` en los inputs **sin** proveer un anillo de foco alternativo. Resultado: un usuario navegando con teclado (Tab) no puede ver dónde está el foco en ningún input del formulario de contacto. Esto es una falla directa de WCAG 2.4.7 (Focus Visible), no un detalle menor.

### 2.4 Los estados "premium" del diseño no existen en mobile
Todo el lenguaje visual diferenciador (glow morado, `translateY`, sombra al elevar tarjeta) depende de `:hover`, que no existe en touch. Un usuario en móvil (probablemente la mayoría del tráfico de un link compartido por LinkedIn/WhatsApp) ve tarjetas planas sin ningún matiz, mientras que quien lo abre en desktop ve la versión "cuidada". El diseño no fue pensado mobile-first — fue pensado para el mouse de quien lo construyó.

### 2.5 Jerarquía de contenido pobre en Proyectos
Cada tarjeta de proyecto muestra: emoji, nombre, badge de "nivel" (Intermedio/Avanzado autoasignado), descripción de 2 líneas, chips de tecnología, y un solo link a GitHub. No hay demo en vivo, no hay capturas, no hay métricas de resultado, no hay explicación de decisiones técnicas ni de problemas resueltos. Un recruiter no tiene ninguna forma de evaluar la calidad del trabajo sin clonar y correr el repo de GitHub — fricción que el 90%+ de quienes revisan 300 portafolios por semana no van a tomarse.

### 2.6 Formulario de contacto sin feedback accesible ni protección básica
- El error/éxito se muestra solo cambiando el DOM visualmente (`estado === 'error'`), sin `aria-live`, así que un lector de pantalla no anuncia el resultado del envío.
- No hay honeypot ni ningún control anti-spam antes de pegarle a Formspree.
- No hay validación en tiempo real (solo `required` nativo del navegador) ni mensajes de error específicos por campo (formato de email inválido, mensaje muy corto, etc.).
- El endpoint de Formspree (`https://formspree.io/f/mbdqrqyo`) está hardcodeado en el componente en vez de en una variable de entorno — funciona, pero no es la práctica estándar y complica rotarlo o testear en otro entorno.

### 2.7 Terminal falsa al final del home sin propósito claro
`<Terminal />` se renderiza después del CTA de contacto, fuera de cualquier narrativa — no está claro qué información entrega ni por qué existe ahí (¿demo interactiva? ¿decoración?). Sin poder leer el componente (vacío) no puedo confirmar su función, pero su sola presencia en esa posición, desconectada del resto del flujo, sugiere una pieza añadida "porque se ve técnico" y no porque resuelva algo para quien visita el sitio.

### 2.8 Velocidad percibida
No hay `loading.tsx` ni estados de carga para las rutas (`/proyectos`, `/contacto`), y todos los componentes de layout (`Particles`, `CustomCursor`, `ScrollProgress`) son `'use client'` cargando en cada página, incluyendo la de contacto, que no los necesita para nada funcional. Cada componente decorativo extra que se ejecuta en cliente en todas las rutas es JS que el visitante paga en tiempo de carga sin recibir valor a cambio.

---

## 3. Problemas técnicos

### 3.1 Tailwind instalado pero prácticamente sin usar
`tailwindcss` v4 y `@tailwindcss/postcss` están en dependencias, y `globals.css` hace `@import "tailwindcss"`, pero **el 100% del styling real está en objetos `style={{...}}` inline**, no en clases utilitarias. Esto anula la razón de tener Tailwind: no hay purge/optimización real de CSS, no hay design tokens (`theme.extend`), no hay dark-mode config, y cada valor mágico (`rgba(168,85,247,0.1)`, `#9ca3af`, `border-radius: 999px`) está copiado a mano decenas de veces en vez de vivir en un solo lugar.

### 3.2 Duplicación masiva de estilos entre páginas
El badge-píldora, el heading con gradiente, la tarjeta con glow al hover, el botón primario morado y el botón secundario con borde se repiten como objetos de estilo casi idénticos en `page.jsx`, `proyectos/page.jsx` y `contacto/page.jsx`, sin extraer un solo componente compartido (`<Badge>`, `<GradientHeading>`, `<Card>`, `<Button>`). Ya hay divergencia entre copias (algunos badges llevan `fontWeight: 500`, otros no) — la firma clásica de "copy-paste sin refactor", que solo empeora con el tiempo.

### 3.3 Hover manejado con estado de React en vez de CSS
Cada tarjeta/botón declara su propio `useState` booleano y sus propios handlers `onMouseEnter/onMouseLeave` para lograr un efecto que `:hover` en CSS resuelve de forma nativa, sin JS, sin re-render y con soporte de teclado gratis vía `:focus-visible`. En `page.jsx` hay 4 estados de hover distintos solo para dos botones, la grid de stats y la tarjeta de CTA. Es más código, más re-renders, y peor accesibilidad que la alternativa nativa.

### 3.4 Componentes muertos y arquitectura a medio terminar
`ProjectCard.jsx` existe como archivo pero **no se importa en ningún lado** — `proyectos/page.jsx` reimplementa su propia tarjeta de proyecto inline en vez de usar el componente que claramente se pensó para eso. `TypeWriter.jsx` tampoco se importa en ningún archivo del proyecto. Son componentes fantasma: o se elimina o se termina el trabajo, pero no se puede dejar a medias.

### 3.5 Extensiones de archivo inconsistentes
`HeroSection.js` y `Navbar.js` usan `.js` a pesar de contener JSX, mientras el resto del proyecto usa `.jsx`/`.tsx` correctamente. Es una inconsistencia menor pero delata falta de convención uniforme, y en configuraciones más estrictas de bundler puede directamente fallar el parseo de JSX en un archivo `.js`.

### 3.6 TypeScript solo de nombre
`tsconfig.json` existe y `layout.tsx` es el único archivo `.tsx`, pero **no hay un solo `type`/`interface` propio en todo el proyecto** — ni para `Proyecto`, ni para `Skill`, ni para la forma del diccionario de traducciones (`t.sobre.*`, `t.proyectos.*`...), ni para el contexto de idioma. Un repo con `typescript` en devDependencies pero 0% de tipado real de dominio no pasa el filtro de "usa TypeScript en serio" que cualquier hiring manager técnico va a mirar en 10 segundos.

### 3.7 Cero SEO más allá de un `<title>` estático
- Un solo `export const metadata` en el layout raíz, compartido por las 3 páginas — `/proyectos` y `/contacto` no tienen metadata propia (mismo title/description que el home en resultados de búsqueda).
- No hay Open Graph ni Twitter Card → al compartir el link en LinkedIn/Slack/X no se genera ninguna preview, solo una tarjeta vacía o genérica.
- No hay `robots.txt`, no hay `sitemap.xml`, no hay `manifest.json`, no hay `metadataBase`, no hay JSON-LD (`schema.org/Person`).
- Es, para efectos prácticos, invisible para buscadores y para cualquier plataforma que genere previews de links.

### 3.8 Cero optimización de imágenes/rendimiento explícita
`next/image` no se usa en ningún lugar del proyecto (no hay imágenes que optimizar, lo cual es en sí mismo un problema — ver 1.6). `next.config.ts` está en su estado por defecto de `create-next-app`, sin configuración de imágenes, headers de seguridad, compresión o redirects.

### 3.9 Repositorio Git no funcional
`.git/HEAD`, `.git/config`, `.git/index` están vacíos (0 bytes) — no es un repositorio Git operativo. No hay historial, no hay forma de hacer `diff` contra un estado anterior conocido, y cualquier commit futuro empezaría desde cero sin trazabilidad de cómo se llegó aquí. Ver hallazgo crítico en la sección 0.

### 3.10 Lockfile roto
`package-lock.json` está en 0 bytes. Sin lockfile válido, `npm ci` (el comando que usan casi todos los pipelines de CI/CD y Vercel en modo estricto) fallará o reinstalará versiones no garantizadas — riesgo real de "funciona en mi máquina, se rompe en el deploy".

### 3.11 Restos de scaffold sin limpiar
Los 5 SVG por defecto de `create-next-app` en `public/`, el `README.md` genérico sin editar (sigue diciendo "This is a Next.js project bootstrapped with create-next-app"), y `AGENTS.md`/`CLAUDE.md` vacíos versionados en la raíz — nada de esto se limpió antes de tratar el proyecto como "terminado".

---

## 4. Problemas que un reclutador detectaría

Pensando como alguien que filtra 300 portafolios a la semana, con 30-45 segundos por candidato:

1. **El sitio no carga.** Este es, hoy, el problema #1 y descalifica todo lo demás — si el link está roto en el momento en que lo abren, no hay segunda oportunidad. (Ver sección 0.)
2. **No hay LinkedIn en ningún lado.** El formulario de contacto lista Email, GitHub, Instagram y ubicación — falta el canal que un 90%+ de reclutadores técnicos usa primero para validar experiencia, recomendaciones y trayectoria. Instagram, en cambio, sí está — y en un portafolio de ingeniería, un link a Instagram sin LinkedIn se lee como "no preparó esto para reclutamiento profesional", incluso si la intención era mostrar personalidad.
3. **"Nivel: Intermedio" en tus propios proyectos.** Etiquetarte a ti mismo como intermedio/avanzado en tu propio trabajo es una señal de inseguridad, no de honestidad. Deja que el código y la descripción hablen; nadie más pone un badge de "nivel" en su propio proyecto en un portafolio serio.
4. **Barras de progreso de skills con porcentajes.** Es, literalmente, una de las señales más citadas de "portafolio de bootcamp" en artículos y discusiones de reclutadores/hiring managers — un número inventado y no verificable no comunica competencia, comunica falta de criterio sobre qué mostrar.
5. **Los 3 proyectos son los 3 arquetipos de tutorial más reconocibles**: un monitor de sistema en Bash, una API CRUD con Spring Boot, y un consumidor de clima con una API pública. Cada uno de estos, individualmente, aparece en cientos de portafolios de bootcamp porque son ejercicios de tutorial estándar. Sin demo en vivo, sin capturas, sin métricas de impacto ni de escala, un reclutador los reconoce como "ejercicios de práctica", no como "trabajo real".
6. **La estética grita "hecho con plantilla/IA".** Gradiente morado-rosa sobre negro + badges píldora + tarjetas glass con glow — es el resultado visual por defecto de v0, Framer AI y de docenas de plantillas Tailwind/shadcn. Un hiring manager de Vercel/Linear/Stripe ve este patrón exacto varias veces por semana en portafolios generados o clonados de plantilla. No comunica "esta persona diseña", comunica "esta persona usó lo que le dieron por defecto".
7. **Cursor personalizado + partículas + terminal falsa + barra de progreso de scroll**, todo en un sitio de 3 páginas sin apenas contenido real (3 proyectos, sin casos de estudio). Es la proporción invertida de lo que un reclutador senior quiere ver: mucho adorno, poca sustancia. Comunica "prioricé lo llamativo sobre lo útil".
8. **Restos de `create-next-app` sin limpiar** (README por defecto, SVGs de ejemplo, archivos `.md` vacíos versionados). Individualmente son detalles menores; juntos, comunican falta de revisión final — y en una disciplina donde se evalúa explícitamente la atención al detalle, esto pesa más de lo que parece.
9. **Nada que demuestre impacto o escala.** No hay usuarios, no hay métricas, no hay "resolví X problema para Y personas/proceso". Todo el copy visible (por lo que se puede inferir de los datos de proyectos) describe *qué* se construyó, nunca *por qué importó* ni *qué se aprendió*, que es justo lo que distingue a un candidato mid/senior de uno junior en la lectura rápida de un reclutador.
10. **Lo que eliminaría por completo**: cursor personalizado, fondo de partículas, badge de "nivel" en proyectos, barras de progreso de skills con porcentaje, terminal decorativa sin función clara, emoji como iconografía, los 5 SVG de scaffold, el README por defecto.

---

## Resumen de severidad

| # | Hallazgo | Severidad | Bloquea |
|---|---|---|---|
| 0 | 11 archivos core vacíos (Hero, Navbar, Footer, LangContext, etc.) → sitio no renderiza | 🔴 Crítica | Todo |
| 3.9 | Repositorio Git no funcional, sin historial | 🔴 Crítica | Recuperar contenido perdido |
| 3.10 | Lockfile roto (`package-lock.json` vacío) | 🟠 Alta | Deploys reproducibles |
| 4.2 | Sin LinkedIn en contacto | 🟠 Alta | Conversión a entrevista |
| 4.5 | Proyectos = arquetipos de tutorial, sin demo/capturas/métricas | 🟠 Alta | Percepción de seniority |
| 1.1–1.3, 4.6 | Estética "plantilla/IA" (gradiente morado-rosa, badges píldora, glass cards) | 🟠 Alta | Percepción de calidad de diseño |
| 4.7 | Gimmicks (cursor, partículas, terminal, scroll bar) sin sustancia detrás | 🟡 Media | Percepción de criterio |
| 2.3 | Sin estados de foco visibles, `outline:none` sin reemplazo | 🟡 Media | Accesibilidad (WCAG 2.4.7) |
| 2.2 | `<html lang>` estático pese a sitio bilingüe | 🟡 Media | SEO + accesibilidad |
| 3.6 | TypeScript sin tipos de dominio reales | 🟡 Media | Percepción técnica |
| 3.7 | SEO/OG/metadata inexistentes | 🟡 Media | Descubribilidad, previews de link |
| 3.1–3.3 | Tailwind sin usar, duplicación, hover vía JS | 🟢 Baja-Media | Mantenibilidad |
| 3.11 | Restos de scaffold sin limpiar | 🟢 Baja | Detalle/pulido |

---

## Qué necesito de ti antes de seguir

1. Confirmación de si existe repo remoto o deploy en producción para recuperar el copy real perdido, o si partimos de cero para todo el texto (lo cual, dado que de todas formas pediste reescribir todos los textos, no cambia el resultado final — solo si hay algo que rescatar antes).
2. Aprobación de este documento para pasar a `REDESIGN_PLAN.md` (estrategia, arquitectura nueva, roadmap por fases) — sin tocar código todavía, como pediste.

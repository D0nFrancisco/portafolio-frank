# CONTENT_REVIEW.md

Comparación línea por línea entre el CV real y el contenido actual del portafolio (`content/profile.ts`, `content/projects.ts`, y el copy derivado en Hero/About/case studies). Ningún archivo se ha modificado todavía — esto es solo el informe pedido.

Contexto importante que cambia el enfoque: el CV **no tiene sección de experiencia laboral**. Es perfil + habilidades + proyectos + educación. Estás activo como estudiante de Tecnología (6to semestre, 2023–presente), sin historial de empleo formal listado. Eso significa que el mayor ajuste no es de "tecnologías" sino de **tono**: el portafolio actual está redactado como si hablara un profesional en ejercicio ("I work mostly on the backend..."), y el CV describe a alguien formándose activamente con proyectos propios como evidencia. Esa es la corrección más importante de todo este informe — todo lo demás es secundario a eso.

---

## 1. Qué cambiará

### Identidad y rol
- **Nombre**: `Frank Gualdron` → `Frank Gualdrón` (con tilde, como aparece en el CV: "Frank David Gualdrón Gómez"). Uso el nombre corto profesional, no los 4 nombres/apellidos completos, pero corrijo la ortografía.
- **Rol/título** (hoy: *"Backend & Systems Developer"*): pasa a reflejar que estás en formación, no que ya ejerces el rol como profesional. Esto afecta el `<title>` del sitio, el Hero, el JSON-LD (`jobTitle`) y las OG images — no es un cambio cosmético aislado, se propaga a varios archivos.
- **Ubicación**: `"Remote"` → tu ciudad real (Piedecuesta/Bucaramanga, Colombia), con nota de apertura a remoto. Hoy es un dato inventado por mí como placeholder genérico.
- **Tagline y bio (About)**: se reescribe para hablar en términos de "proyectos propios construidos mientras estudio Tecnología en Desarrollo de Sistemas", no de trabajo profesional continuo. Esto es más creíble, no menos — un reclutador que luego vea el CV y note la discrepancia (portafolio suena a 3 años de experiencia, CV dice estudiante activo) pierde confianza de inmediato.

### Stack técnico (`content/profile.ts` → `stack`)
- **MySQL → PostgreSQL** en todo el sitio (bio, TaskFlow). El CV es explícito: PostgreSQL. Esto viene arrastrado del sitio roto original, nunca lo verifiqué contra una fuente real hasta ahora.
- **TypeScript → JavaScript (ES6+)** como habilidad personal declarada. El CV no menciona TypeScript en ningún punto — solo "JavaScript (ES6+)". (El código de este portafolio sí está escrito en TypeScript porque fue mi decisión de implementación como buena práctica, eso no cambia — pero el *copy* no puede afirmar que TypeScript es una habilidad tuya si el CV no lo respalda.)
- Se agregan versiones específicas donde el CV las da: **Spring Boot 3.2**, **Next.js 14**, **Tailwind CSS v4** — es información real y más precisa que lo genérico que tengo ahora.

### Case studies
- **SysGuard**: corrijo "monitorea procesos" → el CV dice monitoreo de **tráfico de red**, no de procesos. Agrego el sistema de alertas por colores ANSI y la generación de reportes HTML/CSS (ambos reales y hoy ausentes). Los "retos" que redacté (parsing de `top`/`ps` entre distros, fatiga de alertas) se eliminan por no ser verificables — se reemplazan por decisiones de diseño que sí están en el CV (umbrales configurables sin tocar el código fuente, alertas visuales sin dependencias).
- **TaskFlow**: agrego lo que el CV confirma y hoy no aparece — reglas de negocio para transiciones de estado, soft delete, endpoint de tareas vencidas. Quito detalles de implementación que inventé (`@ControllerAdvice`, Bean Validation como mecanismo específico) y los reformulo con el lenguaje real del CV ("manejo global de excepciones", "validación de entradas") sin afirmar el mecanismo exacto si no lo confirmas tú.
- **WeatherNow**: agrego autocompletado de búsqueda, geolocalización automática, interfaz bilingüe ES/EN, pronóstico de 5 días y despliegue en Vercel — todo esto está en el CV y hoy no aparece en absoluto en el case study, que en cambio inventaba detalles sobre manejo de rate limits y arquitectura de fetch/loading que el CV no respalda.

---

## 2. Qué eliminaré

- **Google Cloud** y **Docker** del stack — no aparecen en ninguna parte del CV. Vienen del archivo roto original (`proyectos/page.jsx`, categoría "Cloud & DevOps" con barras de 65%/50%) que ya identificamos en la auditoría como no confiable, y nunca los verifiqué contra una fuente real.
- **Node.js** como habilidad declarada — el CV no lo lista explícitamente (Next.js corre sobre Node, pero eso no equivale a reclamarlo como skill propio).
- El "año" (`2025`) que puse en cada case study — lo inventé por no tener la fecha real. Lo quito en vez de mostrar un dato no verificado, salvo que me confirmes fechas reales.
- Los retos inventados de SysGuard/WeatherNow mencionados arriba (parsing entre distros, rate limiting, arquitectura de fetch a mano) — no están respaldados por el CV y los reemplazo por contenido que sí lo está.
- El párrafo final de "What I learned" de WeatherNow que conectaba (de forma inventada) el manejo de la API key con la decisión de usar Server Actions en este portafolio — es una narrativa que construí yo, no un hecho.

## 3. Qué añadiré (nuevo, basado 100% en el CV)

- **PHP** al stack, como lenguaje — hoy no aparece en ningún lado del sitio. Aclaro: lo listo como habilidad, no como si hubiera un proyecto PHP en la sección Work, porque no tienes uno ahí. Si más adelante quieres mostrar un proyecto en PHP, dímelo y lo agregamos como caso de estudio real.
- **JPA/Hibernate**, **awk/sed/grep**, **HTML5/CSS3**, **Vercel** (despliegue) — presentes en el CV y ausentes hoy.
- **Administración de servidores / soporte técnico de hardware y software** — esto está en tu CV bajo "Infraestructura y Sistemas" y hoy no se refleja en ningún lugar del portafolio. Es una fortaleza real que hoy no cuentas.
- Mención breve de que estás cursando la Tecnología en Desarrollo de Sistemas Informáticos (UTS, 2023–presente) — hoy el sitio no menciona educación en absoluto.
- Enlace de **demo en vivo** para WeatherNow, ya que el CV confirma que está desplegado en Vercel — necesito que me pases la URL real, no la voy a inventar.

## 4. Inconsistencias encontradas entre CV y portafolio actual

| # | Portafolio decía | CV dice | Origen del error |
|---|---|---|---|
| 1 | Rol: "Backend & Systems Developer" (tono profesional) | Estudiante activo de Tecnología, 6to semestre, sin experiencia laboral formal | Supuesto mío al redactar el rediseño |
| 2 | Base de datos: MySQL | PostgreSQL | Arrastrado del sitio roto original, nunca verificado |
| 3 | Skill personal: TypeScript | JavaScript (ES6+) — TypeScript no aparece | Confundí "el código del sitio está en TS" con "es una skill declarada tuya" |
| 4 | Stack: Google Cloud, Docker, Node.js | Ninguno de los tres aparece en el CV | Arrastrado del sitio roto original |
| 5 | SysGuard monitorea "procesos" | CV dice CPU, RAM, disco y **tráfico de red** (no procesos) | Supuesto mío al redactar el case study |
| 6 | React como badge de stack | El CV solo lista "Next.js 14", no menciona React por separado | Decisión mía de listar el framework base implícito — a tu criterio si lo dejamos o no (ver recomendaciones) |
| 7 | Año "2025" en los tres proyectos | El CV no da fechas por proyecto | Lo inventé como placeholder visual |
| 8 | Ubicación: "Remote" | Piedecuesta / Bucaramanga | Placeholder genérico mío |

## 5. Recomendaciones para fortalecer tu perfil sin exagerar

1. **Deja ver que estás en formación, no lo escondas.** Un portafolio de alguien en 6to semestre con 3 proyectos propios bien documentados es más convincente que uno que insinúa experiencia profesional y luego no la sostiene si te preguntan en una entrevista. La honestidad sobre tu etapa actual es, en sí misma, una señal de criterio.
2. **PHP sin proyecto es una habilidad "de lista", no una habilidad demostrada.** Si tienes algo (aunque sea pequeño) construido en PHP, vale más como 4to case study que como badge suelto. Si no, mejor dejarlo solo en el stack general y no forzarlo.
3. **El despliegue en Vercel de WeatherNow es tu único enlace "en vivo" verificable — úsalo.** Es exactamente lo que la auditoría original señaló como ausente (cero demos reales). Pásame la URL y lo conecto.
4. **La administración de servidores/soporte técnico es una fortaleza subutilizada.** Combinada con SysGuard, cuenta una historia coherente ("no solo escribo scripts, entiendo el sistema que están monitoreando") — vale la pena que aparezca en el About, no solo como badge suelto.
5. **No recomiendo poner tu teléfono en el sitio público.** Está en tu CV (que se comparte 1 a 1 con quien tú decidas), pero exponerlo en una página pública indexable es riesgo de spam sin beneficio real — el email y el formulario ya cumplen esa función. Tú decides, pero mi recomendación es dejarlo fuera del sitio.
6. **React como badge**: técnicamente es verdad (Next.js lo requiere), pero el CV no lo lista aparte. Dime si lo dejamos (es defendible) o lo quitamos para pegarnos estrictamente a lo que tú mismo decidiste incluir en el CV.
7. **Fechas de proyecto**: si me das siquiera el año aproximado de cada uno (o "en curso"), se lo agrego de vuelta — hoy prefiero quitarlo a mostrar una fecha que me inventé.

---

## Antes de implementar, confirma

1. ¿Apruebas el cambio de tono (estudiante en formación activa vs. profesional en ejercicio) para el rol/tagline/About? Es el cambio de mayor impacto de todos.
2. ¿Tienes la URL real de WeatherNow en Vercel?
3. ¿Dejamos "React" como badge o lo quitamos (punto 6 de las inconsistencias)?
4. ¿Fechas aproximadas de cada proyecto, o los dejamos sin año?
5. ¿Quieres el teléfono visible en el sitio público, o solo en el CV que compartes directamente? (mi recomendación es no exponerlo)

En cuanto confirmes esto, reescribo `content/profile.ts` y `content/projects.ts`, y el copy derivado en Hero/About/case studies, en un commit dedicado.

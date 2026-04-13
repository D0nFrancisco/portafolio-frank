import ProjectCard from '@/components/ProjectCard'

const proyectos = [
  {
    emoji: '🛡️',
    nombre: 'SysGuard',
    descripcion: 'Monitor de sistema en Bash que analiza CPU, RAM, disco y procesos en tiempo real. Genera reportes automáticos y alertas cuando los recursos superan umbrales críticos.',
    tecnologias: ['Bash', 'Linux', 'Shell Scripting', 'Cron Jobs'],
    nivel: 'Intermedio',
    github: 'https://github.com/D0nFrancisco/sysguard',
  },
  {
    emoji: '📋',
    nombre: 'TaskFlow',
    descripcion: 'API REST completa construida con Spring Boot para gestión de tareas. Incluye operaciones CRUD, validaciones, manejo de errores y conexión a base de datos MySQL.',
    tecnologias: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'Maven'],
    nivel: 'Intermedio',
    github: 'https://github.com/D0nFrancisco/taskflow',
  },
  {
    emoji: '🌤️',
    nombre: 'WeatherNow',
    descripcion: 'Aplicación web que consume la API de OpenWeatherMap para mostrar el clima actual y pronóstico de cualquier ciudad del mundo, con diseño responsive y moderno.',
    tecnologias: ['JavaScript', 'Next.js', 'Tailwind CSS', 'REST API'],
    nivel: 'Intermedio',
    github: 'https://github.com/D0nFrancisco/weathernow',
  },
]

const habilidades = [
  {
    emoji: '🐧',
    titulo: 'Backend & Linux',
    skills: [
      { nombre: 'Linux / Bash', nivel: 85 },
      { nombre: 'Java / Spring Boot', nivel: 70 },
      { nombre: 'MySQL / Firebase', nivel: 75 },
      { nombre: 'Docker', nivel: 50 },
    ],
  },
  {
    emoji: '🌐',
    titulo: 'Frontend',
    skills: [
      { nombre: 'HTML / CSS', nivel: 85 },
      { nombre: 'JavaScript', nivel: 75 },
      { nombre: 'Next.js', nivel: 65 },
      { nombre: 'Tailwind CSS', nivel: 70 },
    ],
  },
  {
    emoji: '☁️',
    titulo: 'Cloud & DevOps',
    skills: [
      { nombre: 'Google Cloud', nivel: 65 },
      { nombre: 'Docker', nivel: 50 },
      { nombre: 'GitHub', nivel: 80 },
      { nombre: 'Node.js', nivel: 55 },
    ],
  },
]

export default function Proyectos() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 24px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.3)',
            color: '#c084fc',
            fontSize: '13px',
            fontWeight: '500',
            padding: '6px 16px',
            borderRadius: '999px',
            marginBottom: '20px'
          }}>
            🚀 Mis proyectos
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '800',
            color: 'white',
            marginBottom: '16px',
          }}>
            Lo que he{' '}
            <span style={{
              background: 'linear-gradient(to right, #c084fc, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              construido
            </span>
          </h1>

          <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '520px', margin: '0 auto' }}>
            Proyectos reales que demuestran mis habilidades en Linux, backend y desarrollo web.
          </p>
        </div>

        {/* Proyectos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '80px'
        }}>
          {proyectos.map((proyecto) => (
            <div key={proyecto.nombre} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '32px' }}>{proyecto.emoji}</span>
                <span style={{
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  color: '#60a5fa',
                  fontSize: '12px',
                  padding: '4px 12px',
                  borderRadius: '999px'
                }}>
                  {proyecto.nivel}
                </span>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>
                {proyecto.nombre}
              </h3>

              <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                {proyecto.descripcion}
              </p>

              {/* Tecnologías */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {proyecto.tecnologias.map((tech) => (
                  <span key={tech} style={{
                    background: 'rgba(168,85,247,0.1)',
                    border: '1px solid rgba(168,85,247,0.2)',
                    color: '#c084fc',
                    fontSize: '12px',
                    padding: '4px 12px',
                    borderRadius: '999px'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* FIX AQUÍ */}
              <a
                href={proyecto.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#9ca3af',
                  fontSize: '13px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  marginTop: 'auto'
                }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385..." />
                </svg>
                Ver en GitHub →
              </a>

            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
'use client'

import { useState } from 'react'
import { useLang } from '@/context/LangContext'

const proyectosData = {
  es: [
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
  ],
  en: [
    {
      emoji: '🛡️',
      nombre: 'SysGuard',
      descripcion: 'Bash system monitor that analyzes CPU, RAM, disk and processes in real time. Generates automatic reports and alerts when resources exceed critical thresholds.',
      tecnologias: ['Bash', 'Linux', 'Shell Scripting', 'Cron Jobs'],
      nivel: 'Intermediate',
      github: 'https://github.com/D0nFrancisco/sysguard',
    },
    {
      emoji: '📋',
      nombre: 'TaskFlow',
      descripcion: 'Full REST API built with Spring Boot for task management. Includes CRUD operations, validations, error handling and MySQL database connection.',
      tecnologias: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'Maven'],
      nivel: 'Intermediate',
      github: 'https://github.com/D0nFrancisco/taskflow',
    },
    {
      emoji: '🌤️',
      nombre: 'WeatherNow',
      descripcion: 'Web app that consumes the OpenWeatherMap API to show current weather and forecast for any city in the world, with a modern responsive design.',
      tecnologias: ['JavaScript', 'Next.js', 'Tailwind CSS', 'REST API'],
      nivel: 'Intermediate',
      github: 'https://github.com/D0nFrancisco/weathernow',
    },
  ],
}

const habilidadesData = [
  {
    emoji: '🐧',
    titulo: { es: 'Backend & Linux', en: 'Backend & Linux' },
    skills: [
      { nombre: 'Linux / Bash', nivel: 85 },
      { nombre: 'Java / Spring Boot', nivel: 70 },
      { nombre: 'MySQL / Firebase', nivel: 75 },
      { nombre: 'Docker', nivel: 50 },
    ],
  },
  {
    emoji: '🌐',
    titulo: { es: 'Frontend', en: 'Frontend' },
    skills: [
      { nombre: 'HTML / CSS', nivel: 85 },
      { nombre: 'JavaScript', nivel: 75 },
      { nombre: 'Next.js', nivel: 65 },
      { nombre: 'Tailwind CSS', nivel: 70 },
    ],
  },
  {
    emoji: '☁️',
    titulo: { es: 'Cloud & DevOps', en: 'Cloud & DevOps' },
    skills: [
      { nombre: 'Google Cloud', nivel: 65 },
      { nombre: 'Docker', nivel: 50 },
      { nombre: 'GitHub', nivel: 80 },
      { nombre: 'Node.js', nivel: 55 },
    ],
  },
]

export default function Proyectos() {
  const { t, lang } = useLang()
  const [hovCard, setHovCard] = useState(null)
  const [hovGithub, setHovGithub] = useState(null)
  const [hovSkillCard, setHovSkillCard] = useState(null)
  const proyectos = proyectosData[lang]

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 24px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc',
            fontSize: '13px', fontWeight: '500', padding: '6px 16px',
            borderRadius: '999px', marginBottom: '20px'
          }}>
            {t.proyectos.badge}
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', color: 'white', marginBottom: '16px', lineHeight: '1.2' }}>
            {t.proyectos.titulo1}{' '}
            <span style={{ background: 'linear-gradient(to right, #c084fc, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t.proyectos.titulo2}
            </span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7' }}>
            {t.proyectos.descripcion}
          </p>
        </div>

        {/* Grid proyectos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          {proyectos.map((proyecto) => (
            <div key={proyecto.nombre}
              onMouseEnter={() => setHovCard(proyecto.nombre)}
              onMouseLeave={() => setHovCard(null)}
              style={{
                background: hovCard === proyecto.nombre ? 'rgba(168,85,247,0.07)' : 'rgba(255,255,255,0.03)',
                border: hovCard === proyecto.nombre ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px', padding: '28px',
                display: 'flex', flexDirection: 'column', gap: '16px',
                transition: 'all 0.3s',
                transform: hovCard === proyecto.nombre ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovCard === proyecto.nombre ? '0 20px 40px rgba(147,51,234,0.15)' : 'none',
                cursor: 'default'
              }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: '32px',
                  transition: 'transform 0.3s',
                  display: 'inline-block',
                  transform: hovCard === proyecto.nombre ? 'scale(1.2) rotate(-5deg)' : 'scale(1) rotate(0)'
                }}>
                  {proyecto.emoji}
                </span>
                <span style={{
                  background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                  color: '#60a5fa', fontSize: '12px', fontWeight: '500',
                  padding: '4px 12px', borderRadius: '999px'
                }}>
                  {proyecto.nivel}
                </span>
              </div>

              <h3 style={{
                fontSize: '20px', fontWeight: '700', margin: 0,
                color: hovCard === proyecto.nombre ? '#c084fc' : 'white',
                transition: 'color 0.3s'
              }}>
                {proyecto.nombre}
              </h3>

              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                {proyecto.descripcion}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {proyecto.tecnologias.map((tech) => (
                  <span key={tech} style={{
                    background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)',
                    color: '#c084fc', fontSize: '12px', padding: '4px 12px', borderRadius: '999px'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>

              <a href={proyecto.github} target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setHovGithub(proyecto.nombre)}
                onMouseLeave={() => setHovGithub(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  color: hovGithub === proyecto.nombre ? '#c084fc' : '#9ca3af',
                  fontSize: '13px', fontWeight: '500', textDecoration: 'none',
                  marginTop: 'auto', transition: 'all 0.2s',
                  transform: hovGithub === proyecto.nombre ? 'translateX(4px)' : 'translateX(0)'
                }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                {t.proyectos.verGithub}
              </a>
            </div>
          ))}
        </div>

        {/* Habilidades */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '64px' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '700', color: 'white', textAlign: 'center', marginBottom: '48px' }}>
            {t.proyectos.habilidades}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {habilidadesData.map((grupo) => (
              <div key={grupo.titulo.es}
                onMouseEnter={() => setHovSkillCard(grupo.titulo.es)}
                onMouseLeave={() => setHovSkillCard(null)}
                style={{
                  background: hovSkillCard === grupo.titulo.es ? 'rgba(168,85,247,0.07)' : 'rgba(255,255,255,0.03)',
                  border: hovSkillCard === grupo.titulo.es ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px', padding: '28px',
                  transition: 'all 0.3s',
                  transform: hovSkillCard === grupo.titulo.es ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hovSkillCard === grupo.titulo.es ? '0 12px 30px rgba(147,51,234,0.1)' : 'none'
                }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{grupo.emoji}</div>
                <h3 style={{ color: 'white', fontWeight: '700', fontSize: '16px', marginBottom: '24px' }}>
                  {grupo.titulo[lang]}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {grupo.skills.map((skill) => (
                    <div key={skill.nombre}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: '#9ca3af', fontSize: '13px' }}>{skill.nombre}</span>
                        <span style={{ color: '#c084fc', fontSize: '13px', fontWeight: '600' }}>{skill.nivel}%</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '999px', height: '6px' }}>
                        <div style={{
                          background: 'linear-gradient(to right, #a855f7, #ec4899)',
                          height: '6px', borderRadius: '999px', width: `${skill.nivel}%`,
                          transition: 'width 0.6s ease'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLang } from '@/context/LangContext'

export default function HeroSection() {
  const { t } = useLang()
  const [hovBtn1, setHovBtn1] = useState(false)
  const [hovBtn2, setHovBtn2] = useState(false)
  const [hovSkill, setHovSkill] = useState(null)

  const skills = ['Linux', 'Java', 'Next.js', 'JavaScript', 'MySQL', 'Docker', 'Google Cloud', 'Firebase']

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 40px' }}>
      <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center', margin: '0 auto' }}>

        <div style={{
          display: 'inline-block', background: 'rgba(168,85,247,0.1)',
          border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc',
          fontSize: '14px', fontWeight: '500', padding: '8px 16px',
          borderRadius: '999px', marginBottom: '24px'
        }}>
          {t.hero.badge}
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: '800', color: 'white', lineHeight: '1.15', marginBottom: '24px' }}>
          {t.hero.titulo1}{' '}
          <span style={{ background: 'linear-gradient(to right, #c084fc, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Frank Gualdron
          </span>
        </h1>

        <p style={{ fontSize: '1.2rem', color: '#9ca3af', marginBottom: '16px', fontWeight: '500' }}>
          {t.hero.subtitulo}
        </p>

        <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.7' }}>
          {t.hero.descripcion}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
          <Link href="/proyectos"
            onMouseEnter={() => setHovBtn1(true)}
            onMouseLeave={() => setHovBtn1(false)}
            style={{
              background: hovBtn1 ? '#7e22ce' : '#9333ea',
              color: 'white', fontWeight: '600',
              padding: '14px 32px', borderRadius: '12px',
              textDecoration: 'none', fontSize: '15px',
              transition: 'all 0.2s',
              transform: hovBtn1 ? 'translateY(-2px) scale(1.03)' : 'translateY(0) scale(1)',
              boxShadow: hovBtn1 ? '0 8px 25px rgba(147,51,234,0.4)' : 'none'
            }}>
            {t.hero.btnProyectos}
          </Link>
          <Link href="/contacto"
            onMouseEnter={() => setHovBtn2(true)}
            onMouseLeave={() => setHovBtn2(false)}
            style={{
              border: hovBtn2 ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.2)',
              color: hovBtn2 ? '#c084fc' : 'white',
              fontWeight: '600', padding: '14px 32px',
              borderRadius: '12px', textDecoration: 'none',
              fontSize: '15px', transition: 'all 0.2s',
              transform: hovBtn2 ? 'translateY(-2px)' : 'translateY(0)'
            }}>
            {t.hero.btnContacto}
          </Link>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          {skills.map((skill) => (
            <span key={skill}
              onMouseEnter={() => setHovSkill(skill)}
              onMouseLeave={() => setHovSkill(null)}
              style={{
                background: hovSkill === skill ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.05)',
                border: hovSkill === skill ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(255,255,255,0.1)',
                color: hovSkill === skill ? '#c084fc' : '#9ca3af',
                fontSize: '13px', padding: '6px 16px', borderRadius: '999px',
                cursor: 'default', transition: 'all 0.2s',
                transform: hovSkill === skill ? 'translateY(-2px)' : 'translateY(0)'
              }}>
              {skill}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
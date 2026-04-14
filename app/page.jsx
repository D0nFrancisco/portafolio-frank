'use client'

import HeroSection from '@/components/HeroSection'
import Link from 'next/link'
import { useState } from 'react'
import { useLang } from '@/context/LangContext'
import Terminal from '@/components/Terminal'
import CounterStat from '@/components/CounterStat'

export default function Home() {
  const { t } = useLang()
  const [hovStat, setHovStat] = useState(null)
  const [hovBtn1, setHovBtn1] = useState(false)
  const [hovBtn2, setHovBtn2] = useState(false)
  const [hovCta, setHovCta] = useState(false)

  return (
    <main style={{ background: '#0a0a0a' }}>
      <HeroSection />

      {/* Sobre mí */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>

          <div>
            <div style={{
              display: 'inline-block', background: 'rgba(168,85,247,0.1)',
              border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc',
              fontSize: '13px', padding: '6px 14px', borderRadius: '999px', marginBottom: '20px'
            }}>
              {t.sobre.badge}
            </div>

            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '700', color: 'white', lineHeight: '1.2', marginBottom: '24px' }}>
              {t.sobre.titulo1}{' '}
              <span style={{ background: 'linear-gradient(to right, #c084fc, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t.sobre.titulo2}
              </span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#9ca3af', lineHeight: '1.75', fontSize: '15px' }}>
              <p>{t.sobre.p1}</p>
              <p>{t.sobre.p2}</p>
              <p>{t.sobre.p3}</p>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
              <Link href="/proyectos"
                onMouseEnter={() => setHovBtn1(true)}
                onMouseLeave={() => setHovBtn1(false)}
                style={{
                  background: hovBtn1 ? '#7e22ce' : '#9333ea',
                  color: 'white', fontWeight: '600',
                  padding: '12px 24px', borderRadius: '12px',
                  textDecoration: 'none', fontSize: '14px',
                  transition: 'all 0.2s',
                  transform: hovBtn1 ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: hovBtn1 ? '0 8px 25px rgba(147,51,234,0.4)' : 'none'
                }}>
                {t.sobre.btnProyectos}
              </Link>
              <Link href="/contacto"
                onMouseEnter={() => setHovBtn2(true)}
                onMouseLeave={() => setHovBtn2(false)}
                style={{
                  border: hovBtn2 ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.2)',
                  color: hovBtn2 ? '#c084fc' : 'white',
                  fontWeight: '600', padding: '12px 24px',
                  borderRadius: '12px', textDecoration: 'none',
                  fontSize: '14px', transition: 'all 0.2s',
                  transform: hovBtn2 ? 'translateY(-2px)' : 'translateY(0)'
                }}>
                {t.sobre.btnContacto}
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {t.sobre.stats.map((stat) => (
              <div key={stat.texto}
                onMouseEnter={() => setHovStat(stat.texto)}
                onMouseLeave={() => setHovStat(null)}
                style={{
                  background: hovStat === stat.texto ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.03)',
                  border: hovStat === stat.texto ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px', padding: '24px',
                  transition: 'all 0.2s',
                  transform: hovStat === stat.texto ? 'translateY(-4px)' : 'translateY(0)',
                  cursor: 'default'
                }}>
                <CounterStat numero={stat.numero} texto={stat.texto} emoji={stat.emoji} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 24px 80px' }}>
        <div
          onMouseEnter={() => setHovCta(true)}
          onMouseLeave={() => setHovCta(false)}
          style={{
            maxWidth: '700px', margin: '0 auto', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(88,28,135,0.3), rgba(131,24,67,0.3))',
            border: hovCta ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(168,85,247,0.2)',
            borderRadius: '24px', padding: '64px 40px',
            transition: 'all 0.3s',
            transform: hovCta ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hovCta ? '0 20px 60px rgba(147,51,234,0.2)' : 'none'
          }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '700', color: 'white', marginBottom: '16px' }}>
            {t.cta.titulo}
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '32px', fontSize: '15px' }}>
            {t.cta.descripcion}
          </p>
          <Link href="/contacto" style={{
            background: '#9333ea', color: 'white',
            fontWeight: '600', padding: '14px 32px',
            borderRadius: '12px', textDecoration: 'none', fontSize: '15px'
          }}>
            {t.cta.btn}
          </Link>
        </div>
      </section>

      <Terminal />
    </main>
  )
}
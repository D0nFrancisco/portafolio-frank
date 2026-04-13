import HeroSection from '@/components/HeroSection'
import Link from 'next/link'

export default function Home() {
  return (
    <main style={{background: '#0a0a0a'}}>
      <HeroSection />

      {/* Sobre mí */}
      <section style={{padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.08)'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center'}}>

          <div>
            <div style={{
              display: 'inline-block',
              background: 'rgba(168,85,247,0.1)',
              border: '1px solid rgba(168,85,247,0.3)',
              color: '#c084fc',
              fontSize: '13px',
              padding: '6px 14px',
              borderRadius: '999px',
              marginBottom: '20px'
            }}>
              👨‍💻 Sobre mí
            </div>

            <h2 style={{fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '700', color: 'white', lineHeight: '1.2', marginBottom: '24px'}}>
              Más que código,{' '}
              <span style={{background: 'linear-gradient(to right, #c084fc, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                soluciones reales
              </span>
            </h2>

            <div style={{display: 'flex', flexDirection: 'column', gap: '16px', color: '#9ca3af', lineHeight: '1.75', fontSize: '15px'}}>
              <p>Soy Frank David Gualdron, estudiante de Ingeniería en Sistemas con 3 años formándome en desarrollo de software y soporte técnico de hardware y software.</p>
              <p>Me apasiona Linux, la automatización y construir herramientas que resuelvan problemas reales. Actualmente aprendiendo Docker, MongoDB y Node.js.</p>
              <p>Busco oportunidades donde pueda aportar, aprender y evolucionar como desarrollador y como profesional.</p>
            </div>

            <div style={{display: 'flex', gap: '12px', marginTop: '32px', flexWrap: 'wrap'}}>
              <Link href="/proyectos" style={{background: '#9333ea', color: 'white', fontWeight: '600', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontSize: '14px'}}>
                Ver proyectos
              </Link>
              <Link href="/contacto" style={{border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: '600', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontSize: '14px'}}>
                Contáctame
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            {[
              { numero: '3+', texto: 'Años estudiando', emoji: '📚' },
              { numero: '3', texto: 'Proyectos reales', emoji: '🚀' },
              { numero: '8+', texto: 'Tecnologías', emoji: '⚡' },
              { numero: '100%', texto: 'Ganas de aprender', emoji: '🔥' },
            ].map((stat) => (
              <div key={stat.texto} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '28px', marginBottom: '8px'}}>{stat.emoji}</div>
                <div style={{fontSize: '1.8rem', fontWeight: '700', color: 'white', marginBottom: '4px'}}>{stat.numero}</div>
                <div style={{color: '#6b7280', fontSize: '13px'}}>{stat.texto}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section style={{padding: '60px 24px 80px'}}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(88,28,135,0.3), rgba(131,24,67,0.3))',
          border: '1px solid rgba(168,85,247,0.2)',
          borderRadius: '24px',
          padding: '64px 40px'
        }}>
          <h2 style={{fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '700', color: 'white', marginBottom: '16px'}}>
            ¿Tienes un proyecto en mente?
          </h2>
          <p style={{color: '#9ca3af', marginBottom: '32px', fontSize: '15px'}}>
            Estoy disponible para prácticas, trabajo remoto y colaboraciones. Hablemos.
          </p>
          <Link href="/contacto" style={{
            background: '#9333ea',
            color: 'white',
            fontWeight: '600',
            padding: '14px 32px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontSize: '15px'
          }}>
            Escribirme ahora →
          </Link>
        </div>
      </section>

    </main>
  )
}
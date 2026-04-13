import Link from 'next/link'

export default function HeroSection() {
  return (
    <section style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 40px'}}>
      <div style={{maxWidth: '900px', width: '100%', textAlign: 'center', margin: '0 auto'}}>

        {/* Etiqueta */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(168,85,247,0.1)',
          border: '1px solid rgba(168,85,247,0.3)',
          color: '#c084fc',
          fontSize: '14px',
          fontWeight: '500',
          padding: '8px 16px',
          borderRadius: '999px',
          marginBottom: '24px'
        }}>
          👋 Disponible para trabajar
        </div>

        {/* Título */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          fontWeight: '800',
          color: 'white',
          lineHeight: '1.15',
          marginBottom: '24px'
        }}>
          Hola, soy{' '}
          <span style={{
            background: 'linear-gradient(to right, #c084fc, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Frank Gualdron
          </span>
        </h1>

        {/* Subtítulo */}
        <p style={{fontSize: '1.2rem', color: '#9ca3af', marginBottom: '16px', fontWeight: '500'}}>
          Desarrollador de Software · Soporte TI · Apasionado por Linux
        </p>

        {/* Descripción */}
        <p style={{color: '#6b7280', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.7'}}>
          Estudiante de Ingeniería en Sistemas en Piedecuesta, Colombia.
          Construyo herramientas reales con Linux, Java, y tecnologías web modernas.
          Cada día aprendo algo nuevo.
        </p>

        {/* Botones */}
        <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px'}}>
          <Link href="/proyectos" style={{
            background: '#9333ea',
            color: 'white',
            fontWeight: '600',
            padding: '14px 32px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontSize: '15px',
            transition: 'background 0.2s'
          }}>
            Ver mis proyectos
          </Link>
          <Link href="/contacto" style={{
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            fontWeight: '600',
            padding: '14px 32px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontSize: '15px'
          }}>
            Contáctame
          </Link>
        </div>

        {/* Skills */}
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px'}}>
          {['Linux', 'Java', 'Next.js', 'JavaScript', 'MySQL', 'Docker', 'Google Cloud', 'Firebase'].map((skill) => (
            <span key={skill} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#9ca3af',
              fontSize: '13px',
              padding: '6px 16px',
              borderRadius: '999px'
            }}>
              {skill}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
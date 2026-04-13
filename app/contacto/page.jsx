'use client'

import { useState } from 'react'

export default function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' })
  const [estado, setEstado] = useState('idle')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEstado('enviando')
    try {
      const response = await fetch('https://formspree.io/f/mbdqrqyo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setEstado('enviado')
        setFormData({ nombre: '', email: '', mensaje: '' })
      } else {
        setEstado('error')
      }
    } catch {
      setEstado('error')
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    color: '#9ca3af',
    fontSize: '13px',
    fontWeight: '500',
    display: 'block',
    marginBottom: '8px',
  }

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
            padding: '6px 16px',
            borderRadius: '999px',
            marginBottom: '20px'
          }}>
            📬 Contacto
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '800',
            color: 'white',
            marginBottom: '16px'
          }}>
            Hablemos{' '}
            <span style={{
              background: 'linear-gradient(to right, #c084fc, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              juntos
            </span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>
            ¿Tienes un proyecto, una oportunidad o quieres conectar? Escríbeme, respondo rápido.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { emoji: '📧', titulo: 'Email', valor: 'fdavid1704@gmail.com', href: 'mailto:fdavid1704@gmail.com' },
              { emoji: '💻', titulo: 'GitHub', valor: 'github.com/D0nFrancisco', href: 'https://github.com/D0nFrancisco' },
              { emoji: '📸', titulo: 'Instagram', valor: '@frank17_g', href: 'https://www.instagram.com/frank17_g/' },
              { emoji: '📍', titulo: 'Ubicación', valor: 'Piedecuesta, Colombia', href: null },
            ].map((item) => (
              <div key={item.titulo} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <span style={{ fontSize: '24px' }}>{item.emoji}</span>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '12px', margin: '0 0 4px' }}>{item.titulo}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      style={{ color: '#e5e7eb', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
                      {item.valor}
                    </a>
                  ) : (
                    <p style={{ color: '#e5e7eb', fontSize: '14px', fontWeight: '500', margin: 0 }}>{item.valor}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Formulario */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '32px'
          }}>
            {estado === 'enviado' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>¡Mensaje enviado!</h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>Te responderé lo antes posible.</p>
                <button onClick={() => setEstado('idle')}
                  style={{ color: '#c084fc', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <div>
                  <label style={labelStyle}>Nombre</label>
                  <input type="text" name="nombre" value={formData.nombre}
                    onChange={handleChange} required placeholder="Tu nombre" style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" name="email" value={formData.email}
                    onChange={handleChange} required placeholder="tu@email.com" style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Mensaje</label>
                  <textarea name="mensaje" value={formData.mensaje}
                    onChange={handleChange} required placeholder="Cuéntame sobre tu proyecto..."
                    rows={5} style={{ ...inputStyle, resize: 'none' }} />
                </div>

                {estado === 'error' && (
                  <p style={{ color: '#f87171', fontSize: '13px', textAlign: 'center' }}>
                    Hubo un error. Intenta de nuevo.
                  </p>
                )}

                <button type="submit" disabled={estado === 'enviando'} style={{
                  background: estado === 'enviando' ? '#6b21a8' : '#9333ea',
                  color: 'white',
                  fontWeight: '600',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: estado === 'enviando' ? 'not-allowed' : 'pointer',
                  fontSize: '15px',
                  transition: 'background 0.2s'
                }}>
                  {estado === 'enviando' ? '⏳ Enviando...' : 'Enviar mensaje →'}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
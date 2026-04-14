'use client'

import { useState } from 'react'
import { useLang } from '@/context/LangContext'

export default function Contacto() {
  const { t } = useLang()
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' })
  const [estado, setEstado] = useState('idle')
  const [hovInput, setHovInput] = useState(null)
  const [hovBtn, setHovBtn] = useState(false)
  const [hovCard, setHovCard] = useState(null)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

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

  const contactItems = [
    { emoji: '📧', titulo: 'Email', valor: 'fdavid1704@gmail.com', href: 'mailto:fdavid1704@gmail.com' },
    { emoji: '💻', titulo: 'GitHub', valor: 'github.com/D0nFrancisco', href: 'https://github.com/D0nFrancisco' },
    { emoji: '📸', titulo: 'Instagram', valor: '@frank17_g', href: 'https://www.instagram.com/frank17_g/' },
    { emoji: '📍', titulo: t.contacto.ubicacion, valor: t.contacto.remoto, href: null },
  ]

  const inputStyle = (campo) => ({
    width: '100%', boxSizing: 'border-box',
    background: hovInput === campo ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.05)',
    border: hovInput === campo ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px', padding: '12px 16px',
    color: 'white', fontSize: '14px', outline: 'none',
    transition: 'all 0.2s'
  })

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 24px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc',
            fontSize: '13px', padding: '6px 16px', borderRadius: '999px', marginBottom: '20px'
          }}>
            {t.contacto.badge}
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', color: 'white', marginBottom: '16px' }}>
            {t.contacto.titulo1}{' '}
            <span style={{ background: 'linear-gradient(to right, #c084fc, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t.contacto.titulo2}
            </span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>
            {t.contacto.descripcion}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>

          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {contactItems.map((item) => (
              <div key={item.titulo}
                onMouseEnter={() => setHovCard(item.titulo)}
                onMouseLeave={() => setHovCard(null)}
                style={{
                  background: hovCard === item.titulo ? 'rgba(168,85,247,0.07)' : 'rgba(255,255,255,0.03)',
                  border: hovCard === item.titulo ? '1px solid rgba(168,85,247,0.35)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px', padding: '20px 24px',
                  display: 'flex', alignItems: 'center', gap: '16px',
                  transition: 'all 0.25s',
                  transform: hovCard === item.titulo ? 'translateX(6px)' : 'translateX(0)',
                  boxShadow: hovCard === item.titulo ? '0 8px 25px rgba(147,51,234,0.1)' : 'none'
                }}>
                <span style={{
                  fontSize: '24px', transition: 'transform 0.3s', display: 'inline-block',
                  transform: hovCard === item.titulo ? 'scale(1.2)' : 'scale(1)'
                }}>
                  {item.emoji}
                </span>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '12px', margin: '0 0 4px' }}>{item.titulo}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      style={{ color: hovCard === item.titulo ? '#c084fc' : '#e5e7eb', fontSize: '14px', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }}>
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
            borderRadius: '20px', padding: '32px'
          }}>
            {estado === 'enviado' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{t.contacto.enviado}</h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>{t.contacto.exitoDesc}</p>
                <button onClick={() => setEstado('idle')}
                  style={{ color: '#c084fc', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}>
                  {t.contacto.otroMensaje}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <div>
                  <label style={{ color: '#9ca3af', fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
                    {t.contacto.nombre}
                  </label>
                  <input type="text" name="nombre" value={formData.nombre}
                    onChange={handleChange} required
                    placeholder={t.contacto.placeholder.nombre}
                    onFocus={() => setHovInput('nombre')}
                    onBlur={() => setHovInput(null)}
                    style={inputStyle('nombre')} />
                </div>

                <div>
                  <label style={{ color: '#9ca3af', fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
                    {t.contacto.email}
                  </label>
                  <input type="email" name="email" value={formData.email}
                    onChange={handleChange} required
                    placeholder={t.contacto.placeholder.email}
                    onFocus={() => setHovInput('email')}
                    onBlur={() => setHovInput(null)}
                    style={inputStyle('email')} />
                </div>

                <div>
                  <label style={{ color: '#9ca3af', fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
                    {t.contacto.mensaje}
                  </label>
                  <textarea name="mensaje" value={formData.mensaje}
                    onChange={handleChange} required
                    placeholder={t.contacto.placeholder.mensaje}
                    rows={5}
                    onFocus={() => setHovInput('mensaje')}
                    onBlur={() => setHovInput(null)}
                    style={{ ...inputStyle('mensaje'), resize: 'none' }} />
                </div>

                {estado === 'error' && (
                  <p style={{ color: '#f87171', fontSize: '13px', textAlign: 'center' }}>
                    {t.contacto.error}
                  </p>
                )}

                <button type="submit" disabled={estado === 'enviando'}
                  onMouseEnter={() => setHovBtn(true)}
                  onMouseLeave={() => setHovBtn(false)}
                  style={{
                    background: estado === 'enviando' ? '#6b21a8' : hovBtn ? '#7e22ce' : '#9333ea',
                    color: 'white', fontWeight: '600', padding: '14px',
                    borderRadius: '12px', border: 'none',
                    cursor: estado === 'enviando' ? 'not-allowed' : 'pointer',
                    fontSize: '15px', transition: 'all 0.2s',
                    transform: hovBtn && estado !== 'enviando' ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hovBtn && estado !== 'enviando' ? '0 8px 25px rgba(147,51,234,0.4)' : 'none'
                  }}>
                  {estado === 'enviando' ? t.contacto.enviando : t.contacto.btn}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
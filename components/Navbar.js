'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/context/LangContext'

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [hover, setHover] = useState(null)
  const { lang, toggleLang, t } = useLang()

  const links = [
    ['/', t.nav.inicio],
    ['/proyectos', t.nav.proyectos],
    ['/contacto', t.nav.contacto],
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 50,
      background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Link href="/" style={{ fontSize: '20px', fontWeight: '700', color: 'white', textDecoration: 'none' }}>
          Frank<span style={{ color: '#a855f7' }}>.</span>dev
        </Link>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {links.map(([href, label]) => (
            <Link key={href} href={href}
              onMouseEnter={() => setHover(href)}
              onMouseLeave={() => setHover(null)}
              style={{
                color: hover === href ? '#c084fc' : '#9ca3af',
                textDecoration: 'none', fontSize: '14px', fontWeight: '500',
                transition: 'color 0.2s',
              }}>
              {label}
            </Link>
          ))}

          {/* Botón ES / EN */}
          <button
            onClick={toggleLang}
            style={{
              background: 'rgba(168,85,247,0.1)',
              border: '1px solid rgba(168,85,247,0.3)',
              color: '#c084fc',
              fontSize: '13px', fontWeight: '700',
              padding: '6px 14px', borderRadius: '999px',
              cursor: 'pointer', transition: 'all 0.2s',
              letterSpacing: '0.05em'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(168,85,247,0.25)'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(168,85,247,0.1)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>

          {/* GitHub */}
          <a href="https://github.com/D0nFrancisco" target="_blank" rel="noopener noreferrer"
            onMouseEnter={e => {
              e.currentTarget.style.background = '#7e22ce'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#9333ea'
              e.currentTarget.style.transform = 'scale(1)'
            }}
            style={{
              background: '#9333ea', color: 'white',
              fontSize: '13px', fontWeight: '600',
              padding: '8px 16px', borderRadius: '8px',
              textDecoration: 'none', transition: 'all 0.2s'
            }}>
            GitHub →
          </a>
        </div>
      </div>
    </nav>
  )
}
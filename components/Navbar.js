'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 50,
      background: 'rgba(10,10,10,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }}>
      <div style={{maxWidth: '1100px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

        <Link href="/" style={{fontSize: '20px', fontWeight: '700', color: 'white', textDecoration: 'none'}}>
          Frank<span style={{color: '#a855f7'}}>.</span>dev
        </Link>

        <div style={{display: 'flex', gap: '32px', alignItems: 'center'}}>
          {[['/', 'Inicio'], ['/proyectos', 'Proyectos'], ['/contacto', 'Contacto']].map(([href, label]) => (
            <Link 
              key={href} 
              href={href} 
              style={{color: '#9ca3af', textDecoration: 'none', fontSize: '14px', fontWeight: '500'}}
            >
              {label}
            </Link>
          ))}

          <a
            href="https://github.com/D0nFrancisco"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#9333ea',
              color: 'white',
              fontSize: '13px',
              fontWeight: '600',
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none'
            }}
          >
            GitHub →
          </a>

        </div>
      </div>
    </nav>
  )
}
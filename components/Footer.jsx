'use client'

import { useLang } from '@/context/LangContext'

export default function Footer() {
  const { t } = useLang()
  const anio = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div>
          <p style={{ color: 'white', fontWeight: '700', fontSize: '18px' }}>
            Frank<span style={{ color: '#a855f7' }}>.</span>dev
          </p>
          <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '4px' }}>{t.footer.subtitulo}</p>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/D0nFrancisco' },
            { label: 'Instagram', href: 'https://www.instagram.com/frank17_g/' },
            { label: 'Email', href: 'mailto:fdavid1704@gmail.com' },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#c084fc'}
              onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}>
              {link.label}
            </a>
          ))}
        </div>
        <p style={{ color: '#4b5563', fontSize: '13px' }}>
          © {anio} Frank Gualdron. {t.footer.derechos}
        </p>
      </div>
    </footer>
  )
}
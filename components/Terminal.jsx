'use client'

import { useEffect, useRef, useState } from 'react'

const lineas = [
  { cmd: '$ whoami', out: 'frank_gualdron' },
  { cmd: '$ cat habilidades.txt', out: 'Linux · Java · Next.js · Docker · MySQL · Google Cloud' },
  { cmd: '$ systemctl status desarrollador', out: '● desarrollador.service — Active: running 🟢' },
  { cmd: '$ git log --oneline', out: 'a1b2c3f feat: portafolio profesional desplegado\nd4e5f6a feat: taskflow API REST completada\n9g8h7i6 feat: sysguard monitor linux' },
  { cmd: '$ echo $DISPONIBLE', out: 'true — Listo para trabajar 🚀' },
]

export default function Terminal() {
  const [visibles, setVisibles] = useState([])
  const [writing, setWriting] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [showOut, setShowOut] = useState(false)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || lineIdx >= lineas.length) return
    const line = lineas[lineIdx]

    if (!showOut && charIdx <= line.cmd.length) {
      const t = setTimeout(() => {
        setWriting(line.cmd.slice(0, charIdx))
        setCharIdx(c => c + 1)
      }, 55)
      return () => clearTimeout(t)
    }

    if (!showOut && charIdx > line.cmd.length) {
      const t = setTimeout(() => setShowOut(true), 300)
      return () => clearTimeout(t)
    }

    if (showOut) {
      const t = setTimeout(() => {
        setVisibles(v => [...v, { cmd: line.cmd, out: line.out }])
        setWriting('')
        setCharIdx(0)
        setShowOut(false)
        setLineIdx(i => i + 1)
      }, 900)
      return () => clearTimeout(t)
    }
  }, [started, lineIdx, charIdx, showOut])

  return (
    <section ref={ref} style={{ padding: '0 24px 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc',
            fontSize: '13px', padding: '6px 16px', borderRadius: '999px', marginBottom: '16px'
          }}>
            🖥️ Terminal
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '700', color: 'white' }}>
            Hablemos en mi{' '}
            <span style={{ background: 'linear-gradient(to right, #c084fc, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              idioma
            </span>
          </h2>
        </div>

        <div style={{
          background: '#0d0d0d',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px', overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          maxWidth: '750px', margin: '0 auto'
        }}>
          {/* Barra superior */}
          <div style={{
            background: '#1a1a1a', padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: '8px',
            borderBottom: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
            <span style={{ color: '#6b7280', fontSize: '12px', marginLeft: '8px', fontFamily: 'monospace' }}>
              frank@portfolio ~ bash
            </span>
          </div>

          {/* Contenido terminal */}
          <div style={{ padding: '24px', fontFamily: 'monospace', fontSize: '14px', minHeight: '280px' }}>
            {visibles.map((line, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ color: '#a855f7', marginBottom: '4px' }}>{line.cmd}</div>
                <div style={{ color: '#4ade80', whiteSpace: 'pre-line', paddingLeft: '8px' }}>{line.out}</div>
              </div>
            ))}

            {lineIdx < lineas.length && (
              <div>
                <span style={{ color: '#a855f7' }}>{writing}</span>
                <span style={{
                  display: 'inline-block', width: '8px', height: '16px',
                  background: '#a855f7', marginLeft: '2px', verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite'
                }} />
                {showOut && (
                  <div style={{ color: '#4ade80', marginTop: '4px', paddingLeft: '8px', whiteSpace: 'pre-line' }}>
                    {lineas[lineIdx].out}
                  </div>
                )}
              </div>
            )}

            {lineIdx >= lineas.length && (
              <div style={{ color: '#a855f7' }}>
                $ <span style={{
                  display: 'inline-block', width: '8px', height: '16px',
                  background: '#a855f7', marginLeft: '2px', verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite'
                }} />
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  )
}
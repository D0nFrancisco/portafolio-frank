'use client'

import { useEffect, useRef, useState } from 'react'

export default function CounterStat({ numero, texto, emoji }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  // Extraer el número final (ej: "3+", "100%" → 3, 100)
  const isPlus = numero.includes('+')
  const isPercent = numero.includes('%')
  const target = parseInt(numero)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let current = 0
    const step = Math.ceil(target / 40)
    const interval = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(current)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [started, target])

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '28px', marginBottom: '8px' }}>{emoji}</div>
      <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'white', marginBottom: '4px' }}>
        {count}{isPlus ? '+' : ''}{isPercent ? '%' : ''}
      </div>
      <div style={{ color: '#6b7280', fontSize: '13px' }}>{texto}</div>
    </div>
  )
}
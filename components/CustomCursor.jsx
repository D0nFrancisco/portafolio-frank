'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }
    window.addEventListener('mousemove', move)

    let animId
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`
      }
      animId = requestAnimationFrame(animate)
    }
    animate()

    const addHover = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '48px'
        ringRef.current.style.height = '48px'
        ringRef.current.style.borderColor = '#ec4899'
        ringRef.current.style.marginLeft = '-6px'
        ringRef.current.style.marginTop = '-6px'
      }
    }
    const removeHover = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '36px'
        ringRef.current.style.height = '36px'
        ringRef.current.style.borderColor = '#a855f7'
        ringRef.current.style.marginLeft = '0'
        ringRef.current.style.marginTop = '0'
      }
    }

    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(animId)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  return (
    <>
      {/* Punto central */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: '8px', height: '8px',
        background: '#a855f7',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'background 0.2s',
      }} />
      {/* Anillo que sigue con retraso */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: '36px', height: '36px',
        border: '1.5px solid #a855f7',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9998,
        transition: 'width 0.2s, height 0.2s, border-color 0.2s',
      }} />
    </>
  )
}
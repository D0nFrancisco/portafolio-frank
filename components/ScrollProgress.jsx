'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', update)
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '3px',
      background: 'rgba(255,255,255,0.05)',
      zIndex: 9997,
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: 'linear-gradient(to right, #a855f7, #ec4899)',
        transition: 'width 0.1s linear',
        boxShadow: '0 0 8px rgba(168,85,247,0.8)',
      }} />
    </div>
  )
}
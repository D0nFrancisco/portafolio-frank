'use client'

import { useEffect, useState } from 'react'

export default function TypeWriter({ texts, speed = 80, pause = 1800 }) {
  const [display, setDisplay] = useState('')
  const [index, setIndex] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[index]
    let timeout

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx))
        setCharIdx(c => c + 1)
      }, speed)
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx))
        setCharIdx(c => c - 1)
      }, speed / 2)
    } else {
      setDeleting(false)
      setIndex(i => (i + 1) % texts.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, index, texts, speed, pause])

  return (
    <span>
      {display}
      <span style={{
        display: 'inline-block',
        width: '2px', height: '1.1em',
        background: '#a855f7',
        marginLeft: '2px',
        verticalAlign: 'text-bottom',
        animation: 'blink 1s step-end infinite',
      }} />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  )
}
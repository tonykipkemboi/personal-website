'use client'

import { useEffect, useState, useCallback } from 'react'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
]

const RETRO_DURATION = 8000

export function KonamiCode() {
  const [, setInput] = useState<string[]>([])
  const [active, setActive] = useState(false)
  const [bootText, setBootText] = useState('')

  const activate = useCallback(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    setActive(true)
    document.documentElement.classList.add('retro-mode')

    const lines = [
      '> SYSTEM BREACH DETECTED...',
      '> LOADING TONY_OS v1.0.0',
      '> INITIALIZING RETRO MODE...',
      '> WELCOME, HACKER.',
      '',
      '> STATUS: US ARMY VET / AI ENGINEER',
      '> LOCATION: WASHINGTON DC',
      '> MISSION: BUILD THE FUTURE',
      '',
      '> RESUMING NORMAL OPERATIONS IN 5s...',
    ]

    // If user prefers reduced motion, show text instantly
    if (prefersReducedMotion) {
      setBootText(lines.join('\n'))
    } else {
      let currentText = ''
      let lineIndex = 0
      let charIndex = 0

      const typeWriter = setInterval(() => {
        if (lineIndex >= lines.length) {
          clearInterval(typeWriter)
          return
        }

        const line = lines[lineIndex]
        if (charIndex <= line.length) {
          currentText =
            lines.slice(0, lineIndex).join('\n') +
            '\n' +
            line.slice(0, charIndex)
          setBootText(currentText)
          charIndex++
        } else {
          lineIndex++
          charIndex = 0
        }
      }, 30)

      setTimeout(() => {
        clearInterval(typeWriter)
      }, RETRO_DURATION - 100)
    }

    setTimeout(() => {
      setActive(false)
      setBootText('')
      document.documentElement.classList.remove('retro-mode')
    }, RETRO_DURATION)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setInput((prev) => {
        const next = [...prev, e.code].slice(-KONAMI_CODE.length)
        if (
          next.length === KONAMI_CODE.length &&
          next.every((key, i) => key === KONAMI_CODE[i])
        ) {
          activate()
          return []
        }
        return next
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activate])

  if (!active) return null

  return (
    <div className="retro-overlay">
      <div className="retro-scanlines" />
      <div className="retro-terminal">
        <pre className="retro-text">
          {bootText}
          <span className="retro-cursor">_</span>
        </pre>
      </div>
    </div>
  )
}

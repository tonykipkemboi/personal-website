'use client'

import { useEffect, useRef } from 'react'

interface ElevenLabsPlayerProps {
  publicUserId: string
  height?: string
  width?: string
}

export function ElevenLabsPlayer({
  publicUserId,
  height = '90',
  width = '100%',
}: ElevenLabsPlayerProps) {
  const scriptLoaded = useRef(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector(
      'script[src="https://elevenlabs.io/player/audioNativeHelper.js"]'
    )

    const initializeWidget = () => {
      // Give the widget a moment to initialize after script loads
      setTimeout(() => {
        if (widgetRef.current) {
          // Trigger re-initialization if needed
          const event = new Event('DOMContentLoaded', {
            bubbles: true,
            cancelable: true
          })
          document.dispatchEvent(event)
        }
      }, 100)
    }

    if (existingScript) {
      // Script already loaded, just initialize
      if (!scriptLoaded.current) {
        scriptLoaded.current = true
        initializeWidget()
      }
      return
    }

    // Load the ElevenLabs AudioNative helper script
    const script = document.createElement('script')
    script.src = 'https://elevenlabs.io/player/audioNativeHelper.js'
    script.type = 'text/javascript'
    script.async = true

    script.onload = () => {
      scriptLoaded.current = true
      console.log('ElevenLabs AudioNative script loaded')
      initializeWidget()
    }

    script.onerror = () => {
      console.error('Failed to load ElevenLabs AudioNative script')
    }

    document.body.appendChild(script)

    // No cleanup - let the script persist for navigation
  }, [])

  return (
    <div className="my-6 not-prose">
      <div
        ref={widgetRef}
        id="elevenlabs-audionative-widget"
        data-height={height}
        data-width={width}
        data-frameborder="no"
        data-scrolling="no"
        data-publicuserid={publicUserId}
        data-playerurl="https://elevenlabs.io/player/index.html"
      >
        Loading audio player...
      </div>
    </div>
  )
}

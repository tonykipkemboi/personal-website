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

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector(
      'script[src="https://elevenlabs.io/player/audioNativeHelper.js"]'
    )

    if (existingScript || scriptLoaded.current) {
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
        id="elevenlabs-audionative-widget"
        data-height={height}
        data-width={width}
        data-frameborder="no"
        data-scrolling="no"
        data-publicuserid={publicUserId}
        data-playerurl="https://elevenlabs.io/player/index.html"
      >
        Loading the{' '}
        <a
          href="https://elevenlabs.io/text-to-speech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          Elevenlabs Text to Speech
        </a>{' '}
        AudioNative Player...
      </div>
    </div>
  )
}

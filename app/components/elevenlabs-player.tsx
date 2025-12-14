'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://elevenlabs.io/player/audioNativeHelper.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [pathname]) // Reinitialize on route change

  return (
    <div className="my-6 not-prose">
      <div
        id="elevenlabs-audionative-widget"
        data-publicuserid={publicUserId}
        data-playerurl="https://elevenlabs.io/player/index.html"
        data-height={height}
        data-width={width}
        data-frameborder="no"
        data-scrolling="no"
      >
        Loading audio player...
      </div>
    </div>
  )
}

'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface ElevenLabsPlayerProps {
  publicUserId: string
}

export function ElevenLabsPlayer({ publicUserId }: ElevenLabsPlayerProps) {
  const pathname = usePathname()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://elevenlabs.io/player/audioNativeHelper.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [pathname])

  return (
    <div className="my-4 not-prose">
      <div
        id="elevenlabs-audionative-widget"
        data-publicuserid={publicUserId}
        data-playerurl="https://elevenlabs.io/player/index.html"
        data-small="true"
        data-textcolor="rgba(0, 0, 0, 1)"
        data-backgroundcolor="rgba(250, 250, 250, 1)"
        data-height="44"
        data-width="100%"
        data-frameborder="no"
        data-scrolling="no"
      />
    </div>
  )
}

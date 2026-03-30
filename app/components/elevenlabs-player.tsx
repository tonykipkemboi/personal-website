'use client'

import { usePathname } from 'next/navigation'

interface ElevenLabsPlayerProps {
  publicUserId: string
}

export function ElevenLabsPlayer({ publicUserId }: ElevenLabsPlayerProps) {
  const pathname = usePathname()
  const src = `https://elevenlabs.io/player/index.html?publicUserId=${publicUserId}&small=true&textColor=rgba(0,0,0,1)&backgroundColor=rgba(250,250,250,1)`

  return (
    <div className="my-4 not-prose">
      <iframe
        key={pathname}
        src={src}
        width="100%"
        height="44"
        frameBorder="no"
        scrolling="no"
        className="rounded-lg"
        title="Listen to article"
      />
    </div>
  )
}

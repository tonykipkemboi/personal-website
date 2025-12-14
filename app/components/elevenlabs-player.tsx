'use client'

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
  // Build the iframe URL directly
  const playerUrl = `https://elevenlabs.io/player/index.html?publicUserId=${publicUserId}&small=true&textColor=rgba(0,0,0,1)&backgroundColor=rgba(255,255,255,1)`

  return (
    <div className="my-6 not-prose">
      <iframe
        src={playerUrl}
        width={width}
        height={height}
        frameBorder="0"
        scrolling="no"
        style={{
          border: 'none',
          width: width,
          height: `${height}px`
        }}
        title="Audio player"
      />
    </div>
  )
}

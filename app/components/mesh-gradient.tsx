'use client'

import { MeshGradient } from '@paper-design/shaders-react'

/**
 * Animated ink-tone mesh gradient — the single expressive moment of the site.
 * Params mirror the Paper shaders playground export.
 */
export function HeroMesh() {
  return (
    <div className="relative aspect-square w-full max-w-[440px] overflow-hidden rounded-[28px]">
      <MeshGradient
        width="100%"
        height="100%"
        colors={['#ffffff', '#0a0a0a', '#9a9a9a', '#dcdcdc']}
        distortion={1}
        swirl={0.2}
        speed={1}
        rotation={90}
        style={{ position: 'absolute', inset: 0 }}
      />
      <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-2 backdrop-blur">
        <span className="h-[7px] w-[7px] rounded-full bg-[#0a0a0a]" />
        <span className="text-xs text-[#0a0a0a]">
          open to interesting problems
        </span>
      </div>
    </div>
  )
}

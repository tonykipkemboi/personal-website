'use client'

import { MeshGradient } from '@paper-design/shaders-react'

/**
 * Animated ink mesh used as a contained backdrop for the top of the page.
 * Masked to the top-right and faded out so it never bleeds into the content.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-[120px] -z-10 h-[860px] overflow-hidden"
    >
      <MeshGradient
        width="100%"
        height="100%"
        colors={['#ffffff', '#dcdcdc', '#9a9a9a', '#5a5a5a']}
        distortion={1}
        swirl={0.18}
        speed={0.6}
        rotation={90}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          WebkitMaskImage:
            'radial-gradient(1100px 760px at 100% 8%, #000 0%, transparent 62%)',
          maskImage:
            'radial-gradient(1100px 760px at 100% 8%, #000 0%, transparent 62%)',
        }}
      />
      {/* Fade the bottom edge into the white page so it never touches content */}
      <div
        className="absolute inset-x-0 bottom-0 h-56"
        style={{
          background: 'linear-gradient(180deg, transparent, #ffffff)',
        }}
      />
    </div>
  )
}

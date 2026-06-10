import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

// Render in the Node.js runtime so large hero JPEGs decode reliably.
export const runtime = 'nodejs'

// Geist TTFs live in public/fonts and are fetched over the request origin (same
// mechanism as the hero image) — robust across dev, `next start`, and Vercel.
async function loadFont(origin: string, file: string): Promise<ArrayBuffer> {
  const res = await fetch(new URL(`/fonts/${file}`, origin))
  return res.arrayBuffer()
}

// Scale the title down as it gets longer so it always fits two lines.
function titleSize(title: string): number {
  const len = title.length
  if (len <= 28) return 62
  if (len <= 45) return 54
  if (len <= 70) return 46
  return 40
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const title = searchParams.get('title')?.slice(0, 140) || 'Tony Kipkemboi'
  const category = searchParams.get('category') || ''
  const imageParam = searchParams.get('image') || ''

  // Resolve the hero (and avatar) against the current origin so brand-new,
  // not-yet-on-prod images still render in local preview.
  const heroUrl = imageParam ? new URL(imageParam, origin).toString() : ''
  const avatarUrl = new URL('/headshot.jpg', origin).toString()

  const [regular, medium, semibold, bold] = await Promise.all([
    loadFont(origin, 'Geist-Regular.ttf'),
    loadFont(origin, 'Geist-Medium.ttf'),
    loadFont(origin, 'Geist-SemiBold.ttf'),
    loadFont(origin, 'Geist-Bold.ttf'),
  ])

  const ink = '#0a0a0a'
  const muted = '#8a8a8a'

  const eyebrow = (size: number) =>
    category ? (
      <div
        style={{
          display: 'flex',
          fontFamily: 'Geist',
          fontWeight: 600,
          fontSize: `${size}px`,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: muted,
          marginBottom: '16px',
        }}
      >
        {category}
      </div>
    ) : null

  const byline = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatarUrl}
        alt=""
        width={44}
        height={44}
        style={{ width: '44px', height: '44px', borderRadius: '22px' }}
      />
      <div
        style={{
          display: 'flex',
          fontFamily: 'Geist',
          fontWeight: 500,
          fontSize: '24px',
          color: ink,
        }}
      >
        Tony Kipkemboi
      </div>
      <div
        style={{
          display: 'flex',
          fontFamily: 'Geist',
          fontWeight: 400,
          fontSize: '24px',
          color: muted,
          marginLeft: 'auto',
        }}
      >
        tonykipkemboi.com
      </div>
    </div>
  )

  // Two layouts: a split card when the post has a hero image, and a full-bleed
  // editorial card (large centered title) when it doesn't.
  const card = heroUrl ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '392px',
          overflow: 'hidden',
          backgroundColor: '#f4f4f4',
          borderBottom: '1px solid #ececec',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroUrl}
          alt=""
          width={1200}
          height={392}
          style={{ width: '1200px', height: '392px', objectFit: 'cover' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '40px 56px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow(20)}
          <div
            style={{
              display: 'flex',
              fontFamily: 'Geist',
              fontWeight: 600,
              fontSize: `${titleSize(title)}px`,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              color: ink,
              lineClamp: 2,
            }}
          >
            {title}
          </div>
        </div>
        {byline}
      </div>
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '72px 72px 64px',
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {eyebrow(22)}
        <div
          style={{
            display: 'flex',
            fontFamily: 'Geist',
            fontWeight: 600,
            fontSize: `${Math.min(84, titleSize(title) + 16)}px`,
            lineHeight: 1.08,
            letterSpacing: '-2px',
            color: ink,
            lineClamp: 3,
          }}
        >
          {title}
        </div>
      </div>
      {byline}
    </div>
  )

  return new ImageResponse(card, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Geist', data: regular, weight: 400, style: 'normal' },
      { name: 'Geist', data: medium, weight: 500, style: 'normal' },
      { name: 'Geist', data: semibold, weight: 600, style: 'normal' },
      { name: 'Geist', data: bold, weight: 700, style: 'normal' },
    ],
  })
}

import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#111010',
          padding: '40px 80px',
          position: 'relative',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)',
          }}
        />
        
        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: 'white',
            marginBottom: 16,
          }}
        >
          Tony Kipkemboi
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 32,
            color: '#888',
            marginTop: 8,
          }}
        >
          Developer Advocate & Content Creator
        </div>

        {/* Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 80,
            fontSize: 24,
            color: '#666',
          }}
        >
          tonykipkemboi.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
} 
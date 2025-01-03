import { createClient } from '@vercel/edge-config'
import { NextResponse } from 'next/server'

const config = createClient(process.env.EDGE_CONFIG)

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }

  const views = Number(await config.get(`views:${slug}`)) || 0
  return NextResponse.json({ views })
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }

  const currentViews = Number(await config.get(`views:${slug}`)) || 0
  const newViews = currentViews + 1
  
  // Use the Edge Config API directly
  await fetch(`https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG}/items`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${process.env.EDGE_CONFIG_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [
        {
          operation: 'upsert',
          key: `views:${slug}`,
          value: newViews
        }
      ]
    })
  })

  return NextResponse.json({ views: newViews })
} 
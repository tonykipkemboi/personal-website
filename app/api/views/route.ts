import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

export async function POST(req: Request) {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.error('Redis credentials are not set')
    return NextResponse.json({ error: 'Redis configuration missing' }, { status: 500 })
  }

  try {
    const { slug } = await req.json()
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const views = await redis.incr(`pageviews:${slug}`)
    return NextResponse.json({ views })
  } catch (error) {
    console.error('Error incrementing views:', error)
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.error('Redis credentials are not set')
    return NextResponse.json({ error: 'Redis configuration missing' }, { status: 500 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const views = await redis.get<number>(`pageviews:${slug}`) || 0
    return NextResponse.json({ views })
  } catch (error) {
    console.error('Error getting views:', error)
    return NextResponse.json({ error: 'Failed to get views' }, { status: 500 })
  }
}

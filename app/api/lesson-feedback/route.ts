import { NextRequest, NextResponse } from 'next/server'

type Vote = 'up' | 'down'

const FEEDBACK_TABLE = 'lesson_feedback'
const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SECRET_KEY =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

function isConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_SECRET_KEY)
}

function feedbackHeaders() {
  return {
    apikey: SUPABASE_SECRET_KEY!,
    Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
    'Content-Type': 'application/json',
  }
}

function filterValue(value: string) {
  return encodeURIComponent(value)
}

function parseCount(contentRange: string | null) {
  if (!contentRange) return 0

  const [, total] = contentRange.split('/')
  const count = Number(total)

  return Number.isFinite(count) ? count : 0
}

async function getUpCount(courseSlug: string, lessonSlug: string) {
  if (!isConfigured()) return 0

  const params = [
    `course_slug=eq.${filterValue(courseSlug)}`,
    `lesson_slug=eq.${filterValue(lessonSlug)}`,
    'vote=eq.up',
    'select=id',
  ].join('&')

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/${FEEDBACK_TABLE}?${params}`,
    {
      headers: {
        ...feedbackHeaders(),
        Prefer: 'count=exact',
      },
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error('Could not read lesson feedback.')
  }

  return parseCount(response.headers.get('content-range'))
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const courseSlug = searchParams.get('course')
  const lessonSlug = searchParams.get('lesson')

  if (!courseSlug || !lessonSlug) {
    return NextResponse.json(
      { error: 'course and lesson are required' },
      { status: 400 }
    )
  }

  if (!isConfigured()) {
    return NextResponse.json({ configured: false, upCount: 0 })
  }

  const upCount = await getUpCount(courseSlug, lessonSlug)

  return NextResponse.json({ configured: true, upCount })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const courseSlug = String(body.courseSlug || '').trim()
  const lessonSlug = String(body.lessonSlug || '').trim()
  const pagePath = String(body.pagePath || '').trim()
  const vote = String(body.vote || '').trim() as Vote
  const comment = String(body.comment || '')
    .trim()
    .slice(0, 1000)
  const website = String(body.website || '').trim()

  if (website) {
    return NextResponse.json({ ok: true, upCount: 0 })
  }

  if (!courseSlug || !lessonSlug || !['up', 'down'].includes(vote)) {
    return NextResponse.json(
      { error: 'courseSlug, lessonSlug, and vote are required' },
      { status: 400 }
    )
  }

  if (!isConfigured()) {
    return NextResponse.json(
      { error: 'Lesson feedback is not configured.' },
      { status: 503 }
    )
  }

  const existingAnonymousId = request.cookies.get(
    'tk_lesson_feedback_id'
  )?.value
  const anonymousId = existingAnonymousId || crypto.randomUUID()
  const now = new Date().toISOString()
  const record = {
    course_slug: courseSlug,
    lesson_slug: lessonSlug,
    vote,
    comment: comment || null,
    page_path: pagePath || null,
    anonymous_id: anonymousId,
    user_agent: request.headers.get('user-agent'),
    referrer: request.headers.get('referer'),
    updated_at: now,
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/${FEEDBACK_TABLE}?on_conflict=course_slug,lesson_slug,anonymous_id`,
    {
      method: 'POST',
      headers: {
        ...feedbackHeaders(),
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify(record),
    }
  )

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Could not save lesson feedback.' },
      { status: 500 }
    )
  }

  const upCount = await getUpCount(courseSlug, lessonSlug)
  const result = NextResponse.json({ ok: true, upCount })

  if (!existingAnonymousId) {
    result.cookies.set('tk_lesson_feedback_id', anonymousId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
  }

  return result
}

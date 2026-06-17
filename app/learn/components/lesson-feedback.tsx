'use client'

import { useEffect, useMemo, useState } from 'react'

type Vote = 'up' | 'down'

type LessonFeedbackProps = {
  courseSlug: string
  lessonSlug: string
}

type FeedbackState = 'idle' | 'sending' | 'sent' | 'error'

const MAX_COMMENT_LENGTH = 1000

export function LessonFeedback({
  courseSlug,
  lessonSlug,
}: LessonFeedbackProps) {
  const [upCount, setUpCount] = useState<number | null>(null)
  const [vote, setVote] = useState<Vote | null>(null)
  const [comment, setComment] = useState('')
  const [website, setWebsite] = useState('')
  const [state, setState] = useState<FeedbackState>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const countText = useMemo(() => {
    if (!upCount) return 'Quick feedback helps me improve these notes.'
    if (upCount === 1) return '1 person found this useful.'
    return `${upCount} people found this useful.`
  }, [upCount])

  useEffect(() => {
    let active = true

    async function loadCount() {
      const params = new URLSearchParams({
        course: courseSlug,
        lesson: lessonSlug,
      })
      const response = await fetch(`/api/lesson-feedback?${params.toString()}`)

      if (!response.ok || !active) return

      const data = await response.json()
      if (typeof data.upCount === 'number') {
        setUpCount(data.upCount)
      }
    }

    loadCount().catch(() => {})

    return () => {
      active = false
    }
  }, [courseSlug, lessonSlug])

  async function submitFeedback(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!vote || state === 'sending') return

    setState('sending')
    setMessage(null)

    try {
      const response = await fetch('/api/lesson-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseSlug,
          lessonSlug,
          vote,
          comment,
          pagePath: window.location.pathname,
          website,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Feedback could not be saved.')
      }

      if (typeof data.upCount === 'number') {
        setUpCount(data.upCount)
      }

      setComment('')
      setState('sent')
      setMessage('Thanks. I read these when I revise the guide.')
    } catch {
      setState('error')
      setMessage('Feedback is temporarily unavailable. Please try again later.')
    }
  }

  return (
    <form
      onSubmit={submitFeedback}
      className="mt-10 border-t border-neutral-200 pt-7"
    >
      <input
        type="text"
        name="website"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-[#0a0a0a]">
            Was this lesson useful?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            {countText}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-pressed={vote === 'up'}
            onClick={() => {
              setVote('up')
              setState('idle')
              setMessage(null)
            }}
            className={`border px-4 py-2 text-sm transition-colors ${
              vote === 'up'
                ? 'border-[#0a0a0a] text-[#0a0a0a]'
                : 'border-neutral-200 text-neutral-500 hover:border-[#0a0a0a] hover:text-[#0a0a0a]'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            aria-pressed={vote === 'down'}
            onClick={() => {
              setVote('down')
              setState('idle')
              setMessage(null)
            }}
            className={`border px-4 py-2 text-sm transition-colors ${
              vote === 'down'
                ? 'border-[#0a0a0a] text-[#0a0a0a]'
                : 'border-neutral-200 text-neutral-500 hover:border-[#0a0a0a] hover:text-[#0a0a0a]'
            }`}
          >
            Not yet
          </button>
        </div>
      </div>

      {vote && state !== 'sent' && (
        <div className="mt-5">
          <label
            htmlFor={`${courseSlug}-${lessonSlug}-feedback`}
            className="text-sm text-neutral-500"
          >
            {vote === 'up'
              ? 'Anything I should add?'
              : 'What should I make clearer?'}
            <span className="text-neutral-400"> Optional.</span>
          </label>
          <textarea
            id={`${courseSlug}-${lessonSlug}-feedback`}
            value={comment}
            maxLength={MAX_COMMENT_LENGTH}
            onChange={(event) => setComment(event.target.value)}
            rows={3}
            className="mt-2 w-full resize-y border border-neutral-200 bg-white p-3 text-sm leading-relaxed text-[#0a0a0a] outline-none transition-colors placeholder:text-neutral-400 focus:border-[#0a0a0a]"
            placeholder="A missing example, confusing term, or follow-up topic."
          />
          <div className="mt-3 flex items-center justify-between gap-4">
            <span className="text-xs text-neutral-400">
              {comment.length}/{MAX_COMMENT_LENGTH}
            </span>
            <button
              type="submit"
              disabled={state === 'sending'}
              className="border-b border-[#0a0a0a] pb-0.5 text-sm text-[#0a0a0a] transition-opacity hover:opacity-60 disabled:opacity-40"
            >
              {state === 'sending' ? 'Sending...' : 'Send feedback'}
            </button>
          </div>
        </div>
      )}

      {message && (
        <p
          className={`mt-4 text-sm ${
            state === 'error' ? 'text-red-600' : 'text-neutral-500'
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  )
}

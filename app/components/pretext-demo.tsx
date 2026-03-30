'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

const DEFAULT_TEXT =
  'Pretext calculates how tall this text will be at any width without touching the DOM. Drag the slider to see it recalculate in real time. The left number comes from pretext. The right panel is the actual rendered text. They match.'

const FONT = '14px IBM Plex Mono, monospace'
const LINE_HEIGHT = 1.7 * 14

export function PretextDemo() {
  const [text, setText] = useState(DEFAULT_TEXT)
  const [width, setWidth] = useState(400)
  const [calculatedHeight, setCalculatedHeight] = useState(0)
  const [layoutTime, setLayoutTime] = useState(0)
  const [actualHeight, setActualHeight] = useState(0)
  const [ready, setReady] = useState(false)
  const pretextRef = useRef<{
    prepare: typeof import('@chenglou/pretext').prepare
    layout: typeof import('@chenglou/pretext').layout
  } | null>(null)

  // Load pretext client-side only
  useEffect(() => {
    import('@chenglou/pretext').then((mod) => {
      pretextRef.current = { prepare: mod.prepare, layout: mod.layout }
      setReady(true)
    })
  }, [])

  const renderedRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        setActualHeight(node.offsetHeight)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text, width]
  )

  // Recalculate when inputs change and pretext is loaded
  useEffect(() => {
    if (!pretextRef.current || !text) {
      setCalculatedHeight(0)
      setLayoutTime(0)
      return
    }
    const { prepare, layout } = pretextRef.current
    const prepared = prepare(text, FONT)
    const start = performance.now()
    const result = layout(prepared, width, LINE_HEIGHT)
    const elapsed = performance.now() - start
    setCalculatedHeight(Math.round(result.height))
    setLayoutTime(elapsed)
  }, [text, width, ready])

  const match = Math.abs(calculatedHeight - actualHeight) <= 2

  return (
    <div className="my-8 not-prose">
      <div className="mb-4">
        <span className="block text-sm text-neutral-500 mb-1">
          Text to measure
        </span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          aria-label="Text to measure"
          className="w-full p-3 text-sm bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg resize-none focus:outline-none focus:border-neutral-400"
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-neutral-500 mb-1">
          <span>Container width</span>
          <span>{width}px</span>
        </div>
        <input
          type="range"
          min={120}
          max={650}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          aria-label="Container width"
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <div className="text-xs text-neutral-400 mb-2">
            pretext calculated
          </div>
          <div className="text-2xl font-medium">{calculatedHeight}px</div>
          <div className="text-xs text-neutral-400 mt-1">
            in {layoutTime.toFixed(3)}ms
          </div>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <div className="text-xs text-neutral-400 mb-2">actual DOM height</div>
          <div className="text-2xl font-medium">{actualHeight}px</div>
          <div className="text-xs mt-1">
            {match ? (
              <span className="text-green-600">match</span>
            ) : (
              <span className="text-orange-500">
                off by {Math.abs(calculatedHeight - actualHeight)}px
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="text-xs text-neutral-400 mb-2">
          rendered at {width}px
        </div>
        <div
          ref={renderedRef}
          style={{
            width: `${width}px`,
            fontSize: '14px',
            fontFamily: 'IBM Plex Mono, monospace',
            lineHeight: 1.7,
            overflowWrap: 'break-word',
            wordBreak: 'normal',
            whiteSpace: 'normal',
          }}
        >
          {text}
        </div>
      </div>
    </div>
  )
}

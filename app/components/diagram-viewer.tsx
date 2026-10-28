'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type DiagramViewerProps = {
  company: string
  src: string
  alt: string
  width: number
  height: number
}

export function DiagramViewer({
  company,
  src,
  alt,
  width,
  height,
}: DiagramViewerProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLAnchorElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  function openDiagram(event: React.MouseEvent<HTMLAnchorElement>) {
    // Keep ordinary browser behavior for modified clicks and without JS.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    event.preventDefault()
    setZoom(1)
    setIsOpen(true)
    dialog.current?.showModal()
  }

  function onClose() {
    setIsOpen(false)
    opener.current?.focus()
  }

  return (
    <>
      <a
        ref={opener}
        href={src}
        onClick={openDiagram}
        aria-label={`Open ${company} workflow diagram in a larger view`}
        className="block text-blue-600 transition-colors hover:text-blue-700"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 672px"
          loading="lazy"
          className="rounded-lg"
        />
        <span className="block text-center text-sm">
          View full-size diagram
        </span>
      </a>
      <dialog
        ref={dialog}
        onClose={onClose}
        aria-label={`${company} workflow diagram`}
        className="fixed m-auto w-[min(96vw,1400px)] max-w-none rounded-xl border border-neutral-200 bg-white p-0 text-neutral-900 shadow-2xl backdrop:bg-black/70 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
          <span className="font-medium">{company} diagram</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoom((value) => Math.max(1, value - 1))}
              disabled={zoom === 1}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm disabled:opacity-40 dark:border-neutral-600"
            >
              Zoom out
            </button>
            <button
              type="button"
              onClick={() => setZoom((value) => Math.min(3, value + 1))}
              disabled={zoom === 3}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm disabled:opacity-40 dark:border-neutral-600"
            >
              Zoom in
            </button>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="rounded-md bg-neutral-900 px-3 py-2 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900"
            >
              Close
            </button>
          </div>
        </div>
        {zoom > 1 && (
          <p className="m-0 px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300">
            Scroll or drag to move around the image.
          </p>
        )}
        <div
          className="max-h-[75dvh] overflow-auto overscroll-contain bg-white"
          role="region"
          aria-label="Scrollable diagram"
          // A focusable scroll region lets keyboard users pan a zoomed image.
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          {isOpen && (
            <div style={{ width: `${zoom * 100}%` }}>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                unoptimized
                className="h-auto w-full max-w-none"
              />
            </div>
          )}
        </div>
      </dialog>
    </>
  )
}

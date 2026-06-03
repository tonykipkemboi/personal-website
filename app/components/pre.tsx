'use client'

import React from 'react'
import { CopyButton } from './copy-button'

/**
 * Recursively pull the raw text out of a rehype-pretty-code node tree.
 * Shiki splits every token into its own <span>, so the only way to get
 * back the original source (for the Copy button) is to walk the children
 * and concatenate the string leaves, inserting a newline per [data-line].
 */
function extractText(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')

  if (React.isValidElement(node)) {
    const props = node.props as {
      children?: React.ReactNode
      'data-line'?: unknown
    }
    const inner = extractText(props.children)
    // Each rendered line is a span with data-line; join them with newlines.
    return 'data-line' in props ? inner + '\n' : inner
  }
  return ''
}

/**
 * rehype-pretty-code wraps every fenced block in:
 *   <figure data-rehype-pretty-code-figure>
 *     <figcaption data-rehype-pretty-code-title>filename</figcaption>?
 *     <pre data-language="py" data-theme="...">
 *       <code>...<span data-line>...</span></code>
 *     </pre>
 *   </figure>
 *
 * We override <figure> to render the dark "card": a header bar showing the
 * title (from the figcaption) or the language, plus a Copy button, then the
 * highlighted <pre> as the body.
 */
export function Figure({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  // Only take over figures that rehype-pretty-code produced.
  if (!('data-rehype-pretty-code-figure' in props)) {
    return <figure {...props}>{children}</figure>
  }

  const childArray = React.Children.toArray(children)

  const caption = childArray.find(
    (child): child is React.ReactElement<{ children?: React.ReactNode }> =>
      React.isValidElement(child) &&
      'data-rehype-pretty-code-title' in (child.props as object)
  )

  const preElement = childArray.find(
    (child): child is React.ReactElement<{
      'data-language'?: string
      children?: React.ReactNode
    }> =>
      React.isValidElement(child) &&
      (child.type === 'pre' || 'data-language' in (child.props as object))
  )

  const title = caption ? extractText(caption.props.children) : ''
  const lang = (preElement?.props['data-language'] as string) || ''
  const codeText = preElement ? extractText(preElement.props.children) : ''

  return (
    <figure
      data-rehype-pretty-code-figure
      className="group relative my-6 overflow-hidden rounded-xl border border-[#21262d] bg-[#0d1117]"
    >
      <div className="flex items-center justify-between border-b border-[#21262d] px-4 py-2.5">
        <span className="font-mono text-xs text-[#8b949e]">
          {title || lang || 'code'}
        </span>
        <CopyButton
          text={codeText.replace(/\n$/, '')}
          className="rounded-md px-2 py-1 font-mono text-xs text-[#8b949e] transition-colors hover:bg-white/5 hover:text-[#e6edf3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#30363d]"
        />
      </div>
      {preElement}
    </figure>
  )
}

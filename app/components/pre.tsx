'use client'

import React from 'react'
import { CopyButton } from './copy-button'

export function Pre({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLPreElement>) {
  const childrenArray = React.Children.toArray(children)
  const codeElement = childrenArray.find(
    (child): child is React.ReactElement =>
      React.isValidElement(child) &&
      (child.type === 'code' ||
        (typeof child.type === 'function' && child.type.name === 'Code'))
  )
  const codeProps = codeElement?.props as
    | { children?: string; className?: string }
    | undefined
  const textContent = codeProps?.children || ''
  const lang = (codeProps?.className || '').replace('language-', '')

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-[#21262d] bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-[#21262d] px-4 py-2.5">
        <span className="font-mono text-xs text-[#8b949e]">
          {lang || 'code'}
        </span>
        <CopyButton
          text={textContent}
          className="rounded-md px-2 py-1 font-mono text-xs text-[#8b949e] transition-colors hover:bg-white/5 hover:text-[#e6edf3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#30363d]"
        />
      </div>
      <pre {...props}>{children}</pre>
    </div>
  )
}

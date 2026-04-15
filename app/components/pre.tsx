'use client'

import React from 'react'
import { CopyButton } from './copy-button'

export function Pre({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLPreElement>) {
  // Extract the text content from the code element
  const childrenArray = React.Children.toArray(children)
  const codeElement = childrenArray.find(
    (child): child is React.ReactElement =>
      React.isValidElement(child) &&
      (child.type === 'code' ||
        (typeof child.type === 'function' && child.type.name === 'Code'))
  )
  const textContent =
    (codeElement?.props as { children?: string } | undefined)?.children || ''

  return (
    <div className="relative group">
      <pre
        className="overflow-x-auto my-4 p-3 sm:p-4 bg-neutral-900 rounded-lg text-xs sm:text-sm"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(156, 163, 175, 0.3) transparent',
        }}
        {...props}
      >
        <CopyButton text={textContent} />
        <div className="min-w-max">{children}</div>
      </pre>
    </div>
  )
}

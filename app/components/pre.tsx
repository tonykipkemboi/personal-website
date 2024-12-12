'use client'

import React from 'react'
import { CopyButton } from './copy-button'
import { Code } from './mdx'

export function Pre({ children, ...props }) {
  // Extract the text content from the Code component
  const textContent = React.Children.toArray(children)
    .find(child => React.isValidElement(child) && child.type === Code)
    ?.props?.children || ''

  return (
    <div className="relative group">
      <pre 
        className="overflow-x-auto my-4 p-4 bg-neutral-900 rounded-lg" 
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(156, 163, 175, 0.3) transparent'
        }}
        {...props}
      >
        <CopyButton text={textContent} />
        <div className="min-w-max">
          {children}
        </div>
      </pre>
    </div>
  )
}

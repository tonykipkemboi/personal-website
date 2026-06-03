import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import React from 'react'
import { Figure } from './pre'
import { PretextDemo } from './pretext-demo'

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link
        href={href}
        className="text-blue-600 transition-colors hover:text-blue-700"
        {...props}
      >
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a
        className="text-blue-600 transition-colors hover:text-blue-700"
        {...props}
      >
        {props.children}
      </a>
    )
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 transition-colors hover:text-blue-700"
      {...props}
    >
      {props.children}
    </a>
  )
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Code({ children, className, ...props }) {
  // Fenced blocks are now highlighted by rehype-pretty-code at the rehype
  // stage (this <code> just renders the Shiki token spans it produced).
  // Inline code stays a single neutral color so it doesn't speckle the prose.
  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

export function AiOutput({ children }) {
  return (
    <div className="my-4 p-6 bg-neutral-50 border border-neutral-200 rounded-lg overflow-auto dark:bg-neutral-900 dark:border-neutral-800">
      <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
        AI-Generated Output:
      </div>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm">
        {children}
      </div>
    </div>
  )
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement(
          'a',
          {
            href: `#${slug}`,
            key: `link-${slug}`,
            className: 'anchor',
            'aria-label': `Link to ${children}`,
          },
          React.createElement(
            'span',
            { className: 'sr-only' },
            `Link to ${children}`
          )
        ),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`
  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  img: (props) => <img className="rounded-lg" {...props} />,
  a: CustomLink,
  code: Code,
  // rehype-pretty-code wraps each fenced block in <figure>; we override it
  // to render the dark card (header with title/lang + Copy button + body).
  figure: Figure,
  // Section breaks (`---`) render as breathing room, not a visible rule —
  // each section already has its own subtitle.
  hr: () => <hr className="my-12 border-0" />,
  Table,
  AiOutput,
  PretextDemo,
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: 'github-dark',
                // We paint our own #0d1117 card; let Shiki tokens sit on it.
                keepBackground: false,
                defaultLang: 'plaintext',
              },
            ],
          ],
        },
      }}
    />
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', text: 'Home' },
  { href: '/blog', text: 'Blog' },
  { href: '/press', text: 'Press' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="w-full">
      <nav className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 py-8 sm:px-10 lg:px-20">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/headshot.jpg"
            alt="Tony Kipkemboi"
            width={32}
            height={32}
            className="rounded-full object-cover"
            priority
          />
          <span className="text-[15px] font-medium tracking-tight text-[#0a0a0a]">
            Tony Kipkemboi
          </span>
        </Link>

        <div className="flex items-center gap-7 sm:gap-10">
          {links.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? 'text-[#0a0a0a]'
                    : 'text-neutral-400 hover:text-[#0a0a0a]'
                }`}
              >
                {link.text}
              </Link>
            )
          })}
          <a
            href="https://linkedin.com/in/tonykipkemboi"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-[#0a0a0a] pb-0.5 text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  )
}

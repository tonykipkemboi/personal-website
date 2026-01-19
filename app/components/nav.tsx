'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/blog',
    text: 'Blog',
  },
  {
    href: '/projects',
    text: 'Projects',
  },
  {
    href: '/press',
    text: 'Press',
  },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-1 pr-10">
            {links.map((link) => {
              const isActive = link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-all duration-200 flex align-middle relative py-1 px-3 rounded-md group ${
                    isActive
                      ? 'text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  {link.text}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}

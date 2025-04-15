import Link from 'next/link'

const links = [
  {
    href: '/',
    text: 'home',
  },
  {
    href: '/blog',
    text: 'blog',
  },
  {
    href: '/projects',
    text: 'projects',
  },
  {
    href: '/press',
    text: 'press',
  },
]

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-2 pr-10">
            {links.map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-all duration-200 hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-2 px-3 sm:py-1 sm:px-2 group"
                >
                  {link.text}
                  <span className="absolute inset-x-0 bottom-0 h-[1px] bg-neutral-400 dark:bg-neutral-700 transform origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100" />
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}

import Link from 'next/link'

const socials = [
  { href: 'https://github.com/tonykipkemboi', text: 'GitHub' },
  { href: 'https://linkedin.com/in/tonykipkemboi', text: 'LinkedIn' },
  { href: 'https://x.com/tonykipkemboi', text: 'X' },
  { href: 'https://www.youtube.com/@tonykipkemboi', text: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-20">
        <div className="flex flex-col gap-4 border-t border-neutral-200 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 text-[13px] text-neutral-400">
            <span>
              © {new Date().getFullYear()} Tony Kipkemboi. All rights reserved.
            </span>
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#0a0a0a]"
            >
              Privacy
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.text}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
              >
                {s.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

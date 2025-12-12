import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 mt-2">
      <ol className="flex items-center space-x-1.5 text-xs text-neutral-500 dark:text-neutral-500">
        <li>
          <Link
            href="/"
            className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-1.5">
            <span className="text-neutral-400 dark:text-neutral-600">/</span>
            {index === items.length - 1 ? (
              <span className="text-neutral-600 dark:text-neutral-400">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for tonykipkemboi.com.',
}

export default function PrivacyPage() {
  return (
    <section className="mx-auto w-full max-w-[760px] space-y-8 px-6 pt-10 pb-24 sm:px-10">
      <div>
        <h1 className="mb-2 text-3xl font-medium tracking-tight text-[#0a0a0a]">
          Privacy Policy
        </h1>
        <p className="text-neutral-500">Last updated: April 15, 2025</p>
      </div>

      <div className="space-y-6 text-neutral-700 dark:text-neutral-300">
        <section className="space-y-2">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            Overview
          </h2>
          <p>
            This website (tonykipkemboi.com) is a personal site operated by Tony
            Kipkemboi. This policy explains what information is collected when
            you visit and how it is used.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            Information Collected
          </h2>
          <p>
            This site uses analytics tools to understand how visitors use the
            site. The data collected includes pages visited, time spent on
            pages, referring URLs, browser type, and general geographic location
            (country/region level). No personally identifiable information such
            as your name or email address is collected unless you voluntarily
            provide it.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            Cookies
          </h2>
          <p>
            This site may use cookies and similar tracking technologies to
            support analytics. You can control cookie settings through your
            browser. Disabling cookies may affect some site functionality.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            Third-Party Services
          </h2>
          <p>
            This site uses the following third-party services which may collect
            usage data:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>
              <strong>Vercel Analytics</strong> — page view and performance
              data. See{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                Vercel&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Google Analytics</strong> — aggregated site usage
              statistics. See{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </li>
          </ul>
          <p>
            If advertising is enabled on this site, Google AdSense may serve ads
            and use cookies to personalize them based on your browsing activity.
            You can opt out via{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Google&apos;s Ad Settings
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            Data Sharing
          </h2>
          <p>
            No personal data is sold or shared with third parties beyond the
            analytics services listed above. Aggregated, anonymized data may be
            used to improve the site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            External Links
          </h2>
          <p>
            This site contains links to external websites. This policy applies
            only to tonykipkemboi.com. Please review the privacy policies of any
            external sites you visit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            Contact
          </h2>
          <p>
            If you have questions about this privacy policy, reach me via the
            social links in the footer.
          </p>
        </section>
      </div>
    </section>
  )
}

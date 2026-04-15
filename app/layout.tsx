import './global.css'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { KonamiCode } from './components/konami'
import { baseUrl } from './sitemap'
import Script from 'next/script'

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  manifest: '/manifest.json',
  title: {
    default: 'Tony Kipkemboi',
    template: '%s | Tony Kipkemboi',
  },
  description:
    'AI engineer and content creator building AI automations, agent systems, and sharing technical insights across social platforms.',
  openGraph: {
    title: 'Tony Kipkemboi',
    description:
      'AI engineer and content creator building AI automations, agent systems, and sharing technical insights across social platforms.',
    url: baseUrl,
    siteName: 'Tony Kipkemboi',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tony Kipkemboi - AI Engineer and Content Creator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tony Kipkemboi',
    description:
      'AI engineer and content creator building AI automations, agent systems, and sharing technical insights across social platforms.',
    creator: '@tonykipkemboi',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-icon-36x36.png', sizes: '36x36', type: 'image/png' },
      { url: '/android-icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/android-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/android-icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/android-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Tony Kipkemboi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-[#111010]',
        ibmPlexMono.variable
      )}
    >
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5929640898604287"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-67ZB0DXL8P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-67ZB0DXL8P');
          `}
        </Script>
      </head>
      <body className="antialiased max-w-2xl flex flex-col mx-4 mt-8 lg:mx-auto">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white focus:rounded-md dark:focus:bg-neutral-100 dark:focus:text-neutral-900"
        >
          Skip to main content
        </a>
        <main
          id="main-content"
          className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0"
        >
          <Navbar />
          {children}
          <Footer />
          <KonamiCode />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}

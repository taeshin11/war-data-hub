import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import Link from 'next/link'
import AdHeader from '@/components/ads/AdHeader'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'

export const metadata: Metadata = {
  title: {
    default: 'War Data Hub | Real-Time Intelligence',
    template: '%s | War Data Hub'
  },
  description: 'Open-source repository of conflict datasets, research reports, and war data resources for analysts and researchers',
  keywords: 'war data, conflict data, military data, war statistics, open source intelligence, OSINT database',
  openGraph: {
    type: 'website',
    siteName: 'War Data Hub',
    title: 'War Data Hub | Real-Time Intelligence',
    description: 'Open-source repository of conflict datasets, research reports, and war data resources for analysts and researchers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'War Data Hub',
    description: 'Open-source repository of conflict datasets, research reports, and war data resources for analysts and researchers',
  },
  verification: {
    google: 'add-your-google-site-verification-here',
  },
  other: {
    'google-adsense-account': 'ca-pub-add-your-publisher-id-here',
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      <AdHeader />
      <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inset-0 rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative rounded-full h-2.5 w-2.5 bg-teal-400"></span>
            </span>
            <Link href={`/${locale}`} className="text-lg font-bold hover:text-teal-400 transition-colors">
              War Data Hub
            </Link>
          </div>
          <nav className="flex gap-1 items-center">
            <Link href={`/${locale}`} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-all">Home</Link>
            <Link href={`/${locale}/#categories`} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-all">Categories</Link>
            <Link href={`/${locale}/about`} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-all">About</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-slate-50 min-h-screen">
        {children}
      </main>
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-slate-700 pt-6 mb-4 mt-4">
            <a href={`/${locale}/about`} className="hover:text-white transition-colors">About Us</a>
            <a href={`/${locale}/faq`} className="hover:text-white transition-colors">How to Use &amp; FAQ</a>
            <a href={`/${locale}/privacy`} className="hover:text-white transition-colors">Privacy Policy</a>
            <a href={`/${locale}/terms`} className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">For research purposes only. Always verify from multiple sources.</p>
            <VisitorCounter />
          </div>
        </div>
      </footer>
      <AdMobileSticky />
    </NextIntlClientProvider>
  )
}

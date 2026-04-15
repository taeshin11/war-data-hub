import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from 'next/script'
import "./globals.css";
import { FeedbackButton } from "@/components/FeedbackButton";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'War Data Hub | Conflict Research Repository',
    template: '%s | War Data Hub'
  },
  description: 'Open-source repository of conflict datasets, research reports, and war data for analysts and researchers',
  keywords: 'war data, conflict datasets, military data, war research, conflict statistics',
  openGraph: {
    type: 'website',
    siteName: 'War Data Hub',
    title: 'War Data Hub | Conflict Research Repository',
    description: 'Open-source repository of conflict datasets, research reports, and war data for analysts and researchers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'War Data Hub',
    description: 'Open-source repository of conflict datasets, research reports, and war data for analysts and researchers',
  },
  verification: {
    google: 'WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc',
  },
  other: {
    'google-adsense-account': 'ca-pub-7098271335538021',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "War Data Hub",
              "url": "https://war-data-hub.vercel.app",
              "description": "Open-source repository of conflict datasets, research reports, and war data for analysts and researchers",
              "publisher": { "@type": "Organization", "name": "War Data Hub", "url": "https://war-data-hub.vercel.app" }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <FeedbackButton siteName="War Data Hub" siteUrl="https://war-data-hub.vercel.app" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

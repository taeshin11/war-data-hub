import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { FeedbackButton } from "@/components/FeedbackButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "War Data Hub",
  description: "Curated conflict research resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <FeedbackButton siteName="War Data Hub" siteUrl="https://war-data-hub.vercel.app" />
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
      </body>
    </html>
  );
}

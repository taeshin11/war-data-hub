import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'
import ResourceGrid from '@/components/ResourceGrid'
import AdInContent from '@/components/ads/AdInContent'

export const metadata: Metadata = {
  title: 'War Data Hub | Real-Time Conflict Intelligence',
  description: 'Open-source repository of conflict datasets, research reports, and war data resources for analysts and researchers',
  keywords: 'war data, conflict data, military data, war statistics, open source intelligence, OSINT database',
}

interface Resource {
  id: string
  title: string
  org: string
  org_slug: string
  url: string
  category: string
  conflicts: string[]
  description: string
  format: string
  free: boolean
  tags: string[]
  last_verified: string
}

function getResources(): Resource[] {
  const filePath = join(process.cwd(), 'public/data/resources.json')
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

export default async function HomePage() {
  const resources = getResources()
  const orgs = new Set(resources.map(r => r.org)).size
  const cats = new Set(resources.map(r => r.category)).size

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-teal-950/20 to-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">📚 CONFLICT RESEARCH HUB</p>
          <h1 className="text-4xl font-extrabold mb-4">War Data Hub</h1>
          <p className="text-slate-300 text-base max-w-2xl mb-8">
            Curated links to the world&apos;s best conflict data — ACLED, ISW, UNHCR, UN OCHA, SIPRI, and more. All in one place.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-white">{resources.length}</div>
              <div className="text-xs text-slate-400 mt-0.5">Resources</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-white">{orgs}</div>
              <div className="text-xs text-slate-400 mt-0.5">Organizations</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-white">{cats}</div>
              <div className="text-xs text-slate-400 mt-0.5">Categories</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ResourceGrid resources={resources} />
        <AdInContent />
      </div>
    </div>
  )
}

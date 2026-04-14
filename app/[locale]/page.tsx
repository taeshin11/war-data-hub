import { readFileSync } from 'fs'
import { join } from 'path'
import ResourceGrid from '@/components/ResourceGrid'
import AdInContent from '@/components/ads/AdInContent'

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
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Conflict Research Resources</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Curated data, maps, reports, OSINT and analysis tools for conflict researchers, journalists, and analysts.
        </p>
        <p className="text-sm text-gray-400">{resources.length} resources indexed</p>
      </div>
      <ResourceGrid resources={resources} />
      <AdInContent />
    </div>
  )
}

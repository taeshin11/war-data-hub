import { readFileSync } from 'fs'
import { join } from 'path'
import ResourceCard from '@/components/ResourceCard'
import Link from 'next/link'

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
  return JSON.parse(readFileSync(join(process.cwd(), 'public/data/resources.json'), 'utf-8'))
}

export async function generateStaticParams() {
  const resources = JSON.parse(readFileSync(join(process.cwd(), 'public/data/resources.json'), 'utf-8')) as Resource[]
  const slugs = new Set(resources.map(r => r.org_slug))
  return Array.from(slugs).map(slug => ({ slug }))
}

export default async function OrgPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  const resources = getResources().filter(r => r.org_slug === slug)
  const orgName = resources[0]?.org || slug
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/${locale}`} className="text-blue-600 hover:underline text-sm">Home</Link>
        <span className="text-gray-400">/</span>
        <span className="text-sm font-medium">{orgName}</span>
      </div>
      <h1 className="text-2xl font-bold">{orgName} Resources</h1>
      <p className="text-gray-500 text-sm">{resources.length} resources from this organization</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map(r => <ResourceCard key={r.id} resource={r} />)}
      </div>
    </div>
  )
}

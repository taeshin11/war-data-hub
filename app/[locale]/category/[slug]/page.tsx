import { readFileSync } from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'
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

const CATEGORIES = ['data','maps','reports','analysis','official','osint','law','tracking','news']

function getResources(): Resource[] {
  return JSON.parse(readFileSync(join(process.cwd(), 'public/data/resources.json'), 'utf-8'))
}

export async function generateStaticParams() {
  return CATEGORIES.map(slug => ({ slug }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  if (!CATEGORIES.includes(slug)) notFound()
  const resources = getResources().filter(r => r.category === slug)
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/${locale}`} className="text-blue-600 hover:underline text-sm">Home</Link>
        <span className="text-gray-400">/</span>
        <span className="text-sm font-medium capitalize">{slug}</span>
      </div>
      <h1 className="text-2xl font-bold capitalize">{slug} Resources</h1>
      <p className="text-gray-500 text-sm">{resources.length} resources in this category</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map(r => <ResourceCard key={r.id} resource={r} />)}
      </div>
    </div>
  )
}

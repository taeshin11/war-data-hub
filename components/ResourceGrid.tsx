'use client'
import { useState, useMemo } from 'react'
import ResourceCard from './ResourceCard'
import SearchBar from './SearchBar'
import CategoryTabs from './CategoryTabs'

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

const CATEGORIES = ['all', 'data', 'maps', 'reports', 'analysis', 'official', 'osint', 'law', 'tracking', 'news']

export default function ResourceGrid({ resources }: { resources: Resource[] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    return resources.filter(r => {
      const matchCat = category === 'all' || r.category === category
      const q = search.toLowerCase()
      const matchSearch = !q ||
        r.title.toLowerCase().includes(q) ||
        r.org.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      return matchCat && matchSearch
    })
  }, [resources, search, category])

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: resources.length }
    CATEGORIES.slice(1).forEach(cat => {
      c[cat] = resources.filter(r => r.category === cat).length
    })
    return c
  }, [resources])

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} placeholder="Search conflict data sources..." />
      <CategoryTabs active={category} onChange={setCategory} counts={counts} />
      <p className="text-sm text-slate-500 mb-6 text-center">{filtered.length} resource{filtered.length !== 1 ? 's' : ''} found</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => <ResourceCard key={r.id} resource={r} />)}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium">No resources found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

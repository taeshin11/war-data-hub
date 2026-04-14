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

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by title, organization, or tags..." />
        <CategoryTabs active={category} onChange={setCategory} />
        <p className="text-sm text-gray-500">{filtered.length} resources</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => <ResourceCard key={r.id} resource={r} />)}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">No resources found matching your criteria.</div>
      )}
    </div>
  )
}

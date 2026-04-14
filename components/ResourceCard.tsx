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

const categoryColors: Record<string, string> = {
  data: 'bg-blue-100 text-blue-800',
  maps: 'bg-green-100 text-green-800',
  reports: 'bg-purple-100 text-purple-800',
  analysis: 'bg-indigo-100 text-indigo-800',
  official: 'bg-red-100 text-red-800',
  osint: 'bg-orange-100 text-orange-800',
  law: 'bg-yellow-100 text-yellow-800',
  tracking: 'bg-teal-100 text-teal-800',
  news: 'bg-gray-100 text-gray-800',
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">{resource.title}</h3>
          <Link href={`/org/${resource.org_slug}`} className="text-xs text-blue-600 hover:underline mt-0.5 block">
            {resource.org}
          </Link>
        </div>
        <div className="flex flex-col gap-1 items-end shrink-0">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[resource.category] || 'bg-gray-100 text-gray-700'}`}>
            {resource.category}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${resource.free ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            {resource.free ? 'Free' : 'Paid'}
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-600 line-clamp-3">{resource.description}</p>
      <div className="flex flex-wrap gap-1">
        {resource.tags.slice(0, 4).map(tag => (
          <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{tag}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="text-xs text-gray-400">Format: {resource.format}</span>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          Visit ↗
        </a>
      </div>
    </div>
  )
}

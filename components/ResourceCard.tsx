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

const categoryBadgeStyles: Record<string, string> = {
  data: 'bg-blue-500/10 text-blue-600 ring-1 ring-inset ring-blue-500/20',
  maps: 'bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20',
  reports: 'bg-purple-500/10 text-purple-600 ring-1 ring-inset ring-purple-500/20',
  analysis: 'bg-indigo-500/10 text-indigo-600 ring-1 ring-inset ring-indigo-500/20',
  official: 'bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20',
  osint: 'bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/20',
  law: 'bg-yellow-500/10 text-yellow-700 ring-1 ring-inset ring-yellow-500/20',
  tracking: 'bg-teal-500/10 text-teal-600 ring-1 ring-inset ring-teal-500/20',
  news: 'bg-slate-500/10 text-slate-600 ring-1 ring-inset ring-slate-500/20',
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block group">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 mr-3">
            <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors text-sm leading-snug">{resource.title}</h3>
            <p className="text-xs text-teal-600 font-semibold mt-1">{resource.org}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${categoryBadgeStyles[resource.category] || 'bg-slate-500/10 text-slate-600 ring-1 ring-inset ring-slate-500/20'}`}>
              {resource.category}
            </span>
            {resource.free && (
              <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-1.5 py-0.5 rounded font-medium">Free</span>
            )}
          </div>
        </div>
        <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-1">{resource.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-1">
            {resource.tags.slice(0, 3).map(t => (
              <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{t}</span>
            ))}
          </div>
          <span className="text-teal-600 text-xs font-bold group-hover:text-teal-700 flex items-center gap-0.5 ml-2">Visit ↗</span>
        </div>
      </div>
    </a>
  )
}

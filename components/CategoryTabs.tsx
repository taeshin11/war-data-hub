'use client'

const CATEGORIES = ['all', 'data', 'maps', 'reports', 'analysis', 'official', 'osint', 'law', 'tracking', 'news']

interface CategoryTabsProps {
  active: string
  onChange: (c: string) => void
  counts?: Record<string, number>
}

export default function CategoryTabs({ active, onChange, counts }: CategoryTabsProps) {
  return (
    <div id="categories" className="flex flex-wrap gap-2 mb-8 justify-center">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all capitalize ${
            active === cat
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/25'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300 hover:text-teal-700'
          }`}
        >
          {cat === 'all' ? 'All' : cat}
          {counts && counts[cat] !== undefined && (
            <span className="ml-1.5 text-xs opacity-75">({counts[cat]})</span>
          )}
        </button>
      ))}
    </div>
  )
}

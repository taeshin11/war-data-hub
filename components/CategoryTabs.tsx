'use client'

const CATEGORIES = ['all', 'data', 'maps', 'reports', 'analysis', 'official', 'osint', 'law', 'tracking', 'news']

interface CategoryTabsProps {
  active: string
  onChange: (c: string) => void
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
            active === cat
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {cat === 'all' ? 'All' : cat}
        </button>
      ))}
    </div>
  )
}

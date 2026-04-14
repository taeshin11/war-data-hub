'use client'
interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}
export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-1 flex items-center gap-2 max-w-2xl mx-auto my-8">
      <div className="pl-4 text-slate-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Search conflict data sources...'}
        className="flex-1 py-3 text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none text-base"
      />
      {value && (
        <button onClick={() => onChange('')} className="pr-3 text-slate-400 hover:text-slate-600 transition-colors text-lg leading-none">
          ✕
        </button>
      )}
    </div>
  )
}

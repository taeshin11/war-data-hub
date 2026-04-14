import Link from 'next/link'

export default function AboutPage({ params: _params }: { params: Promise<{ locale: string }> }) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">About War Data Hub</h1>
      <div className="prose prose-gray max-w-none space-y-4">
        <p className="text-gray-600 text-lg">
          War Data Hub is a curated aggregator of conflict research resources, bringing together the most reliable
          data sources, maps, reports, OSINT tools, and analysis for researchers, journalists, and analysts.
        </p>
        <h2 className="text-xl font-semibold text-gray-800">Methodology</h2>
        <p className="text-gray-600">
          All resources are manually reviewed and verified. We prioritize free, open-access sources and clearly
          note when premium resources are included. Each resource is evaluated for reliability, currency, and
          relevance to conflict research.
        </p>
        <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
        <ul className="space-y-2 text-gray-600">
          <li><strong>Data:</strong> Downloadable datasets and databases</li>
          <li><strong>Maps:</strong> Interactive and static conflict maps</li>
          <li><strong>Reports:</strong> Situation reports and periodic assessments</li>
          <li><strong>Analysis:</strong> Expert analysis and commentary</li>
          <li><strong>Official:</strong> Government and intergovernmental sources</li>
          <li><strong>OSINT:</strong> Open source intelligence tools and investigations</li>
          <li><strong>Law:</strong> International humanitarian law resources</li>
          <li><strong>Tracking:</strong> Real-time conflict trackers</li>
          <li><strong>News:</strong> Reliable news sources with conflict coverage</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-800">Disclaimer</h2>
        <p className="text-gray-600">
          This site is for research purposes only. We do not endorse any political position.
          Always verify information from multiple independent sources.
        </p>
      </div>
      <Link href="/" className="inline-block text-blue-600 hover:underline">← Back to resources</Link>
    </div>
  )
}

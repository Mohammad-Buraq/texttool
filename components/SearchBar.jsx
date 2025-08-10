'use client'
import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { getAllTools } from '@/data/tools'

export default function SearchBar() {
  const [q, setQ] = useState('')
  const tools = useMemo(() => getAllTools(), [])
  const fuse = useMemo(() => new Fuse(tools, {
    keys: ['name','description','tags'],
    threshold: 0.35,
  }), [tools])

  const results = q ? fuse.search(q).map(r => r.item).slice(0, 12) : []

  return (
    <div className="space-y-3">
      <input
        className="input w-full"
        placeholder="Search tools (e.g., remove duplicates, slugify, base64)…"
        value={q}
        onChange={e => setQ(e.target.value)}
        aria-label="Search tools"
      />
      {q && (
        <div className="card">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {results.length ? results.map(t => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="block p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="font-medium">{t.name}</div>
                <div className="small">{t.description}</div>
              </Link>
            )) : <div className="small">No results yet—try different keywords.</div>}
          </div>
        </div>
      )}
    </div>
  )
}

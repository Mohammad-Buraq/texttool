'use client'
import {useMemo, useRef, useState} from 'react'
import Link from 'next/link'
import {ChevronLeft, ChevronRight, ChevronDown, X} from 'lucide-react'
import { getAllCategories } from '@/data/categories'
import { getAllTools } from '@/data/tools'

/**
 * Homepage category filter
 * - Invisible horizontal scroll (no visible scrollbar)
 * - Slider shows only *top* categories by number of tools (plus "All")
 * - Dropdown shows *all* categories
 * - Grid filters by category, or shows all by default
 * - Grid has Sort + Compact toggle + "Load more"
 */
export default function HomeCategoryFilter({
  initialVisible = 6,          // how many categories in the slider (besides "All")
  pageSize = 18                // how many tools per page in the grid
}){
  const allCats = getAllCategories()
  const allTools = getAllTools()

  // Compute tool counts per category (by tag overlap)
  const catCounts = useMemo(()=>{
    const counts = {}
    for (const c of allCats){
      const tags = c.tags || []
      counts[c.slug] = allTools.filter(t => Array.isArray(t.tags) && t.tags.some(tag => tags.includes(tag))).length
    }
    return counts
  }, [allCats, allTools])

  // Slider list: "All" + top categories by count desc
  const sliderCats = useMemo(()=>{
    const ranked = [...allCats].sort((a,b)=>(catCounts[b.slug]||0)-(catCounts[a.slug]||0))
    return [{ slug:'all', name:'All', description:'Show every tool', tags:[] }, ...ranked.slice(0, Math.max(initialVisible, 3))]
  }, [allCats, catCounts, initialVisible])

  // Dropdown list: All + every category alphabetically
  const dropdownCats = useMemo(()=>{
    const alpha = [...allCats].sort((a,b)=>a.name.localeCompare(b.name))
    return [{ slug:'all', name:'All', description:'Show every tool', tags:[] }, ...alpha]
  }, [allCats])

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('all')
  const [sortMode, setSortMode] = useState('popular') // 'popular' | 'name' | 'new'
  const [compact, setCompact] = useState(false)
  const [page, setPage] = useState(1)

  const selectedCat = dropdownCats.find(c=>c.slug===selected) || dropdownCats[0]

  // Filter tools by selected category
  const filtered = useMemo(()=>{
    if (selected === 'all') return allTools
    const tags = (selectedCat?.tags)||[]
    return allTools.filter(t => Array.isArray(t.tags) && t.tags.some(tag => tags.includes(tag)))
  }, [selected, selectedCat, allTools])

  // Sort tools
  const sorted = useMemo(()=>{
    const arr = [...filtered]
    if (sortMode === 'name') {
      arr.sort((a,b)=>a.name.localeCompare(b.name))
    } else if (sortMode === 'new') {
      // fallback: assume order in registry is "newer later"; reverse it
      arr.reverse()
    } else { // 'popular' (no real analytics here; fallback to name)
      arr.sort((a,b)=>a.name.localeCompare(b.name))
    }
    return arr
  }, [filtered, sortMode])

  // Pagination
  const visible = useMemo(()=> sorted.slice(0, page * pageSize), [sorted, page, pageSize])
  const hasMore = visible.length < sorted.length

  // Horizontal slider controls
  const railRef = useRef(null)
  const scrollBy = (dx)=>{
    const el = railRef.current
    if(!el) return
    el.scrollBy({ left: dx, behavior: 'smooth' })
  }

  return (
    <section className="space-y-6">
      {/* Invisible scrollbar helper styles */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Browse by Category</h2>

        {/* All categories dropdown */}
        <div className="relative">
          <button
            onClick={()=>setOpen(v=>!v)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <ChevronDown className="w-4 h-4" />
            All categories
          </button>
          {open && (
            <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-lg p-1">
              <ul className="max-h-72 overflow-auto">
                {dropdownCats.map(c=> (
                  <li key={c.slug}>
                    <button
                      onClick={()=>{ setSelected(c.slug); setOpen(false); setPage(1)}}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-900 ${selected===c.slug?'bg-gray-50 dark:bg-gray-900':''}`}
                    >
                      {c.name}
                      {c.slug!=='all' ? <span className="text-gray-500 dark:text-gray-400"> · {catCounts[c.slug]||0}</span> : null}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal slider (few, top categories) */}
      <div className="relative hidden sm:block">
        <div className="flex items-center gap-2">
          <button onClick={()=>scrollBy(-360)} className="rounded-lg border border-gray-200 dark:border-gray-800 p-2 hover:bg-gray-50 dark:hover:bg-gray-900" aria-label="Scroll categories left">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div ref={railRef} className="no-scrollbar flex-1 overflow-x-auto">
            <div className="flex gap-3 min-w-max pr-4">
              {sliderCats.map(c => (
                <button
                  key={c.slug}
                  onClick={()=>{ setSelected(c.slug); setPage(1) }}
                  className={`shrink-0 border rounded-xl px-4 py-3 text-left hover:shadow-sm transition
                    ${selected===c.slug ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200 dark:border-gray-800'}`}
                >
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 max-w-[16rem]">{c.description}</div>
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>scrollBy(360)} className="rounded-lg border border-gray-200 dark:border-gray-800 p-2 hover:bg-gray-50 dark:hover:bg-gray-900" aria-label="Scroll categories right">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Selected indicator / clear + controls */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-700 dark:text-gray-300">Showing:</span>
          <span className="font-medium">{selectedCat.name}</span>
          {selected!=='all' && (
            <button onClick={()=>{ setSelected('all'); setPage(1) }} className="inline-flex items-center gap-1 rounded-md border border-gray-200 dark:border-gray-800 px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-900">
              <X className="w-3 h-3" /> Clear
            </button>
          )}

          {/* Grid controls (right side) */}
          <div className="ml-auto flex items-center gap-3">
            <label className="inline-flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400">Sort</span>
              <select value={sortMode} onChange={e=>{ setSortMode(e.target.value); setPage(1) }} className="input border rounded-md px-2 py-1 text-sm bg-transparent">
                <option value="popular">Popular</option>
                <option value="name">Name (A–Z)</option>
                <option value="new">Recently added</option>
              </select>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={compact} onChange={e=>setCompact(e.target.checked)} />
              <span className="text-gray-600 dark:text-gray-400">Compact</span>
            </label>
            <span className="text-gray-600 dark:text-gray-400">{sorted.length} tools</span>
          </div>
        </div>
      </div>

      {/* Tools grid */}
      <div className={`grid ${compact ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-4`}>
        {visible.map(t => (
          <Link key={t.slug} href={`/tools/${t.slug}`} className="block rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-sm transition">
            <div className="flex items-center gap-2">
              {t.Icon ? <t.Icon className="w-5 h-5 text-blue-600" /> : null}
              <div className="font-semibold">{t.name}</div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{t.description}</div>
          </Link>
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center">
          <button onClick={()=>setPage(p=>p+1)} className="rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
            Load more
          </button>
        </div>
      )}
    </section>
  )
}

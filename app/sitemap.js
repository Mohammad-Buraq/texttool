// app/sitemap.js
import { getAllToolsWithDates } from '@/data/tools-with-dates'
import { getAllCategories } from '@/data/categories'

// Optional (recommended): centralize your base URL
// Create lib/site.js with:
//   export function getBaseUrl() {
//     const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://thetexttool.com'
//     return base.replace(/\/+$/, '')
//   }
import { getBaseUrl } from '@/lib/site'

export default async function sitemap() {
  const base = getBaseUrl() // uses NEXT_PUBLIC_SITE_URL, falls back to https://thetexttool.com
  const nowIso = new Date().toISOString()

  // Static pages
  const staticEntries = [
    { url: `${base}/`, lastModified: nowIso, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about`, lastModified: nowIso, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/contact`, lastModified: nowIso, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/categories`, lastModified: nowIso, changeFrequency: 'weekly', priority: 0.6 },
  ]

  // Category pages (you already have /categories/[slug])
  const categories = getAllCategories().map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: nowIso,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // Tool pages with REAL dates (you already generate them)
  const tools = getAllToolsWithDates().map((t) => ({
    url: `${base}/tools/${t.slug}`,
    lastModified: t.dateAdded,        // ✅ not "now" for every tool
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticEntries, ...categories, ...tools]
}

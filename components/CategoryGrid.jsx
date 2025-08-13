'use client'
import Link from 'next/link'
import { getAllCategories } from '@/data/categories'

export default function CategoryGrid(){
  const cats = getAllCategories()
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Browse by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cats.map(c=>(
          <Link key={c.slug} href={`/categories/${c.slug}`} className="block rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-sm transition">
            <div className="text-lg font-semibold">{c.name}</div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{c.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

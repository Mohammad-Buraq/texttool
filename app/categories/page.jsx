import { getAllCategories } from '@/data/categories'
import Link from 'next/link'

export const metadata = {
  title: 'All Categories — thetexttool.com',
  description: 'Explore all tool categories including lines, words, formatting, encoding, conversion and more.'
}

export default function CategoriesHome(){
  const cats = getAllCategories()
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold">All Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cats.map(c=>(
          <Link key={c.slug} href={`/categories/${c.slug}`} className="block rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-sm transition">
            <div className="text-lg font-semibold">{c.name}</div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{c.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

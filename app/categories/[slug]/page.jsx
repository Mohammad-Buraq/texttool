import { getAllTools } from '@/data/tools'
import { getAllCategories, getCategoryBySlug } from '@/data/categories'
import Link from 'next/link'

export async function generateStaticParams(){
  return getAllCategories().map(c=>({slug:c.slug}))
}

export async function generateMetadata({ params }){
  const cat = getCategoryBySlug(params.slug)
  if(!cat) return { title: 'Category not found' }
  const title = `${cat.name} — Free Online Tools`
  const description = cat.description
  const url = `/categories/${cat.slug}`
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type:'website' },
    twitter: { card:'summary', title, description }
  }
}

export default function CategoryPage({ params }){
  const cat = getCategoryBySlug(params.slug)
  if(!cat) return <div>Category not found.</div>
  const tools = getAllTools().filter(t => t.tags?.some(tag => cat.tags.includes(tag)))
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold">{cat.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{cat.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(t=>(
          <Link key={t.slug} href={`/tools/${t.slug}`} className="block rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-sm transition">
            <div className="flex items-center gap-2">
              {t.Icon ? <t.Icon className="w-5 h-5 text-blue-600"/> : null}
              <div className="font-semibold">{t.name}</div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t.description}</div>
          </Link>
        ))}
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <h2>About {cat.name}</h2>
        <p>{cat.description} All tools on this page run entirely in your browser and are free to use.</p>
      </div>
    </div>
  )
}

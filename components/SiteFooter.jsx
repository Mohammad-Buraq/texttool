'use client'
import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'
import { getAllCategories } from '@/data/categories'
import { getAllTools } from '@/data/tools'
import { getRecentlyAdded } from '@/data/tools-with-dates'
import { Github, Twitter, MessageSquare, Globe } from 'lucide-react'

export default function SiteFooter() {
  const categories = getAllCategories()
    .slice()
    .sort((a,b)=>a.name.localeCompare(b.name))
    .slice(0, 10)

  const allTools = getAllTools()
  const topTools = allTools
    .slice()
    .sort((a,b)=>a.name.localeCompare(b.name))
    .slice(0, 10)

  const recently = getRecentlyAdded(10)

  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <div className="md:col-span-2">
            <BrandLogo href="/" size={28} />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-6">
              TheTextTool gives you <strong>free, private, in-browser</strong> utilities for
              cleaning, converting, formatting and analyzing text. No uploads, no signup —
              everything runs locally in your browser.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              
              <a href="https://x.com/thetexttool" target="_blank" rel="noopener" aria-label="Twitter/X"
                 className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
                <Twitter className="w-4 h-4" /> Twitter
              </a>
              <a href="/contact" aria-label="Contact"
                 className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
                <MessageSquare className="w-4 h-4" /> Contact
              </a>
              <a href="/about" aria-label="About"
                 className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
                <Globe className="w-4 h-4" /> About
              </a>
            </div>
          </div>

          <FooterCol title="Pages">
            <FooterLink href="/categories">Categories</FooterLink>
            <FooterLink href="/tools">All Tools</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/sitemap.xml">Sitemap</FooterLink>
          </FooterCol>

          <FooterCol title="Categories">
            {categories.map(c => (
              <FooterLink key={c.slug} href={`/categories/${c.slug}`}>{c.name}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Top Tools">
            {topTools.map(t => (
              <FooterLink key={t.slug} href={`/tools/${t.slug}`}>{t.name}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Recently Added">
            {recently.map(t => (
              <FooterLink key={t.slug} href={`/tools/${t.slug}`}>{t.name}</FooterLink>
            ))}
          </FooterCol>
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-sm text-gray-600 dark:text-gray-400">
          <div>© {new Date().getFullYear()} TheTextTool — Privacy-first. 100% in-browser.</div>
          <div className="flex gap-4">
            <Link className="hover:underline" href="/privacy">Privacy</Link>
            <Link className="hover:underline" href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  )
}
function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
        {children}
      </Link>
    </li>
  )
}

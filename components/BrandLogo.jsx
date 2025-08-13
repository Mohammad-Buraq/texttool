'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'], weight: ['700','800'] })

export default function BrandLogo({ href='/', size=28, text='TheTextTool' }){
  return (
    <Link href={href} className="inline-flex items-center gap-2">
      <Image src="/logo-icon.svg" alt={text} width={size} height={size} priority />
      <span className={`${inter.className} text-xl font-extrabold tracking-tight`}>{text}</span>
    </Link>
  )
}

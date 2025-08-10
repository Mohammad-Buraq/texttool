// app/layout.jsx
export const metadata = {
  title: "TextTools AI — Free, Fast, Private Text Tools",
  description: "High-quality, mobile-friendly tools that run entirely in your browser.",
  metadataBase: new URL("https://www.thetexttools.com"),
};

import "@/styles/globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import Analytics from '@/components/Analytics';


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <script dangerouslySetInnerHTML={{__html:`(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})()`}} />

        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-extrabold text-blue-600">TextTools AI</a>
            <nav className="flex items-center gap-4 text-sm">
              <a className="hover:underline" href="/about">About</a>
              <a className="hover:underline" href="/contact">Contact</a>
              <ThemeToggle />
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        <footer className="border-t border-gray-200 dark:border-gray-800 mt-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 dark:text-gray-400 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} TextTools AI — Privacy-first. No text is uploaded.</div>
            <nav className="flex gap-4">
              <a href="/about" className="hover:underline">About</a>
              <a href="/contact" className="hover:underline">Contact</a>
              <a href="/sitemap.xml" className="hover:underline">Sitemap</a>
            </nav>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}

// app/layout.jsx
export const metadata = {
  title: "Text Tools — Free, Fast, Private Text Tools",
  description:
    "High-quality, mobile-friendly tools that run entirely in your browser.",
  metadataBase: new URL("https://www.thetexttools.com"),
};

import "@/styles/globals.css";
import { Suspense } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Analytics from "@/components/Analytics";
import BrandLogo from "@/components/BrandLogo";
import SiteFooter from '@/components/SiteFooter'   // ⬅ add at top with other imports
import MobileNavSelect from "@/components/MobileNavSelect"; // ← add this




// ✅ Import Inter font just for header links
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: ["700", "800"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})()`,
          }}
        />
        <Suspense fallback={null}>
          {/* ===== HEADER ===== */}
          <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 md:py-4">
              <div className="flex items-center justify-between gap-3">
                <BrandLogo href="/" size={28} />

                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Desktop nav (unchanged on ≥640px) */}
                  <nav className={`hidden sm:flex items-center gap-4 text-sm ${inter.className}`}>
                    <a className="hover:underline" href="/categories">Categories</a>
                    <a className="hover:underline" href="/about">About</a>
                    <a className="hover:underline" href="/contact">Contact</a>
                  </nav>

                  {/* Mobile compact nav (client component) */}
                  <MobileNavSelect />

                  {/* Dark mode button */}
                  <div className="shrink-0 scale-95 sm:scale-100">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* ===== MAIN ===== */}
          <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
            {children}
          </main>

          {/* ===== FOOTER ===== */}
          <SiteFooter />

          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}

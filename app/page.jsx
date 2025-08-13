import { getAllTools } from "@/data/tools";
import Link from "next/link";
import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import HomeCategoryFilter from '@/components/HomeCategoryFilter';



export const metadata = {
  title: "Free Text Tools — Fast, Private, In-Browser",
  description:
    "High-quality text utilities that run entirely in your browser. Clean, convert, count, encode, and analyze text fast—privacy-first, mobile-perfect.",
};

export default function Home() {
  const tools = getAllTools();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Text Tools — crisp, private, blazing fast
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Powerful in-browser tools for writers, students, devs, and creators.
          No sign-up. No uploads. Results instantly.
        </p>
        <div className="max-w-3xl mx-auto">
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>
      </section>

      <HomeCategoryFilter initialVisible={6} />

      

      {/* Long description (SEO) */}
      {/* SEO band – matches tools grid width */}
      <section className="mt-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40">
        <div className="px-6 sm:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                The fastest way to clean, convert, and analyze text
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Text Tools is a focused collection of utilities that run
                directly in your browser. Each tool is crafted for a single
                job—remove duplicates, fix spacing, change case, split or join
                lines, encode or decode data—and every tool is tuned for
                accuracy, Unicode correctness, and large inputs. Nothing is
                uploaded or stored.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Why people choose us</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Privacy-first:</strong> Everything runs on-device.
                </li>
                <li>
                  <strong>Reliable & fast:</strong> Instant results—even on big
                  files.
                </li>
                <li>
                  <strong>Mobile-perfect:</strong> Clean UI, dark mode,
                  shortcuts.
                </li>
              </ul>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                We ship new tools weekly—explore the grid above or use search.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

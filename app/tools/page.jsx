// app/tools/page.jsx
import Link from "next/link";
import { getAllTools } from "@/data/tools";
import { getBaseUrl } from "@/lib/site";

export const metadata = {
  title: "All Text Tools — Free Online Text Utilities",
  description:
    "Browse every tool on The Text Tool in one place. This collection brings together fast, privacy-first utilities for cleaning, converting, encoding & decoding, formatting, extracting, counting, analyzing, and generating plain text. Everything runs entirely in your browser—nothing is uploaded—so you can safely work with notes, logs, configs, drafts, or code snippets. Whether you need to remove duplicate lines, fix spacing, change case, sort content, escape or URL‑encode text, format or minify JSON/HTML/CSS/JS, convert CSV ↔ JSON ↔ YAML ↔ Markdown, extract emails/URLs/numbers with regex, or measure readability and frequency, you'll find a focused tool that does one job perfectly. Use this page to jump quickly to what you need, discover related utilities, and bookmark your favorites.",
  alternates: { canonical: "/tools" },
};

export default function ToolsIndex() {
  const tools = getAllTools().slice().sort((a, b) => a.name.localeCompare(b.name));
  const base = getBaseUrl();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${base}/tools/${t.slug}`,
      name: t.name,
      description: t.description,
    })),
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          All Text Tools ({tools.length})
        </h1>
        <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-3xl">
          Browse every tool on The Text Tool in one place. This collection brings together fast, privacy-first utilities
          for cleaning, converting, encoding & decoding, formatting, extracting, counting, analyzing, and generating text.
          Everything runs entirely in your browser—nothing is uploaded—so you can safely work with notes, logs, configs,
          drafts, or code snippets. Whether you need to remove duplicate lines, fix spacing, change case, sort content,
          escape or URL‑encode text, format or minify JSON/HTML/CSS/JS, convert CSV ↔ JSON ↔ YAML ↔ Markdown, extract
          emails/URLs/numbers with regex, or measure readability and frequency, you'll find a focused tool that does one
          job perfectly.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
          >
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {t.description}
            </div>
          </Link>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}

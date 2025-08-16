// app/tools/page.jsx
import Link from "next/link";
import { getAllTools } from "@/data/tools";
import { getBaseUrl } from "@/lib/site";
import ToolSearchGrid from "@/components/ToolSearchGrid";
import { Suspense } from "react";

export const metadata = {
  title: "All Text Tools — Free Online Text Utilities",
  description:
    "Browse every tool on The Text Tool in one place. This collection brings together fast, privacy-first utilities for cleaning, converting, encoding & decoding, formatting, extracting, counting, analyzing, and generating plain text. Everything runs entirely in your browser—nothing is uploaded—so you can safely work with notes, logs, configs, drafts, or code snippets. Whether you need to remove duplicate lines, fix spacing, change case, sort content, escape or URL‑encode text, format or minify JSON/HTML/CSS/JS, convert CSV ↔ JSON ↔ YAML ↔ Markdown, extract emails/URLs/numbers with regex, or measure readability and frequency, you'll find a focused tool that does one job perfectly.",
  alternates: { canonical: "/tools" },
};

export default function ToolsIndex() {
  // ⚠️ Only pass serializable fields to the client component
  const tools = getAllTools()
    .map((t) => ({
      slug: t.slug,
      name: t.name,
      description: t.description || "",
      category: t.category || "",
      tags: Array.isArray(t.tags) ? t.tags.join(" ") : "",
      synonyms: Array.isArray(t.synonyms) ? t.synonyms.join(" ") : "",
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

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
        <p className="mt-3 text-gray-700 dark:text-gray-300 md:text-lg leading-relaxed max-w-none">
          Browse every tool on The Text Tool in one place. This collection brings together fast, privacy-first utilities
          for cleaning, converting, encoding & decoding, formatting, extracting, counting, analyzing, and generating text.
          Everything runs entirely in your browser—nothing is uploaded—so you can safely work with notes, logs, configs,
          drafts, or code snippets.
        </p>
        <p className="mt-3 text-gray-700 dark:text-gray-300 md:text-lg leading-relaxed max-w-none">
          Whether you need to remove duplicate lines, fix spacing, change case, sort content,
          escape or URL‑encode text, format or minify JSON/HTML/CSS/JS, convert CSV ↔ JSON ↔ YAML ↔ Markdown, extract
          emails/URLs/numbers with regex, or measure readability and frequency, you'll find a focused tool that does one
          job perfectly.
        </p>

        {/* Search */}
        <div className="mt-6">
          <Suspense fallback={null}>
            <ToolSearchGrid tools={tools} />
          </Suspense>
        </div>
      </header>

      {/* Static schema describing the full list */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}

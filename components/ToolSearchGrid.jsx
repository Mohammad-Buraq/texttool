// components/ToolSearchGrid.jsx
'use client';

import Link from "next/link";
import { useMemo, useState } from "react";

export default function ToolSearchGrid({ tools }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return tools;
    return tools.filter((t) => {
      const hay = `${t.name} ${t.description} ${t.category} ${t.tags} ${t.synonyms}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [q, tools]);

  return (
    <>
      <label htmlFor="tool-search" className="sr-only">Search tools</label>
      <input
        id="tool-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tools (e.g., base64, json, duplicate lines)…"
        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        Showing <span className="font-medium">{filtered.length}</span> of {tools.length} tools
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
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
        {filtered.length === 0 && (
          <div className="col-span-full text-gray-600 dark:text-gray-400">
            No tools match “{q}”. Try another keyword.
          </div>
        )}
      </div>
    </>
  );
}

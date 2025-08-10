// components/ToolLayout.jsx
// NOTE: Server component (no "use client", no hooks)
import Link from "next/link";

const ACCENTS = {
  blue:    "ring-blue-200 dark:ring-blue-900/40 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30",
  violet:  "ring-violet-200 dark:ring-violet-900/40 bg-gradient-to-b from-violet-50 to-white dark:from-violet-950/30",
  emerald: "ring-emerald-200 dark:ring-emerald-900/40 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/30",
  slate:   "ring-slate-200 dark:ring-slate-800 bg-white dark:bg-gray-900",
};

export default function ToolLayout({
  title,
  description,
  children,
  related = [],
  longContent = null,   // pass <tool.Long /> from page
  accent = "blue",      // blue | violet | emerald | slate
}) {
  const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";
  const card = "rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900";
  const inputCard = "rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-6";

  return (
    <div className={container}>
      <div className="grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">
        {/* LEFT */}
        <div>
          <header className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h1>
            {description ? (
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">{description}</p>
            ) : null}
          </header>

          <div className={inputCard}>{children}</div>

          {longContent ? (
            <section
              className={
                `mt-6 sm:mt-8 rounded-xl ring-1 p-5 sm:p-6 ` +
                (ACCENTS[accent] || ACCENTS.blue)
              }
            >
              <div className="prose dark:prose-invert max-w-none">
                {longContent}
              </div>
            </section>
          ) : null}
        </div>

        {/* RIGHT: Related */}
        <aside className="lg:sticky lg:top-20">
          {related?.length ? (
            <div className={card + " p-4 sm:p-5"}>
              <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">Related tools</h2>
              <div className="grid gap-2">
                {related.slice(0, 10).map((r) => (
                  <Link
                    key={r.slug}
                    href={`/tools/${r.slug}`}
                    className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{r.description}</div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

export const metadata = {
  title: "About • TextTools AI",
  description: "Premium in-browser text utilities. Fast, private, and precise.",
};

export default function About() {
  return (
    <div className="space-y-12">
      {/* Intro */}
      <section className="max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">About Text Tools</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Text Tools is a collection of high-quality utilities that run entirely in your browser—
          no account, no uploads, no distractions.
        </p>
      </section>

      {/* Value cards */}
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {h:'Privacy-first', p:"All processing happens on your device. We don’t store your text."},
          {h:'Accurate at scale', p:"Unicode/emoji-aware, large-input tested, predictable results."},
          {h:'Fast & mobile-perfect', p:"Instant output, dark mode, keyboard shortcuts, responsive UI."},
        ].map((c,i)=>(
          <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 p-5">
            <h3 className="mb-1 font-semibold">{c.h}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{c.p}</p>
          </div>
        ))}
      </section>

      {/* Highlight band */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40">
        <div className="px-6 sm:px-8 py-8 grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-extrabold">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Core tools in active development</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold">0 uploads</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Everything runs on-device</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold">Weekly</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">New tools & improvements</div>
          </div>
        </div>
      </section>

      {/* Promise + roadmap */}
      <section className="grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Our promise</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Clear UX and reliable results. If anything feels off, <a className="underline" href="/contact">tell us</a> —
            we ship improvements weekly.
          </p>
          <h3 className="mt-6 font-semibold">Design principles</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Single-purpose tools, predictable outputs</li>
            <li>Keyboard-first speed (Copy, Download, Clear)</li>
            <li>Accessible and mobile-friendly by default</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Roadmap</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>50 essentials (cleaning, case, counting, encoding)</li>
            <li>Developer helpers (JSON/XML/CSV, regex utilities)</li>
            <li>Writer workflows (readability, formatting)</li>
            <li>Diff/compare, converters, batch tools</li>
          </ul>
        </div>
      </section>

      {/* Mini-FAQ */}
      <section className="max-w-4xl">
        <h2 className="text-2xl font-bold tracking-tight mb-2">FAQ</h2>
        <div className="space-y-4">
          <details className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <summary className="font-medium cursor-pointer">Do you upload or store my text?</summary>
            <p className="mt-2 text-gray-700 dark:text-gray-300">No. All tools run fully in your browser and never send your text anywhere.</p>
          </details>
          <details className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <summary className="font-medium cursor-pointer">Are the tools free?</summary>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Yes. The core tools are free to use with no sign-up.</p>
          </details>
          <details className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <summary className="font-medium cursor-pointer">Can I request a tool?</summary>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Absolutely. Submit a request on the <a className="underline" href="/contact">Contact</a> page — we prioritize the most requested.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}

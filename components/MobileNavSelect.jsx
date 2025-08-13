'use client';

export default function MobileNavSelect() {
  return (
    <div className="sm:hidden">
      <select
        onChange={(e) => { if (e.target.value) window.location.href = e.target.value; }}
        className="rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent px-2 py-1 text-sm"
        aria-label="Navigate"
        defaultValue=""
      >
        <option value="" disabled>Menu…</option>
        <option value="/categories">Categories</option>
        <option value="/about">About</option>
        <option value="/contact">Contact</option>
      </select>
    </div>
  );
}

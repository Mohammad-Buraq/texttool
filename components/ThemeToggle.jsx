'use client'
export default function ThemeToggle() {
  return (
    <button
      className="btn text-sm"
      onClick={() => {
        const el = document.documentElement
        const next = el.classList.contains('dark') ? 'light' : 'dark'
        el.classList.toggle('dark')
        try { localStorage.setItem('theme', next) } catch {}
      }}
      title="Toggle dark mode"
    >
      Dark Mode
    </button>
  )
}

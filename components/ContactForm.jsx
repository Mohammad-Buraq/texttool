'use client'

export default function ContactForm() {
  function onSubmit(e){
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`[TextTools AI] ${f.get('topic')||'Message'}`)
    const body = encodeURIComponent(`Name: ${f.get('name')}\nEmail: ${f.get('email')}\n\nMessage:\n${f.get('message')}`)
    window.location.href = `mailto:hello@thetexttool.com?subject=${subject}&body=${body}`
  }
  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">Name<input name="name" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2" required /></label>
        <label className="block text-sm">Email<input type="email" name="email" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2" required /></label>
      </div>
      <label className="block text-sm">Topic
        <select name="topic" className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2">
          <option>General</option><option>Bug Report</option><option>Suggest a Tool</option><option>Partnership</option>
        </select>
      </label>
      <label className="block text-sm">Message
        <textarea name="message" rows={6} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2" required />
      </label>
      <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" type="submit">
        Open Email Draft
      </button>
    </form>
  )
}

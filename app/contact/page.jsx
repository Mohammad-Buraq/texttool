// app/contact/page.jsx (only the layout)
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact • Text Tools',
  description: 'Get in touch with the Text Tools team.',
}

export default function Contact(){
  return (
    <div className="space-y-10">
      <section className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Contact</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Email us at <a className="underline" href="mailto:hello@thetexttools.com">hello@thetexttools.com</a> — we read every message.
        </p>
      </section>

      <section className="mx-auto max-w-3xl">
        <ContactForm />
      </section>

      <section className="mx-auto max-w-3xl">
        <h2 className="text-xl font-bold tracking-tight mb-2">Suggest a tool</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Include the name, what it should do, and a short example input → output. We prioritize the most requested.
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-6 mb-2">Privacy</h2>
        <p className="text-gray-700 dark:text-gray-300">All tools run fully on-device. We don’t upload, log, or store your text.</p>
      </section>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function PlaceholderPage({ eyebrow, title }) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-32 text-center bg-gradient-to-b from-white via-slate-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">{eyebrow}</span>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900">{title}</h1>
        <p className="mt-4 text-base text-slate-500 max-w-md mx-auto leading-relaxed">
          This page is on its way — content and design are coming soon.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 px-7 py-3 bg-ox text-white text-sm font-semibold rounded-full shadow-lg shadow-ox/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          Back to Home
        </Link>
      </motion.div>
    </section>
  )
}

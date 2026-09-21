import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'

// TODO: replace with the real production webhook URL from n8n workflow
// 08-public-visitor-stats.json once it's activated and n8n has a public URL.
const STATS_URL = 'https://YOUR-N8N-DOMAIN/webhook/openmind-public-stats'

// Below this many monthly visitors, the numbers don't say anything trust-building
// yet — better to show nothing than a stat that undersells the business.
const MIN_VISITORS_TO_SHOW = 50

export default function TrustStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch(STATS_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data?.activeUsers30d >= MIN_VISITORS_TO_SHOW) setStats(data)
      })
      .catch(() => {})
  }, [])

  if (!stats) return null

  return (
    <section className="py-12 px-6 md:px-16 bg-white">
      <FadeInSection>
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-3xl md:text-4xl font-extrabold text-slate-900">{stats.activeUsers30d.toLocaleString()}+</div>
            <div className="mt-1 text-xs font-semibold tracking-widest uppercase text-slate-400">Visitors, last 30 days</div>
          </motion.div>
          <span className="hidden md:block w-px h-10 bg-slate-100" />
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="text-3xl md:text-4xl font-extrabold text-slate-900">{stats.countries30d}+</div>
            <div className="mt-1 text-xs font-semibold tracking-widest uppercase text-slate-400">Countries reached</div>
          </motion.div>
        </div>
      </FadeInSection>
    </section>
  )
}

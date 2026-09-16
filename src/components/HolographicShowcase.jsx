import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services } from '../data/services'

const HoloCard = ({ service, index, isActive, onHover, onLeave }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    onMouseEnter={() => onHover(index)}
    onMouseLeave={onLeave}
    className="group relative"
  >
    <div
      className={`relative rounded-2xl p-[1px] transition-all duration-500 ${
        isActive
          ? 'shadow-[0_0_40px_rgba(249,115,22,0.3)]'
          : 'shadow-[0_0_20px_rgba(249,115,22,0.1)]'
      }`}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${service.color}, ${service.accent}, ${service.color})`
          : `linear-gradient(135deg, ${service.color}33, ${service.accent}33, ${service.color}33)`,
      }}
    >
      <div className="relative rounded-2xl bg-[#0c1222] p-6 h-full overflow-hidden">
        {/* Holographic shimmer overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 20%, ${service.color}08 40%, transparent 60%, ${service.accent}08 80%)`,
          }}
        />

        {/* Floating glow orb */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"
          style={{ background: service.color }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{
                background: `linear-gradient(135deg, ${service.color}, ${service.accent})`,
                boxShadow: `0 0 20px ${service.color}40`,
              }}
            >
              {service.num}
            </div>
            <span
              className="text-xs font-semibold tracking-[0.15em] uppercase"
              style={{ color: service.color }}
            >
              {service.label}
            </span>
          </div>

          <h3 className="text-white text-lg font-bold leading-snug mb-2">
            {service.title.replace('\n', ' ')}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            {service.desc}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: service.color }}
              />
              <span className="text-xs text-slate-500">{service.stat}</span>
            </div>
            <Link
              to={`/services/${service.path}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: service.color }}
            >
              Explore
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

export default function HolographicShowcase() {
  const sectionRef = useRef(null)
  const [activeCard, setActiveCard] = useState(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const phoneY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const phoneRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8])
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.3, 0.7, 0.3])

  const heroServices = services.slice(0, 4)

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #060b18 0%, #0c1222 30%, #111827 70%, #0f172a 100%)',
      }}
    >
      <style>
        {`
          @keyframes holoShimmer {
            0% { background-position: 200% 100%; }
            50% { background-position: -100% 100%; }
            100% { background-position: 200% 100%; }
          }
        `}
      </style>
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Large background glow orbs */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
      >
        <div className="w-full h-full bg-gradient-to-br from-ox/30 via-purple-500/20 to-ob/30" />
      </motion.div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-ob/10 blur-[120px]" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-ox/10 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ox/10 border border-ox/20 text-ox text-xs font-semibold tracking-[0.15em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-ox animate-pulse" />
            Our AI Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Human+AI,{' '}
            <span className="bg-gradient-to-r from-ox via-purple-400 to-ob bg-clip-text text-transparent">
              Done Right
            </span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Nearly five decades of industry expertise, powered by AI trained by domain specialists to solve real-world customer challenges.
          </p>
        </motion.div>

        {/* Phone Mockup + Cards Grid */}
        <div className="grid lg:grid-cols-[1fr_340px_1fr] gap-8 lg:gap-6 items-center">
          {/* Left cards */}
          <div className="hidden lg:grid gap-6">
            {heroServices.slice(0, 2).map((s, i) => (
              <HoloCard
                key={s.id}
                service={s}
                index={i}
                isActive={activeCard === i}
                onHover={setActiveCard}
                onLeave={() => setActiveCard(null)}
              />
            ))}
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center">
            <motion.div
              style={{ y: phoneY, rotateX: phoneRotateX }}
              className="relative"
            >
              {/* Glow behind phone */}
              <div className="absolute inset-0 -m-12 rounded-full bg-gradient-to-b from-ox/20 via-purple-500/15 to-ob/20 blur-[80px]" />

              {/* Phone frame */}
              <div className="relative w-[240px] md:w-[260px]">
                <div
                  className="relative rounded-[36px] p-[3px] overflow-hidden"
                  style={{
                    background: 'linear-gradient(160deg, rgba(249,115,22,0.5), rgba(124,58,237,0.5), rgba(59,130,246,0.5))',
                  }}
                >
                  {/* Inner holographic border shimmer */}
                  <div className="absolute inset-0 rounded-[36px] opacity-60 animate-[holoShimmer_4s_ease-in-out_infinite]"
                    style={{
                      background: 'linear-gradient(120deg, transparent 30%, rgba(249,115,22,0.4) 50%, transparent 70%)',
                      backgroundSize: '200% 100%',
                    }}
                  />

                  {/* Phone screen */}
                  <div className="relative rounded-[34px] bg-[#0f1629] overflow-hidden">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-5 pt-3 pb-1">
                      <span className="text-[10px] text-slate-500 font-medium">9:41</span>
                      <div className="flex items-center gap-1">
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                          <rect x="0" y="6" width="2.5" height="4" rx="0.5" fill="#64748b" />
                          <rect x="3.5" y="4" width="2.5" height="6" rx="0.5" fill="#64748b" />
                          <rect x="7" y="2" width="2.5" height="8" rx="0.5" fill="#64748b" />
                          <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" fill="#f97316" />
                        </svg>
                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                          <rect x="0.5" y="0.5" width="13" height="9" rx="2" stroke="#64748b" />
                          <rect x="14" y="3" width="1.5" height="4" rx="0.5" fill="#64748b" />
                          <rect x="2" y="2" width="6" height="6" rx="1" fill="#22c55e" />
                        </svg>
                      </div>
                    </div>

                    {/* App header */}
                    <div className="px-5 py-3 border-b border-white/5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ox to-ob flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">OM</span>
                        </div>
                        <div>
                          <p className="text-white text-[11px] font-bold">Open Mind AI</p>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[9px] text-emerald-400">Online</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat messages */}
                    <div className="p-4 space-y-3 min-h-[300px]">
                      {/* Bot message */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex gap-2"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-ox to-ob flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-white text-[7px] font-bold">AI</span>
                        </div>
                        <div className="bg-white/5 rounded-2xl rounded-tl-md px-3 py-2 max-w-[180px]">
                          <p className="text-white text-[10px] leading-relaxed">
                            Hi! I can help you with support, sales, or scheduling. What do you need?
                          </p>
                        </div>
                      </motion.div>

                      {/* User message */}
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="flex justify-end"
                      >
                        <div
                          className="rounded-2xl rounded-tr-md px-3 py-2 max-w-[180px]"
                          style={{
                            background: 'linear-gradient(135deg, #f97316, #2563eb)',
                          }}
                        >
                          <p className="text-white text-[10px] leading-relaxed">
                            I need help with a delayed order
                          </p>
                        </div>
                      </motion.div>

                      {/* Bot response */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.3 }}
                        className="flex gap-2"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-ox to-ob flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-white text-[7px] font-bold">AI</span>
                        </div>
                        <div className="bg-white/5 rounded-2xl rounded-tl-md px-3 py-2 max-w-[180px]">
                          <p className="text-white text-[10px] leading-relaxed">
                            I found your order #4821. It&apos;s currently in transit and will arrive by tomorrow. Want me to set up delivery alerts?
                          </p>
                          <div className="flex gap-1.5 mt-2">
                            <span className="px-2 py-1 rounded-full bg-ox/20 text-ox text-[8px] font-semibold">
                              Yes
                            </span>
                            <span className="px-2 py-1 rounded-full bg-white/10 text-slate-300 text-[8px] font-semibold">
                              No
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Typing indicator */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 2 }}
                        className="flex gap-2"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-ox to-ob flex items-center justify-center shrink-0">
                          <span className="text-white text-[7px] font-bold">AI</span>
                        </div>
                        <div className="bg-white/5 rounded-2xl rounded-tl-md px-4 py-3">
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Input bar */}
                    <div className="px-3 pb-3">
                      <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-2">
                        <span className="text-slate-500 text-[10px]">Type a message...</span>
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center ml-auto"
                          style={{
                            background: 'linear-gradient(135deg, #f97316, #2563eb)',
                          }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reflection / holographic base */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[180px] h-[60px] rounded-full bg-gradient-to-b from-ox/15 to-transparent blur-[20px]" />
              </div>
            </motion.div>
          </div>

          {/* Right cards */}
          <div className="hidden lg:grid gap-6">
            {heroServices.slice(2, 4).map((s, i) => (
              <HoloCard
                key={s.id}
                service={s}
                index={i + 2}
                isActive={activeCard === i + 2}
                onHover={setActiveCard}
                onLeave={() => setActiveCard(null)}
              />
            ))}
          </div>
        </div>

        {/* Mobile: show all cards in grid */}
        <div className="lg:hidden grid sm:grid-cols-2 gap-4 mt-10">
          {heroServices.map((s, i) => (
            <HoloCard
              key={s.id}
              service={s}
              index={i}
              isActive={activeCard === i}
              onHover={setActiveCard}
              onLeave={() => setActiveCard(null)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-ox to-ob text-white text-sm font-semibold shadow-lg shadow-ox/20 hover:shadow-xl hover:shadow-ox/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore All Solutions
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

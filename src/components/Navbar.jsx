import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/Logo.png'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#services', dropdown: true },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Impact', href: '#impact' },
  { label: 'Contact', href: '#contact' },
]

const serviceLinks = [
  { label: 'Omnichannel Support Hub', path: 'omnichannel-support' },
  { label: 'Generative AI IVR', path: 'generative-ai-ivr' },
  { label: 'AI Chatbots', path: 'ai-chatbots' },
  { label: 'Intelligent Automation', path: 'intelligent-automation' },
  { label: 'Analytics & Reporting', path: 'revenue-impact' },
  { label: "Custom CRM's", path: 'custom-crms' },
]

function NavLink({ href, className, onClick, children }) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }
  if (href.startsWith('#')) {
    return (
      <Link to={'/' + href} replace className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  }, [])

  const closeEverything = () => {
    setMenuOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-4 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-slate-200/60' : 'bg-transparent'
      }`}
    >
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="OpenMind Logo" className="h-12 w-auto -my-2" />
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {links.map((l) =>
          l.dropdown ? (
            <div key={l.label} ref={servicesRef} className="relative">
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors duration-300"
                onMouseEnter={() => setServicesOpen(true)}
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                {l.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-64 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/60 py-2"
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {serviceLinks.map((s) => (
                      <NavLink
                        key={s.label}
                        href={`/services/${s.path}`}
                        onClick={closeEverything}
                        className="block w-full text-left px-5 py-2.5 text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        {s.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <NavLink key={l.label} href={l.href} onClick={closeEverything} className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors duration-300">
              {l.label}
            </NavLink>
          ),
        )}
      </div>

      <button className="md:hidden text-slate-400" onClick={() => setMenuOpen(!menuOpen)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {menuOpen ? <path d="M6 6l12 12M18 6l-12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-slate-200 p-6 flex flex-col gap-5 md:hidden"
          >
            {links.map((l) =>
              l.dropdown ? (
                <div key={l.label}>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex w-full items-center justify-between text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    {l.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 ml-3 border-l border-slate-200 pl-4 flex flex-col gap-3">
                          {serviceLinks.map((s) => (
                            <NavLink
                              key={s.label}
                              href={`/services/${s.path}`}
                              onClick={closeEverything}
                              className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
                            >
                              {s.label}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink key={l.label} href={l.href} onClick={closeEverything} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                  {l.label}
                </NavLink>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/Logo.png'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Impact', href: '#impact' },
  { label: 'Contact', href: '#contact' },
]

function NavLink({ href, className, onClick, children }) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className} onClick={onClick}>
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-4 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-slate-200/60' : 'bg-transparent'
      }`}
    >
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="OpenMind Logo" className="h-12 w-auto -my-2" />
      </Link>

      <div className="hidden md:flex items-center gap-10">
        {links.map((l) => (
          <NavLink key={l.href} href={l.href} className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors duration-300">
            {l.label}
          </NavLink>
        ))}
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
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                {l.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

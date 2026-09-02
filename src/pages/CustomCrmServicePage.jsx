import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import FaqSchema from '../components/FaqSchema'
import outlookLogo from '../assets/outlook.svg?url'

/* ───────────────────────── Brand ───────────────────────── */
const BLUE = '#3b82f6'
const VIOLET = '#8b5cf6'
const ORANGE = '#ff7a00'
const INK = '#0a0a0a'
const GRAD = `linear-gradient(90deg, ${BLUE}, ${VIOLET})`

const faqs = [
  { q: 'Why build a custom CRM instead of buying an off-the-shelf one?', a: 'Off-the-shelf CRMs fit their vendor\'s idea of your business. A custom CRM is shaped around your actual workflows, avoids paying for modules you\'ll never use, and removes the per-user licensing cost of scaling. You own the output.' },
  { q: 'Can it connect with our tools and services?', a: 'Yes. Custom CRMs integrate with telephony, email, AI chatbots, payment gateways and third-party APIs via REST, so support and sales data stay in one place.' },
  { q: 'Will our team need training?', a: 'We provide onboarding and a tailored interface that mirrors how your team already works, so adoption is quick. We continue to support and extend the system after launch.' },
  { q: 'Do we own the data and the system?', a: 'Yes. Your data stays yours, and the system is built for your business — with role-based access and full control over hosting and security.' },
]

/* ─────────────────── Count-up number ─────────────────── */
function CountUp({ to, decimals = 0, suffix = '', className, color }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to])
  return (
    <span ref={ref} className={className} style={color ? { color } : undefined}>
      {val.toFixed(decimals)}{suffix}
    </span>
  )
}

/* ─────────────────── 3D tilt wrapper ─────────────────── */
function Tilt({ children, max = 9, className = '' }) {
  const ref = useRef(null)
  const [t, setT] = useState({ x: 0, y: 0 })
  const [hov, setHov] = useState(false)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setT({ x: px * max, y: -py * max })
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setT({ x: 0, y: 0 }) }}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1200px) rotateX(${t.y}deg) rotateY(${t.x}deg)`,
        transition: hov ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(.2,.8,.2,1)',
      }}
    >
      {children}
    </div>
  )
}

/* =========================================================
   Live CRM dashboard (hero) — tabs: Pipeline / Leads / Tickets / Reports
   ========================================================= */
const dealRows = {
  Pipeline: [
    { name: 'New Lead', tag: 'WhatsApp', stage: 'Qualified', val: '₹18k', c: BLUE, i: 'N', time: '10:23 AM · WhatsApp' },
    { name: 'Warm Lead', tag: 'High-value', stage: 'Negotiation', val: '₹240k', c: VIOLET, i: 'W', time: 'Quote sent' },
    { name: 'Site Visit', tag: 'Follow-up', stage: 'Site visit', val: '₹92k', c: ORANGE, i: 'S', time: 'Follow-up today' },
    { name: 'Form Capture', tag: 'New', stage: 'New', val: '₹8k', c: '#14b8a6', i: 'F', time: 'Captured via form' },
  ],
  Leads: [
    { name: 'New Lead', tag: 'WhatsApp lead', stage: 'Captured', val: 'Score 92', c: BLUE, i: 'N', time: 'De-duplicated' },
    { name: 'Warm Lead', tag: 'High-value', stage: 'Auto-assign', val: 'Score 88', c: VIOLET, i: 'W', time: '→ Best rep' },
    { name: 'Site Visit', tag: 'Site visit', stage: 'Engaged', val: 'Score 74', c: ORANGE, i: 'S', time: 'Reminder queued' },
    { name: 'Referral Lead', tag: 'Referral', stage: 'New', val: 'Score 61', c: '#14b8a6', i: 'R', time: '3 min ago' },
  ],
  Tickets: [
    { name: 'Admission docs', tag: 'Healthcare', stage: 'In progress', val: 'SLA 2h', c: ORANGE, i: 'A', time: 'Agent assigned' },
    { name: 'Site visit reschedule', tag: 'Real Estate', stage: 'Resolved', val: 'Closed', c: BLUE, i: 'B', time: 'SLA met' },
    { name: 'Insurance filing', tag: 'Healthcare', stage: 'New', val: 'SLA 4h', c: VIOLET, i: 'C', time: 'Auto-routed' },
  ],
  Reports: [
    { name: 'Forecast by stage', tag: 'This month', stage: 'Live', val: '₹410k', c: VIOLET, i: 'F', time: 'Auto-refresh' },
    { name: 'Win / loss reasons', tag: 'Last 90d', stage: 'Updated', val: '42 deals', c: BLUE, i: 'W', time: '12 min ago' },
    { name: 'Team pipeline', tag: 'Rep breakdown', stage: 'Live', val: '96%', c: ORANGE, i: 'T', time: 'Accuracy 94%' },
  ],
}

const kpis = {
  Pipeline: [ { l: 'Active leads', v: 128, d: '+12 today', up: '+', c: '#22c55e', frac: 78 }, { l: 'Overdue', v: 6, d: 'needs attention', up: '', c: '#ef4444', frac: 12 }, { l: 'Score avg', v: 82, d: 'qualified', up: '', c: INK, pct: true, frac: 82 } ],
  Leads: [ { l: 'New today', v: 18, d: '+8 captured', up: '+', c: '#22c55e', frac: 60 }, { l: 'Duplicated', v: 2, d: 'auto-merged', up: '', c: '#22c55e', frac: 8 }, { l: 'Response time', v: 4.2, d: 'avg minutes', up: '', c: INK, dec: 1, suf: 'm', frac: 30 } ],
  Tickets: [ { l: 'Open', v: 14, d: 'in SLA', up: '', c: INK, frac: 46 }, { l: 'Resolved today', v: 9, d: 'across teams', up: '+', c: '#22c55e', frac: 56 }, { l: 'SLA met', v: 96, d: 'this week', up: '', c: INK, pct: true, frac: 96 } ],
  Reports: [ { l: 'Forecast', v: 410, d: 'K exposure', up: '₹', c: VIOLET, frac: 70 }, { l: 'Won this month', v: 22, d: 'deals closed', up: '+', c: '#22c55e', frac: 44 }, { l: 'Accuracy', v: 94, d: 'forecast vs actual', up: '', c: INK, pct: true, frac: 94 } ],
}

function LiveDashboard() {
  const [tab, setTab] = useState('Pipeline')
  const rows = dealRows[tab]
  const stats = kpis[tab]

  return (
    <div className="relative bg-white/80 backdrop-blur-2xl rounded-[28px] border border-[#eef2f7] shadow-[0_30px_60px_rgba(15,23,42,0.12)] overflow-hidden">
      {/* window chrome */}
      <div className="flex items-center justify-between px-5 md:px-6 h-[54px] border-b border-[#eef2f7] bg-[#fcfdff]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#fecaca]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#fde68a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#bbf7d0]" />
        </div>
        <div className="flex gap-1.5 p-1 rounded-full bg-[#f1f5f9] border border-[#e2e8f0]">
          {['Pipeline', 'Leads', 'Tickets', 'Reports'].map((tb) => (
            <button key={tb} onClick={() => setTab(tb)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition ${tab === tb ? 'bg-[#0a0a0a] text-white shadow' : 'text-[#64748b] hover:text-[#0a0a0a]'}`}>
              {tb}
            </button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2 text-[11px] text-[#94a3b8]">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" /> Live
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-3 p-4 md:p-5 bg-gradient-to-b from-white to-[#f8faff]">
        {stats.map((k) => (
          <div key={k.l} className="rounded-[18px] bg-white border border-[#eef2f7] p-3 md:p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="text-[11px] font-semibold tracking-wide text-[#94a3b8]">{k.l}</div>
            <div className="mt-1 text-[22px] font-extrabold tracking-tight flex items-baseline gap-1" style={{ color: k.c }}>
              {(k.up === '₹') && <span>{k.up}</span>}
              <CountUp to={k.v} decimals={k.dec || 0} suffix={k.suf || (k.pct ? '%' : '')} />
              <span className="text-[12px] font-bold" style={{ color: k.c }}>{k.up === '₹' ? '' : k.up}</span>
            </div>
            <div className="text-[11px] text-[#64748b]">{k.d}</div>
            <div className="mt-2.5 h-1.5 rounded-full bg-[#f1f5f9] overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]" initial={{ width: 0 }} animate={{ width: `${k.frac}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
            </div>
          </div>
        ))}
      </div>

      {/* deal rows */}
      <div className="p-4 md:p-5 space-y-3 bg-[#fcfdff]">
        {rows.map((r, idx) => (
          <motion.div key={r.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-[18px] bg-white border border-[#eef2f7] shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <div className="w-10 h-10 rounded-[12px] grid place-items-center font-bold text-[13px] text-white shrink-0" style={{ background: r.c, transform: 'translateZ(18px)' }}>{r.i}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold truncate">{r.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] px-2 py-0.5 rounded-full border bg-white text-[#64748b]">{r.tag}</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: r.c }} />
                <span className="text-[11px] text-[#64748b]">{r.time}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[13px] font-bold" style={{ color: r.c }}>{r.val}</div>
              <div className="mt-1 text-[11px] text-[#94a3b8]">{r.stage}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* =========================================================
   Pain → Precision cards (flip on hover)
   ========================================================= */
const pains = [
  { pain: 'Spreadsheet chaos', detail: '5 sheets, 0 truth. A lead lost in row 842.', stat: '73% leads duplicated', sol: 'Single source of truth', solDetail: 'One live CRM, every row de-duplicated in real time.' },
  { pain: 'Lost follow-ups', detail: 'Visits promised, then forgotten. No reminders.', stat: '41% ghost after first call', sol: 'Never miss a touch', solDetail: 'Auto tasks + WhatsApp nudges on every lead.' },
  { pain: 'No visibility', detail: 'Who owns what? Pipeline is a black box.', stat: '₹0 forecast confidence', sol: 'Pipeline you can trust', solDetail: 'Forecast by source, rep and stage — live.' },
  { pain: 'Manual everything', detail: 'Copy-paste, re-type, chase. Team hates CRM.', stat: '6h/week wasted', sol: 'Work happens on autopilot', solDetail: 'Captures, routes and reports themselves.' },
]

function PainCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {pains.map((p) => (
        <div key={p.pain} className="group [perspective:1200px] h-[240px]">
          <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            {/* pain face */}
            <div className="absolute inset-0 [backface-visibility:hidden] rounded-[24px] bg-white border border-[#eef2f7] p-6 shadow-[0_14px_36px_rgba(15,23,42,0.06)] flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full bg-[#0a0a0a] text-white">{p.pain.toUpperCase().slice(0, 3)}</span>
                <span className="text-[18px] font-extrabold text-[#ef4444]">!</span>
              </div>
              <div className="mt-4 text-[16px] font-bold tracking-tight leading-snug">{p.pain}</div>
              <div className="mt-2 text-[13px] leading-[1.5] text-[#64748b] flex-1">{p.detail}</div>
              <div className="mt-auto rounded-full bg-[#fef2f2] border border-[#fecdd3] text-[#ef4444] text-[12px] font-bold px-3 py-1.5 text-center">{p.stat}</div>
              <div className="mt-2 text-center text-[11px] text-[#94a3b8]">hover to flip</div>
            </div>
            {/* solution face */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[24px] bg-[#0a0a0a] text-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.2)] flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full bg-white text-[#0a0a0a]">BECOMES</span>
                <span className="text-[16px]">→</span>
              </div>
              <div className="mt-4 text-[16px] font-bold tracking-tight leading-snug">{p.sol}</div>
              <div className="mt-2 text-[13px] leading-[1.5] text-white/70 flex-1">{p.solDetail}</div>
              <div className="mt-auto rounded-full bg-white/10 border border-white/10 text-white text-[12px] font-semibold px-3 py-1.5 text-center">Built into your CRM</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* =========================================================
   Workflow canvas — auto-playing lead lifecycle
   ========================================================= */
const stages = [
  { n: '01', t: 'Capture', d: 'WhatsApp · Forms · Calls', c: BLUE },
  { n: '02', t: 'Score & segment', d: 'Auto-tags & scoring', c: VIOLET },
  { n: '03', t: 'Assign', d: 'Round-robin + territory', c: ORANGE },
  { n: '04', t: 'Follow up', d: 'Tasks + WhatsApp kits', c: BLUE },
  { n: '05', t: 'Quote', d: 'Docs in 1 click', c: VIOLET },
  { n: '06', t: 'Win & learn', d: 'Playbook updates itself', c: '#14b8a6' },
]

function WorkflowCanvas() {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-white border border-[#eef2f7] shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #e3e8f0 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="relative p-6 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold tracking-widest text-[#94a3b8]">WORKFLOW CANVAS</div>
            <h3 className="mt-3 text-[26px] md:text-[34px] font-extrabold tracking-tight leading-[0.95]">Every lead has a <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRAD }}>lifecycle</span></h3>
            <div className="mt-2 text-[14px] text-[#64748b] max-w-[520px]">From first WhatsApp ping to closed-won — orchestrated, not pieced together.</div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
            <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" /> Auto-playing
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <div className="relative min-w-[840px]">
            {/* connector line */}
            <div className="absolute top-[22px] left-[4%] right-[4%] h-[2px]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #cbd5e1 0 8px, transparent 8px 14px)' }} />
            <div className="grid grid-cols-6 gap-4 relative">
              {stages.map((s, i) => (
                <motion.div key={s.n} className="relative text-center"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                  <motion.div className="mx-auto w-[44px] h-[44px] rounded-[14px] grid place-items-center text-white font-bold text-[14px] shadow-lg relative z-10"
                    style={{ background: s.c }}
                    animate={{ y: [0, -6, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}>
                    {s.n}
                  </motion.div>
                  <div className="mt-3 text-[13px] font-bold tracking-tight">{s.t}</div>
                  <div className="mt-1 px-2 text-[11px] text-[#64748b] leading-[1.3]">{s.d}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-[11px] text-[#64748b]">
          <span className="px-3 py-1 rounded-full bg-[#0a0a0a] text-white">Lead: New Lead</span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#eef2f7]">Captured → Qualified → Negotiation</span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#eef2f7]">Auto-demo scheduled</span>
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   Approach
   ========================================================= */
const approach = [
  { t: 'Built around your workflow', d: 'We map how your team actually works — sales, support and field — then build the CRM around it, not the other way around.' },
  { t: 'No bloat, just outcomes', d: 'Every field must earn its keep. If it doesn\'t drive a follow-up or a forecast, it doesn\'t exist.' },
  { t: 'Your team actually uses it', d: 'Designed for the people doing the work: 1-tap tasks, WhatsApp-native, zero training theatre.' },
]

/* =========================================================
   Generic vs Open Mind
   ========================================================= */
const compare = [
  { f: 'Fields & pipeline', g: 'Contacts, Deals, Activities (fixed)', o: 'Your fields: Industry-specific data, custom scoring, stage gates' },
  { f: 'Lead capture', g: 'Manual CSV import', o: 'WhatsApp, forms, calls auto-captured and de-duplicated' },
  { f: 'Assignment', g: 'You remember to assign', o: 'Round-robin + territory + capacity, SLA timer starts' },
  { f: 'Follow-up', g: 'Hope you remember', o: 'Auto tasks + WhatsApp templates — 91% fewer misses' },
  { f: 'Reporting', g: 'Pretty charts, zero truth', o: 'Forecast by source, rep and stage — what actually closes' },
]

/* =========================================================
   Automations
   ========================================================= */
const automations = [
  { t: 'Auto-capture', d: 'WhatsApp → Lead in 3 seconds', c: BLUE },
  { t: 'De-duplication', d: 'Same phone? Merged automatically.', c: VIOLET },
  { t: 'Round-robin assign', d: 'Best rep for the deal, not random.', c: ORANGE },
  { t: 'Follow-up nudge', d: 'If no action in 2 hours → task.', c: BLUE },
  { t: 'Quote / doc gen', d: 'A quote in one click, branded.', c: VIOLET },
  { t: 'Forecast ping', d: 'Daily pipeline summary to Slack.', c: '#14b8a6' },
]

/* =========================================================
   Integrations orbit — real brand logos, upright
   ========================================================= */
const tools = [
  { label: 'WhatsApp', logo: 'https://cdn.simpleicons.org/whatsapp/25D366', slug: 'whatsapp' },
  { label: 'Instagram', logo: 'https://cdn.simpleicons.org/instagram/E4405F', slug: 'instagram' },
  { label: 'Gmail', logo: 'https://cdn.simpleicons.org/gmail/EA4335', slug: 'gmail' },
  { label: 'Calendly', logo: 'https://cdn.simpleicons.org/calendly/006BFF', slug: 'calendly' },
  { label: 'Razorpay', logo: 'https://cdn.simpleicons.org/razorpay/02042B', slug: 'razorpay' },
  { label: 'AI Chatbots', logo: 'https://cdn.simpleicons.org/zendesk/03363D', slug: 'zendesk' },
  { label: 'Outlook', logo: outlookLogo, slug: 'outlook' },
]

function IntegrationsOrbit() {
  const [pause, setPause] = useState(false)
  return (
    <div className="relative rounded-[32px] bg-[#0a0a0a] text-white p-6 md:p-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1e293b, #0a0a0a)' }} />
      <div className="relative grid lg:grid-cols-[1fr_0.85fr] gap-10 items-center">
        {/* left: heading + tags */}
        <div>
          <h3 className="mt-2 text-[28px] md:text-[38px] font-extrabold tracking-tight leading-[0.95]">The CRM That <span className="text-[#93c5fd]">Connects Your Entire Business</span></h3>
          <div className="relative mt-5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[11px] inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" /> Live sync · 7 tools
          </div>
          <div className="mt-8 flex flex-col gap-2 text-[11px] max-w-[260px]">
            <span className="px-3 py-2 rounded-full bg-white text-[#0a0a0a] font-semibold">No middleware</span>
            <span className="px-3 py-2 rounded-full bg-white/10 border border-white/10">2-way sync</span>
            <span className="px-3 py-2 rounded-full bg-white/10 border border-white/10">Audit log built-in</span>
          </div>
        </div>

        {/* right: orbit — logos stand upright, no tilt */}
        <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] mx-auto" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
          {/* outer glow */}
          <div className="absolute -inset-3 rounded-[40px] bg-[#3b82f6]/20 blur-[30px]" />
          {/* orbit rings (flat) */}
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute rounded-full border border-dashed border-white/10" style={{ inset: '20%' }} />
          {/* center hub */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] grid place-items-center text-white font-bold text-lg shadow-[0_16px_40px_rgba(59,130,246,0.5)]">CRM</div>
          </div>
          {/* orbiting logo chips — upright */}
          {tools.map((tk, i) => {
            const ang = (i / tools.length) * Math.PI * 2 - Math.PI / 2
            const R = 47
            const x = 50 + Math.cos(ang) * R
            const y = 50 + Math.sin(ang) * R
            return (
              <div key={tk.label} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)' }}>
                <motion.div
                  className="relative flex items-center gap-1.5"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                >
                  <div className="w-[52px] h-[52px] rounded-[14px] bg-white grid place-items-center shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
                    <img src={tk.logo} alt={tk.label} title={tk.label} style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                  </div>
                  <span className="text-[12px] font-bold text-white/85 whitespace-nowrap">{tk.label}</span>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   Results
   ========================================================= */
const results = [
  { v: 42, suffix: '%', l: 'Faster lead response', d: '4.2 min vs 18 min before' },
  { v: 91, suffix: '%', l: 'Fewer missed follow-ups', d: 'Zero manual tracking' },
  { v: 38, suffix: '%', l: 'More leads recovered', d: 'Across all client accounts' },
  { v: 2.1, suffix: 'x', l: 'Faster site-visit to quote', d: '4 days → 6 hours', dec: 1 },
]

export default function CustomCrmServicePage() {
  const [faqOpen, setFaqOpen] = useState(null)

  return (
    <div className="relative bg-white text-[#0a0a0a] selection:bg-[#ff7a00]/20 overflow-x-hidden" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <FaqSchema faqs={faqs} />

      {/* ───────────── HERO ───────────── */}
      <section className="relative max-w-[1280px] mx-auto px-6 md:px-8 pt-16 md:pt-24 pb-14 md:pb-20">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #e3e8f0 1px, transparent 0)', backgroundSize: '24px 24px', opacity: 0.35 }} />
        {/* brand glows */}
        <div className="absolute pointer-events-none overflow-hidden inset-0">
          <div className="absolute w-[420px] h-[420px] -left-24 -top-10 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(59,130,246,0.16), transparent 75%)' }} />
          <div className="absolute w-[500px] h-[500px] -right-24 top-6 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(139,92,246,0.12), transparent 75%)' }} />
        </div>

        <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* left copy */}
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="relative w-2 h-2 rounded-full bg-[#3b82f6]">
                <span className="absolute inset-0 rounded-full bg-[#3b82f6] animate-ping" />
              </span>
              <span className="text-[11px] tracking-[0.2em] font-semibold text-[#475569]">CUSTOM CRMs</span>
            </div>
            <h1 className="mt-5 text-[34px] md:text-[52px] leading-[1.0] tracking-[-0.03em] font-extrabold">
              A CRM That Fits <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#3b82f6,#8b5cf6,#3b82f6)', backgroundSize: '200% auto' }}>Your Business,</span> Not a Template.
            </h1>
            <p className="mt-5 max-w-[520px] text-[15px] md:text-[16px] leading-[1.6] text-[#475569]">
              Off-the-shelf CRMs make you bend your workflow to their screens. Open Mind builds bespoke CRM systems around your exact sales, support and field processes with native automation, reporting and integrations.
            </p>
          </div>

          {/* right: live dashboard */}
          <Tilt className="relative">
            <div className="absolute -top-4 -right-4 z-10 px-3 py-1.5 rounded-full bg-[#0a0a0a] text-white text-[11px] font-bold shadow-lg flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" /> LIVE DASHBOARD
            </div>
            <LiveDashboard />
            <div className="mx-auto mt-4 w-[70%] h-8 rounded-full bg-[#0a0a0a]/10 blur-[18px]" />
          </Tilt>
        </div>
      </section>

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-8 space-y-24 pb-20">
        {/* ───────────── PAIN → PRECISION ───────────── */}
        <section>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="text-[11px] font-bold tracking-widest text-[#94a3b8]">WHY CUSTOM</div>
              <h2 className="mt-2 text-[30px] md:text-[40px] font-extrabold tracking-[-0.03em] leading-[0.95]">From pain <span className="italic font-normal text-[#94a3b8]">→</span> precision</h2>
            </div>
            <p className="max-w-[420px] text-[14px] text-[#64748b]">Hover to flip. Every chaos pattern becomes a structured CRM moment.</p>
          </div>
          <div className="mt-8"><PainCards /></div>
        </section>

        {/* ───────────── WORKFLOW CANVAS ───────────── */}
        <section><WorkflowCanvas /></section>

        {/* ───────────── APPROACH ───────────── */}
        <section>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full" style={{ background: 'linear-gradient(180deg,#3b82f6,#8b5cf6)' }} />
            <h2 className="text-[26px] md:text-[34px] font-extrabold tracking-tight">The Open Mind Approach</h2>
          </div>
          <div className="mt-7 grid md:grid-cols-3 gap-5">
            {approach.map((a) => (
              <div key={a.t} className="rounded-[24px] bg-white border border-[#eef2f7] p-6 md:p-7 shadow-[0_14px_36px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition">
                <div className="w-10 h-10 rounded-[14px] grid place-items-center text-white font-bold" style={{ background: GRAD }}>✓</div>
                <div className="mt-4 text-[18px] font-bold leading-tight tracking-tight">{a.t}</div>
                <div className="mt-2 text-[13px] leading-[1.6] text-[#64748b]">{a.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── GENERIC vs OPEN MIND ───────────── */}
        <section>
          <div className="text-center">
            <h2 className="text-[26px] md:text-[34px] font-extrabold tracking-tight">Generic vs <span style={{ color: BLUE }}>Open Mind</span></h2>
            <p className="mt-2 text-[14px] text-[#64748b]">The difference isn't the dashboard. It's what happens when a lead shows up.</p>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {/* generic */}
            <div className="rounded-[28px] bg-white border border-[#eef2f7] p-6 md:p-7 shadow-[0_14px_36px_rgba(15,23,42,0.06)] opacity-80">
              <div className="text-[11px] font-bold tracking-widest text-[#94a3b8]">GENERIC CRM</div>
              <div className="mt-4 space-y-4">
                {compare.map((c) => (
                  <div key={c.f}>
                    <div className="text-[12px] font-bold text-[#475569]">{c.f}</div>
                    <div className="mt-1 text-[13px] text-[#64748b]">{c.g}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* open mind */}
            <div className="rounded-[28px] bg-white border border-[#dbeafe] p-6 md:p-7 shadow-[0_14px_36px_rgba(59,130,246,0.14)] relative md:-translate-y-1">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#0a0a0a] text-white text-[10px] font-bold tracking-widest">OPEN MIND</div>
              <div className="text-[11px] font-bold tracking-widest" style={{ color: BLUE }}>BUILT FOR YOU</div>
              <div className="mt-4 space-y-4">
                {compare.map((c) => (
                  <div key={c.f}>
                    <div className="text-[12px] font-bold text-[#0a0a0a]">{c.f}</div>
                    <div className="mt-1 text-[13px] text-[#475569]">{c.o}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── AUTOMATIONS ───────────── */}
        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-[26px] md:text-[34px] font-extrabold tracking-tight">Automations that <span style={{ color: BLUE }}>actually ship</span></h2>
            <span className="px-3 py-1.5 rounded-full bg-[#ecfdf5] border border-[#bbf7d0] text-[12px] font-semibold text-[#16a34a]">▲ tasks automated today</span>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {automations.map((a) => (
              <div key={a.t} className="rounded-[24px] bg-white border border-[#eef2f7] p-5 md:p-6 shadow-[0_10px_28px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.1)] transition">
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-[12px] grid place-items-center text-white font-bold text-[13px]" style={{ background: a.c }}>{a.t[0]}</div>
                  <span className="w-9 h-5 rounded-full bg-[#e2e8f0] relative">
                    <motion.span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow" animate={{ translateX: 16 }} transition={{ duration: 1.4, repeat: Infinity, repeatType: 'reverse' }} />
                  </span>
                </div>
                <div className="mt-3 font-bold text-[15px]">{a.t}</div>
                <div className="mt-1 text-[12px] text-[#64748b]">{a.d}</div>
                <div className="mt-3 text-[11px] font-semibold text-[#16a34a]">Running · saves hours today</div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── INTEGRATIONS ───────────── */}
        <section><IntegrationsOrbit /></section>

        {/* ───────────── RESULTS ───────────── */}
        <section>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <h2 className="text-[30px] md:text-[40px] font-extrabold tracking-tight leading-[0.95]">Real results, not <span className="text-[#94a3b8] line-through decoration-[#ef4444]">vanity metrics</span></h2>
          </div>
          <div className="mt-8 grid md:grid-cols-4 gap-4 md:gap-5">
            {results.map((r) => (
              <div key={r.l} className="rounded-[28px] bg-white border border-[#eef2f7] p-6 shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
                <div className="mt-1 flex items-baseline gap-1">
                  <CountUp to={r.v} decimals={r.dec || 0} suffix={r.suffix} className="text-[36px] font-extrabold tracking-tight" color={BLUE} />
                </div>
                <div className="mt-2 inline-flex px-2.5 py-1 rounded-full bg-[#0a0a0a] text-white text-[11px] font-bold">{r.l}</div>
                <div className="mt-2 text-[12px] text-[#64748b] leading-[1.4]">{r.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] bg-[#f8faff] border border-[#eef2f7] p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="text-[13px] text-[#334155] max-w-[720px]">
              <strong>Healthcare client</strong> — admissions team closed 3 extra cases/week after auto-assign + WhatsApp reminders. <br />
              <strong>Real estate client</strong> — site-visit-to-quote time cut from 4 days to 6 hours.
            </div>
            <a href="mailto:connect@openmind.in" className="px-5 py-2.5 rounded-full bg-[#0a0a0a] text-white text-[13px] font-semibold shrink-0 hover:bg-black transition">See a teardown →</a>
          </div>
        </section>

        {/* ───────────── WHY OPEN MIND + FAQ ───────────── */}
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5 rounded-[28px] bg-[#0a0a0a] text-white p-7 md:p-8">
            <div className="text-[11px] tracking-[0.18em] font-semibold text-[#ff7a00]">WHY OPEN MIND</div>
            <h3 className="mt-2 text-[22px] font-bold leading-tight">We don't bolt a template onto you.</h3>
            <p className="mt-3 text-[13px] leading-6 text-white/70">We design and build a CRM around your real processes — then keep supporting and extending it as your business grows. From strategy to launch and beyond.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-[16px] bg-white/10 border border-white/10 p-4"><CountUp to={20} suffix="+" className="text-[20px] font-bold" color="#ff7a00" /><div className="text-[11px] text-white/60 mt-1">Years CX Expertise</div></div>
              <div className="rounded-[16px] bg-white text-[#0a0a0a] p-4"><div className="text-[20px] font-bold">100%</div><div className="text-[11px] text-[#64748b] mt-1">Custom-built</div></div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 rounded-[28px] bg-white border border-[#eef2f7] p-2 shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b last:border-0 border-[#eef2f7]">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between text-left px-6 py-4 hover:bg-[#f8faff] transition">
                  <span className="text-[14px] font-semibold">{f.q}</span>
                  <span className={`w-6 h-6 rounded-full grid place-items-center text-[12px] transition shrink-0 ml-3 ${faqOpen === i ? 'bg-[#0a0a0a] text-white' : 'bg-[#f1f5f9] text-[#64748b]'}`}>{faqOpen === i ? '−' : '+'}</span>
                </button>
                {faqOpen === i && <div className="px-6 pb-4 text-[13px] leading-6 text-[#475569]">{f.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── FINAL CTA ───────────── */}
        <section className="relative overflow-hidden rounded-[32px] bg-[#0a0a0a] text-white p-8 md:p-12">
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-20 -right-32 -top-40 pointer-events-none" style={{ background: `radial-gradient(closest-side, ${BLUE}, transparent 70%)` }} />
          <div className="absolute w-[400px] h-[400px] rounded-full opacity-20 -left-24 -bottom-24 pointer-events-none" style={{ background: `radial-gradient(closest-side, ${VIOLET}, transparent 70%)` }} />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-[11px] tracking-widest font-bold text-white/50">OPEN MIND · CRM ONLY</div>
              <h3 className="mt-2 text-[28px] md:text-[36px] font-extrabold tracking-tight leading-[1.02]">Book your live CRM teardown</h3>
              <p className="mt-3 text-[14px] text-white/60 max-w-[460px]">See a real workflow mapped live. 20 minutes, no slides — just your process, in your CRM. Custom field map, auto-assign rules and a WhatsApp sequence draft, in 14 days.</p>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <a href={`${import.meta.env.BASE_URL}#contact`} className="bg-white text-black rounded-full px-7 py-3.5 text-[14px] font-semibold text-center hover:bg-white/90 transition inline-flex items-center justify-center gap-2">Discuss Your CRM →</a>
            </div>
          </div>
        </section>

        <div className="text-center text-[11px] text-[#94a3b8]">© Open Mind Services · Custom CRMs · Built around your workflows</div>
      </div>
    </div>
  )
}

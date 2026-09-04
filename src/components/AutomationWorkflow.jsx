import { useState } from 'react'
import {
  ArrowRight,
  BadgeDollarSign,
  BellRing,
  Bot,
  ChartColumn,
  ChartPie,
  CircleCheck,
  Database,
  Download,
  FileSpreadsheet,
  FileText,
  Layers,
  LayoutDashboard,
  Mail,
  Pause,
  Play,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
  Workflow,
} from 'lucide-react'

const n0 = [
  { id: 'email', label: 'Emails', Icon: Mail, color: '#8b5cf6', bg: 'from-violet-500 to-indigo-500', light: '#ede9fe' },
  { id: 'chat', label: 'Live Chat / Chatbots', Icon: Bot, color: '#3b82f6', bg: 'from-blue-500 to-cyan-500', light: '#dbeafe' },
  { id: 'form', label: 'Web Forms / Portals', Icon: FileSpreadsheet, color: '#10b981', bg: 'from-emerald-500 to-teal-500', light: '#d1fae5' },
  { id: 'api', label: 'APIs / Integrations', Icon: Settings, color: '#ff7a00', bg: 'from-orange-500 to-amber-500', light: '#ffedd5', sub: '(Sheets, etc.)' },
  { id: 'internal', label: 'Internal Inputs', Icon: FileText, color: '#ec4899', bg: 'from-pink-500 to-rose-500', light: '#fce7f3' },
]

const Sp = [
  { id: 'capture', title: 'CAPTURE', desc: 'Collect Data', Icon: Download, color: '#8b5cf6', detail: 'Ingests from all channels in real-time. Auto-parses attachments, threads & payloads.' },
  { id: 'understand', title: 'UNDERSTAND', desc: 'AI / Rules Engine', Icon: CircleCheck, color: '#3b82f6', detail: 'NLP classification, intent detection, entity extraction with custom business rules.' },
  { id: 'process', title: 'PROCESS', desc: 'Automate Tasks', Icon: Search, color: '#ff7a00', detail: 'Orchestrates workflows, approvals, and decision trees without manual touch.' },
  { id: 'action', title: 'ACTION', desc: 'Execute & Integrate', Icon: ChartPie, color: '#10b981', detail: 'Pushes to CRMs, ERPs, ticketing and triggers downstream actions.' },
  { id: 'learn', title: 'LEARN', desc: 'Improve Continuously', Icon: ShieldCheck, color: '#ec4899', detail: 'Feedback loop trains models, reduces exceptions and improves accuracy.' },
]

const r0 = [
  { id: 'class', title: 'AI Classification', desc: 'Categorizing requests by intent', Icon: Sparkles, color: '#8b5cf6', example: 'E.g. Invoice → Finance, Complaint → Support (98.2% accuracy)' },
  { id: 'extract', title: 'Data Extraction', desc: 'Pulling key data from documents', Icon: Database, color: '#3b82f6', example: 'E.g. PO number, dates, amounts from PDFs auto-mapped' },
  { id: 'knowledge', title: 'Knowledge Search & Response', desc: 'Auto-resolving queries', Icon: FileText, color: '#10b981', example: 'E.g. Policy Q → KB answer in 0.8s, no agent needed' },
  { id: 'workflow', title: 'Workflow Automation', desc: 'Task creation and routing', Icon: Workflow, color: '#ff7a00', example: 'E.g. Auto-create task, assign owner, set SLA' },
  { id: 'sync', title: 'Integration & Sync', desc: 'CRM, ERP, and other tools', Icon: Layers, color: '#6366f1', example: 'E.g. Sync to Salesforce, SAP, HubSpot bi-directionally' },
  { id: 'alerts', title: 'Alerts & Notifications', desc: 'SLA tracking and escalations', Icon: BellRing, color: '#ec4899', example: 'E.g. SLA breach → Slack + Email alert to manager' },
]

const l0 = [
  { id: 'int', label: 'Integrations', sub: 'CRM, ERP, etc.', Icon: Database, color: '#8b5cf6', bg: 'from-violet-500 to-indigo-500', light: '#ede9fe' },
  { id: 'rep', label: 'Reporting', Icon: ChartColumn, color: '#3b82f6', bg: 'from-blue-500 to-cyan-500', light: '#dbeafe' },
  { id: 'alert', label: 'Alerts & Notifications', Icon: BellRing, color: '#ff7a00', bg: 'from-orange-500 to-amber-500', light: '#ffedd5' },
  { id: 'dash', label: 'Dashboards', Icon: LayoutDashboard, color: '#10b981', bg: 'from-emerald-500 to-teal-500', light: '#d1fae5' },
]

const u0 = [
  { id: 'time', label: 'Time Saved', value: '60-90%', num: 75, Icon: TrendingUp, color: '#8b5cf6' },
  { id: 'effort', label: 'Manual Effort Reduced', value: '70-80%', num: 75, Icon: Workflow, color: '#3b82f6' },
  { id: 'error', label: 'Error Reduction', value: '80-95%', num: 87, Icon: ShieldCheck, color: '#10b981' },
  { id: 'response', label: 'Faster Response Time', value: 'Faster', Icon: TrendingUp, color: '#ff7a00' },
  { id: 'cx', label: 'Better Customer Experience', value: 'CX ↑', Icon: BadgeDollarSign, color: '#ec4899' },
  { id: 'cost', label: 'Lower Operational Costs', value: 'Costs ↓', Icon: BadgeDollarSign, color: '#6366f1' },
  { id: 'growth', label: 'Scalable Business Growth', value: 'Growth', Icon: UsersRound, color: '#06b6d4' },
]

export default function AutomationWorkflow() {
  const [flowing, setFlowing] = useState(true)
  const [hoverStep, setHoverStep] = useState(null)
  const [flipped, setFlipped] = useState(null)

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-3d">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f8f9ff] to-[#f3f4ff]" />
      <div className="absolute inset-0 dot-grid opacity-[0.5]" />
      <div className="absolute -top-[18%] -left-[10%] w-[62%] h-[62%] rounded-full blur-[110px] opacity-40"
        style={{ background: 'radial-gradient(60% 60% at 50% 50%, #a78bfa 0%, #c4b5fd 18%, #ddd6fe 36%, transparent 70%)', animation: 'floatA 12s ease-in-out infinite' }} />
      <div className="absolute -bottom-[20%] -right-[12%] w-[58%] h-[58%] rounded-full blur-[110px] opacity-35"
        style={{ background: 'radial-gradient(60% 60% at 50% 50%, #93c5fd 0%, #bfdbfe 22%, #e0f2fe 40%, transparent 72%)', animation: 'floatB 14s ease-in-out infinite' }} />
      <div className="absolute top-[38%] left-[48%] w-[28%] h-[26%] rounded-full blur-[80px] opacity-25"
        style={{ background: 'radial-gradient(60% 60% at 50% 50%, #fdba74 0%, #fed7aa 30%, transparent 70%)' }} />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-16">

        {/* Branding */}
        <div className="entrance flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 lg:mb-10" style={{ animationDelay: '0ms' }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 grid place-items-center text-white font-extrabold tracking-tight shadow-lg">
              O
            </div>
            <div>
              <h3 className="text-[17px] sm:text-[19px] font-extrabold tracking-[-0.02em] leading-none text-slate-900">OPEN MIND SERVICES LIMITED</h3>
              <p className="text-[11px] tracking-[0.18em] font-bold text-slate-500 -mt-0.5">AUTOMATION WORKFLOW</p>
            </div>
          </div>
          <p className="text-[13px] sm:text-[14px] font-semibold tracking-[0.18em] text-slate-500">Automate. Simplify. Accelerate.</p>
          <button
            onClick={() => setFlowing((a) => !a)}
            className="group inline-flex items-center gap-2 rounded-full glass-strong shadow-3d px-4 h-10 text-[13px] font-bold tracking-wide hover:shadow-3d-hover transition-all cursor-pointer"
          >
            <span className={`grid place-items-center h-6 w-6 rounded-full bg-slate-900 text-white transition-transform ${flowing ? '' : 'opacity-60'}`}>
              {flowing ? <Play size={12} /> : <Pause size={12} />}
            </span>
            Animate Flow
            <span className={`h-2 w-2 rounded-full ${flowing ? 'bg-emerald-500' : 'bg-slate-300'}`}
              style={flowing ? { boxShadow: '0 0 0 2px #10b981', animation: 'glowPulse 1.6s infinite' } : undefined} />
          </button>
        </div>

        {/* Input channels */}
        <div className="flex flex-wrap items-center gap-2 mb-3 px-1">
          <div className="h-7 w-7 rounded-lg bg-slate-900 text-white grid place-items-center">
            <Mail size={14} />
          </div>
          <span className="text-[12px] font-extrabold tracking-[0.14em] text-slate-900">INPUT SOURCES</span>
          <span className="ml-auto text-[10px] font-bold tracking-wide text-slate-400 hidden sm:block">CONNECTED IN REAL-TIME</span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {n0.map((a, s) => (
            <div
              key={a.id}
              className="group flex items-center gap-2 rounded-[14px] px-3 py-2 glass shadow-3d transition-all duration-200 hover:shadow-3d-hover"
              style={{ animation: `floatCard 4s ease-in-out ${s * 0.25}s infinite` }}
            >
              <div className={`h-8 w-8 rounded-[10px] icon-3d grid place-items-center text-white shrink-0 bg-gradient-to-br ${a.bg}`}>
                <a.Icon size={16} strokeWidth={2.2} />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-[13px] font-bold leading-tight tracking-[-0.01em] text-slate-900">{a.label}</p>
                {a.sub && <p className="text-[11px] font-semibold text-slate-500 leading-none mt-0.5">{a.sub}</p>}
              </div>
              <span className="ml-auto h-2 w-2 rounded-full" style={{ background: a.color, boxShadow: `0 0 10px ${a.color}` }} />
              {hoverStep === a.id && <div className="absolute inset-0 rounded-[14px] pointer-events-none" style={{ boxShadow: `inset 0 0 0 1.5px ${a.color}40` }} />}
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <ArrowRight size={14} className="text-slate-400" />
            <span className="text-[11px] font-bold text-slate-500">→ Engine</span>
          </div>
        </div>

        {/* Pipeline */}
        <div className="mt-6 space-y-5">
          <div className="entrance glass-strong rounded-[22px] shadow-3d p-4 sm:p-5 lg:p-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-violet-200 to-indigo-100 blur-[28px] opacity-60" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 blur-[28px] opacity-60" />
            </div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-slate-900 text-white grid place-items-center shadow-lg">
                  <Workflow size={16} />
                </div>
                <div>
                  <h3 className="text-[13px] font-extrabold tracking-[0.14em] text-slate-900">OMSL AUTOMATION ENGINE</h3>
                  <p className="text-[11px] font-bold text-slate-500 tracking-wide">5-step autonomous pipeline</p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE {flowing ? '' : '| PAUSED'}
                </span>
              </div>
            </div>

            {/* Connector line */}
            <div className="relative mt-3 mb-2 h-[2px] overflow-hidden hidden sm:block">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-200 via-blue-200 via-orange-200 to-pink-200 rounded-full opacity-70" />
              {flowing && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[dashFlow_2s_linear_infinite]" />}
            </div>

            {/* Steps */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 relative">
              {Sp.map((a, s) => {
                const active = hoverStep === a.id
                return (
                  <div
                    key={a.id}
                    onMouseEnter={() => setHoverStep(a.id)}
                    onMouseLeave={() => setHoverStep(null)}
                    className="group relative flex flex-col items-center"
                    style={{ animation: `floatCard 3.5s ease-in-out ${s * 0.18}s infinite` }}
                  >
                    <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-[12px] grid place-items-center text-white transition-all duration-300 ${active ? 'scale-[1.08] -translate-y-1' : 'group-hover:-translate-y-1 group-hover:scale-[1.04]'}`}
                      style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}CC)`, boxShadow: `0 6px 14px ${a.color}40` }}>
                      <a.Icon size={18} />
                    </div>
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-white border border-slate-200 grid place-items-center text-[10px] font-extrabold shadow-sm">{s + 1}</div>
                    {active && <div className="absolute inset-0 rounded-[18px] pointer-events-none animate-pulse" style={{ boxShadow: `0 0 0 2px ${a.color}55` }} />}
                    <div className="mt-2.5 text-center">
                      <p className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.12em] text-slate-900">{a.title}</p>
                      <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-tight mt-0.5 max-w-[92px] sm:max-w-[110px]">{a.desc}</p>
                    </div>
                    {s < Sp.length - 1 && (
                      <div className="hidden sm:grid absolute top-[32px] -right-[10px] h-6 w-6 place-items-center rounded-full bg-white border border-slate-200 shadow-sm">
                        <ArrowRight size={12} className="text-slate-500" />
                      </div>
                    )}
                    <div className={`pointer-events-none absolute bottom-[-8px] translate-y-full left-1/2 -translate-x-1/2 z-20 w-[200px] rounded-xl glass-strong shadow-3d p-3 text-left transition-all duration-300 ${active ? 'opacity-100 translate-y-[8px]' : 'opacity-0 translate-y-[12px]'}`}>
                      <p className="text-[11px] font-bold flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.color }} /> {a.title}
                      </p>
                      <p className="text-[11px] leading-[1.4] text-slate-600 mt-1">{a.detail}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Core capabilities */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="h-6 w-6 rounded-lg bg-slate-900 text-white grid place-items-center">
            <Settings size={12} />
          </div>
          <span className="text-[12px] font-extrabold tracking-[0.14em] text-slate-900">CORE AUTOMATION CAPABILITIES</span>
          <span className="ml-auto text-[10px] font-bold tracking-wide text-slate-400 hidden sm:block">CLICK TO PREVIEW</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
          {r0.map((a, s) => {
            const p = flipped === a.id
            return (
              <button
                key={a.id}
                onClick={() => setFlipped(p ? null : a.id)}
                className="group relative h-[112px] sm:h-[120px] cursor-pointer"
                style={{ animationDelay: `${s * 60}ms`, perspective: '900px' }}
              >
                <div className="absolute inset-0 transition-all duration-500" style={{ transformStyle: 'preserve-3d', transform: p ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                  <div className="absolute inset-0 rounded-[16px] glass shadow-3d flex flex-col items-start justify-center gap-1.5 p-3">
                    <div className="h-9 w-9 rounded-[12px] grid place-items-center text-white"
                      style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}BB)`, boxShadow: `0 8px 18px ${a.color}35` }}>
                      <a.Icon size={18} />
                    </div>
                    <p className="text-[12px] font-extrabold text-slate-900 mt-1">{a.title}</p>
                    <p className="text-[10px] text-slate-500">{a.desc}</p>
                  </div>
                  <div className="absolute inset-0 rounded-[16px] transition-all duration-500"
                    style={{ transform: 'rotateY(180deg)', transformStyle: 'preserve-3d' }}>
                    <div className="absolute inset-0 rounded-[16px] flex flex-col items-center justify-center gap-1 p-3 text-white"
                      style={{ background: `linear-gradient(135deg, ${a.color} 0%, ${a.color}DD 55%, #0f172a 140%)`, boxShadow: `0 12px 30px ${a.color}35` }}>
                      <Sparkles size={14} />
                      <p className="text-[10px] font-bold tracking-wide">{a.title.toUpperCase()}</p>
                      <p className="text-[9px] text-center opacity-90 leading-tight">{a.example}</p>
                    </div>
                  </div>
                </div>
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full" style={{ background: a.color }} />
              </button>
            )
          })}
        </div>

        {/* Integrations + Real-time sync strip */}
        <div className="mt-4 rounded-[12px] bg-gradient-to-br from-slate-900 to-slate-800 text-white p-3 flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-white/10 grid place-items-center">
            <Database size={14} />
          </div>
          <span className="text-[11px] font-extrabold tracking-wide">REAL-TIME SYNC</span>
          <span className="text-[11px] opacity-70 leading-tight">All outputs stream continuously</span>
          <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: '0 0 10px #34d399' }} />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {l0.map((a, s) => (
            <div key={a.id} className={`flex items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-[11px] font-bold text-slate-700 border border-slate-200 bg-white transition-all duration-200 ${s === 1 ? 'scale-[1.02] -translate-y-[1px] shadow-[0_14px_32px_rgba(16,185,129,0.18)]' : 'hover:-translate-y-[1px]'}`}>
              <a.Icon size={13} style={{ color: a.color }} />
              {a.label}
            </div>
          ))}
        </div>

        {/* Business impact */}
        <div className="entrance mt-6 lg:mt-8 glass-strong rounded-[20px] shadow-3d p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="h-7 w-7 rounded-lg bg-slate-900 text-white grid place-items-center">
              <TrendingUp size={14} />
            </div>
            <span className="text-[12px] font-extrabold tracking-[0.16em] text-slate-900">BUSINESS IMPACT</span>
            <span className="ml-auto hidden sm:flex items-center gap-2 text-[10px] font-bold tracking-wide text-slate-400">
              <TrendingUp size={12} className="text-emerald-500" /> MEASURED ACROSS CLIENTS
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-3">
            {u0.map((a, s) => (
              <div
                key={a.id}
                className="group flex flex-col items-center gap-1 py-2.5 rounded-[12px] cursor-default hover:shadow-3d-hover"
                style={{ animation: `entrance 0.6s both ${420 + s * 60}ms` }}
              >
                <div className="h-7 w-7 rounded-[8px] grid place-items-center text-white transition-transform group-hover:scale-[1.05]"
                  style={{ background: a.color, boxShadow: `0 6px 14px ${a.color}35` }}>
                  <a.Icon size={14} />
                </div>
                <p className="text-[11px] font-extrabold" style={{ color: a.color }}>{a.value}</p>
                <p className="text-[10px] text-slate-500 text-center leading-tight">{a.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[13px] font-extrabold tracking-[0.08em] text-slate-900">AUTOMATE. INNOVATE. ELEVATE.</p>
          <p className="text-[10px] tracking-[0.12em] text-slate-400 mt-1">POWERED BY OPEN MIND SERVICES LIMITED</p>
        </div>
      </div>
    </div>
  )
}
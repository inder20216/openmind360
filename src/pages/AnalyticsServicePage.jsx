import { useState, useEffect, useRef } from 'react'

/* ─── Dashboard panels (6 live views) ─── */

function OperationalMetricsPanel() {
  return (
    <div className="w-full h-full bg-[#FCFCFE] flex flex-col">
      <div className="px-6 pt-5 pb-3 flex justify-between items-start border-b border-[#EEF0F6]">
        <div className="min-w-0">
          <div className="text-[11px] font-[700] tracking-[0.14em] text-[#0F0F12]">OPERATIONAL METRICS DASHBOARD</div>
          <div className="text-[11px] text-[#8A8FA0] mt-1 truncate">Performance overview • Last 30 days • Updated Oct 07 2024 09:42 AM UTC</div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <div className="hidden md:flex px-2.5 py-1 rounded-full bg-white border border-[#E6E8F0] text-[10px] font-[600] items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />LIVE • Real-time data
          </div>
          <div className="px-2.5 py-1 rounded-full bg-[#0F0F12] text-white text-[9px] font-[700] tracking-wide shadow">3D LIVE PREVIEW</div>
        </div>
      </div>
      <div className="flex-1 p-5 flex flex-col gap-4 overflow-hidden">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-[12px] p-4 bg-orange-50/80 border border-orange-200/50 shadow-[0_2px_8px_rgba(255,122,0,0.06)]">
            <div className="flex justify-between items-start">
              <div className="w-7 h-7 rounded-full bg-white border border-orange-200 flex items-center justify-center text-[12px]">◍</div>
              <span className="text-[10px] font-[700] text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-1.5 py-0.5 rounded-full">+8.2%</span>
            </div>
            <div className="mt-3 text-[10px] font-[700] tracking-wide text-[#6B7280] uppercase">Active Users</div>
            <div className="text-[22px] font-[800] tracking-tight leading-none mt-1">12.4K</div>
            <div className="text-[11px] text-[#6B7280] mt-1">Sessions tracked</div>
          </div>
          <div className="rounded-[12px] p-4 bg-[#F5F0FF] border border-[#E9E0FF] shadow-[0_2px_8px_rgba(124,58,237,0.06)]">
            <div className="flex justify-between items-start">
              <div className="w-7 h-7 rounded-full bg-white border border-violet-200 flex items-center justify-center text-[12px]">◐</div>
              <span className="text-[10px] font-[700] text-[#7C3AED] bg-white border border-violet-200/50 px-1.5 py-0.5 rounded-full">Stable</span>
            </div>
            <div className="mt-3 text-[10px] font-[700] tracking-wide text-[#6B7280] uppercase">Avg Session</div>
            <div className="text-[22px] font-[800] tracking-tight leading-none mt-1">4m 32s</div>
            <div className="text-[11px] text-[#6B7280] mt-1">Across metros</div>
          </div>
          <div className="rounded-[12px] p-4 bg-[#EFF6FF] border border-[#DBEAFE] shadow-[0_2px_8px_rgba(59,130,246,0.06)]">
            <div className="flex justify-between items-start">
              <div className="w-7 h-7 rounded-full bg-white border border-blue-200 flex items-center justify-center text-[12px]">◎</div>
              <span className="text-[10px] font-[700] text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-1.5 py-0.5 rounded-full">+0.4pp</span>
            </div>
            <div className="mt-3 text-[10px] font-[700] tracking-wide text-[#6B7280] uppercase">Conversion Rate</div>
            <div className="text-[22px] font-[800] tracking-tight leading-none mt-1">3.6%</div>
            <div className="text-[11px] text-[#6B7280] mt-1">Goal completion</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
          <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4 flex flex-col">
            <div className="text-[10px] font-[700] tracking-wide text-[#6B7280] uppercase">User Growth Trend</div>
            <div className="text-[11px] text-[#9AA0B2] mt-1">Apr - Oct • 8.5K → 12.4K</div>
            <div className="flex-1 mt-3 relative">
              <svg viewBox="0 0 200 70" className="w-full h-[92px]">
                <defs>
                  <linearGradient id="g0" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="g0s" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                <path d="M0,55 L0,55 C20,52 30,48 45,44 C60,40 70,38 85,32 C100,26 115,22 130,18 C145,14 160,10 180,8 L200,5 L200,70 L0,70 Z" fill="url(#g0)" />
                <path d="M0,55 C20,52 30,48 45,44 C60,40 70,38 85,32 C100,26 115,22 130,18 C145,14 160,10 180,8 L200,5" fill="none" stroke="url(#g0s)" strokeWidth="2.2" strokeLinecap="round" />
                {[0, 45, 85, 130, 180, 200].map((x, n) => (
                  <circle key={n} cx={x === 0 ? 2 : x} cy={[55, 44, 32, 18, 8, 5][n]} r="3" fill="#7C3AED" stroke="white" strokeWidth="1.2" />
                ))}
              </svg>
              <div className="flex justify-between text-[9px] text-[#9AA0B2] mt-1">
                <span>Apr</span><span>Jun</span><span>Aug</span><span>Oct</span>
              </div>
            </div>
          </div>
          <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4 flex flex-col">
            <div className="text-[10px] font-[700] tracking-wide text-[#6B7280] uppercase">Monthly Active Users</div>
            <div className="text-[11px] text-[#9AA0B2] mt-1">Growth across cities</div>
            <div className="flex-1 flex items-end gap-[6px] mt-4 h-[92px]">
              {[40, 48, 62, 70, 78, 86, 96].map((h, n) => (
                <div key={n} className="flex-1 rounded-t-[6px] bg-gradient-to-t from-[#FF7A00]/20 via-[#7C3AED]/40 to-[#3B82F6]/80" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-[#9AA0B2] mt-2">
              <span>Apr</span><span>Oct</span>
            </div>
          </div>
        </div>
        <div className="text-[9px] text-[#9AA0B2] tracking-wide leading-[1.4]">Metrics based on user sessions • Operational metrics only • Refreshed every 15 min • No financial data</div>
      </div>
    </div>
  )
}

function PerformanceDashboardPanel() {
  const kpis = [
    { k: 'CSAT', v: '92%', d: '+2.4%', c: 'orange' },
    { k: 'FCR', v: '86%', d: '+1.8%', c: 'purple' },
    { k: 'AHT', v: '4:32', d: '-0:21', c: 'blue' },
    { k: 'SLA', v: '95%', d: '+0.7%', c: 'green' },
  ]
  const priorities = [
    { c: 'High', n: 312, color: '#FF7A00' },
    { c: 'Medium', n: 580, color: '#7C3AED' },
    { c: 'Low', n: 356, color: '#3B82F6' },
  ]
  const badgeClass = (c) =>
    c === 'green' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50'
    : c === 'orange' ? 'bg-orange-50 text-orange-600 border border-orange-200/50'
    : c === 'purple' ? 'bg-violet-50 text-violet-600 border border-violet-200/50'
    : 'bg-blue-50 text-blue-600 border border-blue-200/50'

  return (
    <div className="w-full h-full bg-[#FCFCFE] flex flex-col">
      <div className="px-6 py-4 flex justify-between items-center border-b border-[#EEF0F6]">
        <div>
          <div className="text-[12px] font-[700] tracking-tight">Performance Dashboard</div>
          <div className="text-[11px] text-[#8A8FA0]">Oct 02 2024 • India IST • Refresh LIVE</div>
        </div>
        <div className="flex gap-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-[700] text-emerald-700">LIVE</span>
          <span className="px-2.5 py-1 rounded-full bg-[#0F0F12] text-white text-[10px] font-[700]">1248 Tickets</span>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-4 flex-1 overflow-hidden">
        <div className="grid grid-cols-4 gap-3">
          {kpis.map((e) => (
            <div key={e.k} className="rounded-[12px] bg-white border border-[#EEF0F6] p-3 shadow-sm">
              <div className="text-[10px] font-[700] text-[#6B7280] tracking-wide uppercase">{e.k}</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-[18px] font-[800]">{e.v}</span>
                <span className={`text-[10px] font-[700] px-1.5 py-0.5 rounded-full ${badgeClass(e.c)}`}>{e.d}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[1.6fr_1fr] gap-3 flex-1 min-h-0">
          <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4 flex flex-col">
            <div className="text-[10px] font-[700] uppercase text-[#6B7280]">Ticket Volume Trend</div>
            <div className="text-[11px] text-[#9AA0B2]">Apr - Sep • tickets only • no financial data</div>
            <div className="flex-1 mt-3">
              <svg viewBox="0 0 240 80" className="w-full h-[130px]">
                <path d="M0,60 L30,52 L60,44 L90,30 L120,30 L150,18 L210,8" fill="none" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M0,60 L30,52 L60,44 L90,30 L120,30 L150,18 L210,8 L210,80 L0,80 Z" fill="#7C3AED" fillOpacity="0.08" />
                {[60, 52, 44, 30, 30, 18, 8].map((y, n) => (
                  <g key={n}>
                    <circle cx={[0, 30, 60, 90, 120, 150, 210][n]} cy={y} r="3.5" fill="#7C3AED" stroke="white" strokeWidth="1.2" />
                    <text x={[0, 30, 60, 90, 120, 150, 210][n]} y={y - 8} fontSize="8" fill="#6B7280" textAnchor="middle">{[9.8, 11.1, 13, 15.5, 15.5, 18.2, 20.5][n]}k</text>
                  </g>
                ))}
              </svg>
              <div className="flex justify-between text-[9px] text-[#9AA0B2]">
                <span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4">
              <div className="text-[10px] font-[700] uppercase text-[#6B7280]">Ticket Overview</div>
              <div className="text-[11px] text-[#9AA0B2] mt-0.5">Total 1248 tickets • Sep 2024</div>
              <div className="flex items-center gap-4 mt-3">
                <div className="relative w-[68px] h-[68px] rounded-full" style={{ background: 'conic-gradient(#7C3AED 0 86%, #E5E7EB 86% 96%, #FF7A00 96% 100%)' }}>
                  <div className="absolute inset-[10px] bg-white rounded-full flex items-center justify-center text-[11px] font-[800]">1248</div>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#7C3AED]" />Resolved 86%</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#E5E7EB]" />Pending 10%</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FF7A00]" />Escalated 4%</div>
                </div>
              </div>
            </div>
            <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4 flex-1">
              <div className="text-[10px] font-[700] uppercase text-[#6B7280]">Distribution by Priority</div>
              <div className="mt-3 space-y-2.5">
                {priorities.map((e) => (
                  <div key={e.c}>
                    <div className="flex justify-between text-[11px] font-[600]">
                      <span>{e.c}</span><span className="text-[#6B7280]">{e.n} tickets</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#F1F2F6] mt-1 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(e.n / 580) * 100}%`, background: e.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="text-[9px] text-[#9AA0B2]">Performance Analytics • No financial metrics • Ticket volume only</div>
      </div>
    </div>
  )
}

function SLATrackingPanel() {
  const categories = [{ c: 'Response', v: '92.4%' }, { c: 'Resolution', v: '94.8%' }, { c: 'Escalation', v: '93.6%' }]
  const alerts = [
    { t: 'High response delay', s: '2 tickets breaching in 15m', c: 'orange' },
    { t: 'Escalation spike', s: '4 escalations in last hour', c: 'red' },
    { t: 'Queue buildup', s: 'Pending > 40 for 30m', c: 'orange' },
  ]
  return (
    <div className="w-full h-full bg-[#FCFCFE] flex flex-col">
      <div className="px-6 py-4 flex justify-between items-center border-b border-[#EEF0F6]">
        <div className="text-[12px] font-[700]">SLA Tracking • Operational</div>
        <div className="flex gap-2">
          <span className="px-2.5 py-1 rounded-full bg-white border text-[10px] font-[600]">Response 72%</span>
          <span className="px-2.5 py-1 rounded-full bg-[#0F0F12] text-white text-[10px] font-[700]">Overall 94.2%</span>
        </div>
      </div>
      <div className="p-5 grid grid-cols-[1.1fr_1.6fr] gap-4 flex-1 overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="rounded-[14px] bg-white border border-[#EEF0F6] p-5 flex flex-col items-center">
            <div className="text-[10px] font-[700] uppercase text-[#6B7280] tracking-wide">Overall SLA</div>
            <div className="relative w-[120px] h-[120px] mt-4">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F2F6" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#7C3AED" strokeWidth="8" strokeDasharray="248.688 264" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[24px] font-[800]">94.2%</span>
                <span className="text-[10px] text-[#6B7280]">Compliant</span>
              </div>
            </div>
            <div className="mt-4 w-full space-y-2">
              <div>
                <div className="flex justify-between text-[11px] font-[600]"><span>Response</span><span>72%</span></div>
                <div className="h-1.5 rounded-full bg-[#F1F2F6] mt-1"><div className="h-full bg-[#3B82F6] rounded-full" style={{ width: '72%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-[600]"><span>Resolution</span><span>89%</span></div>
                <div className="h-1.5 rounded-full bg-[#F1F2F6] mt-1"><div className="h-full bg-[#FF7A00] rounded-full" style={{ width: '89%' }} /></div>
              </div>
            </div>
          </div>
          <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4">
            <div className="text-[10px] font-[700] uppercase text-[#6B7280]">SLA by Category</div>
            <div className="mt-3 space-y-2.5">
              {categories.map((e) => (
                <div key={e.c} className="flex items-center gap-2">
                  <span className="text-[11px] font-[600] w-[70px]">{e.c}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-[#F1F2F6]"><div className="h-full rounded-full bg-[#0F0F12]" style={{ width: e.v }} /></div>
                  <span className="text-[11px] font-[700] w-[40px] text-right">{e.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4 flex-1">
            <div className="text-[10px] font-[700] uppercase text-[#6B7280]">SLA Trend • Last 7 Days</div>
            <svg viewBox="0 0 200 70" className="w-full h-[96px] mt-3">
              <path d="M0,40 L30,35 L60,28 L90,32 L120,18 L150,22 L200,12" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
              <path d="M0,40 L30,35 L60,28 L90,32 L120,18 L150,22 L200,12 L200,70 L0,70 Z" fill="#3B82F6" fillOpacity="0.08" />
            </svg>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="rounded-[10px] bg-[#F8F9FC] border p-2.5 text-center"><div className="text-[10px] text-[#6B7280]">On-time</div><div className="font-[700] text-[13px]">94.2%</div></div>
              <div className="rounded-[10px] bg-[#F8F9FC] border p-2.5 text-center"><div className="text-[10px] text-[#6B7280]">Breach Risk</div><div className="font-[700] text-[13px]">2.1%</div></div>
              <div className="rounded-[10px] bg-[#F8F9FC] border p-2.5 text-center"><div className="text-[10px] text-[#6B7280]">MTTR</div><div className="font-[700] text-[13px]">3h 12m</div></div>
            </div>
          </div>
          <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4">
            <div className="text-[10px] font-[700] uppercase text-[#6B7280]">Breach Alerts</div>
            <div className="mt-3 space-y-2">
              {alerts.map((e, n) => (
                <div key={n} className={`rounded-[10px] border p-2.5 flex gap-2 ${e.c === 'red' ? 'bg-red-50/70 border-red-200/50' : 'bg-orange-50/70 border-orange-200/50'}`}>
                  <div className={`w-1.5 h-1.5 mt-1.5 rounded-full ${e.c === 'red' ? 'bg-red-500' : 'bg-orange-500'} shrink-0`} />
                  <div>
                    <div className="text-[11px] font-[600] leading-tight">{e.t}</div>
                    <div className="text-[10px] text-[#6B7280] mt-0.5">{e.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HealthcareOperationsPanel() {
  const doctors = [
    { n: 'Dr. Anika Rao', s: 'Cardiology • Apollo', a: true },
    { n: 'Dr. Vikram Jain', s: 'Orthopedics • Fortis', a: true },
    { n: 'Dr. Meera Nair', s: 'Pediatrics • Max', a: false },
    { n: 'Dr. Arjun Desai', s: 'Neurology • Apollo', a: true },
  ]
  const timeline = [
    { t: '09:00 AM', l: 'Consultation • 12 slots', c: 'border-l-[#7C3AED]' },
    { t: '11:00 AM', l: 'Follow-up • 18 slots', c: 'border-l-[#3B82F6]' },
    { t: '02:00 PM', l: 'Diagnostics • 22 slots', c: 'border-l-[#FF7A00]' },
    { t: '04:00 PM', l: 'Surgery consult • 8 slots', c: 'border-l-emerald-500' },
  ]
  return (
    <div className="w-full h-full bg-[#FCFCFE] flex flex-col">
      <div className="px-6 py-4 border-b border-[#EEF0F6] flex justify-between">
        <div>
          <div className="text-[12px] font-[700]">MediCare Hub • Healthcare Operations</div>
          <div className="text-[11px] text-[#8A8FA0]">Patient flow • Doctor availability • No financial data</div>
        </div>
        <div className="flex gap-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-[700] text-emerald-700">156 Appointments Today</span>
          <span className="px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[10px] font-[700] text-orange-700">Queue 5</span>
        </div>
      </div>
      <div className="p-5 grid grid-cols-[1.2fr_1fr] gap-4 flex-1 overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-[12px] bg-white border p-3">
              <div className="text-[10px] text-[#6B7280] uppercase font-[700]">Appointments</div>
              <div className="text-[20px] font-[800] mt-1">156</div>
              <div className="text-[10px] text-emerald-600">+12 today</div>
            </div>
            <div className="rounded-[12px] bg-white border p-3">
              <div className="text-[10px] text-[#6B7280] uppercase font-[700]">Doctors Online</div>
              <div className="text-[20px] font-[800] mt-1">24 / 32</div>
              <div className="text-[10px] text-[#6B7280]">Apollo • Fortis</div>
            </div>
            <div className="rounded-[12px] bg-white border p-3">
              <div className="text-[10px] text-[#6B7280] uppercase font-[700]">Emergency</div>
              <div className="text-[20px] font-[800] mt-1">5</div>
              <div className="text-[10px] text-orange-600">Avg wait 8m</div>
            </div>
          </div>
          <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4 flex-1">
            <div className="text-[10px] font-[700] uppercase text-[#6B7280]">Doctor Availability</div>
            <div className="mt-3 space-y-2.5">
              {doctors.map((e) => (
                <div key={e.n} className="flex items-center justify-between rounded-[10px] bg-[#F8F9FC] border px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] text-white flex items-center justify-center text-[11px] font-[700]">{e.n.split(' ')[1][0]}</div>
                    <div>
                      <div className="text-[12px] font-[600]">{e.n}</div>
                      <div className="text-[10px] text-[#6B7280]">{e.s}</div>
                    </div>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${e.a ? 'bg-emerald-500' : 'bg-gray-300'}`} title={e.a ? 'Available' : 'Offline'} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4">
            <div className="text-[10px] font-[700] uppercase text-[#6B7280]">Appointment Timeline Today</div>
            <div className="mt-3 space-y-2">
              {timeline.map((e) => (
                <div key={e.t} className={`border-l-2 ${e.c} pl-3 py-1`}>
                  <div className="text-[11px] font-[700]">{e.t}</div>
                  <div className="text-[10px] text-[#6B7280]">{e.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[12px] bg-[#0F0F12] text-white p-4">
            <div className="text-[11px] font-[700]">Patient Flow Efficiency</div>
            <div className="mt-3 flex gap-2">
              <div className="flex-1 rounded-[8px] bg-white/10 p-2.5 text-center"><div className="text-[16px] font-[800]">92%</div><div className="text-[9px] text-white/60">On-time</div></div>
              <div className="flex-1 rounded-[8px] bg-white/10 p-2.5 text-center"><div className="text-[16px] font-[800]">6m</div><div className="text-[9px] text-white/60">Avg wait</div></div>
              <div className="flex-1 rounded-[8px] bg-white/10 p-2.5 text-center"><div className="text-[16px] font-[800]">24</div><div className="text-[9px] text-white/60">Doctors</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AutomationIntelligencePanel() {
  const bots = [
    { n: 'Invoice Parser', v: '98.2%' },
    { n: 'Support Triage', v: '96.4%' },
    { n: 'Data Sync', v: '94.1%' },
    { n: 'Alert Bot', v: '91.8%' },
  ]
  return (
    <div className="w-full h-full bg-[#FCFCFE] flex flex-col">
      <div className="px-6 py-4 flex justify-between border-b border-[#EEF0F6]">
        <div className="text-[12px] font-[700]">Automation Intelligence • Bot Operations</div>
        <span className="px-2.5 py-1 rounded-full bg-[#0F0F12] text-white text-[10px] font-[700]">96.4% Bot Success</span>
      </div>
      <div className="p-5 grid grid-cols-[1.1fr_1.4fr] gap-4 flex-1 overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="rounded-[12px] bg-white border p-4 flex justify-between items-center">
              <div><div className="text-[10px] font-[700] text-[#6B7280] uppercase">Bot Success</div><div className="text-[22px] font-[800]">96.4%</div></div>
              <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-500 rotate-45" />
            </div>
            <div className="rounded-[12px] bg-white border p-4 flex justify-between items-center">
              <div><div className="text-[10px] font-[700] text-[#6B7280] uppercase">Tasks Completed</div><div className="text-[22px] font-[800]">12,486</div></div>
              <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-1 rounded-full font-[700]">+320 today</span>
            </div>
            <div className="rounded-[12px] bg-white border p-4 flex justify-between items-center">
              <div><div className="text-[10px] font-[700] text-[#6B7280] uppercase">Efficiency</div><div className="text-[22px] font-[800]">91.2%</div></div>
              <span className="text-[10px] bg-violet-50 border border-violet-200 text-violet-700 px-2 py-1 rounded-full font-[700]">Stable</span>
            </div>
          </div>
          <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4">
            <div className="text-[10px] font-[700] uppercase text-[#6B7280]">Bot Performance • Last 7 days</div>
            <div className="mt-3 space-y-2">
              {bots.map((e) => (
                <div key={e.n} className="flex justify-between items-center">
                  <span className="text-[11px] font-[600]">{e.n}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-[80px] h-1.5 rounded-full bg-[#F1F2F6]"><div className="h-full rounded-full bg-[#FF7A00]" style={{ width: e.v }} /></div>
                    <span className="text-[11px] font-[700] w-[36px] text-right">{e.v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-5 flex-1 flex flex-col">
            <div className="text-[10px] font-[700] uppercase text-[#6B7280]">Workflow Efficiency • India</div>
            <div className="mt-6 flex flex-col items-center gap-2 flex-1 justify-center">
              <div className="w-[80%] h-[36px] rounded-[10px] bg-gradient-to-r from-[#FF7A00] to-[#FF9A3D] flex items-center justify-center text-white text-[11px] font-[700] shadow">Trigger • 12,486</div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#E5E7EB]" />
              <div className="w-[64%] h-[36px] rounded-[10px] bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] flex items-center justify-center text-white text-[11px] font-[700] shadow">Process • 11,820</div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#E5E7EB]" />
              <div className="w-[46%] h-[36px] rounded-[10px] bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] flex items-center justify-center text-white text-[11px] font-[700] shadow">Complete • 11,204</div>
              <div className="text-[10px] text-[#9AA0B2] mt-2">No financial data • Operational count only</div>
            </div>
          </div>
          <div className="rounded-[12px] bg-[#0F0F12] text-white p-4 flex justify-between">
            <div><div className="text-[10px] text-white/60 uppercase font-[700]">Automation Hours</div><div className="text-[18px] font-[800] mt-1">342h / week</div></div>
            <div className="text-right"><div className="text-[10px] text-white/60 uppercase font-[700]">Failure Rate</div><div className="text-[18px] font-[800] mt-1">3.6%</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EcommercePulsePanel() {
  const channels = [{ c: 'Web', n: 8420 }, { c: 'Mobile', n: 7640 }, { c: 'API', n: 6880 }]
  const orders = [
    { id: '#ORD-8421', name: 'Arjun Patel', status: 'Delivered' },
    { id: '#ORD-8420', name: 'Priya Sharma', status: 'In Transit' },
    { id: '#ORD-8419', name: 'Rohan Mehta', status: 'Processing' },
    { id: '#ORD-8418', name: 'Sneha Kapoor', status: 'Delivered' },
    { id: '#ORD-8417', name: 'Vikram Singh', status: 'Delivered' },
    { id: '#ORD-8416', name: 'Ananya Gupta', status: 'In Transit' },
  ]
  const statusClass = (s) =>
    s === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : s === 'In Transit' ? 'bg-blue-50 text-blue-700 border-blue-200'
    : 'bg-orange-50 text-orange-700 border-orange-200'

  return (
    <div className="w-full h-full bg-[#FCFCFE] flex flex-col">
      <div className="px-6 py-4 flex justify-between items-center border-b border-[#EEF0F6]">
        <div>
          <div className="text-[12px] font-[700]">ShopDash Pulse • Commerce Operations</div>
          <div className="text-[11px] text-[#8A8FA0]">Orders • Returns • Payment mix • No financial amounts</div>
        </div>
        <div className="flex gap-2">
          <span className="px-2.5 py-1 rounded-full bg-white border text-[10px] font-[600]">Orders 24,832</span>
          <span className="px-2.5 py-1 rounded-full bg-[#0F0F12] text-white text-[10px] font-[700]">Returns 1,042</span>
        </div>
      </div>
      <div className="p-5 grid grid-cols-[1fr_1.1fr] gap-4 flex-1 overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4">
            <div className="text-[10px] font-[700] uppercase text-[#6B7280]">Payment Mix • Operational</div>
            <div className="flex items-center gap-4 mt-3">
              <div className="relative w-[72px] h-[72px] rounded-full" style={{ background: 'conic-gradient(#3B82F6 0 68%, #E5E7EB 68% 100%)' }}>
                <div className="absolute inset-[12px] bg-white rounded-full flex items-center justify-center text-[10px] font-[800]">UPI 68%</div>
              </div>
              <div className="text-[11px] space-y-1.5">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3B82F6]" />UPI 68%</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#E5E7EB]" />COD 32%</div>
                <div className="text-[10px] text-[#9AA0B2] mt-1">No amount • count only</div>
              </div>
            </div>
          </div>
          <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4 flex-1">
            <div className="text-[10px] font-[700] uppercase text-[#6B7280]">Orders by Channel • Count only</div>
            <div className="mt-3 space-y-3">
              {channels.map((e) => (
                <div key={e.c}>
                  <div className="flex justify-between text-[11px] font-[600]"><span>{e.c}</span><span className="text-[#6B7280]">{e.n.toLocaleString()} orders</span></div>
                  <div className="h-1.5 rounded-full bg-[#F1F2F6] mt-1"><div className="h-full rounded-full bg-gradient-to-r from-[#FF7A00] to-[#7C3AED]" style={{ width: `${(e.n / 8420) * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-4 flex flex-col">
          <div className="text-[10px] font-[700] uppercase text-[#6B7280]">Recent Orders • No amount column</div>
          <div className="mt-3 space-y-2.5 overflow-hidden">
            {orders.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-[10px] bg-[#F8F9FC] border px-3 py-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#0F0F12] text-white flex items-center justify-center text-[10px] font-[700]">{e.name.split(' ').map((n) => n[0]).join('')}</div>
                  <div>
                    <div className="text-[11px] font-[600] leading-tight">{e.name}</div>
                    <div className="text-[10px] text-[#6B7280]">{e.id}</div>
                  </div>
                </div>
                <span className={`text-[9px] font-[700] px-2 py-1 rounded-full border ${statusClass(e.status)}`}>{e.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-3 text-[9px] text-[#9AA0B2]">Order counts only • No revenue • No pricing</div>
        </div>
      </div>
    </div>
  )
}

const PANELS = [OperationalMetricsPanel, PerformanceDashboardPanel, SLATrackingPanel, HealthcareOperationsPanel, AutomationIntelligencePanel, EcommercePulsePanel]

const CAPTIONS = [
  { title: 'Operational Metrics', sub: '12.4K Active Users • 4m 32s Avg Session', badge: 'LIVE', color: '#FF7A00' },
  { title: 'Performance', sub: '1248 Tickets • 92% CSAT • 86% FCR', badge: '92%', color: '#7C3AED' },
  { title: 'SLA Tracking', sub: '94.2% Overall • Response 72% • MTTR 3h 12m', badge: '94.2%', color: '#3B82F6' },
  { title: 'Healthcare Operations', sub: '156 Appointments Today • 24 Doctors Online', badge: '156', color: '#0EA5E9' },
  { title: 'Automation Intelligence', sub: '96.4% Bot Success • 12,486 Tasks', badge: '96.4%', color: '#FF7A00' },
  { title: 'E-commerce Pulse', sub: '24,832 Orders • UPI 68% • COD 32%', badge: 'INDIA', color: '#7C3AED' },
]

const capabilities = [
  { title: 'Operational user lens', desc: 'Active users, session depth, conversion steps — count only, no financial metrics.', icon: '◍' },
  { title: 'SLA governance', desc: 'Track MTTR, breach risk, on-time % live across metros and teams.', icon: '◍' },
  { title: 'Glass performance', desc: '60fps coverflow at 2500px perspective, backdrop-blur, orange/purple/blue orbs.', icon: '◐' },
]

const steps = [
  { n: '01', t: 'Connect', d: 'Plug support, CRM, activity' },
  { n: '02', t: 'Normalize', d: 'Users, tickets, SLA mapped' },
  { n: '03', t: 'Glassify', d: 'Orange/purple/blue canvas' },
  { n: '04', t: 'Govern', d: 'SLA alerts, breach risk' },
  { n: '05', t: 'Act', d: 'One-tap export, share' },
]

const integrations = ['UPI Events', 'Shopify Orders', 'Zoho Tickets', 'Freshdesk', 'Apollo HIS', 'Bot Framework', 'Analytics SDK', 'Webhook']

const useCases = [
  { h: 'Retail ops: 2,847 stores', p: 'Order counts & fulfillment trends in one view' },
  { h: 'Healthcare: 156 appointments/day', p: 'Fortis, Max, Apollo slot fill & doctor availability' },
  { h: 'Automation: 12,486 tasks/week', p: 'Bot success 96.4% with failure drilldown, no cost metrics' },
]

const summaryStats = [
  { k: 'Active Users', v: '12.4K Live' },
  { k: 'Dashboards', v: '6 Live' },
  { k: 'SLA Uptime', v: '99.4%' },
  { k: 'Freshness', v: '< 60s' },
  { k: 'Tracking', v: 'Operational only' },
  { k: 'Financial data', v: 'Zero' },
]

const faqs = [
  { q: 'Does it include any revenue or financial data?', a: 'No. All 6 dashboards are rebuilt as pure HTML/CSS with zero rupee, dollar, or revenue numbers. Only operational counts, percentages and time metrics.' },
  { q: 'How fresh is SLA data?', a: 'Sub-60 second freshness for SLA feeds. Breach risk computed on rolling 15-min windows.' },
  { q: 'Can I embed the full-bleed coverflow?', a: 'Yes. Use w-screen left-1/2 right-1/2 -mx-[50vw] with perspective 2500px and the updated getTransform() logic. It covers left to right with center zoomed.' },
]

export default function AnalyticsServicePage() {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [faqOpen, setFaqOpen] = useState(0)
  const [toast, setToast] = useState(null)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef(null)
  const dragRef = useRef({ x: 0, dragging: false })
  const resumeTimer = useRef(null)
  const autoTimer = useRef(null)

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight || 1)
      setScrollPct(pct * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function pauseThenResume() {
    setPaused(true)
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setPaused(false), 4000)
  }

  useEffect(() => {
    if (paused) {
      if (autoTimer.current) window.clearInterval(autoTimer.current)
      return
    }
    autoTimer.current = window.setInterval(() => setActive((a) => (a + 1) % 6), 3500)
    return () => { if (autoTimer.current) window.clearInterval(autoTimer.current) }
  }, [paused])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { setActive((a) => (a + 1) % 6); pauseThenResume() }
      if (e.key === 'ArrowLeft') { setActive((a) => (a - 1 + 6) % 6); pauseThenResume() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function getTransform(i) {
    const diff = i - active
    const dist = Math.abs(diff)
    let x = 0, scale = 1, opacity = 1, rotate = 0, z = 0
    if (isMobile) {
      if (diff === 0) { x = 0; scale = 1; opacity = 1; rotate = 0; z = 50 }
      else if (dist === 1) { x = diff * 320; scale = 0.78; opacity = 0.6; rotate = diff * -12; z = 30 }
      else if (dist === 2) { x = diff * 280 + (diff > 0 ? 80 : -80); scale = 0.6; opacity = 0.3; rotate = diff * -18; z = 10 }
      else { x = diff * 260; scale = 0.4; opacity = 0; z = 0 }
    } else {
      if (diff === 0) { x = 0; scale = 1; opacity = 1; rotate = 0; z = 50 }
      else if (dist === 1) { x = diff * 760; scale = 0.68; opacity = 0.6; rotate = diff * -20; z = 30 }
      else if (dist === 2) { x = diff * 680 + (diff > 0 ? 220 : -220); scale = 0.5; opacity = 0.3; rotate = diff * -30; z = 10 }
      else { x = diff * 600; scale = 0.35; opacity = 0; z = 0 }
    }
    return { x, scale, opacity, rotate, z }
  }

  function onPointerDown(e) {
    dragRef.current = { x: e.clientX, dragging: true }
    e.currentTarget.setPointerCapture(e.pointerId)
    setPaused(true)
  }
  function onPointerUp(e) {
    if (!dragRef.current.dragging) return
    const dx = e.clientX - dragRef.current.x
    if (Math.abs(dx) > 60) {
      if (dx < 0) setActive((a) => (a + 1) % 6)
      else setActive((a) => (a - 1 + 6) % 6)
    }
    dragRef.current.dragging = false
    pauseThenResume()
  }

  const currentCaption = CAPTIONS[active]

  return (
    <div className="relative bg-[#F8F9FC] text-[#0F0F12] selection:bg-[#FF7A00]/20" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="fixed top-16 left-0 h-[3px] bg-gradient-to-r from-[#FF7A00] to-[#7C3AED] z-[80] transition-[width] duration-150" style={{ width: `${scrollPct}%` }} />

      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute rounded-full" style={{ width: 480, height: 480, left: -120, top: -120, background: '#FF7A00', filter: 'blur(80px)', opacity: 0.08 }} />
        <div className="absolute rounded-full" style={{ width: 560, height: 560, top: '30%', right: -160, background: '#7C3AED', filter: 'blur(80px)', opacity: 0.08 }} />
        <div className="absolute rounded-full" style={{ width: 640, height: 640, bottom: '10%', left: '20%', background: '#0EA5E9', filter: 'blur(80px)', opacity: 0.08 }} />
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-4 py-2.5 rounded-full bg-[#0F0F12] text-white text-[12px] font-[600] shadow-[0_8px_24px_rgba(0,0,0,0.2)] max-w-[90vw] text-center">
          {toast}
        </div>
      )}

      {/* Hero */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-20 grid grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="col-span-12 lg:col-span-6">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-white/70 border border-white/60 backdrop-blur-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
            <span className="text-[#FF7A00] text-[11px] font-[700] tracking-[0.2em] uppercase">Operational Intelligence</span>
          </div>
          <h1 className="font-[800] text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.03em]">
            Turn Operational Data into <br />
            <span className="relative inline-block">
              <span className="relative z-10">Actionable Business</span>
              <span className="absolute bottom-1 left-0 right-0 h-[10px] bg-[#FF7A00]/15 -rotate-1 rounded-full -z-0" />
            </span> Intelligence
          </h1>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.6] text-[#6B7280] max-w-[520px]">
            Make confident decisions with real-time operational dashboards. Track active users, session health, SLA compliance and automation efficiency — all in signature orange, purple &amp; blue glass.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => { document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' }); showToast('Exploring dashboards • 6 live views') }}
              className="h-11 px-6 rounded-full bg-[#0F0F12] text-white text-[13px] font-[600] shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-[1.02] active:scale-[0.98] transition"
            >
              Explore Dashboards
            </button>
            <div className="h-11 px-5 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 flex items-center gap-2 text-[13px] font-[600] text-[#6B7280]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live • Auto-scroll • No financial data
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 relative">
          <div className="relative bg-white/60 backdrop-blur-2xl rounded-[24px] p-4 md:p-6 border border-white/70 shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
            <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-[#0F0F12] text-white text-[10px] font-[700] tracking-[0.08em] flex items-center gap-1.5 shadow-lg z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 3D LIVE PREVIEW
            </div>
            <div className="rounded-[16px] overflow-hidden bg-[#FCFCFE] border border-white/60 relative">
              <div className="px-5 py-4 border-b border-[#EEF0F6] flex justify-between items-center">
                <div>
                  <div className="text-[11px] font-[700] tracking-[0.12em]">OPERATIONAL METRICS</div>
                  <div className="text-[10px] text-[#8A8FA0] mt-0.5">Performance • Updated Live</div>
                </div>
                <div className="flex gap-1.5">
                  <span className="px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[9px] font-[700] text-emerald-700">LIVE</span>
                  <span className="px-2 py-1 rounded-full bg-[#0F0F12] text-white text-[9px] font-[700]">12.4K Users</span>
                </div>
              </div>
              <div className="p-4 grid grid-cols-3 gap-2.5">
                <div className="rounded-[12px] bg-orange-50/80 border border-orange-200/50 p-3">
                  <div className="text-[9px] font-[700] text-[#6B7280] uppercase">Active Users</div>
                  <div className="text-[16px] font-[800] mt-1">12.4K</div>
                  <div className="text-[10px] text-emerald-600 font-[600]">+8.2%</div>
                </div>
                <div className="rounded-[12px] bg-violet-50/80 border border-violet-200/50 p-3">
                  <div className="text-[9px] font-[700] text-[#6B7280] uppercase">Avg Session</div>
                  <div className="text-[16px] font-[800] mt-1">4m 32s</div>
                  <div className="text-[10px] text-[#6B7280]">Stable</div>
                </div>
                <div className="rounded-[12px] bg-blue-50/80 border border-blue-200/50 p-3">
                  <div className="text-[9px] font-[700] text-[#6B7280] uppercase">Conversion</div>
                  <div className="text-[16px] font-[800] mt-1">3.6%</div>
                  <div className="text-[10px] text-emerald-600 font-[600]">+0.4pp</div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="rounded-[12px] bg-white border border-[#EEF0F6] p-3">
                  <div className="text-[10px] font-[700] uppercase text-[#6B7280]">User Growth Trend</div>
                  <svg viewBox="0 0 200 60" className="w-full h-[76px] mt-2">
                    <defs>
                      <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,45 C20,40 40,38 60,30 C80,22 100,18 130,14 C150,10 170,8 200,4 L200,60 L0,60 Z" fill="url(#hg)" />
                    <path d="M0,45 C20,40 40,38 60,30 C80,22 100,18 130,14 C150,10 170,8 200,4" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div className="flex justify-between text-[9px] text-[#9AA0B2]">
                    <span>Apr</span><span>Oct</span><span>12.4K users</span>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[{ k: 'Sessions', v: '8.4K' }, { k: 'Users', v: '12.4K' }, { k: 'Engagement', v: '68%' }].map((h) => (
                    <div key={h.k} className="rounded-[10px] bg-white/70 border border-white/60 p-2.5 text-center">
                      <div className="text-[9px] font-[700] text-[#6B7280] uppercase tracking-wide">{h.k}</div>
                      <div className="text-[11px] font-[700] mt-0.5">{h.v}</div>
                      <div className="text-[9px] text-[#9AA0B2]">live</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 -mt-2 pb-10">
        <div className="bg-white/60 backdrop-blur-xl rounded-[20px] p-8 md:p-10 max-w-[900px] mx-auto text-center border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
          <div className="inline-flex px-3 py-1 rounded-full bg-[#0F0F12] text-white text-[10px] font-[700] tracking-[0.12em] uppercase mb-4">WHY IT MATTERS</div>
          <h2 className="text-[22px] md:text-[26px] font-[700] leading-[1.2] tracking-[-0.01em]">Stop guessing. Start governing with live operational truth.</h2>
          <p className="mt-3 text-[14px] leading-[1.6] text-[#6B7280] max-w-[640px] mx-auto">
            73% of teams lose focus to delayed reporting. Our glass dashboards stitch user activity, ticket flow, SLA health and bot efficiency into one orange-purple-blue canvas — so ops and product see the same numbers instantly, with zero financial data.
          </p>
        </div>
      </section>

      {/* Explore dashboards — full-bleed coverflow */}
      <section id="explore" className="w-screen relative left-1/2 right-1/2 -mx-[50vw] max-w-none bg-[#FAFBFF] border-y border-white/60 py-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 text-center mb-10">
          <h2 className="font-[800] text-[28px] md:text-[34px] tracking-[-0.02em]">Explore Live Dashboards</h2>
          <div className="mt-3 inline-flex items-center gap-2 text-[12px] text-[#6B7280] font-[500] flex-wrap justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
            Performance, SLAs, Healthcare, Automation, Ecommerce, Retail
          </div>
        </div>

        <div
          ref={trackRef}
          id="coverflow"
          className="relative w-full h-[620px] flex items-center justify-center overflow-visible touch-none select-none"
          style={{ perspective: '2500px' }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => pauseThenResume()}
        >
          <div id="track" className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {PANELS.map((Panel, i) => {
              const t = getTransform(i)
              const isActive = i === active
              return (
                <div
                  key={i}
                  className="dashboard-item absolute rounded-[20px] bg-white border border-white/60 overflow-hidden cursor-pointer"
                  style={{
                    width: isMobile ? '340px' : '900px',
                    height: isMobile ? '500px' : '560px',
                    left: '50%',
                    top: '50%',
                    marginLeft: isMobile ? '-170px' : '-450px',
                    marginTop: isMobile ? '-250px' : '-280px',
                    transform: `translateX(${t.x}px) scale(${t.scale}) rotateY(${t.rotate}deg)`,
                    opacity: t.opacity,
                    zIndex: t.z,
                    boxShadow: isActive ? '0 30px 60px rgba(0,0,0,0.18)' : '0 16px 40px rgba(0,0,0,0.10)',
                    filter: isActive ? 'none' : 'brightness(0.88)',
                    transition: 'all 700ms cubic-bezier(0.16,1,0.3,1)',
                    transformStyle: 'preserve-3d',
                  }}
                  onClick={() => { setActive(i); pauseThenResume() }}
                >
                  <div className="w-full h-full overflow-hidden"><Panel /></div>
                  <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <div className="text-white font-[700] text-[18px] leading-[1.1] tracking-tight">{CAPTIONS[i].title}</div>
                        <div className="text-white/70 text-[13px] mt-1 font-[500]">{CAPTIONS[i].sub}</div>
                      </div>
                      <div className="hidden md:flex w-7 h-7 rounded-full bg-white/20 backdrop-blur-md items-center justify-center text-white text-[12px]">→</div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/50 text-[10px] font-[700] tracking-wide shadow-sm">{CAPTIONS[i].badge}</div>
                  {isActive && <div className="absolute inset-0 rounded-[20px] border-2 border-[#FF7A00]/30 pointer-events-none" />}
                </div>
              )
            })}
          </div>
          <button onClick={() => { setActive((a) => (a - 1 + 6) % 6); pauseThenResume() }} aria-label="Previous" className="absolute left-[3%] top-1/2 -translate-y-1/2 z-[60] w-14 h-14 rounded-full bg-[#0F0F12] text-white text-xl flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition">‹</button>
          <button onClick={() => { setActive((a) => (a + 1) % 6); pauseThenResume() }} aria-label="Next" className="absolute right-[3%] top-1/2 -translate-y-1/2 z-[60] w-14 h-14 rounded-full bg-[#0F0F12] text-white text-xl flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition">›</button>
        </div>

        <div id="dots" className="flex justify-center gap-2 mt-10">
          {CAPTIONS.map((c, i) => (
            <div key={c.title} onClick={() => { setActive(i); pauseThenResume() }} className={i === active ? 'w-8 h-2 rounded-full bg-[#0F0F12] transition-all duration-300 cursor-pointer' : 'w-2 h-2 rounded-full bg-[#D1D5DB] transition-all duration-300 cursor-pointer hover:bg-[#9CA3AF]'} />
          ))}
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-8 mt-8 grid grid-cols-3 md:grid-cols-6 gap-2 text-center">
          {summaryStats.map((h) => (
            <div key={h.k} className="rounded-[12px] bg-white/70 backdrop-blur-xl border border-white/60 p-2.5 shadow-sm">
              <div className="text-[10px] font-[700] text-[#6B7280] uppercase tracking-wide">{h.k}</div>
              <div className="text-[12px] font-[700] mt-1">{h.v}</div>
            </div>
          ))}
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-8 mt-5 flex items-center justify-between bg-white/70 border border-white/60 rounded-[12px] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: currentCaption.color }} />
            <div className="text-[13px] font-[600]">{currentCaption.title} — {currentCaption.sub}</div>
          </div>
          <div className="text-[11px] text-[#6B7280] hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Auto-scroll • Hover to pause • Drag • ← → keys
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 py-12">
        <div className="flex items-end justify-between mb-6">
          <h3 className="text-[20px] md:text-[22px] font-[700] tracking-tight">Key Capabilities</h3>
          <div className="text-[11px] font-[600] text-[#6B7280] tracking-wide uppercase">Built for operational scale</div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {capabilities.map((h) => (
            <div key={h.title} className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-[16px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
              <div className="w-9 h-9 rounded-[10px] bg-[#0F0F12] text-white flex items-center justify-center text-[14px] font-bold mb-4">{h.icon}</div>
              <div className="font-[700] text-[14px]">{h.title}</div>
              <div className="text-[13px] text-[#6B7280] mt-2 leading-[1.5]">{h.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 pb-12">
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[24px] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
          <h3 className="font-[700] text-[18px] mb-6">How it works — 5 steps to live truth</h3>
          <div className="grid md:grid-cols-5 gap-4">
            {steps.map((h) => (
              <div key={h.n} className="relative rounded-[14px] bg-white/70 border border-white/60 p-4">
                <div className="text-[11px] font-[800] tracking-widest text-[#FF7A00]">{h.n}</div>
                <div className="font-[700] text-[13px] mt-1">{h.t}</div>
                <div className="text-[12px] text-[#6B7280] mt-1">{h.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 pb-12">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-[700] tracking-wide uppercase text-[#6B7280] mr-2">Integrations:</span>
          {integrations.map((h) => (
            <span key={h} className="px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 text-[12px] font-[600] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">{h}</span>
          ))}
        </div>
      </section>

      {/* Use cases + Benefits */}
      <section id="pricing" className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 pb-12 grid md:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-[20px] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
          <h4 className="font-[700] text-[16px]">Use Cases</h4>
          <div className="mt-4 space-y-3">
            {useCases.map((h) => (
              <div key={h.h} className="flex gap-3">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#FF7A00]" />
                <div>
                  <div className="text-[13px] font-[600]">{h.h}</div>
                  <div className="text-[12px] text-[#6B7280]">{h.p}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#0F0F12] text-white rounded-[20px] p-6 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
          <h4 className="font-[700] text-[16px]">Benefits — Operational only</h4>
          <div className="mt-5 grid grid-cols-3 gap-4">
            <div><div className="text-[22px] font-[800]">73%</div><div className="text-[11px] text-white/60 mt-1 leading-[1.3]">Faster decisions vs sheets</div></div>
            <div><div className="text-[22px] font-[800]">42%</div><div className="text-[11px] text-white/60 mt-1 leading-[1.3]">Faster response time</div></div>
            <div><div className="text-[22px] font-[800]">4.9/5</div><div className="text-[11px] text-white/60 mt-1 leading-[1.3]">G2 rating - ops teams</div></div>
          </div>
          <div className="mt-6 h-[1px] bg-white/10" />
          <div className="mt-4 text-[12px] text-white/70 leading-[1.6]">
            "We moved from delayed reports to live ops. The orange glass UI actually makes the team open it daily." — Ops Head, 340+ team org • Zero financial data, pure operations.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 max-w-[900px] mx-auto px-6 md:px-8 pb-16">
        <h3 className="text-center font-[800] text-[20px] tracking-tight mb-6">FAQ</h3>
        <div className="space-y-2">
          {faqs.map((h, i) => (
            <div key={h.q} className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-[14px] overflow-hidden">
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full text-left px-5 py-4 flex items-center justify-between">
                <span className="text-[13px] font-[600]">{h.q}</span>
                <span className={`w-6 h-6 rounded-full bg-[#0F0F12] text-white flex items-center justify-center text-[12px] transition-transform ${faqOpen === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {faqOpen === i && <div className="px-5 pb-4 text-[13px] text-[#6B7280] leading-[1.6]">{h.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-8 pb-20">
        <div className="relative overflow-hidden rounded-[24px] bg-[#0F0F12] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full bg-[#FF7A00] blur-[80px] opacity-[0.15]" />
          <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#7C3AED] blur-[80px] opacity-[0.18]" />
          <div className="relative">
            <div className="text-white font-[800] text-[20px] md:text-[24px] leading-[1.1] tracking-tight">Bring your dashboards to glass.</div>
            <div className="text-white/60 text-[13px] mt-2 max-w-[440px]">Ship the full-bleed edge-to-edge coverflow with updated transform, auto-scroll 3500ms, pause on hover, orange-purple-blue glass, zero revenue data.</div>
          </div>
          <div className="relative flex gap-3">
            <button onClick={() => showToast('Demo — preview mode')} className="h-11 px-6 rounded-full bg-white text-[#0F0F12] text-[13px] font-[700] hover:bg-white/90 transition">Book a Demo</button>
            <button onClick={() => showToast('Code copied — full-bleed glass ready')} className="h-11 px-5 rounded-full bg-white/10 border border-white/15 text-white text-[13px] font-[600] backdrop-blur">View code</button>
          </div>
        </div>
        <div className="mt-4 text-center text-[11px] text-[#9CA3AF]">Built with 6 code dashboards • Tailwind • Inter • glass: bg-white/70 backdrop-blur-xl • perspective 2500px • auto-scroll 3500ms • no revenue</div>
      </section>
    </div>
  )
}

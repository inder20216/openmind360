import {
  UserCog,
  FileBarChart,
  TrendingUp,
  Route,
  RefreshCw,
  Star,
  AlertTriangle,
  Stethoscope,
  FileCheck,
  BellRing,
  FileText,
  Package,
  ShoppingCart,
  RotateCcw,
  Sparkles,
  Boxes,
  BadgePercent,
  Store,
} from 'lucide-react'

// Small "Netflix row"-style card marquee — continuously auto-scrolls right
// to left, pausing on hover. Each item's `detail` field is unused for now
// (Inder is writing fuller copy to go with it later) but left in place so
// it's ready to wire back up.
const industryTags = {
  'Cross-Industry': '#64748b',
  Healthcare: '#e11d48',
  'E-commerce': '#8b5cf6',
  Retail: '#f59e0b',
}

const automations = [
  {
    Icon: UserCog,
    industry: 'Cross-Industry',
    name: 'HRMS Automation',
    blurb: 'Attendance, leave, and payroll workflows sync automatically.',
    detail: 'Attendance, leave requests, and payroll data flow between your HR tools without anyone re-entering the same information twice — fewer errors, faster payroll cycles.',
  },
  {
    Icon: FileBarChart,
    industry: 'Cross-Industry',
    name: 'MIS & Reporting',
    blurb: 'Live dashboards with reduced manual reporting.',
    detail: 'Reports and dashboards pull straight from live data on a schedule you set, so decision-makers see current numbers instead of waiting on someone to compile a spreadsheet.',
  },
  {
    Icon: TrendingUp,
    industry: 'Cross-Industry',
    name: 'Lead Nurturing',
    blurb: 'Quiet leads get automatic, timely follow-ups.',
    detail: "A lead that's gone quiet for a few days gets a timely automatic follow-up instead of falling through the cracks — no lead sits untouched waiting on a rep's bandwidth.",
  },
  {
    Icon: Route,
    industry: 'Cross-Industry',
    name: 'Ticket Routing',
    blurb: 'Prioritized and routed the moment it lands.',
    detail: 'Every support ticket is automatically prioritized and routed to the right team based on urgency and topic, cutting the time between "ticket raised" and "right person sees it."',
  },
  {
    Icon: RefreshCw,
    industry: 'Cross-Industry',
    name: 'CRM Sync',
    blurb: 'Support and CRM data stay in sync.',
    detail: 'Updates made in your support desk reflect in your CRM (and back) automatically, so agents and sales teams are always looking at the same, current record.',
  },
  {
    Icon: Star,
    industry: 'Cross-Industry',
    name: 'Feedback Automation',
    blurb: 'Post-resolution surveys, sent automatically.',
    detail: 'A short feedback survey goes out automatically once a case closes, and the results roll straight into your reporting dashboard — no one has to remember to send it.',
  },
  {
    Icon: AlertTriangle,
    industry: 'Cross-Industry',
    name: 'Escalation Alerts',
    blurb: 'At-risk tickets flagged before they churn.',
    detail: 'Tickets showing signs of frustration or repeated contact get flagged and escalated to a senior agent automatically, before a recoverable issue turns into a lost customer.',
  },
  // Healthcare
  {
    Icon: Stethoscope,
    industry: 'Healthcare',
    name: 'Patient Appointment Scheduling',
    blurb: 'Bookings, reminders, and reschedules — automatic.',
    detail: 'Patients book, reschedule, or cancel appointments through voice or chat, with automatic reminders sent ahead of time — cutting down on no-shows without front-desk staff chasing calls.',
  },
  {
    Icon: FileCheck,
    industry: 'Healthcare',
    name: 'Insurance & Claims Processing',
    blurb: 'Claim status and document checks, automated.',
    detail: 'Claim status updates and document verification steps run automatically, so patients and providers know where a claim stands without repeated follow-up calls.',
  },
  {
    Icon: BellRing,
    industry: 'Healthcare',
    name: 'Patient Follow-up & Reminders',
    blurb: 'Medication and care reminders sent on schedule.',
    detail: 'Post-visit and post-discharge follow-ups, medication reminders, and care check-ins go out automatically on the schedule your care team defines — nothing depends on someone remembering to call.',
  },
  {
    Icon: FileText,
    industry: 'Healthcare',
    name: 'Report & Prescription Delivery',
    blurb: 'Lab reports and prescriptions, delivered automatically.',
    detail: 'Lab results and prescriptions are delivered to patients automatically the moment they are ready, instead of patients calling in to check or waiting for a callback.',
  },
  // E-commerce
  {
    Icon: Package,
    industry: 'E-commerce',
    name: 'Order Tracking & Updates',
    blurb: 'Status updates sent the moment they happen.',
    detail: 'Shipping, delay, and delivery updates go out to customers automatically as they happen, cutting down "where is my order" contacts before they ever get raised.',
  },
  {
    Icon: ShoppingCart,
    industry: 'E-commerce',
    name: 'Cart Recovery',
    blurb: 'Abandoned carts get a timely, automatic nudge.',
    detail: 'A shopper who leaves items in their cart gets a well-timed automatic follow-up instead of the sale being silently lost — no manual list-building or manual outreach.',
  },
  {
    Icon: RotateCcw,
    industry: 'E-commerce',
    name: 'Returns & Refunds',
    blurb: 'Route and process eligible return requests automatically.',
    detail: 'Return and refund requests are validated and processed automatically against policy rules, so customers get a resolution in minutes instead of waiting in a support queue.',
  },
  {
    Icon: Sparkles,
    industry: 'E-commerce',
    name: 'Personalized Recommendations',
    blurb: 'Relevant suggestions, based on real behavior.',
    detail: 'Product suggestions and follow-up messages are tailored to what a customer actually browsed or bought, generated automatically instead of the same blanket offer for everyone.',
  },
  // Retail
  {
    Icon: Boxes,
    industry: 'Retail',
    name: 'Inventory & Stock Alerts',
    blurb: 'Low-stock and restock alerts, automatic.',
    detail: 'Store and warehouse teams get automatic alerts as stock runs low or restocks arrive, instead of manually checking counts across locations.',
  },
  {
    Icon: Store,
    industry: 'Retail',
    name: 'Omnichannel Inventory Sync',
    blurb: 'Synchronize online and in-store inventory at configured intervals.',
    detail: "Stock levels stay synced across your online store and physical locations automatically, so a customer never sees 'in stock' online for something that's actually sold out in-store.",
  },
  {
    Icon: BadgePercent,
    industry: 'Retail',
    name: 'Promotions & Offers',
    blurb: 'The right offer, sent to the right customer.',
    detail: 'Promotional messages go out automatically to the customers a given offer is actually relevant to, based on purchase history — not a blanket blast to your entire list.',
  },
]

function AutomationCard({ item }) {
  const { Icon } = item
  const tagColor = industryTags[item.industry]
  return (
    <div className="card-item shrink-0 w-[168px] md:w-[188px] text-left rounded-2xl border border-slate-100 bg-white p-4 md:p-5 whitespace-normal align-top">
      <div className="flex items-start justify-between gap-2">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 text-slate-500">
          <Icon className="w-5 h-5" />
        </div>
        <span
          className="text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full whitespace-nowrap"
          style={{ backgroundColor: `${tagColor}15`, color: tagColor }}
        >
          {item.industry}
        </span>
      </div>
      <h3 className="mt-3 text-[13.5px] font-bold text-slate-900 leading-tight">{item.name}</h3>
      <p className="mt-1.5 text-[12px] text-slate-500 leading-snug">{item.blurb}</p>
    </div>
  )
}

export default function AutomationCardSlider() {
  const loop = [...automations, ...automations]

  return (
    <div className="-mx-6 md:-mx-16 overflow-hidden" aria-label="Automation types">
      <div className="card-track px-6 md:px-16">
        {loop.map((item, i) => (
          <span key={`${item.name}-${i}`} className="inline-block mr-3 md:mr-4">
            <AutomationCard item={item} />
          </span>
        ))}
      </div>
    </div>
  )
}

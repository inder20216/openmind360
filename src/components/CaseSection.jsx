import { CircleCheck } from 'lucide-react'
import myhrEmployees from '../assets/case-studies/myhr-employees-relationship-center.jpg'
import myhrConclusion from '../assets/case-studies/myhr-conclusion.jpg'

const caseImages = {
  'myhr-employees-relationship-center': myhrEmployees,
  'myhr-conclusion': myhrConclusion,
}

export default function CaseSection({ section }) {
  return (
    <div>
      <h4 className="text-base md:text-lg font-bold text-slate-900">{section.heading}</h4>

      {section.body && <p className="mt-2 text-sm md:text-[15px] text-slate-500 leading-relaxed">{section.body}</p>}

      {section.bullets && (
        <ul className="mt-4 space-y-3">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm md:text-[15px] text-slate-600 leading-relaxed">
              <CircleCheck className="w-4 h-4 text-ox flex-shrink-0 mt-1" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {section.groups && (
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {section.groups.map((g, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
              <p className="font-semibold text-slate-800 text-sm">{g.label}</p>
              <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{g.body}</p>
            </div>
          ))}
        </div>
      )}

      {section.quote && (
        <blockquote className="mt-5 rounded-2xl border-l-4 border-ox bg-orange-50/60 p-5 md:p-6">
          <p className="text-sm md:text-base text-slate-700 italic leading-relaxed">
            &ldquo;{section.quote}&rdquo;
          </p>
          {section.attribution && (
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              — {section.attribution}
            </p>
          )}
        </blockquote>
      )}

      {section.image && (
        <figure className="mt-5">
          <img
            src={caseImages[section.image.src]}
            alt={section.image.alt}
            loading="lazy"
            className="w-full rounded-2xl border border-slate-100"
          />
          <figcaption className="mt-2 text-xs text-slate-400">{section.image.caption}</figcaption>
        </figure>
      )}
    </div>
  )
}
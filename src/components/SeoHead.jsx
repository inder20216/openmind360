import { Helmet } from 'react-helmet-async'

export default function SeoHead({ title, description, canonical }) {
  const siteName = 'Open Mind Services Limited'
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — AI-Powered Customer Experience Outsourcing`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:site_name" content={siteName} />
      {canonical && <meta property="og:url" content={canonical} />}
    </Helmet>
  )
}

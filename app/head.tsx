import { getPersonJsonLd, getProjectsJsonLd, getWebsiteJsonLd, getProfessionalServiceJsonLd, getSiteNavigationJsonLd, getFAQJsonLd, getKeywords } from "@/lib/seo"

export default function Head() {
  const jsonLd = [
    getWebsiteJsonLd(), 
    getPersonJsonLd(), 
    getProjectsJsonLd(),
    getProfessionalServiceJsonLd(),
    getSiteNavigationJsonLd(),
    getFAQJsonLd()
  ]
  const keywords = getKeywords()
  return (
    <>
      <meta name="theme-color" content="#0b0f17" />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content="Nakul Jhunjhunwala" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href="https://nakuljhunjhunwala.in" />
      {jsonLd.map((data, idx) => (
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          type="application/ld+json"
          key={idx}
        />
      ))}
    </>
  )
}


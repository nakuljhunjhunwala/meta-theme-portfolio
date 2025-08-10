import { getPersonJsonLd, getProjectsJsonLd, getWebsiteJsonLd, getKeywords } from "@/lib/seo"

export default function Head() {
  const jsonLd = [getWebsiteJsonLd(), getPersonJsonLd(), getProjectsJsonLd()]
  const keywords = getKeywords()
  return (
    <>
      <meta name="theme-color" content="#0b0f17" />
      <meta name="keywords" content={keywords.join(", ")} />
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


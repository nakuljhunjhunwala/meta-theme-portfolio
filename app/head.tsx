import { getPersonJsonLd, getProjectsJsonLd, getWebsiteJsonLd } from "@/lib/seo"

export default function Head() {
  const jsonLd = [getWebsiteJsonLd(), getPersonJsonLd(), getProjectsJsonLd()]
  return (
    <>
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


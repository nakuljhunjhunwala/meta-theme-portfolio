import type { Metadata } from "next"
import { personalInfo } from "@/constants/portfolio"
import { getMetadataBase, getWebsiteJsonLd, getPersonJsonLd, getProjectsJsonLd } from "@/lib/seo"
import ErrorBoundary from "@/components/common/ErrorBoundary"
import LandingPage from "@/components/landing/LandingPage"
import EnsureInitialized from "@/components/common/EnsureInitialized"

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: `${personalInfo.name} – ${personalInfo.title}`,
  description: personalInfo.bio.medium || personalInfo.bio.short,
  alternates: { canonical: "/" },
}

export default function HomePage() {
  // Generate comprehensive structured data for the homepage
  const jsonLdData = [
    getWebsiteJsonLd(),
    getPersonJsonLd(),
    getProjectsJsonLd()
  ]

  return (
    <ErrorBoundary>
      <EnsureInitialized>
        {/* Structured Data for SEO */}
        {jsonLdData.map((data, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
        <LandingPage />
      </EnsureInitialized>
    </ErrorBoundary>
  )
}

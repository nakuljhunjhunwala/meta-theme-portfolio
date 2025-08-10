import type { Metadata } from "next"
import { personalInfo } from "@/constants/portfolio"
import { getMetadataBase } from "@/lib/seo"
import ErrorBoundary from "@/components/common/ErrorBoundary"
import LandingPage from "@/components/landing/LandingPage"
import EnsureInitialized from "@/components/common/EnsureInitialized"

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: personalInfo.name,
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return (
    <ErrorBoundary>
      <EnsureInitialized>
        <LandingPage />
      </EnsureInitialized>
    </ErrorBoundary>
  )
}

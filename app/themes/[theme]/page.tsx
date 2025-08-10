import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ThemeView } from "./view"
import { getMetadataBase, getThemeJsonLd, getThemeBreadcrumbJsonLd } from "@/lib/seo"
import { personalInfo } from "@/constants/portfolio"

const validThemes = ["retro", "code", "glass", "terminal"] as const
type ThemeParam = (typeof validThemes)[number]

export function generateStaticParams() {
  return validThemes.map((t) => ({ theme: t }))
}

export async function generateMetadata({ params }: { params: Promise<{ theme: string }> }): Promise<Metadata> {
  const { theme } = await params
  const isValid = (validThemes as readonly string[]).includes(theme)
  const title = isValid ? `${personalInfo.name} – ${theme} theme` : personalInfo.name
  return {
    metadataBase: getMetadataBase(),
    title,
    alternates: { canonical: isValid ? `/themes/${theme}` : "/" },
  }
}

export default async function ThemePage({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params
  if (!(validThemes as readonly string[]).includes(theme)) return notFound()
  const jsonLd = [getThemeJsonLd(theme), getThemeBreadcrumbJsonLd(theme)]
  return (
    <>
      {jsonLd.map((data, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <ThemeView theme={theme as ThemeParam} />
    </>
  )
}



import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ThemeView } from "./view"
import { getMetadataBase, getThemeJsonLd, getThemeBreadcrumbJsonLd } from "@/lib/seo"
import { personalInfo } from "@/constants/portfolio"

const validThemes = ["retro", "code", "glass", "terminal", "neuro"] as const
type ThemeParam = (typeof validThemes)[number]

export function generateStaticParams() {
  return validThemes.map((t) => ({ theme: t }))
}

export async function generateMetadata({ params }: { params: Promise<{ theme: string }> }): Promise<Metadata> {
  const { theme } = await params
  const isValid = (validThemes as readonly string[]).includes(theme)
  
  const themeData: Record<string, { title: string; description: string; keywords: string[] }> = {
    retro: {
      title: `${personalInfo.name} – Retro Gaming Portfolio`,
      description: "Interactive retro gaming portfolio featuring classic arcade games, achievements system, and 8-bit aesthetics showcasing full-stack development skills in React, TypeScript, and game development.",
      keywords: ["retro gaming portfolio", "8-bit design", "arcade games", "interactive portfolio", "game development", "React games", "pixel art", "retro theme"]
    },
    code: {
      title: `${personalInfo.name} – VS Code Developer Portfolio`,
      description: "Professional VS Code inspired portfolio with syntax highlighting, file explorer, and IDE interface demonstrating expertise in modern development environments and tools.",
      keywords: ["VS Code portfolio", "IDE interface", "code editor", "syntax highlighting", "developer portfolio", "programming showcase", "code theme"]
    },
    glass: {
      title: `${personalInfo.name} – Glass Morphism Portfolio`,
      description: "Modern glass morphism portfolio with frosted glass effects, smooth animations, and contemporary design showcasing frontend expertise and UI/UX skills.",
      keywords: ["glass morphism", "modern design", "frosted glass", "UI design", "frontend portfolio", "glass theme", "contemporary portfolio"]
    },
    terminal: {
      title: `${personalInfo.name} – Terminal Command Portfolio`,
      description: "Command-line interface portfolio with interactive terminal commands, showcasing system administration, backend development, and CLI expertise.",
      keywords: ["terminal portfolio", "command line", "CLI interface", "system admin", "terminal commands", "backend development", "shell interface"]
    },
    neuro: {
      title: `${personalInfo.name} – Neumorphism Soft UI Portfolio`,
      description: "Modern neumorphism portfolio with soft shadows, subtle depth, and elegant design showcasing frontend expertise and contemporary UI/UX design.",
      keywords: ["neumorphism", "soft ui", "neomorphism", "modern design", "soft shadows", "UI design", "frontend portfolio", "contemporary design"]
    }
  }

  if (!isValid) {
    return {
      metadataBase: getMetadataBase(),
      title: personalInfo.name,
      alternates: { canonical: "/" },
    }
  }

  const data = themeData[theme]
  return {
    metadataBase: getMetadataBase(),
    title: data.title,
    description: data.description,
    keywords: [...data.keywords, personalInfo.name, "full-stack developer", "portfolio", "React", "TypeScript", "Node.js"],
    alternates: { canonical: `/themes/${theme}` },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `/themes/${theme}`,
      type: "website",
      siteName: `${personalInfo.name} Portfolio`,
      images: [
        {
          url: "/profile_photo.jpg",
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: ["/profile_photo.jpg"],
    },
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



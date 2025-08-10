import type { Metadata } from "next"
import type { MetadataRoute } from "next"
import { personalInfo, projects, technicalSkills } from "@/constants/portfolio"

export function getSiteUrl(): string {
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
    if (envUrl) return envUrl.replace(/\/$/, "")
    if (personalInfo.website) return personalInfo.website.replace(/\/$/, "")
    return "https://nakuljhunjhunwala.sociocircle.in"
}

export function getMetadataBase(): URL {
    return new URL(getSiteUrl())
}

export function buildSiteMetadata(): Metadata {
    const title = `${personalInfo.name} – ${personalInfo.title}`
    const description = personalInfo.bio.medium || personalInfo.bio.short

    const keywords = getKeywords()

    const image = "/placeholder.jpg"

    const isProdIndexable = Boolean(
        process.env.NEXT_PUBLIC_INDEXING !== "false"
    )

    const base = getMetadataBase()

    // Build verification safely without undefined values
    const verification: NonNullable<Metadata["verification"]> = {}
    if (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) {
        verification.google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    }
    if (process.env.NEXT_PUBLIC_YANDEX_VERIFICATION) {
        verification.yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
    }
    const otherVerification: Record<string, string | string[]> = {}
    if (process.env.NEXT_PUBLIC_BING_VERIFICATION) {
        otherVerification["msvalidate.01"] = process.env.NEXT_PUBLIC_BING_VERIFICATION
    }
    if (Object.keys(otherVerification).length) {
        verification.other = otherVerification
    }

    const metadata: Metadata = {
        metadataBase: base,
        title: {
            default: title,
            template: `%s – ${personalInfo.name}`,
        },
        description,
        keywords,
        authors: [{ name: personalInfo.name, url: personalInfo.website }],
        creator: personalInfo.name,
        publisher: personalInfo.name,
        alternates: {
            canonical: "/",
        },
        openGraph: {
            type: "website",
            url: base.toString(),
            title,
            siteName: personalInfo.name,
            description,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: `${personalInfo.name} – ${personalInfo.title}`,
                },
            ],
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            ...(personalInfo.socialLinks.find((s) => s.platform.toLowerCase() === "twitter" || s.platform.toLowerCase() === "x")?.handle
                ? { creator: personalInfo.socialLinks.find((s) => s.platform.toLowerCase() === "twitter" || s.platform.toLowerCase() === "x")!.handle }
                : {}),
        },
        robots: {
            index: isProdIndexable,
            follow: true,
            googleBot: {
                index: isProdIndexable,
                follow: true,
                "max-snippet": -1,
                "max-image-preview": "large",
                "max-video-preview": -1,
            },
        },
        ...(Object.keys(verification).length ? { verification } : {}),
        category: "Technology",
        icons: {
            icon: "/placeholder-logo.png",
        },
    }

    return metadata
}

export function getWebsiteJsonLd() {
    const baseUrl = getSiteUrl()
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: `${personalInfo.name} – ${personalInfo.title}`,
        url: baseUrl,
        description: personalInfo.bio.medium || personalInfo.bio.short,
        inLanguage: "en",
        publisher: {
            "@type": "Person",
            name: personalInfo.name,
            url: personalInfo.website,
        },
        sameAs: personalInfo.socialLinks.map((s) => s.url),
    }
}

export function getPersonJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: personalInfo.name,
        url: personalInfo.website || getSiteUrl(),
        image: personalInfo.avatar,
        jobTitle: personalInfo.title,
        email: `mailto:${personalInfo.email}`,
        description: personalInfo.bio.short,
        address: {
            "@type": "PostalAddress",
            addressLocality: personalInfo.location,
            addressCountry: "IN",
        },
        sameAs: personalInfo.socialLinks.map((s) => s.url),
    }
}

export function getProjectsJsonLd() {
    const baseUrl = getSiteUrl()
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: projects.map((p, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: p.links.live || p.links.github || baseUrl,
            item: {
                "@type": "CreativeWork",
                name: p.title,
                description: p.description?.elevator || p.description?.summary,
                url: p.links.live || p.links.github || baseUrl,
                dateCreated: p.timeline.start,
                dateModified: p.timeline.end || p.timeline.start,
                image: p.media.hero ? new URL(p.media.hero, baseUrl).toString() : undefined,
            },
        })),
    }
}

// Expanded: theme-specific structured data
export function getThemeJsonLd(theme: string) {
    const baseUrl = getSiteUrl()
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${personalInfo.name} – ${theme} theme`,
        url: `${baseUrl}/themes/${theme}`,
        description: personalInfo.bio.short,
        inLanguage: "en",
        about: {
            "@type": "Person",
            name: personalInfo.name,
            jobTitle: personalInfo.title,
        },
    }
}

export function getThemeBreadcrumbJsonLd(theme: string) {
    const baseUrl = getSiteUrl()
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: baseUrl,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: `Theme: ${theme}`,
                item: `${baseUrl}/themes/${theme}`,
            },
        ],
    }
}

export function buildRobots(): MetadataRoute.Robots {
    const base = getSiteUrl()
    const allowIndex = Boolean(process.env.NEXT_PUBLIC_INDEXING !== "false")
    return {
        rules: {
            userAgent: "*",
            allow: allowIndex ? "/" : "/",
            disallow: allowIndex ? [] : ["/"],
        },
        sitemap: `${base}/sitemap.xml`,
        host: base,
    }
}

export function buildSitemap(): MetadataRoute.Sitemap {
    const base = getSiteUrl()
    const now = new Date().toISOString()
    return [
        {
            url: `${base}/`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1,
        },
        ...["retro", "code", "glass", "terminal"].map((t) => ({
            url: `${base}/themes/${t}`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        })),
    ]
}

// Keyword builder using portfolio content and common best-practice terms
export function getKeywords(): string[] {
    const baseKeywords = [
        personalInfo.name,
        personalInfo.title,
        "Full-Stack Developer Portfolio",
        "Software Engineer Portfolio",
        "React Developer",
        "Next.js Developer",
        "TypeScript Developer",
        "Node.js Developer",
        "Frontend Developer",
        "Backend Developer",
        "JavaScript Developer",
        "Web Developer",
        "UI Engineer",
        "Portfolio Website",
        "Open Source",
        "SEO Optimized",
        "Performance",
        "Accessibility",
        personalInfo.location,
        "India Developer",
        'Nakul',
        'Nakul Jhunjhunwala',
        'Nakul Jhunjhunwala Portfolio',
        'Nakul Jhunjhunwala Projects',
        'Nakul Jhunjhunwala Skills',
        'Nakul Jhunjhunwala Experience',
        'Nakul Jhunjhunwala Education',
        'Nakul Jhunjhunwala Resume',
        'Nakul Jhunjhunwala LinkedIn',
        'Nakul Jhunjhunwala GitHub',
        'Nakul Jhunjhunwala Twitter',
    ]

    const skillKeywords = technicalSkills
        .map((s) => [s.name, s.category, s.description])
        .flat()
        .filter(Boolean)

    const projectKeywords = projects
        .map((p) => [p.title, p.category, ...p.techStack, ...(p.features?.map((f) => f.title) || [])])
        .flat()
        .filter(Boolean)

    // Normalize and dedupe
    const normalize = (s: string) => s.toString().toLowerCase().trim()
    const unique = new Set<string>()
        ;[...baseKeywords, ...skillKeywords, ...projectKeywords].forEach((k) => {
            const nk = normalize(String(k))
            if (nk && nk.length <= 50) unique.add(nk)
        })

    // Return capitalized keywords limited to ~50 items
    const cap = (s: string) => s.length ? s[0].toUpperCase() + s.slice(1) : s
    return Array.from(unique).slice(0, 50).map(cap)
}


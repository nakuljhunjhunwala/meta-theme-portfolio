import type { Metadata } from "next"
import type { MetadataRoute } from "next"
import { personalInfo, projects, technicalSkills } from "@/constants/portfolio"

export function getSiteUrl(): string {
    try {
        const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
        if (envUrl && envUrl !== 'undefined') return envUrl.replace(/\/$/, "")
        if (personalInfo?.website) return personalInfo.website.replace(/\/$/, "")
        return "https://nakuljhunjhunwala.in"
    } catch (error) {
        console.warn("Error getting site URL, using fallback:", error)
        return "https://nakuljhunjhunwala.in"
    }
}

export function getMetadataBase(): URL {
    return new URL(getSiteUrl())
}

export function buildSiteMetadata(): Metadata {
    const title = `${personalInfo.name} – ${personalInfo.title} | Interactive Portfolio`
    const description = `${personalInfo.bio.medium} | Interactive portfolio with 4 unique themes: Retro Gaming, VS Code, Glass Morphism & Terminal. Explore projects, skills, and contact information.`

    const keywords = getKeywords()

    const image = "/profile_photo.jpg"

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
        potentialAction: [
            {
                "@type": "SearchAction",
                target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${baseUrl}/themes/{search_term_string}`
                },
                "query-input": "required name=search_term_string"
            }
        ],
        mainEntity: {
            "@type": "ItemList",
            name: "Portfolio Themes",
            description: "Interactive portfolio themes showcasing different experiences",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Retro Gaming Theme",
                    description: "8-bit arcade experience with achievements and mini-games",
                    url: `${baseUrl}/themes/retro`
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "VS Code Theme",
                    description: "Professional IDE interface with syntax highlighting",
                    url: `${baseUrl}/themes/code`
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: "Glass Morphism Theme",
                    description: "Modern frosted glass design with smooth animations",
                    url: `${baseUrl}/themes/glass`
                },
                {
                    "@type": "ListItem",
                    position: 4,
                    name: "Terminal Theme",
                    description: "Command-line interface for the tech-savvy",
                    url: `${baseUrl}/themes/terminal`
                }
            ]
        }
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
        worksFor: {
            "@type": "Organization",
            name: "UnicoConnect",
            description: "Educational Technology Company"
        },
        hasOccupation: {
            "@type": "Occupation",
            name: "Full-Stack Developer",
            description: "Building scalable web applications and user-centric solutions"
        },
        knowsAbout: technicalSkills.map(skill => skill.name),
        alumniOf: personalInfo.education.map(edu => ({
            "@type": "EducationalOrganization",
            name: edu.institution,
            address: {
                "@type": "PostalAddress",
                addressLocality: edu.location,
                addressCountry: "IN"
            }
        }))
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

// Professional Service Schema for better business listings
export function getProfessionalServiceJsonLd() {
    const baseUrl = getSiteUrl()
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: `${personalInfo.name} - Full-Stack Development Services`,
        url: baseUrl,
        description: "Professional full-stack web development services specializing in React, Node.js, and modern web technologies",
        provider: {
            "@type": "Person",
            name: personalInfo.name,
            jobTitle: personalInfo.title,
            url: personalInfo.website,
            sameAs: personalInfo.socialLinks.map((s) => s.url),
        },
        areaServed: {
            "@type": "Country",
            name: "India"
        },
        serviceType: [
            "Full-Stack Web Development",
            "React Development",
            "Node.js Development",
            "Frontend Development",
            "Backend Development",
            "TypeScript Development",
            "UI/UX Implementation",
            "API Development",
            "Database Design",
            "Cloud Architecture"
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Development Services",
            itemListElement: projects.map(p => ({
                "@type": "Offer",
                name: p.title,
                description: p.description.elevator,
                category: p.category
            }))
        }
    }
}

// Site Navigation Schema for better sitelinks
export function getSiteNavigationJsonLd() {
    const baseUrl = getSiteUrl()
    return {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        name: "Portfolio Navigation",
        url: baseUrl,
        hasPart: [
            {
                "@type": "SiteNavigationElement",
                name: "Portfolio Themes",
                description: "Interactive portfolio experiences",
                url: `${baseUrl}/#themes`,
                hasPart: [
                    {
                        "@type": "WebPage",
                        name: "Retro Gaming Portfolio",
                        description: "8-bit arcade experience with achievements and mini-games",
                        url: `${baseUrl}/themes/retro`
                    },
                    {
                        "@type": "WebPage",
                        name: "VS Code Portfolio",
                        description: "Professional IDE interface with syntax highlighting",
                        url: `${baseUrl}/themes/code`
                    },
                    {
                        "@type": "WebPage",
                        name: "Glass Morphism Portfolio",
                        description: "Modern frosted glass design with smooth animations",
                        url: `${baseUrl}/themes/glass`
                    },
                    {
                        "@type": "WebPage",
                        name: "Terminal Portfolio",
                        description: "Command-line interface for the tech-savvy",
                        url: `${baseUrl}/themes/terminal`
                    }
                ]
            }
        ]
    }
}

// Expanded: theme-specific structured data
export function getThemeJsonLd(theme: string) {
    const baseUrl = getSiteUrl()
    const themeDescriptions: Record<string, string> = {
        retro: "Interactive retro gaming portfolio featuring classic arcade games, achievements system, and 8-bit aesthetics showcasing full-stack development skills",
        code: "VS Code inspired portfolio theme with syntax highlighting, file explorer, and IDE interface demonstrating professional development environment",
        glass: "Modern glass morphism portfolio with frosted glass effects, smooth animations, and contemporary design showcasing frontend expertise",
        terminal: "Command-line interface portfolio with interactive terminal commands, showcasing system administration and backend development skills"
    }

    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${personalInfo.name} – ${theme.charAt(0).toUpperCase() + theme.slice(1)} Portfolio Theme`,
        url: `${baseUrl}/themes/${theme}`,
        description: themeDescriptions[theme] || personalInfo.bio.short,
        inLanguage: "en",
        about: {
            "@type": "Person",
            name: personalInfo.name,
            jobTitle: personalInfo.title,
        },
        isPartOf: {
            "@type": "WebSite",
            name: `${personalInfo.name} Portfolio`,
            url: baseUrl
        },
        mainContentOfPage: {
            "@type": "WebPageElement",
            name: `${theme} Theme Experience`,
            description: themeDescriptions[theme]
        }
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
    try {
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
    } catch (error) {
        console.warn("Error generating robots.txt, using fallback:", error)
        return {
            rules: {
                userAgent: "*",
                allow: "/",
            },
            sitemap: "https://nakuljhunjhunwala.in/sitemap.xml",
            host: "https://nakuljhunjhunwala.in",
        }
    }
}

export function buildSitemap(): MetadataRoute.Sitemap {
    try {
        const base = getSiteUrl()
        const now = new Date().toISOString()

        // Build sitemap with error handling for static generation
        const sitemap: MetadataRoute.Sitemap = [
            {
                url: `${base}`,
                lastModified: now,
                changeFrequency: "weekly",
                priority: 1,
            },
            // Theme pages
            {
                url: `${base}/themes/retro`,
                lastModified: now,
                changeFrequency: "weekly",
                priority: 0.8,
            },
            {
                url: `${base}/themes/code`,
                lastModified: now,
                changeFrequency: "weekly",
                priority: 0.8,
            },
            {
                url: `${base}/themes/glass`,
                lastModified: now,
                changeFrequency: "weekly",
                priority: 0.8,
            },
            {
                url: `${base}/themes/terminal`,
                lastModified: now,
                changeFrequency: "weekly",
                priority: 0.8,
            },
        ]

        return sitemap
    } catch (error) {
        console.warn("Error generating sitemap, using fallback:", error)
        // Fallback sitemap for build-time errors
        return [
            {
                url: "https://nakuljhunjhunwala.in",
                lastModified: new Date().toISOString(),
                changeFrequency: "weekly",
                priority: 1,
            },
        ]
    }
}

// FAQ Schema for rich snippets
export function getFAQJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "What kind of full-stack development services does Nakul Jhunjhunwala offer?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nakul specializes in full-stack web development using React, Node.js, TypeScript, and modern cloud technologies. Services include frontend development, backend API development, database design, UI/UX implementation, and cloud architecture."
                }
            },
            {
                "@type": "Question",
                name: "How many years of experience does Nakul have in web development?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nakul has 4.5+ years of professional experience in full-stack development, working with companies ranging from legal tech to educational technology platforms."
                }
            },
            {
                "@type": "Question",
                name: "What technologies does Nakul specialize in?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Primary technologies include React.js, Vue.js, Node.js, TypeScript, JavaScript, MongoDB, Redis, AWS, Google Cloud Platform, and modern frontend frameworks. Experienced in both frontend and backend development."
                }
            },
            {
                "@type": "Question",
                name: "Can I view different portfolio themes?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! The portfolio features 4 interactive themes: Retro Gaming (8-bit arcade experience), VS Code (professional IDE interface), Glass Morphism (modern design), and Terminal (command-line interface). Each showcases the same projects in different experiences."
                }
            },
            {
                "@type": "Question",
                name: "How can I contact Nakul for projects or opportunities?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can contact Nakul via email at jhunjhunwalanakul@gmail.com, WhatsApp at +91 8856020006, or through LinkedIn. He typically responds within a few hours and is currently available for new projects."
                }
            }
        ]
    }
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


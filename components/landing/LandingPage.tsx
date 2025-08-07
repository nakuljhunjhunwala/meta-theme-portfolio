"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { personalInfo, getFeaturedProjects } from "@/constants/portfolio"
import { usePortfolioStore } from "@/stores/portfolioStore"
import ThemeSwitcher from "../portfolio/ThemeSwitcher"
import AnimatedShapes from "./AnimatedShapes"

interface LandingPageProps {
    onThemeSelect: (theme: string) => void
    onBackToLanding: () => void
}

const themes = [
    {
        id: "retro",
        name: "Retro Gaming",
        description: "8-bit arcade experience with achievements and mini-games",
        icon: "🎮",
        color: "from-green-400 to-green-600",
        bestFor: "Fun seekers, gamers, creative roles",
    },
    {
        id: "code",
        name: "VS Code",
        description: "Professional IDE interface with syntax highlighting",
        icon: "💻",
        color: "from-blue-400 to-blue-600",
        bestFor: "Developers, technical recruiters",
    },
    {
        id: "glass",
        name: "Glass Morphism",
        description: "Modern frosted glass design with smooth animations",
        icon: "✨",
        color: "from-purple-400 to-pink-600",
        bestFor: "Designers, clients, HR professionals",
    },
    {
        id: "terminal",
        name: "Terminal",
        description: "Command-line interface for the tech-savvy",
        icon: "⚡",
        color: "from-gray-400 to-gray-600",
        bestFor: "DevOps, system admins, CLI enthusiasts",
    },
]

const LandingPage = ({ onThemeSelect, onBackToLanding }: LandingPageProps) => {
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
    const { setTheme, visitCount, visitData } = usePortfolioStore()
    const featuredProjects = getFeaturedProjects()

    const handleThemeSelect = (themeId: string) => {
        setSelectedTheme(themeId)
        setTheme(themeId as any)
        onThemeSelect(themeId)
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white relative overflow-hidden">
            <AnimatedShapes />

            {/* Theme Switcher Integration */}
            <ThemeSwitcher onBackToLanding={onBackToLanding} />

            {/* Main Content */}
            <main className="relative z-10">
                {/* Hero Section */}
                <section className="home container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
                    <motion.div 
                        className="intro text-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.img
                            src={personalInfo.avatar}
                            alt={personalInfo.name}
                            className="home__img mx-auto mb-6 rounded-full w-32 h-32 object-cover border-4 border-purple-500"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                        />
                        
                        <motion.h1 
                            className="home__name text-5xl md:text-6xl font-bold mb-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {personalInfo.name}
                        </motion.h1>
                        
                        <motion.span 
                            className="home__education text-xl md:text-2xl text-gray-400 mb-4 block"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            {personalInfo.title}
                        </motion.span>

                        {visitCount > 1 && (
                            <motion.p
                                className="text-purple-300 text-sm md:text-base mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                Welcome back! Visit #{visitCount} 
                                {visitData.themesExplored.length > 0 && (
                                    <span className="text-gray-400 ml-2">
                                        • {visitData.themesExplored.length} themes explored
                                    </span>
                                )}
                            </motion.p>
                        )}

                        <motion.div 
                            className="home__socials flex justify-center gap-6 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            {personalInfo.socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-purple-400 transition-colors duration-300 p-2"
                                    title={social.platform}
                                >
                                    {social.platform === "GitHub" && <Github size={24} />}
                                    {social.platform === "LinkedIn" && <Linkedin size={24} />}
                                    {social.platform === "DigiCard" && <ExternalLink size={24} />}
                                </a>
                            ))}
                        </motion.div>

                        <motion.a
                            href={`mailto:${personalInfo.email}`}
                            className="btn inline-flex items-center gap-2 bg-purple-600 text-white py-3 px-8 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                        >
                            <Mail size={20} />
                            Contact Me
                        </motion.a>

                        <motion.div 
                            className="scroll__down"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            <a href="#themes" className="mouse__wrapper flex flex-col items-center text-gray-400 hover:text-white transition-colors">
                                <span className="home__scroll-name text-sm mb-2">Scroll Down</span>
                                <span className="mouse border border-gray-400 rounded-full w-6 h-10 relative flex items-start justify-center pt-2">
                                    <span className="wheel w-1 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                </span>
                            </a>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Theme Selection Section */}
                <section id="themes" className="container mx-auto px-4 py-20">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Experience</h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Each theme tells the same story in a completely different way. Pick one that resonates with you!
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {themes.map((theme, index) => (
                            <motion.button
                                key={theme.id}
                                onClick={() => handleThemeSelect(theme.id)}
                                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="text-center">
                                    <div className="text-5xl mb-4">{theme.icon}</div>
                                    <h3 className="text-xl font-bold mb-3 text-white">{theme.name}</h3>
                                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{theme.description}</p>
                                    <div className="text-xs text-purple-300 bg-purple-900/30 rounded-full px-3 py-1">
                                        {theme.bestFor}
                                    </div>
                                </div>

                                <div
                                    className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl ${theme.color}`}
                                />
                            </motion.button>
                        ))}
                    </div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <button
                            onClick={() => {
                                const randomTheme = themes[Math.floor(Math.random() * themes.length)]
                                handleThemeSelect(randomTheme.id)
                            }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-lg"
                        >
                            <Sparkles className="w-6 h-6" />
                            <span>Surprise Me!</span>
                        </button>
                    </motion.div>
                </section>
            </main>
        </div>
    )
}

export default LandingPage

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { Palette, Home, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"

const themes = [
    { id: "retro", name: "Retro Gaming", icon: "🎮", color: "from-green-400 to-green-600" },
    { id: "code", name: "VS Code", icon: "💻", color: "from-blue-400 to-blue-600" },
    { id: "glass", name: "Glass Morphism", icon: "✨", color: "from-purple-400 to-pink-600" },
    { id: "terminal", name: "Terminal", icon: "⚡", color: "from-gray-400 to-gray-600" },
]

export default function ThemeSwitcher() {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const [showGuide, setShowGuide] = useState(false)
    const { currentTheme, setTheme, resetToLanding } = usePortfolioStore()
    const router = useRouter()
    const isMobile = useMobile()

    useEffect(() => {
        setIsClient(true)
        const guideSeen = sessionStorage.getItem("themeSwitcherGuideSeen")
        if (!guideSeen) {
            setShowGuide(true)
        }
    }, [])

    const handleThemeChange = (themeId: string) => {
        setTheme(themeId as any)
        router.push(`/themes/${themeId}`)
        if (isMobile) {
            // The sheet will close automatically via SheetClose
        } else {
            setIsExpanded(false)
        }
    }

    const handleBackToLanding = () => {
        resetToLanding()
        router.push(`/`)
    }

    const dismissGuide = () => {
        setShowGuide(false)
        sessionStorage.setItem("themeSwitcherGuideSeen", "true")
    }

    const renderThemeButton = (theme: (typeof themes)[0], inSheet: boolean = false) => {
        const buttonContent = (
            <div
                className={`w-full flex items-center space-x-4 p-3 rounded-xl border-2 transition-all ${
                    currentTheme === theme.id
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
            >
                <div
                    className={`w-10 h-10 bg-gradient-to-r ${theme.color} rounded-lg flex items-center justify-center text-xl`}
                >
                    {theme.icon}
                </div>
                <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">{theme.name}</div>
                    {currentTheme === theme.id && !inSheet && (
                        <div className="text-xs text-purple-600 dark:text-purple-400">Active</div>
                    )}
                </div>
            </div>
        )

        if (inSheet) {
            return (
                <SheetClose asChild key={theme.id}>
                    <button onClick={() => handleThemeChange(theme.id)} className="w-full">
                        {buttonContent}
                    </button>
                </SheetClose>
            )
        }

        return (
            <button key={theme.id} onClick={() => handleThemeChange(theme.id)} className="w-full">
                {buttonContent}
            </button>
        )
    }

    if (!isClient) {
        return null
    }

    const FirstTimeGuide = () => (
        <AnimatePresence>
            {showGuide && (
                <motion.div
                    className="fixed inset-0 z-[99] flex items-end justify-end p-4 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Non-interactive scrim so page remains clickable behind */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-none" />

                    {/* Interactive guide card */}
                    <div
                        className={`relative text-center pointer-events-auto ${
                            isMobile
                                ? "bottom-24 right-0 w-full max-w-xs mx-auto"
                                : "bottom-24 right-4 max-w-xs"
                        }`}
                    >
                        <div className="bg-gray-800 p-4 rounded-lg shadow-2xl">
                            <h3 className="text-lg font-bold text-white mb-2">Change Your View</h3>
                            <p className="text-white/80 mb-4">
                                Use this button to explore different portfolio themes.
                            </p>
                            <button
                                onClick={dismissGuide}
                                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full w-full"
                            >
                                Got it!
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )

    if (isMobile) {
        return (
            <>
                <FirstTimeGuide />
                <Sheet>
                    <SheetTrigger asChild>
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="fixed bottom-20 sm:bottom-6 right-6 z-[100] w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center text-white"
                            aria-label="Switch Theme"
                        >
                            <Palette className="w-6 h-6" />
                        </motion.button>
                    </SheetTrigger>
                    <SheetContent
                        side="bottom"
                        className="rounded-t-2xl z-[2000] border-none bg-white dark:bg-gray-900 p-6"
                    >
                        <SheetHeader className="mb-4">
                            <SheetTitle className="text-center text-gray-900 dark:text-white">Switch Theme</SheetTitle>
                        </SheetHeader>
                        <div className="space-y-3">
                            {themes.map((theme) => renderThemeButton(theme, true))}
                        </div>
                        <SheetClose asChild>
                            <button
                                onClick={handleBackToLanding}
                                className="w-full mt-6 flex items-center justify-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-900 dark:text-white"
                            >
                                <Home className="w-4 h-4" />
                                <span>Back to Landing Page</span>
                            </button>
                        </SheetClose>
                    </SheetContent>
                </Sheet>
            </>
        )
    }

    return (
        <>
            <FirstTimeGuide />
            <div className="fixed bottom-20 sm:bottom-6 right-6 z-[100]">
                <motion.div
                    className="absolute inset-0 rounded-full bg-purple-500/30"
                    animate={
                        !isExpanded
                            ? {
                                  scale: [1, 1.6, 1],
                                  opacity: [0.7, 0, 0.7],
                              }
                            : { scale: 1, opacity: 0 }
                    }
                    transition={{
                        duration: 2.5,
                        repeat: !isExpanded ? Infinity : 0,
                        ease: "easeInOut",
                    }}
                />
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-20 right-0 w-72 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Switch Theme</h3>
                                <button
                                    onClick={handleBackToLanding}
                                    className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                    title="Back to Landing Page"
                                >
                                    <Home className="w-4 h-4" />
                                    <span>Home</span>
                                </button>
                            </div>
                            <div className="space-y-2">{themes.map((theme) => renderThemeButton(theme, false))}</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center text-white relative"
                    aria-label="Switch Theme"
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                        {isExpanded ? <X className="w-7 h-7" /> : <Palette className="w-7 h-7" />}
                    </motion.div>
                </motion.button>
            </div>
        </>
    )
}

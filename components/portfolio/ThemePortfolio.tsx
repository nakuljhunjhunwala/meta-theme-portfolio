"use client"

import { usePortfolioStore } from "@/stores/portfolioStore"
import RetroPortfolio from "./themes/RetroPortfolio"
import CodePortfolio from "./themes/CodePortfolio"
import GlassPortfolio from "./themes/GlassPortfolio"
import TerminalPortfolio from "./themes/TerminalPortfolio"
import NeumorphismPortfolio from "./themes/NeumorphismPortfolio"
import ThemeSwitcher from "./ThemeSwitcher"
import JourneyManager from "@/components/storytelling/JourneyManager"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface ThemePortfolioProps {
  onBackToLanding: () => void
}

export default function ThemePortfolio({ onBackToLanding }: ThemePortfolioProps) {
  const { currentTheme } = usePortfolioStore()
  const router = useRouter()

  const CodeThemeWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative min-h-screen overflow-hidden bg-[#282c34]">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundSize: "2.5rem 2.5rem",
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.02) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.02) 75%, rgba(255, 255, 255, 0.02) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.02) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.02) 75%, rgba(255, 255, 255, 0.02) 76%, transparent 77%, transparent)",
        }}
        animate={{
          backgroundPosition: ["0 0", "2.5rem 2.5rem"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )

  const renderTheme = () => {
    switch (currentTheme) {
      case "retro":
        return <RetroPortfolio />
      case "code":
        return (
          <CodeThemeWrapper>
            <CodePortfolio />
          </CodeThemeWrapper>
        )
      case "glass":
        return <GlassPortfolio />
      case "terminal":
        return <TerminalPortfolio />
      case "neuro":
        return <NeumorphismPortfolio />
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Theme Not Found</h2>
              <p className="text-gray-400 mb-6">The selected theme could not be loaded.</p>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Back to Landing
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="relative">
      {renderTheme()}
      <ThemeSwitcher />
      <JourneyManager />
    </div>
  )
}

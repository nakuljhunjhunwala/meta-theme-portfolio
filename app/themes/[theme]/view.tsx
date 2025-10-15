"use client"

import { useEffect } from "react"
import { usePortfolioStore } from "@/stores/portfolioStore"
import ThemePortfolio from "@/components/portfolio/ThemePortfolio"
import EnsureInitialized from "@/components/common/EnsureInitialized"

export function ThemeView({ theme }: { theme: "retro" | "code" | "glass" | "terminal" | "neuro" }) {
  const setTheme = usePortfolioStore((s) => s.setTheme)

  useEffect(() => {
    setTheme(theme)
  }, [setTheme, theme])

  return (
    <EnsureInitialized>
      <ThemePortfolio onBackToLanding={() => {}} />
    </EnsureInitialized>
  )
}



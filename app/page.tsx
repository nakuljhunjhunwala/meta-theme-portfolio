"use client"

import { useState, useEffect } from "react"
import { usePortfolioStore } from "@/stores/portfolioStore"
import LandingPage from "@/components/landing/LandingPage"
import ThemePortfolio from "@/components/portfolio/ThemePortfolio"

import LoadingScreen from "@/components/common/LoadingScreen"
import ErrorBoundary from "@/components/common/ErrorBoundary"

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)
  const { currentTheme, isInitialized, initializePortfolio } = usePortfolioStore()

  useEffect(() => {
    setIsClient(true)
    initializePortfolio()
  }, []) // Remove initializePortfolio from dependency array to prevent re-runs

  const handleThemeSelect = (theme: string) => {
    // Theme is already set in the store by LandingPage
  }

  const handleBackToLanding = () => {
    const { resetToLanding } = usePortfolioStore.getState()
    resetToLanding()
  }

  if (!isClient || !isInitialized) {
    return <LoadingScreen />
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {currentTheme === "landing" ? (
          <LandingPage onThemeSelect={handleThemeSelect} onBackToLanding={handleBackToLanding} />
        ) : (
          <ThemePortfolio onBackToLanding={handleBackToLanding} />
        )}
      </div>
    </ErrorBoundary>
  )
}

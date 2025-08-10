"use client"

import { useEffect, useState } from "react"
import { usePortfolioStore } from "@/stores/portfolioStore"
import LoadingScreen from "@/components/common/LoadingScreen"

export default function EnsureInitialized({ children }: { children: React.ReactNode }) {
  const isInitialized = usePortfolioStore((s) => s.isInitialized)
  const initializePortfolio = usePortfolioStore((s) => s.initializePortfolio)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isInitialized) initializePortfolio()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted || !isInitialized) return <LoadingScreen />
  return <>{children}</>
}



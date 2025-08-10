"use client"

import { useEffect } from "react"
import { usePortfolioStore } from "@/stores/portfolioStore"

export default function InitClient() {
  const initializePortfolio = usePortfolioStore((s) => s.initializePortfolio)

  useEffect(() => {
    initializePortfolio()
  }, [initializePortfolio])

  return null
}



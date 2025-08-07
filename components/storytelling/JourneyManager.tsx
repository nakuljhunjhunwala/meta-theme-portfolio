"use client"
import { usePortfolioStore } from "@/stores/portfolioStore"
import QuickJourney from "./journeys/QuickJourney"
import StandardJourney from "./journeys/StandardJourney"
import FullJourney from "./journeys/FullJourney"
import SurpriseJourney from "./journeys/SurpriseJourney"

interface JourneyManagerProps {
  onComplete: () => void
}

export default function JourneyManager({ onComplete }: JourneyManagerProps) {
  const { selectedJourney } = usePortfolioStore()

  if (!selectedJourney) {
    return null
  }

  switch (selectedJourney) {
    case "quick":
      return <QuickJourney onComplete={onComplete} />
    case "guided":
      return <StandardJourney onComplete={onComplete} />
    case "explore":
      return <FullJourney onComplete={onComplete} />
    default:
      return <SurpriseJourney onComplete={onComplete} />
  }
}

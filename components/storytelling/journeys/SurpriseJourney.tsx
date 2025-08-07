"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { Shuffle, Gift, Sparkles } from "lucide-react"

interface SurpriseJourneyProps {
  onComplete: () => void
}

const surpriseElements = [
  {
    type: "fact",
    content: "Did you know? This portfolio has 4 completely different themes!",
    icon: "🎨",
  },
  {
    type: "easter-egg",
    content: "Easter Egg: Try typing 'matrix' in the terminal theme!",
    icon: "🥚",
  },
  {
    type: "achievement",
    content: "Achievement Unlocked: Surprise Explorer!",
    icon: "🏆",
  },
  {
    type: "secret",
    content: "Secret: The retro theme has hidden mini-games!",
    icon: "🎮",
  },
  {
    type: "tip",
    content: "Pro Tip: Each theme tells the same story differently!",
    icon: "💡",
  },
]

export default function SurpriseJourney({ onComplete }: SurpriseJourneyProps) {
  const [currentSurprise, setCurrentSurprise] = useState(0)
  const [revealedSurprises, setRevealedSurprises] = useState<number[]>([])
  const { unlockAchievement } = usePortfolioStore()

  useEffect(() => {
    unlockAchievement("surprise-journey-started")
  }, [unlockAchievement])

  const revealNext = () => {
    if (currentSurprise < surpriseElements.length - 1) {
      setRevealedSurprises((prev) => [...prev, currentSurprise])
      setCurrentSurprise(currentSurprise + 1)
    } else {
      setRevealedSurprises((prev) => [...prev, currentSurprise])
      unlockAchievement("surprise-journey-completed")
      setTimeout(onComplete, 2000)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-2xl w-full p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Gift className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-3xl font-bold text-white mb-2">Surprise Journey</h3>
          <p className="text-gray-300">Discover hidden secrets and easter eggs!</p>
        </div>

        {/* Current Surprise */}
        <motion.div
          key={currentSurprise}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">{surpriseElements[currentSurprise].icon}</div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-xl text-white leading-relaxed">{surpriseElements[currentSurprise].content}</p>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Surprises Revealed</span>
            <span className="text-sm text-gray-300">
              {revealedSurprises.length + 1} of {surpriseElements.length}
            </span>
          </div>
          <div className="flex space-x-2">
            {surpriseElements.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  index <= currentSurprise ? "bg-purple-400" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Revealed Surprises */}
        {revealedSurprises.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Discovered Secrets
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {revealedSurprises.map((index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                  <span className="text-lg">{surpriseElements[index].icon}</span>
                  <span className="text-sm text-gray-300 flex-1">{surpriseElements[index].content}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={revealNext}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-semibold transition-all transform hover:scale-105 mx-auto"
          >
            <Shuffle className="w-5 h-5" />
            <span>{currentSurprise === surpriseElements.length - 1 ? "Complete Journey" : "Next Surprise"}</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

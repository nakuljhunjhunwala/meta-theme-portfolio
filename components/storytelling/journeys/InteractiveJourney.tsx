"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { Gamepad2, Star, Trophy, Target } from "lucide-react"

interface InteractiveJourneyProps {
  onComplete: () => void
}

export default function InteractiveJourney({ onComplete }: InteractiveJourneyProps) {
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [achievements, setAchievements] = useState<string[]>([])
  const { unlockAchievement } = usePortfolioStore()

  const addScore = (points: number) => {
    setScore((prev) => prev + points)
    if (score + points >= level * 100) {
      setLevel((prev) => prev + 1)
    }
  }

  const unlockInteractiveAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      setAchievements((prev) => [...prev, achievement])
      unlockAchievement(achievement)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-4xl w-full p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Gamepad2 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-2">Interactive Journey</h3>
          <p className="text-gray-300">Gamified portfolio exploration</p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{score}</div>
            <div className="text-gray-400 text-sm">Score</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{level}</div>
            <div className="text-gray-400 text-sm">Level</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Trophy className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{achievements.length}</div>
            <div className="text-gray-400 text-sm">Achievements</div>
          </div>
        </div>

        {/* Interactive Content */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center mb-8">
          <h4 className="text-2xl font-bold text-white mb-4">Interactive Experience</h4>
          <p className="text-gray-300 mb-6">
            This would be a fully interactive journey with games, quizzes, and engaging activities that let you explore
            the portfolio in a fun and memorable way.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => {
                addScore(50)
                unlockInteractiveAchievement("explorer")
              }}
              className="p-4 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 rounded-lg transition-all"
            >
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-white font-semibold">Skill Challenge</div>
              <div className="text-gray-300 text-sm">Test your knowledge</div>
            </button>

            <button
              onClick={() => {
                addScore(75)
                unlockInteractiveAchievement("project-master")
              }}
              className="p-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50 rounded-lg transition-all"
            >
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-white font-semibold">Project Deep Dive</div>
              <div className="text-gray-300 text-sm">Explore case studies</div>
            </button>
          </div>

          <button
            onClick={() => {
              addScore(100)
              unlockInteractiveAchievement("interactive-master")
              onComplete()
            }}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-semibold transition-all"
          >
            Complete Interactive Journey
          </button>
        </div>
      </motion.div>
    </div>
  )
}

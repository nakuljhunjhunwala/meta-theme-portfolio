"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { Clock, CheckCircle, ArrowRight } from "lucide-react"

interface QuickJourneyProps {
  onComplete: () => void
}

const journeySteps = [
  {
    id: "welcome",
    title: "Welcome!",
    description: "Quick 5-minute tour of key highlights",
    duration: 1000,
  },
  {
    id: "about",
    title: "About Me",
    description: "Professional background and expertise",
    duration: 2000,
  },
  {
    id: "skills",
    title: "Technical Skills",
    description: "Core technologies and proficiencies",
    duration: 1500,
  },
  {
    id: "projects",
    title: "Featured Projects",
    description: "Showcase of recent work",
    duration: 2000,
  },
  {
    id: "contact",
    title: "Get In Touch",
    description: "Let's connect and collaborate",
    duration: 1000,
  },
]

export default function QuickJourney({ onComplete }: QuickJourneyProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const { unlockAchievement } = usePortfolioStore()

  useEffect(() => {
    unlockAchievement("quick-journey-started")
  }, [unlockAchievement])

  useEffect(() => {
    if (currentStep < journeySteps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, currentStep])
        if (currentStep === journeySteps.length - 1) {
          unlockAchievement("quick-journey-completed")
          setTimeout(onComplete, 1000)
        } else {
          setCurrentStep(currentStep + 1)
        }
      }, journeySteps[currentStep].duration)

      return () => clearTimeout(timer)
    }
  }, [currentStep, onComplete, unlockAchievement])

  const totalDuration = journeySteps.reduce((sum, step) => sum + step.duration, 0)
  const elapsedDuration = journeySteps.slice(0, currentStep + 1).reduce((sum, step) => sum + step.duration, 0)
  const progress = (elapsedDuration / totalDuration) * 100

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-md w-full p-6"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Quick Journey</h3>
          <p className="text-gray-300">Exploring portfolio highlights</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm text-gray-300">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Current Step */}
        {currentStep < journeySteps.length && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h4 className="text-xl font-semibold text-white mb-2">{journeySteps[currentStep].title}</h4>
            <p className="text-gray-300">{journeySteps[currentStep].description}</p>
          </motion.div>
        )}

        {/* Steps List */}
        <div className="space-y-3">
          {journeySteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                index === currentStep
                  ? "bg-purple-500/20 border border-purple-400/50"
                  : completedSteps.includes(index)
                    ? "bg-green-500/20 border border-green-400/50"
                    : "bg-white/5 border border-white/10"
              }`}
            >
              <div className="flex-shrink-0">
                {completedSteps.includes(index) ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : index === currentStep ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-600 rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{step.title}</div>
                <div className="text-gray-400 text-sm">{step.description}</div>
              </div>
              {index === currentStep && <ArrowRight className="w-4 h-4 text-purple-400 animate-pulse" />}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-400 text-sm">Estimated time: ~5 minutes</div>
      </motion.div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { User, ArrowRight, CheckCircle } from "lucide-react"

interface StandardJourneyProps {
  onComplete: () => void
}

const journeySteps = [
  {
    id: "introduction",
    title: "Introduction",
    description: "Get to know me and my background",
    component: "IntroStep",
  },
  {
    id: "skills-overview",
    title: "Skills Overview",
    description: "Technical expertise and capabilities",
    component: "SkillsStep",
  },
  {
    id: "project-showcase",
    title: "Project Showcase",
    description: "Featured work and achievements",
    component: "ProjectsStep",
  },
  {
    id: "experience",
    title: "Professional Experience",
    description: "Career journey and accomplishments",
    component: "ExperienceStep",
  },
  {
    id: "connect",
    title: "Let's Connect",
    description: "Contact information and next steps",
    component: "ContactStep",
  },
]

export default function StandardJourney({ onComplete }: StandardJourneyProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const { unlockAchievement } = usePortfolioStore()

  const handleNext = () => {
    setCompletedSteps((prev) => [...prev, currentStep])

    if (currentStep === journeySteps.length - 1) {
      unlockAchievement("standard-journey-completed")
      onComplete()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / journeySteps.length) * 100

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <User className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-2xl font-bold text-white">Guided Journey</h3>
              <p className="text-gray-300">Step-by-step portfolio exploration</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-300">
              Step {currentStep + 1} of {journeySteps.length}
            </div>
            <div className="text-sm text-gray-300">{Math.round(progress)}% complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {journeySteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                index === currentStep
                  ? "bg-purple-500/20 text-purple-300 border border-purple-400/50"
                  : completedSteps.includes(index)
                    ? "bg-green-500/20 text-green-300 border border-green-400/50"
                    : "bg-white/5 text-gray-400 border border-white/10"
              }`}
            >
              {completedSteps.includes(index) ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <div className="w-4 h-4 border border-current rounded-full" />
              )}
              <span className="hidden sm:inline">{step.title}</span>
            </div>
          ))}
        </div>

        {/* Current Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-white mb-2">{journeySteps[currentStep].title}</h4>
            <p className="text-gray-300">{journeySteps[currentStep].description}</p>
          </div>

          {/* Step Content Placeholder */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">
              {currentStep === 0 && "👋"}
              {currentStep === 1 && "⚡"}
              {currentStep === 2 && "🚀"}
              {currentStep === 3 && "💼"}
              {currentStep === 4 && "🤝"}
            </div>
            <h5 className="text-xl font-semibold text-white mb-4">{journeySteps[currentStep].title}</h5>
            <p className="text-gray-300 mb-6">
              This is where the detailed content for {journeySteps[currentStep].title.toLowerCase()} would be displayed.
              In a full implementation, this would show relevant portfolio information, interactive elements, and
              engaging visuals.
            </p>
            <div className="text-sm text-gray-400">Interactive content coming soon...</div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentStep === 0
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Previous
          </button>

          <div className="text-center text-gray-400 text-sm">Estimated time: ~15 minutes</div>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-semibold transition-all"
          >
            <span>{currentStep === journeySteps.length - 1 ? "Complete" : "Next"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

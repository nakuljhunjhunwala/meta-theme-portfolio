"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { Compass, ArrowRight, CheckCircle, Clock } from "lucide-react"

interface FullJourneyProps {
  onComplete: () => void
}

export default function FullJourney({ onComplete }: FullJourneyProps) {
  const [currentPhase, setCurrentPhase] = useState(0)
  const { unlockAchievement } = usePortfolioStore()

  const phases = [
    {
      id: "discovery",
      title: "Discovery Phase",
      description: "Explore my background and journey",
      duration: "5-10 minutes",
      sections: ["Personal Story", "Educational Background", "Career Beginnings"],
    },
    {
      id: "expertise",
      title: "Technical Expertise",
      description: "Deep dive into skills and technologies",
      duration: "10-15 minutes",
      sections: ["Core Technologies", "Specialized Skills", "Certifications", "Learning Path"],
    },
    {
      id: "portfolio",
      title: "Project Portfolio",
      description: "Comprehensive project showcase",
      duration: "15-20 minutes",
      sections: ["Featured Projects", "Case Studies", "Technical Challenges", "Achievements"],
    },
    {
      id: "experience",
      title: "Professional Journey",
      description: "Career progression and impact",
      duration: "10-15 minutes",
      sections: ["Work Experience", "Leadership Roles", "Team Contributions", "Industry Impact"],
    },
    {
      id: "future",
      title: "Future Vision",
      description: "Goals and collaboration opportunities",
      duration: "5 minutes",
      sections: ["Career Goals", "Collaboration Interests", "Contact & Next Steps"],
    },
  ]

  const handleNext = () => {
    if (currentPhase === phases.length - 1) {
      unlockAchievement("full-journey-completed")
      onComplete()
    } else {
      setCurrentPhase(currentPhase + 1)
    }
  }

  const totalEstimatedTime = "45-65 minutes"

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-5xl w-full p-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Compass className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-2">Complete Journey</h3>
          <p className="text-gray-300 mb-4">Comprehensive portfolio exploration</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Estimated time: {totalEstimatedTime}</span>
          </div>
        </div>

        {/* Phase Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border transition-all ${
                index === currentPhase
                  ? "bg-purple-500/20 border-purple-400/50"
                  : index < currentPhase
                    ? "bg-green-500/20 border-green-400/50"
                    : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                {index < currentPhase ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : index === currentPhase ? (
                  <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {index + 1}
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-600 rounded-full flex items-center justify-center text-gray-400 text-sm">
                    {index + 1}
                  </div>
                )}
                <h4 className="font-semibold text-white">{phase.title}</h4>
              </div>

              <p className="text-gray-300 text-sm mb-3">{phase.description}</p>

              <div className="text-xs text-gray-400 mb-3">Duration: {phase.duration}</div>

              <div className="space-y-1">
                {phase.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="text-xs text-gray-400 flex items-center space-x-2">
                    <div className="w-1 h-1 bg-gray-500 rounded-full" />
                    <span>{section}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current Phase Detail */}
        <motion.div
          key={currentPhase}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8"
        >
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-white mb-2">{phases[currentPhase].title}</h4>
            <p className="text-gray-300 mb-4">{phases[currentPhase].description}</p>
            <div className="text-sm text-purple-300">Estimated duration: {phases[currentPhase].duration}</div>
          </div>

          {/* Phase Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phases[currentPhase].sections.map((section, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4">
                <h5 className="font-semibold text-white mb-2">{section}</h5>
                <p className="text-gray-400 text-sm">
                  Detailed content for {section.toLowerCase()} would be displayed here with interactive elements, rich
                  media, and engaging storytelling.
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Overall Progress</span>
            <span className="text-sm text-gray-300">{Math.round(((currentPhase + 1) / phases.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentPhase + 1) / phases.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPhase(Math.max(0, currentPhase - 1))}
            disabled={currentPhase === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentPhase === 0
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Previous Phase
          </button>

          <div className="text-center">
            <div className="text-white font-semibold">
              Phase {currentPhase + 1} of {phases.length}
            </div>
            <div className="text-gray-400 text-sm">{phases[currentPhase].title}</div>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-semibold transition-all"
          >
            <span>{currentPhase === phases.length - 1 ? "Complete Journey" : "Next Phase"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

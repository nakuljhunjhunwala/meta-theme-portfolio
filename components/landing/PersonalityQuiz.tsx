"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronLeft } from "lucide-react"

interface QuizProps {
  onComplete: (theme: string) => void
  onClose: () => void
}

interface Question {
  id: string
  question: string
  options: Array<{
    text: string
    themes: Record<string, number>
  }>
}

const questions: Question[] = [
  {
    id: "work-style",
    question: "What's your preferred work environment?",
    options: [
      {
        text: "A fun, creative space with games and bright colors",
        themes: { retro: 3, glass: 1, code: 0, terminal: 0 },
      },
      {
        text: "A professional IDE with multiple monitors",
        themes: { code: 3, terminal: 2, glass: 1, retro: 0 },
      },
      {
        text: "A sleek, modern office with clean aesthetics",
        themes: { glass: 3, code: 1, terminal: 0, retro: 0 },
      },
      {
        text: "A command center with multiple terminals",
        themes: { terminal: 3, code: 2, glass: 0, retro: 0 },
      },
    ],
  },
  {
    id: "problem-solving",
    question: "How do you approach problem-solving?",
    options: [
      {
        text: "Turn it into a game with rewards and achievements",
        themes: { retro: 3, glass: 0, code: 1, terminal: 0 },
      },
      {
        text: "Break it down systematically with proper tools",
        themes: { code: 3, terminal: 1, glass: 1, retro: 0 },
      },
      {
        text: "Visualize the solution with elegant diagrams",
        themes: { glass: 3, code: 1, terminal: 0, retro: 0 },
      },
      {
        text: "Use command-line tools and scripts",
        themes: { terminal: 3, code: 2, glass: 0, retro: 0 },
      },
    ],
  },
  {
    id: "communication",
    question: "What's your preferred communication style?",
    options: [
      {
        text: "Casual and fun with emojis and memes",
        themes: { retro: 3, glass: 1, code: 0, terminal: 0 },
      },
      {
        text: "Clear documentation and code comments",
        themes: { code: 3, terminal: 1, glass: 1, retro: 0 },
      },
      {
        text: "Visual presentations and smooth interactions",
        themes: { glass: 3, code: 1, terminal: 0, retro: 1 },
      },
      {
        text: "Direct commands and efficient text-based communication",
        themes: { terminal: 3, code: 1, glass: 0, retro: 0 },
      },
    ],
  },
  {
    id: "aesthetics",
    question: "Which visual style appeals to you most?",
    options: [
      {
        text: "Bright colors, pixel art, and nostalgic designs",
        themes: { retro: 3, glass: 0, code: 0, terminal: 0 },
      },
      {
        text: "Dark themes with syntax highlighting",
        themes: { code: 3, terminal: 2, glass: 0, retro: 0 },
      },
      {
        text: "Translucent surfaces with blur effects",
        themes: { glass: 3, code: 0, terminal: 0, retro: 0 },
      },
      {
        text: "Minimalist green text on black background",
        themes: { terminal: 3, code: 1, glass: 0, retro: 0 },
      },
    ],
  },
  {
    id: "interaction",
    question: "How do you prefer to interact with interfaces?",
    options: [
      {
        text: "Clicking buttons and collecting achievements",
        themes: { retro: 3, glass: 1, code: 0, terminal: 0 },
      },
      {
        text: "Using keyboard shortcuts and file explorers",
        themes: { code: 3, terminal: 2, glass: 0, retro: 0 },
      },
      {
        text: "Smooth gestures and hover effects",
        themes: { glass: 3, code: 1, terminal: 0, retro: 1 },
      },
      {
        text: "Typing commands and using the keyboard exclusively",
        themes: { terminal: 3, code: 1, glass: 0, retro: 0 },
      },
    ],
  },
]

export default function PersonalityQuiz({ onComplete, onClose }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [scores, setScores] = useState({ retro: 0, code: 0, glass: 0, terminal: 0 })

  const handleAnswer = (optionIndex: number) => {
    const question = questions[currentQuestion]
    const option = question.options[optionIndex]

    // Update scores
    const newScores = { ...scores }
    Object.entries(option.themes).forEach(([theme, points]) => {
      newScores[theme as keyof typeof scores] += points
    })
    setScores(newScores)

    // Record answer
    setAnswers({ ...answers, [question.id]: optionIndex })

    // Move to next question or complete
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate result
      const maxScore = Math.max(...Object.values(newScores))
      const recommendedTheme = Object.entries(newScores).find(([_, score]) => score === maxScore)?.[0] || "glass"
      onComplete(recommendedTheme)
    }
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-2xl w-full p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Find Your Perfect Theme</h3>
            <p className="text-gray-300">Answer a few questions to get a personalized recommendation</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </span>
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

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-semibold text-white mb-6">{questions[currentQuestion].question}</h4>

            <div className="space-y-3 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-purple-400/50 rounded-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white">{option.text}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={currentQuestion === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              currentQuestion === 0 ? "text-gray-500 cursor-not-allowed" : "text-white hover:bg-white/10"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="flex space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentQuestion ? "bg-purple-400" : "bg-white/20"
                }`}
              />
            ))}
          </div>
          <div className="w-16" /> {/* Spacer for alignment */}
        </div>
      </motion.div>
    </motion.div>
  )
}

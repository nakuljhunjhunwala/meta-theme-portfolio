"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Code, Sparkles, Terminal, Clock, Users, Zap, Play, ArrowRight } from "lucide-react"

const journeyOptions = [
  {
    id: "quick" as const,
    title: "Quick Overview",
    description: "30-second lightning tour",
    duration: "30s",
    icon: Zap,
    color: "bg-red-500",
  },
  {
    id: "standard" as const,
    title: "Standard Journey",
    description: "Guided exploration experience",
    duration: "2-3 min",
    icon: Play,
    color: "bg-blue-500",
  },
  {
    id: "full" as const,
    title: "Deep Dive",
    description: "Complete portfolio immersion",
    duration: "5+ min",
    icon: Clock,
    color: "bg-purple-500",
  },
  {
    id: "interactive" as const,
    title: "Free Exploration",
    description: "Discover at your own pace",
    duration: "Unlimited",
    icon: Users,
    color: "bg-green-500",
  },
  {
    id: "surprise" as const,
    title: "Dealer's Choice",
    description: "Let me surprise you!",
    duration: "Mystery",
    icon: Sparkles,
    color: "bg-yellow-500",
  },
]

const themeOptions = [
  {
    id: "retro" as const,
    title: "Retro Gaming",
    description: "Classic arcade experience",
    icon: Gamepad2,
    preview: "Pixel art aesthetics with 8-bit sounds",
  },
  {
    id: "code" as const,
    title: "Code Editor",
    description: "VS Code-inspired interface",
    icon: Code,
    preview: "Syntax highlighting and file explorer",
  },
  {
    id: "glass" as const,
    title: "Glass Morphism",
    description: "Modern glass effects",
    icon: Sparkles,
    preview: "Frosted glass with depth and blur",
  },
  {
    id: "terminal" as const,
    title: "Terminal",
    description: "Command-line interface",
    icon: Terminal,
    preview: "Interactive shell experience",
  },
]

const audienceOptions = [
  { id: "developer" as const, title: "Developer", description: "Technical focus" },
  { id: "recruiter" as const, title: "Recruiter", description: "Skills & experience" },
  { id: "client" as const, title: "Client", description: "Project showcase" },
  { id: "general" as const, title: "General", description: "Accessible overview" },
]

export default function WelcomeSequence() {
  const [step, setStep] = useState(0)
  const [selectedJourney, setSelectedJourney] = useState<string>("")
  const [selectedTheme, setSelectedTheme] = useState<string>("")
  const [selectedAudience, setSelectedAudience] = useState<string>("")

  const { visitData, setJourneyType, setTheme, setAudienceType, completeWelcome, unlockAchievement } =
    usePortfolioStore()

  const isReturningUser = visitData.visitCount > 1

  useEffect(() => {
    if (isReturningUser) {
      unlockAchievement("returning-visitor")
    }
  }, [isReturningUser, unlockAchievement])

  const handleStart = () => {
    if (selectedJourney && selectedTheme && selectedAudience) {
      setJourneyType(selectedJourney as any)
      setTheme(selectedTheme as any)
      setAudienceType(selectedAudience as any)
      completeWelcome()
      unlockAchievement("journey-started")
    }
  }

  const steps = [
    {
      title: isReturningUser ? `Welcome back! Visit #${visitData.visitCount}` : "Welcome to My Interactive Portfolio",
      subtitle: isReturningUser
        ? "Ready for another adventure?"
        : "Choose your own adventure through my professional journey",
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>

            {isReturningUser && (
              <div className="flex flex-wrap gap-2 justify-center">
                {visitData.achievementsUnlocked.slice(0, 3).map((achievement) => (
                  <Badge key={achievement} variant="secondary">
                    {achievement.replace("-", " ")}
                  </Badge>
                ))}
                {visitData.achievementsUnlocked.length > 3 && (
                  <Badge variant="outline">+{visitData.achievementsUnlocked.length - 3} more</Badge>
                )}
              </div>
            )}
          </div>

          <Button onClick={() => setStep(1)} size="lg" className="w-full">
            {isReturningUser ? "Continue Adventure" : "Begin Journey"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      ),
    },
    {
      title: "Choose Your Journey Length",
      subtitle: "How much time do you have today?",
      content: (
        <div className="grid gap-4">
          {journeyOptions.map((option) => {
            const Icon = option.icon
            return (
              <motion.div key={option.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    selectedJourney === option.id
                      ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedJourney(option.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${option.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{option.title}</h3>
                        <Badge variant="outline">{option.duration}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      ),
    },
    {
      title: "Select Your Experience Theme",
      subtitle: "Each theme offers a unique way to explore my work",
      content: (
        <div className="grid gap-4">
          {themeOptions.map((option) => {
            const Icon = option.icon
            return (
              <motion.div key={option.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    selectedTheme === option.id
                      ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedTheme(option.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{option.preview}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      ),
    },
    {
      title: "What brings you here?",
      subtitle: "This helps me tailor the content to your interests",
      content: (
        <div className="grid gap-3">
          {audienceOptions.map((option) => (
            <motion.div key={option.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card
                className={`p-4 cursor-pointer transition-all ${
                  selectedAudience === option.id
                    ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-950"
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedAudience(option.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ),
    },
  ]

  const currentStep = steps[step]
  const canProceed =
    step === 0 || (step === 1 && selectedJourney) || (step === 2 && selectedTheme) || (step === 3 && selectedAudience)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
        <Card className="p-8">
          <div className="text-center mb-8">
            <motion.h1
              key={currentStep.title}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-2"
            >
              {currentStep.title}
            </motion.h1>
            <motion.p
              key={currentStep.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground"
            >
              {currentStep.subtitle}
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep.content}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-8">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${index <= step ? "bg-blue-500" : "bg-gray-300"}`}
                />
              ))}
            </div>

            <div className="flex space-x-3">
              {step > 0 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}

              {step < steps.length - 1 ? (
                <Button onClick={() => setStep(step + 1)} disabled={!canProceed}>
                  Next
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleStart} disabled={!canProceed} size="lg">
                  Start Experience
                  <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

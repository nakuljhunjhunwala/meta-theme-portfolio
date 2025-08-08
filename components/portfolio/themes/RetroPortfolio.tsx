
"use client"

import React, { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { personalInfo, technicalSkills, projects } from "@/constants/portfolio"
import { Star, Trophy, Zap, Heart, Coins } from "lucide-react"
import GameModal from "./GameModal"

// Lazy load games for better performance
const TicTacToe = React.lazy(() => import("../games/TicTacToe"))
const Pong = React.lazy(() => import("../games/Pong"))
const Breakout = React.lazy(() => import("../games/Breakout"))
const Snake = React.lazy(() => import("../games/Snake"))
const Tetris = React.lazy(() => import("../games/Tetris"))
const SpaceInvaders = React.lazy(() => import("../games/SpaceInvaders"))
const FlappyBird = React.lazy(() => import("../games/FlappyBird"))
const DinoGame = React.lazy(() => import("../games/DinoGame"))
  const RoadRush = React.lazy(() => import("../games/RoadRush"))

interface GameState {
  score: number
  level: number
  lives: number
  coins: number
  achievements: string[]
  currentGame: string | null
}

export default function RetroPortfolio() {
  const [currentSection, setCurrentSection] = useState("home")
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    lives: 3,
    coins: 0,
    achievements: [],
    currentGame: null,
  })
  const [showAchievement, setShowAchievement] = useState<string | null>(null)
  const [activeGame, setActiveGame] = useState<string | null>(null)

  const { unlockAchievement } = usePortfolioStore()

  useEffect(() => {
    unlockAchievement("retro-explorer")
    playSound("start")
  }, [unlockAchievement])

  const playSound = (type: string) => {
    console.log(`🔊 Playing ${type} sound`)
  }

  const addScore = (points: number) => {
    setGameState((prev) => ({ ...prev, score: prev.score + points }))
    playSound("coin")
  }

  const addCoins = (amount: number) => {
    setGameState((prev) => ({ ...prev, coins: prev.coins + amount }))
    playSound("coin")
  }

  const unlockRetroAchievement = (achievement: string) => {
    if (!gameState.achievements.includes(achievement)) {
      setGameState((prev) => ({
        ...prev,
        achievements: [...prev.achievements, achievement],
      }))
      setShowAchievement(achievement)
      unlockAchievement(achievement)
      playSound("achievement")
      setTimeout(() => setShowAchievement(null), 3000)
    }
  }

  const sections = [
    { id: "home", label: "START", icon: "🏠", color: "bg-red-500" },
    { id: "about", label: "ABOUT", icon: "👤", color: "bg-blue-500" },
    { id: "skills", label: "SKILLS", icon: "⚡", color: "bg-yellow-500" },
    { id: "projects", label: "QUESTS", icon: "🎯", color: "bg-green-500" },
    { id: "games", label: "GAMES", icon: "🎮", color: "bg-purple-500" },
    { id: "contact", label: "CONTACT", icon: "📞", color: "bg-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 text-white font-mono relative overflow-hidden">
      {/* Mario-style clouds background */}
      <div className="fixed inset-0 opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-10 bg-white rounded-full"
            animate={{
              x: ["-100px", "calc(100vw + 100px)"],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              top: `${10 + i * 10}%`,
            }}
          >
            <div className="absolute -left-4 top-2 w-8 h-6 bg-white rounded-full" />
            <div className="absolute -right-4 top-2 w-8 h-6 bg-white rounded-full" />
          </motion.div>
        ))}
      </div>

      {/* Pixel grid overlay */}
      <div className="fixed inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* HUD - Mario style - Mobile Optimized */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-yellow-400">
        {/* Mobile Header */}
        <div className="block sm:hidden p-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 font-bold">MARIO</span>
              <span className="text-white font-bold">{gameState.score.toString().padStart(6, "0")}</span>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 text-sm font-bold">{personalInfo.name.toUpperCase()}</div>
            </div>
            <div className="flex items-center space-x-1">
              <Trophy className="w-3 h-3 text-yellow-400" />
              <span className="text-white text-xs">{gameState.achievements.length}</span>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:block p-4">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6 text-white">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 font-bold">MARIO</span>
                <span className="text-white font-bold">{gameState.score.toString().padStart(6, "0")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-bold">×{gameState.coins.toString().padStart(2, "0")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-400">WORLD</span>
                <span className="text-white font-bold">{gameState.level}-1</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">TIME</span>
                <span className="text-white font-bold">999</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-yellow-400 text-lg font-bold">{personalInfo.name.toUpperCase()}</div>
              <div className="text-xs text-green-400">
                LEVEL {gameState.level} - {personalInfo.title.toUpperCase()}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-4 h-4 ${i < gameState.lives ? "text-red-400 fill-current" : "text-gray-600"}`}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-white">{gameState.achievements.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-green-600 border-t-4 border-green-800 p-2">
        <div className="flex justify-around items-center">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSection(section.id)
                addScore(10)
                addCoins(1)
              }}
              className={`flex flex-col items-center px-2 py-1 rounded transition-all font-bold text-xs ${
                currentSection === section.id
                  ? "bg-yellow-400 text-black shadow-lg"
                  : `${section.color} text-white hover:brightness-110`
              }`}
            >
              <span className="text-lg mb-1">{section.icon}</span>
              <span className="text-xs">{section.label.split(' ')[1] || section.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Desktop Navigation - Side pipe style */}
      <div className="hidden sm:block fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
        <div className="bg-green-600 border-4 border-green-800 rounded-lg p-2 shadow-lg">
          <div className="space-y-2">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSection(section.id)
                  addScore(10)
                  addCoins(1)
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded transition-all font-bold text-sm ${
                  currentSection === section.id
                    ? "bg-yellow-400 text-black shadow-lg transform scale-110"
                    : `${section.color} text-white hover:brightness-110 shadow-md`
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                <span className="hidden lg:inline">{section.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <main className="pt-12 sm:pt-24 pb-20 sm:pb-8 px-4 ml-0 lg:ml-48">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {currentSection === "home" && (
                <RetroHome addScore={addScore} addCoins={addCoins} unlockAchievement={unlockRetroAchievement} />
              )}
              {currentSection === "about" && (
                <RetroAbout addScore={addScore} addCoins={addCoins} unlockAchievement={unlockRetroAchievement} />
              )}
              {currentSection === "skills" && (
                <RetroSkills addScore={addScore} addCoins={addCoins} unlockAchievement={unlockRetroAchievement} />
              )}
              {currentSection === "projects" && (
                <RetroProjects addScore={addScore} addCoins={addCoins} unlockAchievement={unlockRetroAchievement} />
              )}
              {currentSection === "games" && (
                <div className="relative z-30">
                  <RetroGames
                    gameState={gameState}
                    setGameState={setGameState}
                    setActiveGame={setActiveGame}
                  />
                </div>
              )}
              {currentSection === "contact" && (
                <RetroContact addScore={addScore} addCoins={addCoins} unlockAchievement={unlockRetroAchievement} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Achievement Notification - Mario style */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-24 right-4 z-50 bg-yellow-400 text-black p-4 rounded-lg border-4 border-yellow-600 shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6" />
              <div>
                <div className="font-bold">ACHIEVEMENT UNLOCKED!</div>
                <div className="text-sm">{showAchievement}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <GameModal
        isOpen={!!activeGame}
        onClose={() => setActiveGame(null)}
        title={activeGame || ""}
      >
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="pixel-text text-purple-400">LOADING GAME...</div>
            </div>
          </div>
        }>
          {activeGame === "Tic-Tac-Toe" && <TicTacToe />}
          {activeGame === "Pong" && <Pong />}
          {activeGame === "Breakout" && <Breakout />}
          {activeGame === "Snake" && <Snake />}
          {activeGame === "Tetris" && <Tetris />}
          {activeGame === "Space-Invaders" && <SpaceInvaders />}
          {activeGame === "Flappy-Bird" && <FlappyBird />}
          {activeGame === "Dino-Game" && <DinoGame />}
          {activeGame === "Road-Rush" && <RoadRush />}
        </Suspense>
      </GameModal>

      {/* Floating coins */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${80 + Math.random() * 20}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}


function RetroHome({
  addScore,
  addCoins,
  unlockAchievement,
}: {
  addScore: (points: number) => void
  addCoins: (coins: number) => void
  unlockAchievement: (achievement: string) => void
}) {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative"
      >
        <h1
          className="mb-4 pixel-text pixel-heading drop-shadow-lg font-bold text-yellow-400 text-[clamp(1.5rem,6vw,3.5rem)] sm:text-[clamp(1.75rem,5vw,4rem)] md:text-[clamp(2rem,4.5vw,4.5rem)] whitespace-normal break-normal mx-auto max-w-[min(92vw,880px)] text-center"
          >
          {personalInfo.name.toUpperCase()}
        </h1>
        <div className="text-lg sm:text-xl md:text-2xl text-white mb-8 drop-shadow-md">
          &gt; {personalInfo.title.toUpperCase()}_
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-black/80 border-4 border-yellow-400 rounded-lg p-3 sm:p-6 shadow-lg"
      >
        <h2 className="text-lg sm:text-2xl font-bold text-yellow-400 mb-4">🎯 GAME OBJECTIVE</h2>
        <p className="text-white leading-relaxed text-sm sm:text-base">
          Navigate through my portfolio to discover my skills, projects, and experience. Collect coins by exploring
          different sections and unlock achievements! Each section is a new level with unique challenges.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "EXPERIENCE", value: "5+ YEARS", icon: "⚡", color: "bg-red-500" },
          { label: "PROJECTS", value: `${projects.length} COMPLETED`, icon: "🎯", color: "bg-green-500" },
          { label: "TECHNOLOGIES", value: `${technicalSkills.length} MASTERED`, icon: "🔧", color: "bg-blue-500" },
        ].map((stat, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            onClick={() => {
              addScore(25)
              addCoins(5)
              if (index === 0) unlockAchievement("Experience Explorer")
            }}
            className={`${stat.color} border-4 border-black rounded-lg p-3 sm:p-4 hover:brightness-110 transition-all transform hover:scale-105 shadow-lg`}
          >
            <div className="text-xl sm:text-2xl mb-2">{stat.icon}</div>
            <div className="text-yellow-400 font-bold text-xs sm:text-sm">{stat.label}</div>
            <div className="text-white text-base sm:text-lg font-bold">{stat.value}</div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-yellow-400 animate-pulse text-sm sm:text-lg font-bold text-center"
      >
        🎮 <span className="hidden sm:inline">PRESS ANY MENU BUTTON TO START YOUR QUEST!</span>
        <span className="sm:hidden">TAP MENU TO START!</span> 🎮
      </motion.div>
    </div>
  )
}

function RetroAbout({
  addScore,
  addCoins,
  unlockAchievement,
}: {
  addScore: (points: number) => void
  addCoins: (coins: number) => void
  unlockAchievement: (achievement: string) => void
}) {
  useEffect(() => {
    unlockAchievement("About Explorer")
  }, [unlockAchievement])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-yellow-400 mb-4 drop-shadow-lg">🏰 PLAYER PROFILE</h2>
        <div className="text-white text-sm sm:text-base">Loading character data...</div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-black/80 border-4 border-green-400 rounded-lg p-3 sm:p-6 shadow-lg"
      >
        <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-4">📜 CHARACTER BIO</h3>
        <p className="text-white leading-relaxed mb-4 text-sm sm:text-base">{personalInfo.bio.detailed}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-yellow-400">LOCATION:</span>
              <span className="text-white">{personalInfo.location}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-yellow-400">STATUS:</span>
              <span className="text-green-400">{personalInfo.availability.status.toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-yellow-400">CLASS:</span>
              <span className="text-white">FULL STACK DEVELOPER</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-yellow-400">LEVEL:</span>
              <span className="text-white">SENIOR</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-yellow-400">SPECIALTY:</span>
              <span className="text-white">WEB APPLICATIONS</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-yellow-400">LANGUAGES:</span>
              <span className="text-white">{personalInfo.languages.length}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "FRONTEND MASTERY", level: 95, color: "bg-blue-500" },
          { title: "BACKEND POWER", level: 90, color: "bg-red-500" },
          { title: "CLOUD SKILLS", level: 85, color: "bg-purple-500" },
        ].map((skill, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            onClick={() => {
              addScore(15)
              addCoins(3)
            }}
            className={`${skill.color} border-4 border-black rounded-lg p-3 sm:p-4 hover:brightness-110 transition-all transform hover:scale-105 shadow-lg`}
          >
            <div className="text-sm sm:text-lg font-bold text-yellow-400 mb-2">{skill.title}</div>
            <div className="w-full bg-black rounded-full h-3 mb-2 border-2 border-gray-600">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                className="bg-yellow-400 h-full rounded-full"
              />
            </div>
            <div className="text-white text-xs sm:text-sm font-bold">{skill.level}%</div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function RetroSkills({
  addScore,
  addCoins,
  unlockAchievement,
}: {
  addScore: (points: number) => void
  addCoins: (coins: number) => void
  unlockAchievement: (achievement: string) => void
}) {
  useEffect(() => {
    unlockAchievement("Skills Master")
  }, [unlockAchievement])

  const skillCategories = ["frontend", "backend", "database", "cloud", "devops"] as const
  const categoryColors = {
    frontend: "bg-blue-500",
    backend: "bg-red-500",
    database: "bg-green-500",
    cloud: "bg-purple-500",
    devops: "bg-orange-500",
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-yellow-400 mb-4 drop-shadow-lg">🌟 SKILL TREE</h2>
        <div className="text-white text-sm sm:text-base">Select a skill category to power up!</div>
      </div>

      <div className="space-y-6">
        {skillCategories.map((category, categoryIndex) => {
          const categorySkills = technicalSkills.filter((skill) => skill.category === category)
          return (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="bg-black/80 border-4 border-yellow-400 rounded-lg p-3 sm:p-6 shadow-lg"
            >
              <h3 className="text-lg sm:text-2xl font-bold text-yellow-400 mb-4 flex items-center capitalize">
                <Zap className="w-4 h-4 sm:w-6 sm:h-6 mr-2" />
                {category.toUpperCase()} POWERS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.button
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + skillIndex * 0.1 }}
                    onClick={() => {
                      addScore(20)
                      addCoins(2)
                    }}
                    className={`${categoryColors[category]} border-4 border-black rounded-lg p-2 sm:p-3 hover:brightness-110 transition-all transform hover:scale-105 shadow-lg`}
                  >
                    <div className="text-white font-bold mb-2 text-sm sm:text-base">{skill.name}</div>
                    <div className="flex justify-center space-x-1 mb-2">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            starIndex < Math.floor(skill.proficiency / 20)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-yellow-400 font-bold">
                      LEVEL {Math.floor(skill.proficiency / 20)}/5
                    </div>
                    <div className="text-xs text-white mt-1">{skill.yearsExperience} YRS EXP</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function RetroProjects({
  addScore,
  addCoins,
  unlockAchievement,
}: {
  addScore: (points: number) => void
  addCoins: (coins: number) => void
  unlockAchievement: (achievement: string) => void
}) {
  useEffect(() => {
    unlockAchievement("Quest Master")
  }, [unlockAchievement])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-yellow-400 mb-4 drop-shadow-lg">🏆 COMPLETED QUESTS</h2>
        <div className="text-white text-sm sm:text-base">Click on any quest to view details and earn rewards!</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
        {projects
          .filter((p) => p.featured)
          .map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-black/80 border-4 border-green-400 rounded-lg p-3 sm:p-6 hover:border-yellow-400 transition-all cursor-pointer transform hover:scale-105 shadow-lg"
              onClick={() => {
                addScore(50)
                addCoins(10)
                unlockAchievement(`${project.title} Explorer`)
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-xl font-bold text-yellow-400">{project.title.toUpperCase()}</h3>
                <div className="text-xl sm:text-2xl">🏆</div>
              </div>

              <p className="text-white text-xs sm:text-sm mb-4 leading-relaxed">{project.description.summary}</p>

              <div className="space-y-2 mb-4">
                <div className="text-yellow-400 text-xs sm:text-sm font-bold">TECHNOLOGIES USED:</div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.techStack.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-1 sm:px-2 py-1 bg-blue-500 border-2 border-black rounded text-xs text-white font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-yellow-400 text-xs sm:text-sm font-bold">QUEST REWARDS:</div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="flex items-center space-x-1">
                    <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                    <span className="text-white text-xs sm:text-sm">+50 COINS</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-xs sm:text-sm">+100 XP</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-yellow-400 text-black px-3 py-2 rounded font-bold hover:bg-yellow-300 transition-colors text-center border-2 border-black"
                    onClick={(e) => e.stopPropagation()}
                  >
                    🎮 PLAY DEMO
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 text-white px-3 py-2 rounded font-bold hover:bg-green-400 transition-colors text-center border-2 border-black"
                    onClick={(e) => e.stopPropagation()}
                  >
                    📝 VIEW CODE
                  </a>
                )}
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  )
}

function RetroGames({
  setActiveGame,
}: {
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  setActiveGame: (game: string | null) => void
}) {
  const games = [
    {
      id: "Tic-Tac-Toe",
      name: "Tic-Tac-Toe",
      description: "The classic game of X's and O's.",
      icon: "❌⭕",
      color: "bg-green-500",
      component: <TicTacToe />,
    },
    {
      id: "Pong",
      name: "Pong",
      description: "The original arcade classic.",
      icon: "🏓",
      color: "bg-blue-500",
      component: <Pong />,
    },
    {
      id: "Breakout",
      name: "Breakout",
      description: "Break the bricks to win.",
      icon: "🧱",
      color: "bg-red-500",
      component: <Breakout />,
    },
    {
      id: "Snake",
      name: "Snake",
      description: "Eat apples and grow longer!",
      icon: "🐍",
      color: "bg-purple-500",
      component: <Snake />,
    },
    {
      id: "Tetris",
      name: "Tetris",
      description: "Clear lines with falling blocks.",
      icon: "🔷",
      color: "bg-indigo-500",
      component: <Tetris />,
    },
    {
      id: "Space-Invaders",
      name: "Space Invaders",
      description: "Defend Earth from aliens!",
      icon: "🛸",
      color: "bg-cyan-500",
      component: <SpaceInvaders />,
    },
    {
      id: "Flappy-Bird",
      name: "Flappy Bird",
      description: "Fly through the pipes!",
      icon: "🐦",
      color: "bg-yellow-500",
      component: <FlappyBird />,
    },
    {
      id: "Dino-Game",
      name: "Dino Runner",
      description: "Jump over obstacles!",
      icon: "🦕",
      color: "bg-orange-500",
      component: <DinoGame />,
    },
    {
      id: "Road-Rush",
      name: "Road Rush",
      description: "Dodge traffic, collect coins!",
      icon: "🚗",
      color: "bg-rose-600",
      component: <RoadRush />,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-yellow-400 mb-4 drop-shadow-lg">
          🎮 MINI GAMES
        </h2>
        <div className="text-white text-sm sm:text-base">
          Play games to earn extra coins and achievements!
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {games.map((game, index) => (
          <motion.button
            key={game.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            onClick={() => setActiveGame(game.id)}
            className={`${game.color} border-4 border-black rounded-lg p-3 sm:p-6 hover:brightness-110 transition-all transform hover:scale-105 shadow-lg flex flex-col items-center justify-center text-center relative z-10 cursor-pointer select-none`}
            style={{ 
              backgroundImage: `
                linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)
              `,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
            }}
          >
            <div className="absolute inset-2 bg-black/20 rounded border-2 border-white/20"></div>
            <div className="relative z-10">
              <div className="text-2xl sm:text-4xl mb-4 font-mono filter drop-shadow-lg">
                {game.icon}
              </div>
              <h3 className="text-base sm:text-xl font-bold text-white mb-2 drop-shadow-md pixel-text">
                {game.name.toUpperCase()}
              </h3>
              <p className="text-white/90 text-xs sm:text-sm drop-shadow-sm">
                {game.description}
              </p>
              <div className="mt-2 text-yellow-400 text-xs font-bold animate-pulse">
                🎮 CLICK TO PLAY
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function RetroContact({
  addScore,
  addCoins,
  unlockAchievement,
}: {
  addScore: (points: number) => void
  addCoins: (coins: number) => void
  unlockAchievement: (achievement: string) => void
}) {
  useEffect(() => {
    unlockAchievement("Contact Initiated")
  }, [unlockAchievement])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-yellow-400 mb-4 drop-shadow-lg">📞 COMMUNICATION TERMINAL</h2>
        <div className="text-white text-sm sm:text-base">Establish connection with player</div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/80 border-4 border-green-400 rounded-lg p-3 sm:p-6 text-center shadow-lg"
      >
        <h3 className="text-lg sm:text-2xl font-bold text-yellow-400 mb-4">🤝 READY TO COLLABORATE?</h3>
        <p className="text-white mb-6 leading-relaxed text-sm sm:text-base">
          Let's team up and create something amazing together! I'm always excited to work on new projects and
          challenges. Send me a message and let's start our next adventure!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {[
            { label: "EMAIL", value: personalInfo.email, icon: "📧", color: "bg-red-500" },
            { label: "LOCATION", value: personalInfo.location, icon: "📍", color: "bg-blue-500" },
            {
              label: "STATUS",
              value: personalInfo.availability.status.toUpperCase(),
              icon: "🟢",
              color: "bg-green-500",
            },
          ].map((contact, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => {
                addScore(30)
                addCoins(5)
              }}
              className={`${contact.color} border-4 border-black rounded-lg p-3 sm:p-4 hover:brightness-110 transition-all transform hover:scale-105 shadow-lg`}
            >
              <div className="text-xl sm:text-2xl mb-2">{contact.icon}</div>
              <div className="text-yellow-400 font-bold text-xs sm:text-sm">{contact.label}</div>
              <div className="text-white text-xs">{contact.value}</div>
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`mailto:${personalInfo.email}`}
            className="bg-yellow-400 text-black px-4 sm:px-6 py-3 rounded font-bold hover:bg-yellow-300 transition-colors border-4 border-black shadow-lg text-sm sm:text-base"
            onClick={() => {
              addScore(100)
              addCoins(20)
            }}
          >
            📧 SEND MESSAGE
          </a>
          <a
            href={personalInfo.socialLinks.find((s) => s.platform === "LinkedIn")?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-6 py-3 rounded font-bold hover:bg-blue-400 transition-colors border-4 border-black shadow-lg"
            onClick={() => {
              addScore(50)
              addCoins(10)
            }}
          >
            💼 CONNECT ON LINKEDIN
          </a>
        </div>
      </motion.div>

      <div className="text-center">
        <div className="text-yellow-400 animate-pulse text-lg font-bold">
          🎉 QUEST COMPLETED! THANKS FOR PLAYING! 🎉
        </div>
        <div className="text-white text-sm mt-2">Achievement unlocked: Portfolio Master!</div>
      </div>
    </div>
  )
}


"use client"

import React, { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { personalInfo, technicalSkills, projects, experiences } from "@/constants/portfolio"
import { Star, Trophy, Zap, Heart, Coins } from "lucide-react"
import GameModal from "./GameModal"
import { playTone, unlockAudio } from "@/lib/audio"

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
  const [currentSection, setCurrentSection] = useState("about")
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

  // Minimal Mario-style sound effects - Only key moments
  const playSound = (type: string) => {
    unlockAudio() // Ensure audio is unlocked on mobile
    
    switch (type) {
      case "jump":
        playTone(660, 150, 0.06, "square") // Mario jump sound
        break
      case "coin":
        playTone(988, 80, 0.05, "square") // Coin pickup
        setTimeout(() => playTone(1319, 120, 0.05, "square"), 80)
        break
      case "achievement":
        playTone(1047, 120, 0.06, "square") // Achievement fanfare
        setTimeout(() => playTone(1319, 120, 0.06, "square"), 120)
        setTimeout(() => playTone(1568, 200, 0.06, "square"), 240)
        break
      case "start":
      case "select":
        playTone(440, 80, 0.03, "square") // Menu select
        break
      // Remove any other sound cases to keep it truly minimal
    }
  }

  const addScore = (points: number, playSound_: boolean = false) => {
    setGameState((prev) => ({ ...prev, score: prev.score + points }))
    if (playSound_) {
      playSound("coin")
    }
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
    { id: "about", label: "ABOUT", icon: "👤", color: "bg-blue-500" },
    { id: "journey", label: "JOURNEY", icon: "🎮", color: "bg-red-500" },
    { id: "skills", label: "SKILLS", icon: "⚡", color: "bg-yellow-500" },
    { id: "projects", label: "QUESTS", icon: "🎯", color: "bg-green-500" },
    { id: "games", label: "GAMES", icon: "🎮", color: "bg-purple-500" },
    { id: "contact", label: "CONTACT", icon: "📞", color: "bg-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 text-white font-mono relative overflow-hidden">
      {/* Mario-style clouds background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none -z-10">
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
      <div className="fixed inset-0 opacity-10 pointer-events-none -z-10">
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
                addScore(10, true) // Sound for navigation
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
                  addScore(10, true) // Sound for navigation
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
      <main className="relative z-10 pt-12 sm:pt-24 pb-20 sm:pb-8 px-4 ml-0 lg:ml-48">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {currentSection === "about" && (
                <RetroAbout addScore={addScore} addCoins={addCoins} unlockAchievement={unlockRetroAchievement} />
              )}
              {currentSection === "journey" && (
                <InteractiveMarioJourney 
                  addScore={addScore} 
                  addCoins={addCoins} 
                  unlockAchievement={unlockRetroAchievement} 
                  gameState={gameState}
                  playSound={playSound}
                />
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




function RetroAbout({
  addScore,
  addCoins,
  unlockAchievement,
}: {
  addScore: (points: number, playSound_?: boolean) => void
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
              addScore(15, true) // Sound for skill click
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
  addScore: (points: number, playSound_?: boolean) => void
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
                      addScore(20, true) // Sound for skill category click
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
  addScore: (points: number, playSound_?: boolean) => void
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
                addScore(50, true) // Sound for project click
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
  addScore: (points: number, playSound_?: boolean) => void
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
        <h3 className="text-lg sm:text-2xl font-bold text-yellow-400 mb-4">🤝 READY TO BUILD SOMETHING EPIC?</h3>
        <p className="text-white mb-6 leading-relaxed text-sm sm:text-base">
          I'm passionate about turning ideas into reality! Whether you need a full-stack web application, want to discuss a challenging project, or just say hi - I'd love to hear from you. Let's create something amazing together! 🚀
        </p>
        
        <div className="text-center mb-4">
          <div className="text-green-400 text-sm font-bold animate-pulse">
            💡 Quick Response Guaranteed • Available for Immediate Projects
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[
            { 
              label: "EMAIL", 
              value: personalInfo.email, 
              icon: "📧", 
              color: "bg-red-500",
              action: () => window.open(`mailto:${personalInfo.email}?subject=Hi%20Nakul!%20Let's%20collaborate&body=Hi%20Nakul,%0A%0AI%20came%20across%20your%20portfolio%20and%20I'm%20impressed%20with%20your%20work.%20I'd%20love%20to%20discuss%20potential%20opportunities.%0A%0ABest%20regards`, '_blank')
            },
            { 
              label: "WHATSAPP", 
              value: `+91 ${personalInfo.whatsappNumber}`, 
              icon: "💬", 
              color: "bg-green-600",
              action: () => window.open(`https://wa.me/91${personalInfo.whatsappNumber}?text=Hi%20Nakul!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20potential%20opportunities.%20Are%20you%20available%20for%20a%20quick%20chat%3F`, '_blank')
            },
            { 
              label: "LOCATION", 
              value: personalInfo.location, 
              icon: "📍", 
              color: "bg-blue-500",
              action: null
            },
            {
              label: "STATUS",
              value: personalInfo.availability.status.toUpperCase(),
              icon: "🟢",
              color: "bg-purple-500",
              action: null
            },
          ].map((contact, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => {
                addScore(30, true) // Sound for contact click
                addCoins(5)
                if (contact.action) {
                  contact.action()
                }
              }}
              className={`${contact.color} border-4 border-black rounded-lg p-3 sm:p-4 hover:brightness-110 transition-all transform hover:scale-105 shadow-lg ${contact.action ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="text-xl sm:text-2xl mb-2">{contact.icon}</div>
              <div className="text-yellow-400 font-bold text-xs sm:text-sm">{contact.label}</div>
              <div className="text-white text-xs break-all">{contact.value}</div>
              {contact.action && (
                <div className="text-yellow-300 text-xs mt-1 animate-pulse">CLICK TO CONTACT</div>
              )}
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/91${personalInfo.whatsappNumber}?text=Hi%20Nakul!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20potential%20opportunities.%20Are%20you%20available%20for%20a%20quick%20chat%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 sm:px-6 py-3 rounded font-bold hover:bg-green-400 transition-colors border-4 border-black shadow-lg text-sm sm:text-base"
            onClick={() => {
              addScore(100, true) // Sound for WhatsApp click
              addCoins(20)
            }}
          >
            💬 WHATSAPP ME
          </a>
          <a
            href={`mailto:${personalInfo.email}?subject=Hi%20Nakul!%20Let's%20collaborate&body=Hi%20Nakul,%0A%0AI%20came%20across%20your%20portfolio%20and%20I'm%20impressed%20with%20your%20work.%20I'd%20love%20to%20discuss%20potential%20opportunities.%0A%0ABest%20regards`}
            className="bg-yellow-400 text-black px-4 sm:px-6 py-3 rounded font-bold hover:bg-yellow-300 transition-colors border-4 border-black shadow-lg text-sm sm:text-base"
            onClick={() => {
              addScore(100, true) // Sound for email click
              addCoins(20)
            }}
          >
            📧 SEND EMAIL
          </a>
          <a
            href={personalInfo.resumeUrl}
            download="Nakul_Jhunjhunwala_Resume.docx"
            className="bg-purple-500 text-white px-4 sm:px-6 py-3 rounded font-bold hover:bg-purple-400 transition-colors border-4 border-black shadow-lg text-sm sm:text-base"
            onClick={() => {
              addScore(75, true) // Sound for resume download
              addCoins(15)
            }}
          >
            📄 RESUME
          </a>
          <a
            href={personalInfo.socialLinks.find((s) => s.platform === "LinkedIn")?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 sm:px-6 py-3 rounded font-bold hover:bg-blue-400 transition-colors border-4 border-black shadow-lg text-sm sm:text-base"
            onClick={() => {
              addScore(50, true) // Sound for LinkedIn click
              addCoins(10)
            }}
          >
            💼 LINKEDIN
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

// Interactive Mario Journey Component - Authentic 8-bit Experience
function InteractiveMarioJourney({
  addScore,
  addCoins,
  unlockAchievement,
  gameState,
  playSound,
}: {
  addScore: (points: number, playSound_?: boolean) => void
  addCoins: (coins: number) => void
  unlockAchievement: (achievement: string) => void
  gameState: GameState
  playSound: (type: string) => void
}) {
  const [marioPosition, setMarioPosition] = useState({ x: 100, worldX: 0 })
  const [cameraOffset, setCameraOffset] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [isWalking, setIsWalking] = useState(false)
  const [walkFrame, setWalkFrame] = useState(0)
  const [facingRight, setFacingRight] = useState(true)
  const [showInstructions, setShowInstructions] = useState(true)
  const [visitedLocations, setVisitedLocations] = useState<string[]>([])
  const [currentLocationInfo, setCurrentLocationInfo] = useState<any>(null)
  const [scorePopup, setScorePopup] = useState<{ points: number, text: string, x: number, y: number } | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [isTouchMoving, setIsTouchMoving] = useState(false)
  const [screenDimensions, setScreenDimensions] = useState({ width: 0, height: 0 })
  
  const WORLD_WIDTH = 5000
  const VIEWPORT_WIDTH = screenDimensions.width || (typeof window !== 'undefined' ? window.innerWidth : 1200)
  
  // Handle screen dimensions and responsiveness
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setScreenDimensions({ width, height })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    window.addEventListener('orientationchange', updateDimensions)
    
    return () => {
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('orientationchange', updateDimensions)
    }
  }, [])
  
  // Create timeline locations with proper spacing for scrolling world
  const timelineLocations = [
    ...experiences.map((exp, index) => ({
      id: exp.id,
      type: 'experience' as const,
      title: exp.role,
      subtitle: exp.company,
      worldX: 500 + index * 600,
      description: exp.description,
      startDate: exp.duration.start,
      endDate: exp.duration.current ? "Present" : exp.duration.end,
      location: exp.location,
      achievements: exp.achievements,
      technologies: exp.technologies,
      isCurrent: exp.duration.current
    })),
    ...personalInfo.education.map((edu, index) => ({
      id: `edu-${index}`,
      type: 'education' as const,
      title: edu.degree,
      subtitle: edu.institution,
      worldX: 400 + (experiences.length + index) * 600,
      description: edu.degree.includes('Computer') ? 
        "Focused on software development, programming fundamentals, and computer science principles." :
        edu.degree.includes('Commerce') ?
        "Studied business fundamentals, commerce principles, and analytical thinking." :
        "Built strong foundational knowledge and critical thinking skills.",
      startDate: edu.year.split('-')[0],
      endDate: edu.year.split('-')[1] || edu.year.split('-')[0],
      location: edu.location,
      achievements: edu.honors ? [edu.honors] : [],
      technologies: [],
      isCurrent: false
    }))
  ].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  // Walking animation frames
  useEffect(() => {
    if (isWalking) {
      const interval = setInterval(() => {
        setWalkFrame(prev => (prev + 1) % 3)
      }, 150)
      return () => clearInterval(interval)
    }
  }, [isWalking])

  // Camera follows Mario with smooth scrolling
  const updateCamera = (marioWorldX: number) => {
    const targetCameraX = marioWorldX - VIEWPORT_WIDTH / 2
    const clampedCameraX = Math.max(0, Math.min(WORLD_WIDTH - VIEWPORT_WIDTH, targetCameraX))
    setCameraOffset(clampedCameraX)
  }

  // Enhanced keyboard controls with camera movement
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const speed = screenDimensions.width < 640 ? 12 : 20 // Slower mobile, faster desktop
      setIsWalking(true)
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setMarioPosition(prev => {
            const newWorldX = Math.max(50, prev.worldX - speed)
            updateCamera(newWorldX)
            return {
              x: Math.max(50, Math.min(VIEWPORT_WIDTH - 50, newWorldX - cameraOffset)),
              worldX: newWorldX
            }
          })
          setFacingRight(false)
          addScore(1, false) // No sound for walking
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          setMarioPosition(prev => {
            const newWorldX = Math.min(WORLD_WIDTH - 50, prev.worldX + speed)
            updateCamera(newWorldX)
            return {
              x: Math.max(50, Math.min(VIEWPORT_WIDTH - 50, newWorldX - cameraOffset)),
              worldX: newWorldX
            }
          })
          setFacingRight(true)
          addScore(1, false) // No sound for walking
          break
        case 'ArrowUp':
        case 'w':
        case 'W':
        case ' ':
          if (!isJumping) {
            setIsJumping(true)
            addScore(5, false) // No extra sound for jump (already has jump sound)
            playSound("jump")
            setTimeout(() => setIsJumping(false), 600)
          }
          break
      }
      
      setTimeout(() => setIsWalking(false), 200)
    }

    const handleKeyUp = () => {
      setIsWalking(false)
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [cameraOffset, addScore, isJumping, playSound])

  // Advanced touch/swipe controls for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchStartX(touch.clientX)
    setTouchStartY(touch.clientY)
    setIsTouchMoving(false)
    unlockAudio() // Unlock audio on first touch
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX || !touchStartY) return
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartX
    const deltaY = touch.clientY - touchStartY
    const minSwipeDistance = 30
    
    setIsTouchMoving(true)
    
    // Prevent default scrolling when we're handling game controls
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      e.preventDefault()
    }
    
    // Horizontal swipe for movement
    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        // Swipe right
        handleMobileMove('right')
      } else {
        // Swipe left
        handleMobileMove('left')
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX || !touchStartY || !isTouchMoving) {
      // Single tap for jump
      handleMobileJump()
    }
    
    setTouchStartX(null)
    setTouchStartY(null)
    setIsTouchMoving(false)
  }

  // Touch controls with camera movement
  const handleMobileMove = (direction: 'left' | 'right') => {
    const speed = 15 // Balanced mobile speed
    setIsWalking(true)
    
    if (direction === 'left') {
      setMarioPosition(prev => {
        const newWorldX = Math.max(50, prev.worldX - speed)
        updateCamera(newWorldX)
        return {
          x: Math.max(50, Math.min(VIEWPORT_WIDTH - 50, newWorldX - cameraOffset)),
          worldX: newWorldX
        }
      })
      setFacingRight(false)
    } else {
      setMarioPosition(prev => {
        const newWorldX = Math.min(WORLD_WIDTH - 50, prev.worldX + speed)
        updateCamera(newWorldX)
        return {
          x: Math.max(50, Math.min(VIEWPORT_WIDTH - 50, newWorldX - cameraOffset)),
          worldX: newWorldX
        }
      })
      setFacingRight(true)
    }
    
    addScore(1, false) // No sound for walking
    setTimeout(() => setIsWalking(false), 200)
  }

  const handleMobileJump = () => {
    if (!isJumping) {
      setIsJumping(true)
      addScore(5, false) // No extra sound for jump (already has jump sound)
      playSound("jump")
      setTimeout(() => setIsJumping(false), 600)
    }
  }

  // Check for location interactions
  useEffect(() => {
    let nearbyLocation = null
    
    for (const location of timelineLocations) {
      const distance = Math.abs(marioPosition.worldX - location.worldX)
      if (distance < 150) {
        nearbyLocation = location
        if (distance < 80 && !visitedLocations.includes(location.id)) {
          setVisitedLocations(prev => [...prev, location.id])
          const points = location.type === 'experience' ? 500 : 300
          addScore(points, false) // No extra sound for achievement (already has achievement sound)
          addCoins(location.type === 'experience' ? 15 : 10)
          unlockAchievement(`Discovered ${location.title}`)
          playSound("achievement")
          
          // Show Mario-style score popup
          setScorePopup({
            points,
            text: location.type === 'experience' ? 'CAREER MILESTONE!' : 'EDUCATION QUEST!',
            x: marioPosition.x,
            y: 200
          })
          
          // Clear popup after animation
          setTimeout(() => setScorePopup(null), 2500)
        }
        break
      }
    }
    
    setCurrentLocationInfo(nearbyLocation)
  }, [marioPosition.worldX, visitedLocations, addScore, addCoins, unlockAchievement, playSound])

  // Classic 8-bit Mario Sprite - Like Reference Image
  const Mario8BitSprite = ({ isWalking, isJumping, facingRight, walkFrame }: { 
    isWalking: boolean, 
    isJumping: boolean, 
    facingRight: boolean,
    walkFrame: number 
  }) => {
    // Responsive Mario size based on screen
    const marioScale = screenDimensions.width < 640 ? 3 : screenDimensions.width < 1024 ? 4 : 5
    
    return (
    <div className={`relative ${facingRight ? '' : 'scale-x-[-1]'}`} style={{ imageRendering: 'pixelated' }}>
      <div 
        className="relative w-4 h-5" 
        style={{ 
          imageRendering: 'pixelated',
          transform: `scale(${marioScale})`
        }}
      >
        {/* Row 1 - Red Cap */}
        <div className="absolute top-0 left-1 w-2 h-1 bg-red-600"></div>
        
        {/* Row 2 - Cap and Hair */}
        <div className="absolute top-0.25 left-0.5 w-3 h-1 bg-red-600"></div>
        <div className="absolute top-0.25 left-3.5 w-0.5 h-1 bg-amber-800"></div>
        
        {/* Row 3 - Face */}
        <div className="absolute top-0.5 left-0.5 w-0.5 h-1 bg-red-600"></div>
        <div className="absolute top-0.5 left-1 w-2.5 h-1 bg-orange-200"></div>
        <div className="absolute top-0.5 left-3.5 w-0.5 h-1 bg-orange-200"></div>
        
        {/* Row 4 - Eyes and Hair */}
        <div className="absolute top-0.75 left-0 w-0.5 h-1 bg-amber-800"></div>
        <div className="absolute top-0.75 left-0.5 w-0.5 h-1 bg-orange-200"></div>
        <div className="absolute top-0.75 left-1 w-0.5 h-1 bg-black"></div>
        <div className="absolute top-0.75 left-1.5 w-1 h-1 bg-orange-200"></div>
        <div className="absolute top-0.75 left-2.5 w-0.5 h-1 bg-black"></div>
        <div className="absolute top-0.75 left-3 w-1 h-1 bg-orange-200"></div>
        
        {/* Row 5 - Mustache */}
        <div className="absolute top-1 left-0 w-0.5 h-1 bg-amber-800"></div>
        <div className="absolute top-1 left-0.5 w-2.5 h-1 bg-orange-200"></div>
        <div className="absolute top-1 left-3 w-1 h-1 bg-orange-200"></div>
        
        {/* Row 6 - Mustache */}
        <div className="absolute top-1.25 left-0 w-0.5 h-1 bg-amber-800"></div>
        <div className="absolute top-1.25 left-0.5 w-3 h-1 bg-black"></div>
        <div className="absolute top-1.25 left-3.5 w-0.5 h-1 bg-black"></div>
        
        {/* Row 7 - Red Shirt */}
        <div className="absolute top-1.5 left-0.5 w-3 h-1 bg-red-600"></div>
        
        {/* Row 8 - Arms and Overalls */}
        <div className="absolute top-1.75 left-0 w-1 h-1 bg-orange-200"></div>
        <div className="absolute top-1.75 left-1 w-2 h-1 bg-blue-600"></div>
        <div className="absolute top-1.75 left-3 w-1 h-1 bg-orange-200"></div>
        
        {/* Row 9 - Overalls with Button */}
        <div className="absolute top-2 left-1 w-2 h-1 bg-blue-600"></div>
        <div className="absolute top-2 left-2 w-0.5 h-0.5 bg-yellow-400"></div>
        
        {/* Row 10 - More Overalls */}
        <div className="absolute top-2.25 left-1 w-2 h-1 bg-blue-600"></div>
        
        {/* Row 11 - Legs with walk animation */}
        <div className={`absolute top-2.5 left-1 w-0.5 h-1 bg-blue-600 transition-transform duration-100 ${
          isWalking && !isJumping ? (walkFrame % 2 === 0 ? 'transform translate-x-0.25' : 'transform -translate-x-0.25') : ''
        }`}></div>
        <div className={`absolute top-2.5 left-2.5 w-0.5 h-1 bg-blue-600 transition-transform duration-100 ${
          isWalking && !isJumping ? (walkFrame % 2 === 0 ? 'transform -translate-x-0.25' : 'transform translate-x-0.25') : ''
        }`}></div>
        
        {/* Row 12 - Brown Shoes */}
        <div className="absolute top-2.75 left-0.5 w-1 h-1 bg-amber-800"></div>
        <div className="absolute top-2.75 left-2.5 w-1 h-1 bg-amber-800"></div>
      </div>
    </div>
    )
  }

  // Question blocks and world elements
  const WorldElements = () => (
    <>
      {/* Question blocks */}
      {[200, 800, 1400, 2000, 2600].map((x, index) => (
        <motion.div
          key={`question-${index}`}
          className="absolute"
          style={{ 
            left: x - cameraOffset, 
            bottom: 140,
            transform: x - cameraOffset < -50 || x - cameraOffset > VIEWPORT_WIDTH + 50 ? 'scale(0)' : 'scale(1)'
          }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="w-8 h-8 bg-yellow-500 border-2 border-yellow-600 flex items-center justify-center text-xl font-bold">
            ?
          </div>
        </motion.div>
      ))}
      
      {/* Pipes */}
      {[1000, 1800, 3200].map((x, index) => (
        <div
          key={`pipe-${index}`}
          className="absolute"
          style={{ 
            left: x - cameraOffset, 
            bottom: 80,
            transform: x - cameraOffset < -100 || x - cameraOffset > VIEWPORT_WIDTH + 100 ? 'scale(0)' : 'scale(1)'
          }}
        >
          <div className="w-12 h-20 bg-green-600 border-4 border-green-800 rounded-t-lg">
            <div className="w-full h-4 bg-green-500 border-b-2 border-green-700"></div>
          </div>
        </div>
      ))}
      
      {/* Classic Mario Clouds - White and fluffy */}
      {[150, 400, 700, 1200, 1600, 2200, 2800, 3400, 4000, 4400].map((x, index) => (
        <div
          key={`cloud-${index}`}
          className="absolute"
          style={{ 
            left: x - cameraOffset * 0.2, 
            top: `${15 + (index % 3) * 20}%`,
            transform: (x - cameraOffset * 0.2) < -100 || (x - cameraOffset * 0.2) > VIEWPORT_WIDTH + 100 ? 'scale(0)' : 'scale(1)'
          }}
        >
          {/* Classic 8-bit cloud shape */}
          <div className="relative">
            {/* Main cloud body */}
            <div className="w-12 h-8 bg-white relative" style={{ imageRendering: 'pixelated' }}>
              {/* Left bumps */}
              <div className="absolute -left-2 top-2 w-4 h-4 bg-white rounded-full"></div>
              <div className="absolute -left-1 top-0 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute -left-1 top-5 w-3 h-3 bg-white rounded-full"></div>
              
              {/* Right bumps */}
              <div className="absolute -right-2 top-2 w-4 h-4 bg-white rounded-full"></div>
              <div className="absolute -right-1 top-0 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute -right-1 top-5 w-3 h-3 bg-white rounded-full"></div>
              
              {/* Top bumps */}
              <div className="absolute left-2 -top-2 w-4 h-4 bg-white rounded-full"></div>
              <div className="absolute left-6 -top-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Background Hills - Responsive Green rolling hills */}
      {[100, 600, 1400, 2200, 3000, 3800].map((x, index) => (
        <div
          key={`hill-${index}`}
          className="absolute"
          style={{ 
            left: x - cameraOffset * 0.5, 
            bottom: screenDimensions.width < 640 ? 80 : screenDimensions.width < 1024 ? 96 : 112,
            transform: (x - cameraOffset * 0.5) < -200 || (x - cameraOffset * 0.5) > VIEWPORT_WIDTH + 200 ? 'scale(0)' : 'scale(1)'
          }}
        >
          <div className={`${
            index % 2 === 0 ? 
              (screenDimensions.width < 640 ? 'w-24 h-12' : 'w-32 h-16') : 
              (screenDimensions.width < 640 ? 'w-16 h-8' : 'w-24 h-12')
          } bg-green-500 rounded-t-full border-t-2 sm:border-t-4 border-green-600`}></div>
        </div>
      ))}
    </>
  )

  useEffect(() => {
    unlockAchievement("8-Bit Explorer")
  }, [unlockAchievement])

  return (
    <div 
      className="fixed inset-0 bg-blue-400 overflow-hidden select-none"
      style={{ 
        imageRendering: 'pixelated',
        height: '100dvh', // Dynamic viewport height for mobile
        touchAction: 'none' // Prevent default touch behaviors
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Classic Mario HUD - Mobile Compact */}
      <div className="absolute top-0 left-0 w-full h-8 sm:h-12 lg:h-16 bg-black text-white z-50 flex items-center px-1 sm:px-2 lg:px-4 font-mono" 
           style={{ 
             imageRendering: 'pixelated',
             fontSize: screenDimensions.width < 640 ? '8px' : screenDimensions.width < 1024 ? '11px' : '14px'
           }}>
        <div className="flex-1 text-center">
          <div className="text-white font-bold">MARIO</div>
          <div className="text-white">{String(gameState.score).padStart(6, '0')}</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-yellow-400">🪙×{String(gameState.coins).padStart(2, '0')}</div>
          <div className="text-white text-xs hidden sm:block">COINS</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-white font-bold">WORLD</div>
          <div className="text-white">1-1</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-white font-bold">{screenDimensions.width < 640 ? 'PROG' : 'PROGRESS'}</div>
          <div className="text-white">{visitedLocations.length}/{timelineLocations.length}</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-white font-bold">TIME</div>
          <div className="text-white">∞</div>
        </div>
      </div>

      {/* Instructions Panel - Mobile Responsive */}
      {showInstructions && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black/95 border-2 sm:border-4 border-yellow-400 rounded-lg p-3 sm:p-6 text-center max-w-xs sm:max-w-md mx-2"
          style={{ fontSize: screenDimensions.width < 640 ? '12px' : '16px' }}
        >
          <h3 className="text-yellow-400 font-bold text-lg sm:text-2xl mb-3 sm:mb-4">🎮 MARIO'S JOURNEY!</h3>
          <div className="text-white text-xs sm:text-sm space-y-1 sm:space-y-3 mb-3 sm:mb-6">
            <p><strong>Desktop:</strong> ←→ A/D to walk, ↑/Space to jump</p>
            <p><strong>Mobile:</strong> Swipe left/right to move, tap to jump</p>
            <p><strong>Explore:</strong> Walk through my career timeline!</p>
            <div className="text-yellow-400 text-xs mt-2 animate-pulse">
              🎵 Touch anywhere to enable sound! 🎵
            </div>
          </div>
          <button
            onClick={() => {
              setShowInstructions(false)
              playSound("select")
            }}
            className="bg-yellow-400 text-black px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors text-xs sm:text-lg shadow-lg"
          >
            START ADVENTURE!
          </button>
        </motion.div>
      )}

      {/* 8-bit Ground with Brick Pattern - Always Visible */}
      <div className="absolute bottom-0 w-full h-20 sm:h-24 lg:h-28 z-10">
        {/* Main ground */}
        <div className="w-full h-full bg-gradient-to-t from-amber-800 to-amber-600 border-t-4 border-amber-900">
          {/* Brick pattern */}
          <div className="absolute inset-0">
            {[...Array(Math.ceil(WORLD_WIDTH / 32))].map((_, i) => (
              <div key={i} className="absolute w-8 h-5 border border-amber-900/50" style={{ left: i * 32 - cameraOffset, top: 2 }}></div>
            ))}
            {[...Array(Math.ceil(WORLD_WIDTH / 32))].map((_, i) => (
              <div key={i} className="absolute w-8 h-5 border border-amber-900/50" style={{ left: (i * 32) + 16 - cameraOffset, top: 8 }}></div>
            ))}
            {[...Array(Math.ceil(WORLD_WIDTH / 32))].map((_, i) => (
              <div key={i} className="absolute w-8 h-5 border border-amber-900/50" style={{ left: i * 32 - cameraOffset, top: 14 }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* World Container with Camera Offset */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateX(-${cameraOffset}px)` }}
      >
        <WorldElements />
        
        {/* Timeline Locations - Responsive Enhanced Mario Elements */}
        {timelineLocations.map((location, index) => (
          <motion.div
            key={location.id}
            className="absolute"
            style={{ 
              left: location.worldX, 
              bottom: screenDimensions.width < 640 ? 80 : screenDimensions.width < 1024 ? 96 : 112
            }}
            initial={{ scale: 0, y: 20 }}
            animate={{ 
              scale: visitedLocations.includes(location.id) ? 1.1 : 1,
              y: visitedLocations.includes(location.id) ? -5 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {location.type === 'experience' ? (
              /* Castle for Experience - Responsive */
              <div className="relative">
                {/* Castle Base */}
                <div className={`${
                  screenDimensions.width < 640 ? 'w-16 h-20' : 'w-20 h-24'
                } bg-gray-500 border-2 sm:border-4 border-gray-700 relative`}>
                  {/* Castle Towers */}
                  <div className={`absolute -top-2 left-1 ${
                    screenDimensions.width < 640 ? 'w-3 h-6' : 'w-4 h-8'
                  } bg-gray-600 border border-gray-800 sm:border-2`}></div>
                  <div className={`absolute -top-2 right-1 ${
                    screenDimensions.width < 640 ? 'w-3 h-6' : 'w-4 h-8'
                  } bg-gray-600 border border-gray-800 sm:border-2`}></div>
                  <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 ${
                    screenDimensions.width < 640 ? 'w-3 h-6' : 'w-4 h-8'
                  } bg-gray-600 border border-gray-800 sm:border-2`}></div>
                  
                  {/* Castle Gate */}
                  <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 ${
                    screenDimensions.width < 640 ? 'w-6 h-10' : 'w-8 h-12'
                  } bg-black rounded-t-full border border-gray-800 sm:border-2`}></div>
                  
                  {/* Flag on top */}
                  <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-1 ${
                    screenDimensions.width < 640 ? 'h-6' : 'h-8'
                  } bg-yellow-600`}></div>
                  <motion.div
                    className={`absolute -top-6 left-1/2 ${
                      screenDimensions.width < 640 ? 'w-4 h-3' : 'w-6 h-4'
                    } bg-red-500 border border-red-700`}
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="text-white text-xs font-bold text-center">💼</div>
                  </motion.div>
                  
                  {/* Windows */}
                  <div className={`absolute top-4 left-3 ${
                    screenDimensions.width < 640 ? 'w-1.5 h-1.5' : 'w-2 h-2'
                  } bg-yellow-400 border border-yellow-600`}></div>
                  <div className={`absolute top-4 right-3 ${
                    screenDimensions.width < 640 ? 'w-1.5 h-1.5' : 'w-2 h-2'
                  } bg-yellow-400 border border-yellow-600`}></div>
                </div>
                
                {/* Visited Star */}
                {visitedLocations.includes(location.id) && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className={`absolute -top-8 -right-2 text-yellow-300 ${
                      screenDimensions.width < 640 ? 'text-lg' : 'text-2xl'
                    } animate-pulse`}
                  >
                    ⭐
                  </motion.div>
                )}
              </div>
            ) : (
              /* Warp Pipe for Education - Responsive */
              <div className="relative">
                <motion.div
                  className={`${
                    screenDimensions.width < 640 ? 'w-12 h-20' : 'w-16 h-28'
                  } bg-green-500 border-2 sm:border-4 border-green-700 rounded-t-2xl relative overflow-hidden`}
                  animate={{ 
                    y: visitedLocations.includes(location.id) ? [0, -2, 0] : [0, -1, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Number.POSITIVE_INFINITY, 
                    ease: "easeInOut" 
                  }}
                >
                  {/* Pipe Lip */}
                  <div className={`absolute top-0 left-0 w-full ${
                    screenDimensions.width < 640 ? 'h-4' : 'h-6'
                  } bg-green-400 border-b-2 border-green-800 rounded-t-2xl`}></div>
                  
                  {/* Pipe Highlights */}
                  <div className={`absolute ${
                    screenDimensions.width < 640 ? 'top-4 left-1.5 w-1.5 h-14' : 'top-6 left-2 w-2 h-20'
                  } bg-green-400 opacity-60`}></div>
                  <div className={`absolute ${
                    screenDimensions.width < 640 ? 'top-4 right-1.5 w-1.5 h-14' : 'top-6 right-2 w-2 h-20'
                  } bg-green-600 opacity-60`}></div>
                  
                  {/* Education Icon */}
                  <div className={`absolute ${
                    screenDimensions.width < 640 ? 'top-6' : 'top-8'
                  } left-1/2 transform -translate-x-1/2 text-white ${
                    screenDimensions.width < 640 ? 'text-lg' : 'text-2xl'
                  }`}>
                    🎓
                  </div>
                  
                  {/* Pipe Entrance Glow */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${
                    screenDimensions.width < 640 ? 'w-6 h-3' : 'w-8 h-4'
                  } bg-black rounded-full border-2 border-green-800`}>
                    <div className="w-full h-full bg-gradient-to-t from-purple-900 to-transparent rounded-full"></div>
                  </div>
                </motion.div>
                
                {/* Visited Star */}
                {visitedLocations.includes(location.id) && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className={`absolute -top-4 -right-2 text-yellow-300 ${
                      screenDimensions.width < 640 ? 'text-lg' : 'text-2xl'
                    } animate-pulse`}
                  >
                    ⭐
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Mario Character - Responsive Fixed Position */}
      <motion.div
        className="absolute z-30"
        style={{ 
          left: marioPosition.x, 
          bottom: isJumping ? (screenDimensions.width < 640 ? 110 : 150) : (screenDimensions.width < 640 ? 80 : 96),
        }}
        animate={{
          y: isJumping ? [-(screenDimensions.width < 640 ? 30 : 40), 0] : [0, -1, 0],
        }}
        transition={{
          duration: isJumping ? 0.6 : 2,
          repeat: isJumping ? 0 : Number.POSITIVE_INFINITY,
          ease: isJumping ? "easeOut" : "easeInOut"
        }}
      >
        <div className="relative">
          <Mario8BitSprite 
            isWalking={isWalking} 
            isJumping={isJumping} 
            facingRight={facingRight}
            walkFrame={walkFrame}
          />
          
          {/* Jump sound effect - responsive */}
          {isJumping && (
            <motion.div
              initial={{ scale: 0, y: 0 }}
              animate={{ scale: [1, 1.2, 0], y: [-20, -40, -60] }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold pointer-events-none"
              style={{ fontSize: screenDimensions.width < 640 ? '12px' : '14px' }}
            >
              WAHOO!
            </motion.div>
          )}
          
          {/* Mario's shadow - responsive */}
          <div 
            className="absolute bg-black/30 rounded-full blur-sm"
            style={{
              width: screenDimensions.width < 640 ? '24px' : '32px',
              height: screenDimensions.width < 640 ? '6px' : '8px',
              bottom: isJumping ? (screenDimensions.width < 640 ? -95 : -115) : (screenDimensions.width < 640 ? -20 : -24),
              left: '50%',
              transform: 'translateX(-50%)',
              transition: 'bottom 0.3s ease-out'
            }}
          />
        </div>
      </motion.div>

      {/* Journey Information - Compact Mobile Dialog */}
      {currentLocationInfo && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="absolute bottom-32 sm:bottom-20 left-2 right-2 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:w-full sm:max-w-lg lg:max-w-2xl z-40"
          style={{ maxHeight: screenDimensions.width < 640 ? screenDimensions.height * 0.4 : screenDimensions.height * 0.6 }}
        >
          {/* Compact Mario dialog box */}
          <div 
            className="bg-black border border-white sm:border-2 rounded p-2 sm:p-4 shadow-xl font-mono overflow-y-auto"
            style={{ 
              imageRendering: 'pixelated',
              fontSize: screenDimensions.width < 640 ? '10px' : '14px',
              maxHeight: 'inherit'
            }}
          >
            {/* Dialog box pointer - Hidden on mobile */}
            <div className="hidden sm:block absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-white"></div>
            
            {/* Compact Header */}
            <div className="text-center mb-1 sm:mb-3">
              <div className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                currentLocationInfo.type === 'experience' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-blue-600 text-white'
              }`}>
                {currentLocationInfo.type === 'experience' ? '🏰 CAREER' : '🎓 EDUCATION'}
              </div>
            </div>
            
            {/* Compact content layout */}
            <div className="space-y-1 sm:space-y-2">
              {/* Title - Compact */}
              <div className="text-center">
                <h3 className="text-yellow-400 font-bold text-xs sm:text-sm leading-tight">
                  {screenDimensions.width < 640 ? 
                    currentLocationInfo.title.length > 20 ? 
                      currentLocationInfo.title.substring(0, 17) + '...' : 
                      currentLocationInfo.title 
                    : currentLocationInfo.title.toUpperCase()}
                </h3>
                <div className="text-white text-xs">
                  {currentLocationInfo.subtitle}
                </div>
              </div>
              
              {/* Date and Location - Ultra Compact */}
              <div className="bg-gray-800 border border-gray-600 rounded p-1 sm:p-2">
                <div className="text-green-400 text-xs">
                  📅 {currentLocationInfo.startDate} - {currentLocationInfo.endDate}
                </div>
                {screenDimensions.width >= 640 && (
                  <div className="text-blue-400 text-xs">
                    📍 {currentLocationInfo.location}
                  </div>
                )}
              </div>
              
              {/* Description - Condensed */}
              <div className="bg-white text-black p-1 sm:p-2 rounded text-xs leading-tight">
                {screenDimensions.width < 640 ? 
                  currentLocationInfo.description.length > 100 ? 
                    currentLocationInfo.description.substring(0, 97) + '...' : 
                    currentLocationInfo.description
                  : currentLocationInfo.description}
              </div>
              
              {/* Achievement - Compact */}
              {currentLocationInfo.achievements.length > 0 && (
                <div className="bg-yellow-200 text-black p-1 sm:p-2 rounded text-xs">
                  <div className="font-bold">⭐ Achievement:</div>
                  <div>
                    {screenDimensions.width < 640 ? 
                      currentLocationInfo.achievements[0].length > 60 ? 
                        currentLocationInfo.achievements[0].substring(0, 57) + '...' : 
                        currentLocationInfo.achievements[0]
                      : currentLocationInfo.achievements[0]}
                  </div>
                </div>
              )}
              
              {/* Technologies - Minimal */}
              {currentLocationInfo.technologies && currentLocationInfo.technologies.length > 0 && (
                <div className="pt-1 border-t border-gray-600">
                  <div className="text-white text-xs font-bold mb-1 text-center">🔧 TECH:</div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {currentLocationInfo.technologies.slice(0, screenDimensions.width < 640 ? 3 : 4).map((tech: string, index: number) => (
                      <span key={index} className="px-1 py-0.5 bg-orange-500 rounded text-xs text-white font-bold">
                        {tech}
                      </span>
                    ))}
                    {currentLocationInfo.technologies.length > (screenDimensions.width < 640 ? 3 : 4) && (
                      <span className="px-1 py-0.5 bg-purple-500 rounded text-xs text-white font-bold">
                        +{currentLocationInfo.technologies.length - (screenDimensions.width < 640 ? 3 : 4)}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {/* Continue instruction - Minimal */}
              <div className="text-center pt-1 border-t border-gray-600">
                <div className="text-yellow-400 text-xs font-bold animate-pulse">
                  {screenDimensions.width < 640 ? '🎮 SWIPE →' : '🎮 PRESS → TO CONTINUE!'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mario-style Score Popup - Mobile Responsive */}
      {scorePopup && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 1 }}
          animate={{ opacity: 1, y: -(screenDimensions.width < 640 ? 30 : 50), scale: screenDimensions.width < 640 ? 1 : 1.2 }}
          exit={{ opacity: 0, y: -(screenDimensions.width < 640 ? 60 : 100), scale: 0.8 }}
          className="absolute z-50 pointer-events-none"
          style={{ 
            left: Math.min(scorePopup.x, screenDimensions.width - 120), 
            top: scorePopup.y 
          }}
        >
          <div className="bg-yellow-400 text-black px-2 sm:px-4 py-1 sm:py-2 rounded border-2 sm:border-4 border-yellow-600 font-bold shadow-2xl">
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-black">+{scorePopup.points}</div>
              <div className="text-xs font-bold">{scorePopup.text}</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Touch Instructions - Smart Positioning */}
      <div className={`sm:hidden absolute left-1/2 transform -translate-x-1/2 z-30 ${currentLocationInfo ? 'bottom-2' : 'bottom-6'}`}>
        <motion.div 
          className="bg-black/80 border border-yellow-400 rounded px-3 py-1 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="text-yellow-400 text-xs font-bold">🎮 CONTROLS</div>
          <div className="text-white text-xs">
            Swipe ←→ • Tap to jump
          </div>
        </motion.div>
      </div>


    </div>
  )
}

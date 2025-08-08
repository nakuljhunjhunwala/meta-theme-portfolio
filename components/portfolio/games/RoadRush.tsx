"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playTone } from "@/lib/audio"

// Mobile-first, pixel-styled top-down lane runner.
// Optimized with a single rAF game loop and lightweight DOM.

const GAME_WIDTH = 360
const GAME_HEIGHT = 640
const LANE_COUNT = 3

type ObstacleType = "car" | "coin"

interface Obstacle {
  id: number
  lane: number
  y: number // in px, 0 at top
  type: ObstacleType
  speed: number
  collected?: boolean
  passed?: boolean
}

const RoadRush: React.FC = () => {
  const [isClient, setIsClient] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [playerLane, setPlayerLane] = useState(1)
  const [boosting, setBoosting] = useState(false)

  const gameLoopRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const spawnTimerRef = useRef<number>(0)
  const spawnIntervalRef = useRef<number>(900)
  const nextIdRef = useRef<number>(1)
  const speedBaseRef = useRef<number>(3.6) // base speed in px/ms
  const speedScaleRef = useRef<number>(1)
  const stripeOffsetRef = useRef<number>(0)

  const obstaclesRef = useRef<Obstacle[]>([])
  const [obstacles, setObstacles] = useState<Obstacle[]>([])

  // Derived sizes (expressed in percents in render)
  const carWidth = 72
  const carHeight = 110
  const coinSize = 36
  const playerY = GAME_HEIGHT - carHeight - 26

  // Audio cues (Mario-ish simple tones)
  const sStart = useCallback(() => playTone(420, 110, 0.05, "sine"), [])
  const sMove = useCallback(() => playTone(360, 70, 0.04, "sine"), [])
  const sCoin = useCallback(() => playTone(560, 90, 0.05, "sine"), [])
  const sCrash = useCallback(() => playTone(240, 240, 0.06, "sine"), [])
  const sBoost = useCallback(() => playTone(520, 100, 0.05, "square"), [])
  const sPauseResume = useCallback((resume: boolean) => playTone(resume ? 360 : 280, 80, 0.04, "sine"), [])

  const laneToX = (lane: number) => {
    const laneWidth = GAME_WIDTH / LANE_COUNT
    const x = lane * laneWidth + laneWidth / 2 - carWidth / 2
    return Math.max(0, Math.min(x, GAME_WIDTH - carWidth))
  }

  const resetGame = useCallback(() => {
    setGameStarted(false)
    setGameOver(false)
    setIsPaused(false)
    setScore(0)
    setPlayerLane(1)
    setBoosting(false)
    obstaclesRef.current = []
    setObstacles([])
    spawnTimerRef.current = 0
    spawnIntervalRef.current = 900
    speedBaseRef.current = 3.6
    speedScaleRef.current = 1
    stripeOffsetRef.current = 0
    nextIdRef.current = 1
  }, [])

  useEffect(() => {
    setIsClient(true)
    resetGame()
    const saved = localStorage.getItem("roadrush-high")
    if (saved) setHighScore(parseInt(saved, 10))
  }, [resetGame])

  const startGame = useCallback(() => {
    if (!gameStarted) {
      setGameStarted(true)
      sStart()
    }
  }, [gameStarted, sStart])

  const togglePause = useCallback(() => {
    if (gameStarted && !gameOver) {
      setIsPaused((p) => {
        sPauseResume(p)
        return !p
      })
    }
  }, [gameStarted, gameOver, sPauseResume])

  const doBoost = useCallback(() => {
    if (!gameStarted || gameOver) return
    if (boosting) return
    setBoosting(true)
    sBoost()
    speedScaleRef.current = 1.65
    setTimeout(() => {
      speedScaleRef.current = 1
      setBoosting(false)
    }, 900)
  }, [gameStarted, gameOver, boosting, sBoost])

  const moveLeft = useCallback(() => {
    if (!gameStarted) return startGame()
    if (gameOver || isPaused) return
    setPlayerLane((l) => {
      const nl = Math.max(0, l - 1)
      if (nl !== l) sMove()
      return nl
    })
  }, [gameOver, isPaused, sMove, startGame, gameStarted])

  const moveRight = useCallback(() => {
    if (!gameStarted) return startGame()
    if (gameOver || isPaused) return
    setPlayerLane((l) => {
      const nl = Math.min(LANE_COUNT - 1, l + 1)
      if (nl !== l) sMove()
      return nl
    })
  }, [gameOver, isPaused, sMove, startGame, gameStarted])

  const spawnObstacle = useCallback(() => {
    // Weighted spawn: 80% cars, 20% coins
    const isCoin = Math.random() < 0.2
    const lane = Math.floor(Math.random() * LANE_COUNT)
    const speedJitter = (Math.random() * 0.6 + 0.8)
    const speed = speedBaseRef.current * (isCoin ? 0.9 : 1.0) * speedJitter
    const o: Obstacle = {
      id: nextIdRef.current++,
      lane,
      y: - (isCoin ? coinSize : carHeight) - 8,
      type: isCoin ? "coin" : "car",
      speed,
      collected: false,
      passed: false,
    }
    obstaclesRef.current = [...obstaclesRef.current, o]
    setObstacles(obstaclesRef.current)
  }, [])

  const rectsOverlap = (ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number): boolean => {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by
  }

  const gameLoop = useCallback((t?: number) => {
    const now = t ?? performance.now()
    const dtMs = Math.min(32, now - (lastTimeRef.current || now))
    const dt = dtMs // in ms
    lastTimeRef.current = now

    if (!gameStarted || isPaused || gameOver) {
      gameLoopRef.current = requestAnimationFrame(() => gameLoop(performance.now()))
      return
    }

    // Move stripes for road illusion
    stripeOffsetRef.current = (stripeOffsetRef.current + speedBaseRef.current * speedScaleRef.current * dt * 0.6) % 40

    // Increase difficulty gradually
    speedBaseRef.current = Math.min(6.5, speedBaseRef.current + dt * 0.00003)
    spawnIntervalRef.current = Math.max(520, spawnIntervalRef.current - dt * 0.005)

    // Spawn logic
    spawnTimerRef.current += dt
    if (spawnTimerRef.current >= spawnIntervalRef.current) {
      spawnTimerRef.current = 0
      spawnObstacle()
    }

    // Move obstacles and handle logic
    const playerX = laneToX(playerLane)
    const playerRect = { x: playerX, y: playerY, w: carWidth, h: carHeight }

    let next = obstaclesRef.current
      .map((o) => ({ ...o, y: o.y + o.speed * speedScaleRef.current * dt * 0.06 }))
      .filter((o) => o.y < GAME_HEIGHT + 80)

    // Score passing and coin collection
    for (const o of next) {
      if (o.type === "car") {
        // Passing score
        if (!o.passed && o.y > playerRect.y + playerRect.h) {
          o.passed = true
          setScore((s) => s + 5)
        }
        // Collision
        const ox = laneToX(o.lane)
        if (rectsOverlap(playerRect.x, playerRect.y, playerRect.w, playerRect.h, ox, o.y, carWidth, carHeight)) {
          setGameOver(true)
          setGameStarted(false)
          if (score > highScore) {
            setHighScore(score)
            localStorage.setItem("roadrush-high", String(score))
          }
          sCrash()
          break
        }
      } else if (o.type === "coin" && !o.collected) {
        const ox = laneToX(o.lane) + carWidth / 2 - coinSize / 2
        if (rectsOverlap(playerRect.x, playerRect.y, playerRect.w, playerRect.h, ox, o.y, coinSize, coinSize)) {
          o.collected = true
          setScore((s) => s + 10)
          sCoin()
        }
      }
    }

    // Remove collected coins visually
    next = next.filter((o) => !(o.type === "coin" && o.collected))

    obstaclesRef.current = next
    setObstacles(obstaclesRef.current)

    gameLoopRef.current = requestAnimationFrame(() => gameLoop(performance.now()))
  }, [gameStarted, isPaused, gameOver, playerLane, highScore, score, sCrash, sCoin])

  useEffect(() => {
    lastTimeRef.current = performance.now()
    gameLoopRef.current = requestAnimationFrame(() => gameLoop(performance.now()))
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current)
    }
  }, [gameLoop])

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          moveLeft()
          break
        case "ArrowRight":
          e.preventDefault()
          moveRight()
          break
        case "ArrowUp":
        case "Shift":
          e.preventDefault()
          doBoost()
          break
        case " ":
        case "Escape":
          e.preventDefault()
          togglePause()
          break
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [moveLeft, moveRight, doBoost, togglePause])

  if (!isClient) return null

  const laneWidthPct = (100 / LANE_COUNT)
  const carWidthPct = (carWidth / GAME_WIDTH) * 100
  const carHeightPct = (carHeight / GAME_HEIGHT) * 100
  const coinSizePct = (coinSize / GAME_WIDTH) * 100 * (GAME_WIDTH / GAME_HEIGHT)
  const playerXPct = (laneToX(playerLane) / GAME_WIDTH) * 100
  const playerYPct = (playerY / GAME_HEIGHT) * 100

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Title & HUD */}
      <div className="mb-3 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-red-400 pixel-text drop-shadow-lg">
          🏁 ROAD RUSH 🏁
        </h2>
        <div className="flex justify-center gap-4 sm:gap-8 text-sm sm:text-base font-bold mt-1">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">SCORE</span>
            <div className="bg-yellow-400 text-black px-3 py-1 rounded font-mono text-base sm:text-lg">
              {score.toString().padStart(5, "0")}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">HIGH</span>
            <div className="bg-green-400 text-black px-3 py-1 rounded font-mono text-base sm:text-lg">
              {highScore.toString().padStart(5, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div
        className="relative w-full max-w-md bg-black border-4 border-yellow-400 overflow-hidden rounded-md shadow-2xl game-screen"
        style={{ aspectRatio: `${GAME_WIDTH}/${GAME_HEIGHT}`, maxHeight: "75vh" }}
        onClick={() => {
          if (!gameStarted) startGame()
        }}
      >
        {/* Road background: plain black with white markings */}
        <div className="absolute inset-0 bg-black" />
        {/* Solid edge lines */}
        <div className="absolute top-0 bottom-0 w-[3px] bg-white/90 left-2" />
        <div className="absolute top-0 bottom-0 w-[3px] bg-white/90 right-2" />
        {/* Lane separators (dashed white) */}
        {[1, 2].map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-[2px] opacity-90"
            style={{
              left: `${(i * 100) / 3}%`,
              transform: "translateX(-1px)",
              backgroundImage: `repeating-linear-gradient(to bottom, white 0 10px, transparent 10px 26px)`,
              backgroundPositionY: `${stripeOffsetRef.current}px`,
            }}
          />
        ))}

        {/* Player car (enhanced design) */}
        <motion.div
          className="absolute border-4 border-black rounded-md"
          animate={{ left: `${playerXPct}%` }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
          style={{
            bottom: `${100 - playerYPct - carHeightPct}%`,
            width: `${carWidthPct}%`,
            height: `${carHeightPct}%`,
            background: "linear-gradient(#ef4444, #b91c1c)",
            boxShadow: "0 0 10px rgba(255, 59, 48, 0.35)",
          }}
        >
          {/* Bumpers */}
          <div className="absolute top-0 inset-x-2 h-2 bg-white/70" />
          <div className="absolute bottom-0 inset-x-2 h-2 bg-gray-900/90" />
          {/* Windshield */}
          <div className="absolute left-2 right-2 top-3 h-6 bg-white/85 border border-white/90" />
          {/* Center stripe */}
          <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-6 w-[3px] bg-white/20" />
          {/* Headlights */}
          <div className="absolute top-1 left-2 w-4 h-2 bg-yellow-300 border border-yellow-600" />
          <div className="absolute top-1 right-2 w-4 h-2 bg-yellow-300 border border-yellow-600" />
          {/* Wheels */}
          <div className="absolute bottom-1 left-1 w-5 h-8 bg-black" />
          <div className="absolute bottom-1 right-1 w-5 h-8 bg-black" />
        </motion.div>

        {/* Obstacles */}
        {obstacles.map((o) => {
          const xPx = o.type === "coin"
            ? laneToX(o.lane) + carWidth / 2 - coinSize / 2
            : laneToX(o.lane)
          const xPct = (xPx / GAME_WIDTH) * 100
          const yPct = (o.y / GAME_HEIGHT) * 100
          if (o.type === "coin") {
            return (
              <div
                key={o.id}
                className="absolute rounded-full border-4 border-black"
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  width: `${coinSizePct}%`,
                  height: `${coinSizePct}%`,
                  background: "radial-gradient(circle at 30% 30%, #fde047, #f59e0b)",
                  boxShadow: "0 0 18px rgba(234,179,8,0.7)",
                }}
              >
                <div className="absolute inset-1 border-2 border-white/60 rounded-full" />
              </div>
            )
          }
          return (
            <div
              key={o.id}
              className="absolute border-4 border-black rounded-md"
              style={{
                left: `${xPct}%`,
                top: `${yPct}%`,
                width: `${carWidthPct}%`,
                height: `${carHeightPct}%`,
                background: "linear-gradient(#60a5fa, #2563eb)",
                boxShadow: "0 0 8px rgba(59,130,246,0.4)",
              }}
            >
              {/* Opponent car details */}
              <div className="absolute top-0 inset-x-2 h-1.5 bg-white/60" />
              <div className="absolute bottom-0 inset-x-2 h-1.5 bg-gray-900/90" />
              <div className="absolute left-1 right-1 top-2 h-5 bg-white/75 border border-white/85" />
              <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-5 w-[3px] bg-white/15" />
              <div className="absolute bottom-1 left-1 w-3 h-2 bg-red-600 border border-red-800" />
              <div className="absolute bottom-1 right-1 w-3 h-2 bg-red-600 border border-red-800" />
              <div className="absolute bottom-1 left-1 w-4 h-7 bg-black" />
              <div className="absolute bottom-1 right-1 w-4 h-7 bg-black" />
            </div>
          )
        })}

        {/* Overlays */}
        <AnimatePresence>
          {(gameOver || isPaused || !gameStarted) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 flex items-center justify-center"
            >
              <div className="text-center px-4">
                {gameOver ? (
                  <>
                    <div className="text-3xl sm:text-4xl font-bold text-red-400 pixel-text mb-2">CRASH! 💥</div>
                    <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4">FINAL SCORE: {score}</div>
                  </>
                ) : !gameStarted ? (
                  <>
                    <div className="text-3xl sm:text-4xl font-bold text-yellow-400 pixel-text mb-2">ROAD RUSH</div>
                    <div className="text-sm sm:text-base text-white/80 mb-4">Tap anywhere to start. Dodge traffic and collect coins!</div>
                  </>
                ) : (
                  <div className="text-3xl sm:text-4xl font-bold text-yellow-400 pixel-text mb-2">⏸️ PAUSED</div>
                )}
                <div className="flex items-center justify-center gap-2">
                  {!gameStarted || gameOver ? (
                    <button
                      onClick={() => {
                        resetGame()
                        setGameStarted(true)
                        sStart()
                      }}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg border-2 border-green-400 pixel-text text-sm sm:text-base shadow-lg"
                    >
                      🎮 START
                    </button>
                  ) : (
                    <button
                      onClick={togglePause}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg border-2 border-yellow-400 pixel-text text-sm sm:text-base shadow-lg"
                    >
                      ▶️ RESUME
                    </button>
                  )}
                  {(gameOver || score > 0) && (
                    <button
                      onClick={resetGame}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg border-2 border-red-400 pixel-text text-sm sm:text-base shadow-lg"
                    >
                      🔄 RESET
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Controls */}
        <div className="absolute left-0 right-0 bottom-2 sm:bottom-4 flex items-center justify-center gap-2 sm:gap-4 select-none">
          <button
            onClick={moveLeft}
            className="sm:hidden px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md border-2 border-blue-400 shadow-lg active:scale-95"
          >
            ⬅️
          </button>
          <button
            onClick={doBoost}
            className={`sm:hidden px-4 py-3 ${boosting ? "bg-purple-700" : "bg-purple-600"} hover:bg-purple-700 text-white font-bold rounded-md border-2 border-purple-400 shadow-lg active:scale-95`}
          >
            ⚡ BOOST
          </button>
          <button
            onClick={moveRight}
            className="sm:hidden px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md border-2 border-blue-400 shadow-lg active:scale-95"
          >
            ➡️
          </button>
        </div>
      </div>

      {/* Desktop instructions */}
      <div className="hidden sm:block text-xs text-gray-300 text-center mt-2">
        ← → to switch lanes • ↑/Shift to boost • Space/Esc to pause
      </div>
    </div>
  )
}

export default RoadRush


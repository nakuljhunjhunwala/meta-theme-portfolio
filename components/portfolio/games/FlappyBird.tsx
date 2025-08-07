"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playTone } from "@/lib/audio"

const GAME_WIDTH = 600
const GAME_HEIGHT = 400
const BIRD_SIZE = 32
const PIPE_WIDTH = 64
const PIPE_GAP = 180
const GRAVITY = 0.5
const JUMP_FORCE = -10
const PIPE_SPEED = 2.6

interface Bird {
  x: number
  y: number
  velocity: number
  rotation: number
}

interface Pipe {
  id: number
  x: number
  topHeight: number
  bottomY: number
  passed: boolean
}

const FlappyBird = () => {
  const [isClient, setIsClient] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [bird, setBird] = useState<Bird>({
    x: 150,
    y: GAME_HEIGHT / 2,
    velocity: 0,
    rotation: 0
  })
  const [pipes, setPipes] = useState<Pipe[]>([])
  const [countdown, setCountdown] = useState<number | null>(null)
  
  const gameLoopRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const pipeIdRef = useRef(0)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  

  const resetGame = useCallback(() => {
    setGameStarted(false)
    setGameOver(false)
    setIsPaused(false)
    setScore(0)
    setBird({
      x: 150,
      y: GAME_HEIGHT / 2,
      velocity: 0,
      rotation: 0
    })
    setPipes([])
    pipeIdRef.current = 0
  }, [])

  useEffect(() => {
    setIsClient(true)
    resetGame()
    // Load best score from localStorage
    const saved = localStorage.getItem('flappy-bird-best')
    if (saved) {
      setBestScore(parseInt(saved, 10))
    }
    // ready
  }, [resetGame])
  const playBeep = useCallback(() => playTone(440, 90, 0.045, 'sine'), [])

  const startGame = useCallback(() => {
    if (!gameStarted && countdown === null) {
      setCountdown(3)
      let c = 3
      const id = setInterval(() => {
        c -= 1
        if (c <= 0) {
          clearInterval(id)
          setCountdown(null)
          setGameStarted(true)
          playBeep()
        } else {
          setCountdown(c)
          playBeep()
        }
      }, 1000)
    }
  }, [gameStarted, countdown, playBeep])

  const togglePause = useCallback(() => {
    if (gameStarted && !gameOver) {
      setIsPaused(!isPaused)
    }
  }, [gameStarted, gameOver, isPaused])

  const jump = useCallback(() => {
    if (!gameStarted) {
      startGame()
      return
    }
    
    if (gameOver) return
    
    setBird(prev => ({
      ...prev,
      velocity: JUMP_FORCE,
      rotation: -20
    }))
    playBeep()
  }, [gameStarted, gameOver, startGame, playBeep])

  const createPipe = useCallback((x: number) => {
    const minTopHeight = 50
    const maxTopHeight = GAME_HEIGHT - PIPE_GAP - 50
    const topHeight = Math.random() * (maxTopHeight - minTopHeight) + minTopHeight
    
    return {
      id: pipeIdRef.current++,
      x,
      topHeight,
      bottomY: topHeight + PIPE_GAP,
      passed: false
    }
  }, [])

  const checkCollision = useCallback((birdState: Bird, pipesState: Pipe[]) => {
    // Ground and ceiling collision
    if (birdState.y <= 0 || birdState.y + BIRD_SIZE >= GAME_HEIGHT) {
      return true
    }
    
    // Pipe collision
    for (const pipe of pipesState) {
      const birdLeft = birdState.x
      const birdRight = birdState.x + BIRD_SIZE
      const birdTop = birdState.y
      const birdBottom = birdState.y + BIRD_SIZE
      
      const pipeLeft = pipe.x
      const pipeRight = pipe.x + PIPE_WIDTH
      
      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        // Check top pipe collision
        if (birdTop < pipe.topHeight) {
          return true
        }
        // Check bottom pipe collision
        if (birdBottom > pipe.bottomY) {
          return true
        }
      }
    }
    
    return false
  }, [])

  const gameLoop = useCallback((currentTime?: number) => {
    if (!gameStarted || isPaused || gameOver) {
      gameLoopRef.current = requestAnimationFrame(() => gameLoop(performance.now()))
      return
    }

    const now = currentTime ?? performance.now()
    const dtMs = Math.min(32, now - (lastTimeRef.current || now))
    const dt = dtMs / 16.6667 // normalize to 60fps
    lastTimeRef.current = now

    setBird(prev => {
      const velocity = prev.velocity + GRAVITY * dt
      const y = prev.y + velocity * dt
      const rotation = Math.min(90, Math.max(-20, prev.rotation + 3 * dt))
      return { ...prev, velocity, y, rotation }
    })

    setPipes(prev => {
      let newPipes = prev.map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED * dt }))
      newPipes = newPipes.filter(pipe => pipe.x + PIPE_WIDTH > -50)
      const lastPipe = newPipes[newPipes.length - 1]
      if (!lastPipe || lastPipe.x < GAME_WIDTH - 250) {
        newPipes.push(createPipe(GAME_WIDTH))
      }
      newPipes.forEach(pipe => {
        if (!pipe.passed && bird.x > pipe.x + PIPE_WIDTH) {
          pipe.passed = true
          setScore(s => s + 1)
          playBeep()
        }
      })
      return newPipes
    })

    // Collision check after state updates
    setBird(currentBird => {
      setPipes(currentPipes => {
        if (checkCollision(currentBird, currentPipes)) {
          setGameOver(true)
          setGameStarted(false)
          if (score > bestScore) {
            setBestScore(score)
            localStorage.setItem('flappy-bird-best', score.toString())
          }
          playBeep()
        }
        return currentPipes
      })
      return currentBird
    })

    gameLoopRef.current = requestAnimationFrame(() => gameLoop(performance.now()))
  }, [gameStarted, isPaused, gameOver, bird.x, score, bestScore, checkCollision, createPipe])

  useEffect(() => {
    lastTimeRef.current = performance.now()
    gameLoopRef.current = requestAnimationFrame(() => gameLoop(performance.now()))
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameLoop])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case ' ':
      case 'ArrowUp':
        e.preventDefault()
        jump()
        break
      case 'Escape':
        e.preventDefault()
        togglePause()
        break
    }
  }, [jump, togglePause])

  const handleClick = useCallback(() => {
    jump()
  }, [jump])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  if (!isClient) return null

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="mb-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 pixel-text animate-pulse mb-2 drop-shadow-lg">
          🐦 FLAPPY BIRD RETRO 🐦
        </h2>
        <div className="text-sm sm:text-base text-white/80 mb-2">
          Fly through the pipes without crashing!
        </div>
        <div className="flex justify-center gap-4 sm:gap-8 text-base sm:text-lg font-bold">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">SCORE</span>
            <div className="bg-yellow-400 text-black px-3 py-1 rounded font-mono text-xl">
              {score}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">BEST</span>
            <div className="bg-purple-400 text-black px-3 py-1 rounded font-mono text-xl">
              {bestScore}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={gameAreaRef}
        className="relative w-full max-w-3xl bg-[#0b0f17] border border-white/10 overflow-hidden rounded-md shadow-xl cursor-pointer game-screen"
        style={{
          aspectRatio: `${GAME_WIDTH}/${GAME_HEIGHT}`,
          maxHeight: '70vh',
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
        onClick={handleClick}
      >
        {/* Moving clouds */}
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-40"
            animate={{
              x: [-100, GAME_WIDTH + 100],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              top: `${20 + i * 15}%`,
            }}
          >
            ☁️
          </motion.div>
        ))}

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#111726] border-t border-white/10" />

        {/* Bird (pixel sprite) */}
        <motion.div
          className="absolute"
          style={{
            left: `${(bird.x / GAME_WIDTH) * 100}%`,
            top: `${(bird.y / GAME_HEIGHT) * 100}%`,
            width: `${(BIRD_SIZE / GAME_WIDTH) * 100}%`,
            height: `${(BIRD_SIZE / GAME_HEIGHT) * 100}%`,
            transform: `rotate(${bird.rotation}deg)`,
            zIndex: 10
          }}
          animate={{ scale: gameStarted ? [1, 1.06, 1] : 1 }}
          transition={{ duration: 0.35, repeat: gameStarted ? Infinity : 0 }}
        >
          {
            // 12x9 pixel bird sprite (0=transparent, 1=body, 2=beak, 3=eye, 4=wing)
          }
          {(() => {
            const sprite: number[][] = [
              [0,0,0,1,1,1,1,0,0,0,0,0],
              [0,0,1,1,1,1,1,1,0,0,0,0],
              [0,1,1,1,1,3,1,1,1,0,0,0],
              [1,1,1,4,1,1,1,1,1,1,0,0],
              [1,1,4,4,1,1,1,1,1,1,2,0],
              [0,1,1,4,1,1,1,1,1,1,2,0],
              [0,0,1,1,1,1,1,1,1,0,0,0],
              [0,0,0,1,1,1,1,0,0,0,0,0],
              [0,0,0,0,0,1,0,0,0,0,0,0],
            ]
            const colors: Record<number, string> = {
              1: '#f6e05e', // body yellow
              2: '#f56565', // beak red-ish
              3: '#1a202c', // eye
              4: '#ecc94b', // wing shade
            }
            const rows = sprite.length
            const cols = sprite[0].length
            const px = 100 / cols
            const py = 100 / rows
            return (
              <div className="relative w-full h-full">
                {sprite.flatMap((row, y) =>
                  row.map((val, x) => val !== 0 ? (
                    <div key={`${x}-${y}`} className="absolute" style={{
                      left: `${x * px}%`,
                      top: `${y * py}%`,
                      width: `${px}%`,
                      height: `${py}%`,
                      backgroundColor: colors[val],
                      boxShadow: '0 0 2px rgba(0,0,0,0.2)'
                    }} />
                  ) : null)
                )}
              </div>
            )
          })()}
        </motion.div>

        {/* Pipes */}
        {pipes.map(pipe => (
          <div key={pipe.id}>
            {/* Top Pipe */}
            <div
              className="absolute border border-white/10"
              style={{
                left: `${(pipe.x / GAME_WIDTH) * 100}%`,
                top: 0,
                width: `${(PIPE_WIDTH / GAME_WIDTH) * 100}%`,
                height: `${(pipe.topHeight / GAME_HEIGHT) * 100}%`,
                background: 'linear-gradient(180deg, #9ae6b4 0%, #68d391 100%)',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'
              }}
            />
            
            {/* Top Pipe Cap */}
            <div
              className="absolute border border-white/10"
              style={{
                left: `${((pipe.x - 8) / GAME_WIDTH) * 100}%`,
                top: `${((pipe.topHeight - 20) / GAME_HEIGHT) * 100}%`,
                width: `${((PIPE_WIDTH + 16) / GAME_WIDTH) * 100}%`,
                height: `${(18 / GAME_HEIGHT) * 100}%`,
                background: '#48bb78'
              }}
            />
            
            {/* Bottom Pipe */}
            <div
              className="absolute border border-white/10"
              style={{
                left: `${(pipe.x / GAME_WIDTH) * 100}%`,
                top: `${(pipe.bottomY / GAME_HEIGHT) * 100}%`,
                width: `${(PIPE_WIDTH / GAME_WIDTH) * 100}%`,
                height: `${((GAME_HEIGHT - pipe.bottomY) / GAME_HEIGHT) * 100}%`,
                background: 'linear-gradient(180deg, #68d391 0%, #48bb78 100%)',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'
              }}
            />
            
            {/* Bottom Pipe Cap */}
            <div
              className="absolute border border-white/10"
              style={{
                left: `${((pipe.x - 8) / GAME_WIDTH) * 100}%`,
                top: `${(pipe.bottomY / GAME_HEIGHT) * 100}%`,
                width: `${((PIPE_WIDTH + 16) / GAME_WIDTH) * 100}%`,
                height: `${(18 / GAME_HEIGHT) * 100}%`,
                background: '#38a169'
              }}
            />
          </div>
        ))}

        {/* Game Start Overlay */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-lg">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center bg-black/60 border-2 border-yellow-400 rounded-lg p-4 sm:p-6"
            >
              <div className="text-5xl mb-4">🐦</div>
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 pixel-text mb-4">
                READY TO FLY?
              </h3>
              <div className="text-sm sm:text-base text-white/80 mb-6 space-y-2">
                <p>• Click or press SPACE to flap</p>
                <p>• Avoid the pipes and ground!</p>
                <p>• Try to beat your best score!</p>
                <p className="text-yellow-400">• ESC to pause</p>
              </div>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  startGame()
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold rounded-lg text-base sm:text-xl pixel-text border-2 border-yellow-400 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 0, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 START FLYING
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* Countdown Overlay */}
        {countdown !== null && !gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
            <motion.div
              key={countdown}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pixel-text text-yellow-400 drop-shadow-lg"
              style={{ fontSize: 'min(18vw, 140px)' }}
            >
              {countdown}
            </motion.div>
          </div>
        )}

        {/* Pause Overlay */}
        <AnimatePresence>
          {isPaused && gameStarted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg"
            >
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center bg-black/60 border-2 border-blue-400 rounded-lg p-4 sm:p-6"
              >
                <div className="text-4xl mb-4">⏸️</div>
                <h3 className="text-xl sm:text-2xl font-bold text-blue-400 pixel-text mb-4">
                  FLIGHT PAUSED
                </h3>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePause()
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-lg text-base sm:text-xl pixel-text border-2 border-blue-400 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ▶️ RESUME FLIGHT
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Over Overlay */}
        <AnimatePresence>
          {gameOver && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center rounded-lg"
            >
              <div className="text-center bg-black/60 border-2 border-red-400 rounded-lg p-4 sm:p-6 shadow-2xl">
                <div className="text-5xl sm:text-6xl mb-4">💥</div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 pixel-text drop-shadow-lg">
                  🪶 CRASHED! 🪶
                </p>
                <div className="mb-6 space-y-2">
                  <p className="text-lg sm:text-xl text-yellow-400 font-bold">
                    Score: {score}
                  </p>
                  {score === bestScore && score > 0 && (
                    <motion.p 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-base text-purple-400 font-bold pixel-text"
                    >
                      🎉 NEW BEST SCORE! 🎉
                    </motion.p>
                  )}
                  <p className="text-base text-white/60">
                    Best: {bestScore}
                  </p>
                </div>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    resetGame()
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold rounded-lg text-base sm:text-xl pixel-text border-2 border-red-400 shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 0, 0, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  🔄 FLY AGAIN
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Instructions */}
        {gameStarted && !isPaused && !gameOver && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-xs text-white/80 text-center block sm:hidden bg-black/40 px-3 py-1 rounded">
            Tap screen to flap wings
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="mt-4 block sm:hidden">
        <div className="text-center">
          <motion.button
            onTouchStart={jump}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-8 py-4 rounded-lg border-2 border-yellow-400 text-xl"
            whileTap={{ scale: 0.95 }}
          >
            🐦 FLAP WINGS
          </motion.button>
        </div>
        <div className="text-center mt-2">
          <motion.button
            onClick={togglePause}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded border border-gray-400"
            whileTap={{ scale: 0.95 }}
          >
            {isPaused ? "▶️ RESUME" : "⏸️ PAUSE"}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default FlappyBird
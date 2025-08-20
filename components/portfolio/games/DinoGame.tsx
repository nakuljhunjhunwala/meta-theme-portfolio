"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playTone } from "@/lib/audio"

const GAME_WIDTH = 800
const GAME_HEIGHT = 400
const DINO_WIDTH = 50
const DINO_HEIGHT = 50
const GROUND_HEIGHT = 60
const JUMP_FORCE = -15
const GRAVITY = 0.8
const GAME_SPEED = 6
const OBSTACLE_WIDTH = 30
const CACTUS_HEIGHT = 60
const BIRD_HEIGHT = 30

interface Dino {
  x: number
  y: number
  velocity: number
  isJumping: boolean
  isDucking: boolean
}

interface Obstacle {
  id: number
  x: number
  y: number
  width: number
  height: number
  type: 'cactus' | 'bird'
  passed: boolean
}

interface Cloud {
  id: number
  x: number
  y: number
  speed: number
}

const DinoGame = () => {
  const [isClient, setIsClient] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameSpeed, setGameSpeed] = useState(GAME_SPEED)
  
  const groundY = GAME_HEIGHT - GROUND_HEIGHT
  
  const [dino, setDino] = useState<Dino>({
    x: 80,
    y: groundY - DINO_HEIGHT,
    velocity: 0,
    isJumping: false,
    isDucking: false
  })
  
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [clouds, setClouds] = useState<Cloud[]>([])
  const [isHolding, setIsHolding] = useState(false)
  
  const gameLoopRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const obstacleIdRef = useRef(0)
  const cloudIdRef = useRef(0)
  const keysRef = useRef<Set<string>>(new Set())

  const resetGame = useCallback(() => {
    setGameStarted(false)
    setGameOver(false)
    setIsPaused(false)
    setScore(0)
    setGameSpeed(GAME_SPEED)
    setDino({
      x: 80,
      y: groundY - DINO_HEIGHT,
      velocity: 0,
      isJumping: false,
      isDucking: false
    })
    setObstacles([])
    setClouds([])
    obstacleIdRef.current = 0
    cloudIdRef.current = 0
    keysRef.current.clear()
  }, [groundY])

  useEffect(() => {
    setIsClient(true)
    resetGame()
    // Load high score from localStorage
    const saved = localStorage.getItem('dino-game-high')
    if (saved) {
      setHighScore(parseInt(saved, 10))
    }
    // Prepare audio context
    // ready
    
    // Initialize clouds
    setClouds([
      { id: cloudIdRef.current++, x: 200, y: 80, speed: 0.5 },
      { id: cloudIdRef.current++, x: 400, y: 60, speed: 0.7 },
      { id: cloudIdRef.current++, x: 600, y: 100, speed: 0.3 },
    ])
  }, [resetGame])

  const playStart = useCallback(() => playTone(420, 110, 0.045, 'sine'), [])
  const playPauseResume = useCallback((resuming: boolean) => {
    playTone(resuming ? 360 : 280, 80, 0.04, 'sine')
  }, [])
  const playJump = useCallback(() => playTone(480, 80, 0.045, 'sine'), [])
  const playDuck = useCallback(() => playTone(360, 70, 0.04, 'sine'), [])
  const playMilestone = useCallback(() => {
    playTone(540, 80, 0.045, 'sine')
    setTimeout(() => playTone(600, 90, 0.045, 'sine'), 80)
  }, [])
  const playGameOver = useCallback(() => playTone(240, 220, 0.055, 'sine'), [])

  const startGame = useCallback(() => {
    if (!gameStarted) {
      // resume audio on user gesture
      setGameStarted(true)
      playStart()
    }
  }, [gameStarted, playStart])

  const togglePause = useCallback(() => {
    if (gameStarted && !gameOver) {
      setIsPaused(!isPaused)
      playPauseResume(isPaused)
    }
  }, [gameStarted, gameOver, isPaused, playPauseResume])

  const jump = useCallback(() => {
    if (!gameStarted) {
      startGame()
      return
    }
    
    if (gameOver) return
    
    setDino(prev => {
      if (!prev.isJumping) {
        playJump()
        return {
          ...prev,
          velocity: JUMP_FORCE,
          isJumping: true,
          isDucking: false
        }
      }
      return prev
    })
  }, [gameStarted, gameOver, startGame, playJump])

  const duck = useCallback(() => {
    if (!gameStarted || gameOver) return
    
    setDino(prev => ({
      ...prev,
      isDucking: true
    }))
    playDuck()
  }, [gameStarted, gameOver, playDuck])

  const stopDuck = useCallback(() => {
    setDino(prev => ({
      ...prev,
      isDucking: false
    }))
    playPauseResume(true)
  }, [playPauseResume])

  const createObstacle = useCallback(() => {
    const type = Math.random() > 0.7 ? 'bird' : 'cactus'
    const obstacle: Obstacle = {
      id: obstacleIdRef.current++,
      x: GAME_WIDTH,
      y: type === 'bird' ? groundY - BIRD_HEIGHT - 30 : groundY - CACTUS_HEIGHT,
      width: OBSTACLE_WIDTH,
      height: type === 'bird' ? BIRD_HEIGHT : CACTUS_HEIGHT,
      type,
      passed: false
    }
    return obstacle
  }, [groundY])

  const checkCollision = useCallback((dinoState: Dino, obstaclesState: Obstacle[]) => {
    const dinoRect = {
      x: dinoState.x + 5, // Smaller hitbox for better gameplay
      y: dinoState.y + 5,
      width: DINO_WIDTH - 10,
      height: (dinoState.isDucking ? DINO_HEIGHT / 2 : DINO_HEIGHT) - 10
    }
    
    for (const obstacle of obstaclesState) {
      const obsRect = {
        x: obstacle.x + 5,
        y: obstacle.y + 5,
        width: obstacle.width - 10,
        height: obstacle.height - 10
      }
      
      if (dinoRect.x < obsRect.x + obsRect.width &&
          dinoRect.x + dinoRect.width > obsRect.x &&
          dinoRect.y < obsRect.y + obsRect.height &&
          dinoRect.y + dinoRect.height > obsRect.y) {
        return true
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
    const dt = dtMs / 16.6667
    lastTimeRef.current = now

    // Update dino physics
    setDino(prev => {
      let newY = prev.y + prev.velocity * dt
      let newVelocity = prev.velocity + GRAVITY * dt
      let newIsJumping = prev.isJumping
      if (newY >= groundY - DINO_HEIGHT) {
        newY = groundY - DINO_HEIGHT
        newVelocity = 0
        newIsJumping = false
      }
      return { ...prev, y: newY, velocity: newVelocity, isJumping: newIsJumping }
    })

    // Update score and speed
    setScore(prev => {
      const newScore = prev + Math.round(1 * dt)
      if (newScore % 100 === 0) {
        setGameSpeed(s => Math.min(s + 0.5, 12))
        // milestone chime
        playMilestone()
      }
      return newScore
    })

    // Update obstacles
    setObstacles(prev => {
      let newObstacles = prev.map(obs => ({ ...obs, x: obs.x - gameSpeed * dt }))
      newObstacles = newObstacles.filter(obs => obs.x + obs.width > -50)
      const lastObstacle = newObstacles[newObstacles.length - 1]
      if (!lastObstacle || lastObstacle.x < GAME_WIDTH - 300 - Math.random() * 200) {
        newObstacles.push(createObstacle())
      }
      return newObstacles
    })

    // Update clouds
    setClouds(prev => prev.map(cloud => ({
      ...cloud,
      x: cloud.x <= -100 ? GAME_WIDTH + Math.random() * 200 : cloud.x - cloud.speed * dt
    })))

    // Collision check
    setDino(currentDino => {
      setObstacles(currentObstacles => {
        if (checkCollision(currentDino, currentObstacles)) {
          setGameOver(true)
          setGameStarted(false)
          if (score > highScore) {
            setHighScore(score)
            localStorage.setItem('dino-game-high', score.toString())
          }
          playGameOver()
        }
        return currentObstacles
      })
      return currentDino
    })

    gameLoopRef.current = requestAnimationFrame(() => gameLoop(performance.now()))
  }, [gameStarted, isPaused, gameOver, gameSpeed, groundY, createObstacle, checkCollision, score, highScore])

  useEffect(() => {
    lastTimeRef.current = performance.now()
    gameLoopRef.current = requestAnimationFrame(() => gameLoop(performance.now()))
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameLoop])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    keysRef.current.add(e.key)
    
    switch (e.key) {
      case ' ':
      case 'ArrowUp':
        e.preventDefault()
        jump()
        break
      case 'ArrowDown':
        e.preventDefault()
        duck()
        break
      case 'Escape':
        e.preventDefault()
        togglePause()
        break
    }
  }, [jump, duck, togglePause])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysRef.current.delete(e.key)
    
    if (e.key === 'ArrowDown') {
      stopDuck()
    }
  }, [stopDuck])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!gameStarted) {
      startGame()
      return
    }
    if (gameOver) return
    
    setIsHolding(true)
    jump()
    
    // Set timeout for ducking after 200ms of hold
    setTimeout(() => {
      if (isHolding) {
        duck()
      }
    }, 200)
  }, [gameStarted, gameOver, startGame, jump, duck, isHolding])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsHolding(false)
    stopDuck()
  }, [stopDuck])

  const handleClick = useCallback(() => {
    if (!gameStarted) {
      startGame()
      return
    }
    if (gameOver) return
    jump()
  }, [gameStarted, gameOver, startGame, jump])

  if (!isClient) return null

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden p-1 sm:p-2">
      {/* Compact Header - Mobile Optimized */}
      <div className="flex-shrink-0 mb-1 sm:mb-2 text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 pixel-text animate-pulse mb-1 drop-shadow-lg">
          🦕 DINO RUNNER 🦕
        </h2>
        <div className="text-xs sm:text-sm text-white/80 mb-1 sm:mb-2">
          Jump over cacti and duck under birds!
        </div>
        <div className="flex justify-center gap-2 sm:gap-4 text-sm sm:text-base font-bold">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-yellow-400">SCORE</span>
            <div className="bg-yellow-400 text-black px-2 py-1 rounded font-mono text-sm sm:text-lg">
              {Math.floor(score / 10).toString().padStart(5, '0')}
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-purple-400">HIGH</span>
            <div className="bg-purple-400 text-black px-2 py-1 rounded font-mono text-sm sm:text-lg">
              {Math.floor(highScore / 10).toString().padStart(5, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Game Area for Mobile */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div
          className="relative w-full h-full max-w-5xl bg-[#0b0f17] border border-white/10 sm:border-2 overflow-hidden rounded-md shadow-xl game-screen cursor-pointer select-none"
          style={{
            aspectRatio: `${GAME_WIDTH}/${GAME_HEIGHT}`,
            touchAction: 'manipulation',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none'
          }}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
        {/* Sun */}
        <div 
          className="absolute w-16 h-16 bg-yellow-300 rounded-full border-4 border-yellow-400 top-8 right-8"
          style={{
            boxShadow: '0 0 30px rgba(255, 255, 0, 0.5)',
            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 0, 1) 100%)'
          }}
        />

        {/* Clouds */}
        {clouds.map(cloud => (
          <div
            key={cloud.id}
            className="absolute text-3xl opacity-70"
            style={{
              left: `${(cloud.x / GAME_WIDTH) * 100}%`,
              top: `${(cloud.y / GAME_HEIGHT) * 100}%`,
            }}
          >
            ☁️
          </div>
        ))}

        {/* Monochrome mountains */}
        <div className="absolute bottom-16 left-0 right-0 h-24 opacity-20">
          <div className="absolute bottom-0 left-0 w-32 h-16 bg-white/10 -skew-x-12" />
          <div className="absolute bottom-0 left-24 w-40 h-20 bg-white/15 skew-x-12" />
          <div className="absolute bottom-0 left-56 w-36 h-14 bg-white/10 -skew-x-12" />
        </div>

        {/* Ground */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-[#111726] border-t border-white/10"
          style={{
            height: `${(GROUND_HEIGHT / GAME_HEIGHT) * 100}%`,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`
          }}
        />

        {/* Dino */}
        <motion.div
          className="absolute z-10"
          style={{
            left: `${(dino.x / GAME_WIDTH) * 100}%`,
            top: `${(dino.y / GAME_HEIGHT) * 100}%`,
            width: `${(DINO_WIDTH / GAME_WIDTH) * 100}%`,
            height: `${(DINO_HEIGHT / GAME_HEIGHT) * 100}%`,
            transform: dino.isDucking ? 'scaleY(0.7)' : 'scaleY(1)',
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))'
          }}
          animate={{
            scaleX: gameStarted && !dino.isJumping ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 0.2, repeat: gameStarted && !dino.isJumping ? Infinity : 0 }}
        >
          {(() => {
            // 14x12 pixel dino sprite (monochrome)
            const sprite: number[][] = [
              [0,0,0,0,0,1,1,1,0,0,0,0,0,0],
              [0,0,0,1,1,1,1,1,1,0,0,0,0,0],
              [0,0,1,1,1,3,1,1,1,1,0,0,0,0],
              [0,1,1,1,1,1,1,1,1,1,1,0,0,0],
              [0,1,1,1,1,1,1,1,1,1,1,1,0,0],
              [0,1,1,4,4,1,1,1,1,1,1,1,0,0],
              [0,0,1,4,4,1,1,1,1,1,1,0,0,0],
              [0,0,1,1,1,1,1,1,1,0,0,0,0,0],
              [0,0,0,1,1,1,1,0,0,0,0,0,0,0],
              [0,0,0,1,1,0,0,0,0,0,0,0,0,0],
              [0,0,1,1,1,0,0,0,0,0,0,0,0,0],
              [0,1,1,0,0,0,0,0,0,0,0,0,0,0],
            ]
            const colors: Record<number, string> = {
              1: '#e2e8f0',
              3: '#1a202c',
              4: '#cbd5e1'
            }
            const rows = sprite.length
            const cols = sprite[0].length
            const px = 100 / cols
            const py = 100 / rows
            return (
              <div className="relative w-full h-full">
                {sprite.flatMap((row, y) => row.map((val, x) => val !== 0 ? (
                  <div key={`${x}-${y}`} className="absolute" style={{
                    left: `${x * px}%`, top: `${y * py}%`, width: `${px}%`, height: `${py}%`,
                    backgroundColor: colors[val]
                  }} />
                ) : null))}
              </div>
            )
          })()}
        </motion.div>

        {/* Obstacles */}
        {obstacles.map(obstacle => (
          <div
            key={obstacle.id}
            className="absolute z-5"
            style={{
              left: `${(obstacle.x / GAME_WIDTH) * 100}%`,
              top: `${(obstacle.y / GAME_HEIGHT) * 100}%`,
              width: `${(obstacle.width / GAME_WIDTH) * 100}%`,
              height: `${(obstacle.height / GAME_HEIGHT) * 100}%`,
              filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.12))'
            }}
          >
            {(() => {
              if (obstacle.type === 'bird') {
                const sprite: number[][] = [
                  [0,0,0,0,1,1,1,0,0],
                  [0,0,0,1,1,1,1,1,0],
                  [0,0,1,1,1,3,1,1,1],
                  [0,1,1,1,1,1,1,1,1],
                  [1,1,0,0,1,1,0,0,1],
                ]
                const rows = sprite.length
                const cols = sprite[0].length
                const px = 100 / cols
                const py = 100 / rows
                return (
                  <div className="relative w-full h-full">
                    {sprite.flatMap((row, y) => row.map((val, x) => val !== 0 ? (
                      <div key={`${x}-${y}`} className="absolute" style={{
                        left: `${x * px}%`, top: `${y * py}%`, width: `${px}%`, height: `${py}%`,
                        backgroundColor: val === 3 ? '#1a202c' : '#e2e8f0'
                      }} />
                    ) : null))}
                  </div>
                )
              }
              // cactus
              const sprite: number[][] = [
                [0,0,0,1,1,0,0,0],
                [0,0,0,1,1,0,0,0],
                [0,0,1,1,1,1,0,0],
                [0,0,1,1,1,1,0,0],
                [0,1,1,1,1,1,1,0],
                [0,1,1,1,1,1,1,0],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
              ]
              const rows = sprite.length
              const cols = sprite[0].length
              const px = 100 / cols
              const py = 100 / rows
              return (
                <div className="relative w-full h-full">
                  {sprite.flatMap((row, y) => row.map((val, x) => val !== 0 ? (
                    <div key={`${x}-${y}`} className="absolute" style={{
                      left: `${x * px}%`, top: `${y * py}%`, width: `${px}%`, height: `${py}%`,
                      backgroundColor: '#cbd5e1'
                    }} />
                  ) : null))}
                </div>
              )
            })()}
          </div>
        ))}

        {/* Game Start Overlay */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-lg">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center bg-black/60 border-2 border-green-400 rounded-lg p-4 sm:p-6"
            >
              <div className="text-5xl mb-4">🦕</div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-400 pixel-text mb-4">
                READY TO RUN?
              </h3>
              <div className="text-sm sm:text-base text-white/80 mb-6 space-y-2">
                <p>• <span className="block sm:hidden">Tap to jump • Hold to duck</span><span className="hidden sm:block">SPACE or ↑ to jump</span></p>
                <p className="hidden sm:block">• ↓ to duck under birds</p>
                <p>• Avoid all obstacles!</p>
                <p className="text-yellow-400 hidden sm:block">• ESC to pause</p>
              </div>
              <motion.button
                onClick={startGame}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 text-white font-bold rounded-lg text-base sm:text-xl pixel-text border-2 border-green-400 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 0, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                🏃 START RUNNING
              </motion.button>
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
                className="text-center bg-black/60 border-2 border-yellow-400 rounded-lg p-4 sm:p-6"
              >
                <div className="text-4xl mb-4">⏸️</div>
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 pixel-text mb-4">
                  RUN PAUSED
                </h3>
                <motion.button
                  onClick={togglePause}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold rounded-lg text-base sm:text-xl pixel-text border-2 border-yellow-400 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ▶️ RESUME RUN
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
                  🦕 GAME OVER! 🦕
                </p>
                <div className="mb-6 space-y-2">
                  <p className="text-lg sm:text-xl text-yellow-400 font-bold">
                    Score: {Math.floor(score / 10).toString().padStart(5, '0')}
                  </p>
                  {score > highScore && score > 0 && (
                    <motion.p 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-base text-purple-400 font-bold pixel-text"
                    >
                      🎉 NEW HIGH SCORE! 🎉
                    </motion.p>
                  )}
                  <p className="text-base text-white/60">
                    High: {Math.floor(highScore / 10).toString().padStart(5, '0')}
                  </p>
                </div>
                <motion.button
                  onClick={resetGame}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-lg text-base sm:text-xl pixel-text border-2 border-red-400 shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 0, 0, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  🔄 RUN AGAIN
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

          {/* Mobile Instructions */}
          {gameStarted && !isPaused && !gameOver && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/80 text-center block sm:hidden bg-black/40 px-3 py-1 rounded">
              Tap to jump • Hold to duck
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DinoGame
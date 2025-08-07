
"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { playTone } from "@/lib/audio"

const BRICK_ROW_COUNT = 6
const BRICK_COLUMN_COUNT = 8
const BRICK_WIDTH = 70
const BRICK_HEIGHT = 25
const BRICK_PADDING = 8
const PADDLE_HEIGHT = 15
const PADDLE_WIDTH = 100
const BALL_RADIUS = 8
const GAME_WIDTH = 600
const GAME_HEIGHT = 450

interface Brick {
  x: number
  y: number
  status: number
  color: string
  points: number
}

const Breakout = () => {
  const [isClient, setIsClient] = useState(false)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const [isPaused, setIsPaused] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  
  const [gameState, setGameState] = useState({
    paddleX: GAME_WIDTH / 2 - PADDLE_WIDTH / 2,
    ballX: GAME_WIDTH / 2,
    ballY: GAME_HEIGHT - 100,
    ballSpeedX: 0,
    ballSpeedY: 0,
    score: 0,
    lives: 3,
    level: 1,
    gameOver: false,
    gameWon: false,
    gameStarted: false,
  })

  const [bricks, setBricks] = useState<Brick[][]>([])

  const createBricks = useCallback(() => {
    const newBricks: Brick[][] = []
    const colors = ["#ff1744", "#ff9800", "#ffc107", "#4caf50", "#2196f3", "#9c27b0"]
    const points = [60, 50, 40, 30, 20, 10]
    
    for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
      newBricks[c] = []
      for (let r = 0; r < BRICK_ROW_COUNT; r++) {
        const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_PADDING + 20
        const brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_PADDING + 50
        newBricks[c][r] = { 
          x: brickX, 
          y: brickY, 
          status: 1, 
          color: colors[r], 
          points: points[r] 
        }
      }
    }
    return newBricks
  }, [])

  const resetGame = useCallback(() => {
    setGameState({
      paddleX: GAME_WIDTH / 2 - PADDLE_WIDTH / 2,
      ballX: GAME_WIDTH / 2,
      ballY: GAME_HEIGHT - 100,
      ballSpeedX: 0,
      ballSpeedY: 0,
      score: 0,
      lives: 3,
      level: 1,
      gameOver: false,
      gameWon: false,
      gameStarted: false,
    })
    setBricks(createBricks())
    setIsPaused(false)
  }, [createBricks])

  const playBeep = useCallback((frequency = 440, durationMs = 100, type: OscillatorType = 'square', gain = 0.04) => {
    const ctx = audioCtxRef.current
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)
    gainNode.gain.value = gain
    osc.connect(gainNode)
    gainNode.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + durationMs / 1000)
  }, [])

  const startGame = useCallback(() => {
    if (!gameState.gameStarted) {
      setGameState(prev => ({
        ...prev,
        ballSpeedX: (Math.random() > 0.5 ? 1 : -1) * (3 + prev.level * 0.5),
        ballSpeedY: -4 - prev.level * 0.3,
        gameStarted: true
      }))
      audioCtxRef.current?.resume?.()
      playTone(540, 120, 0.05, 'square')
    }
  }, [gameState.gameStarted, playBeep])
  
  useEffect(() => {
    setIsClient(true)
    setBricks(createBricks())
    try {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch {}
  }, [createBricks])

  

  const gameLoop = useCallback((currentTime: number) => {
    if (!gameState.gameStarted || isPaused || gameState.gameOver || gameState.gameWon) {
      animationFrameRef.current = requestAnimationFrame(gameLoop)
      return
    }

    const deltaTime = currentTime - lastTimeRef.current
    if (deltaTime < 16) { // Cap at ~60 FPS
      animationFrameRef.current = requestAnimationFrame(gameLoop)
      return
    }
    lastTimeRef.current = currentTime

    setGameState(prev => {
      let newBallX = prev.ballX + prev.ballSpeedX
      let newBallY = prev.ballY + prev.ballSpeedY
      let newBallSpeedX = prev.ballSpeedX
      let newBallSpeedY = prev.ballSpeedY
      let newLives = prev.lives
      let newScore = prev.score

      // Wall collision (left/right)
      if (newBallX <= BALL_RADIUS || newBallX >= GAME_WIDTH - BALL_RADIUS) {
        newBallSpeedX = -newBallSpeedX
        newBallX = newBallX <= BALL_RADIUS ? BALL_RADIUS : GAME_WIDTH - BALL_RADIUS
         playTone(360, 48, 0.03, 'sine')
      }

      // Top wall collision
      if (newBallY <= BALL_RADIUS) {
        newBallSpeedY = -newBallSpeedY
        newBallY = BALL_RADIUS
        playTone(340, 40, 0.03, 'sine')
      }

      // Bottom collision (paddle or lose life)
      if (newBallY >= GAME_HEIGHT - BALL_RADIUS) {
        // Check paddle collision
        if (newBallX >= prev.paddleX - BALL_RADIUS && 
            newBallX <= prev.paddleX + PADDLE_WIDTH + BALL_RADIUS &&
            newBallY >= GAME_HEIGHT - PADDLE_HEIGHT - BALL_RADIUS * 2) {
          // Paddle hit - calculate angle based on hit position
          const hitPos = (newBallX - prev.paddleX) / PADDLE_WIDTH
          const angle = (hitPos - 0.5) * Math.PI / 3 // -60 to 60 degrees
          const speed = Math.sqrt(newBallSpeedX * newBallSpeedX + newBallSpeedY * newBallSpeedY)
          newBallSpeedX = speed * Math.sin(angle)
          newBallSpeedY = -Math.abs(speed * Math.cos(angle))
          newBallY = GAME_HEIGHT - PADDLE_HEIGHT - BALL_RADIUS * 2
          playTone(420, 55, 0.04, 'sine')
        } else {
          // Lost a life
          newLives--
          if (newLives <= 0) {
            playTone(240, 220, 0.05, 'sine')
            return { ...prev, gameOver: true, lives: 0 }
          }
          // Reset ball position
          return {
            ...prev,
            lives: newLives,
            ballX: GAME_WIDTH / 2,
            ballY: GAME_HEIGHT - 100,
            ballSpeedX: 0,
            ballSpeedY: 0,
            gameStarted: false,
            paddleX: GAME_WIDTH / 2 - PADDLE_WIDTH / 2
          }
        }
      }

      return {
        ...prev,
        ballX: newBallX,
        ballY: newBallY,
        ballSpeedX: newBallSpeedX,
        ballSpeedY: newBallSpeedY,
        score: newScore,
        lives: newLives
      }
    })

    // Brick collision (separate state update to avoid conflicts)
    setBricks(currentBricks => {
      let brickHit = false
      let gameWon = true
      let scoreIncrease = 0

      const newBricks = currentBricks.map(column => 
        column.map(brick => {
          if (brick.status === 1) {
            gameWon = false
            // Check collision with current ball position
            if (!brickHit &&
                gameState.ballX + BALL_RADIUS > brick.x &&
                gameState.ballX - BALL_RADIUS < brick.x + BRICK_WIDTH &&
                gameState.ballY + BALL_RADIUS > brick.y &&
                gameState.ballY - BALL_RADIUS < brick.y + BRICK_HEIGHT) {
              
              brickHit = true
              scoreIncrease = brick.points
              playTone(460, 70, 0.04, 'sine')
              
              // Determine collision side and reverse ball direction
              setGameState(prev => {
                const centerX = brick.x + BRICK_WIDTH / 2
                const centerY = brick.y + BRICK_HEIGHT / 2
                const deltaX = prev.ballX - centerX
                const deltaY = prev.ballY - centerY
                
                if (Math.abs(deltaX / BRICK_WIDTH) > Math.abs(deltaY / BRICK_HEIGHT)) {
                  return { ...prev, ballSpeedX: -prev.ballSpeedX, score: prev.score + scoreIncrease }
                } else {
                  return { ...prev, ballSpeedY: -prev.ballSpeedY, score: prev.score + scoreIncrease }
                }
              })

              return { ...brick, status: 0 }
            }
          }
          return brick
        })
      )

      // Check if game won
      if (gameWon && gameState.gameStarted) {
        setGameState(prev => ({ ...prev, gameWon: true }))
        playTone(640, 150, 0.045, 'sine')
      }

      return newBricks
    })

    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }, [gameState.gameStarted, gameState.gameOver, gameState.gameWon, isPaused, gameState.ballX, gameState.ballY])

  useEffect(() => {
    if (isClient) {
      animationFrameRef.current = requestAnimationFrame(gameLoop)
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }, [isClient, gameLoop])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current) return
    const rect = gameAreaRef.current.getBoundingClientRect()
    const scaleX = GAME_WIDTH / rect.width
    let newPaddleX = (e.clientX - rect.left) * scaleX - PADDLE_WIDTH / 2
    newPaddleX = Math.max(0, Math.min(newPaddleX, GAME_WIDTH - PADDLE_WIDTH))
    setGameState(prev => ({ ...prev, paddleX: newPaddleX }))
  }, [])
  
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!gameAreaRef.current) return
    const rect = gameAreaRef.current.getBoundingClientRect()
    const scaleX = GAME_WIDTH / rect.width
    let newPaddleX = (e.touches[0].clientX - rect.left) * scaleX - PADDLE_WIDTH / 2
    newPaddleX = Math.max(0, Math.min(newPaddleX, GAME_WIDTH - PADDLE_WIDTH))
    setGameState(prev => ({ ...prev, paddleX: newPaddleX }))
  }, [])

  const togglePause = useCallback(() => {
    if (gameState.gameStarted && !gameState.gameOver && !gameState.gameWon) {
      setIsPaused(!isPaused)
    }
  }, [gameState.gameStarted, gameState.gameOver, gameState.gameWon, isPaused])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case ' ':
        e.preventDefault()
        if (!gameState.gameStarted && !gameState.gameOver && !gameState.gameWon) {
          startGame()
        } else {
          togglePause()
        }
        break
    }
  }, [gameState.gameStarted, gameState.gameOver, gameState.gameWon, startGame, togglePause])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  if (!isClient) return null

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="mb-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-400 pixel-text animate-pulse mb-2 drop-shadow-lg">
          🧱 BREAKOUT ARCADE 🧱
        </h2>
        <div className="text-sm sm:text-base text-white/80 mb-2">
          Break all the bricks to win! Don't let the ball fall!
        </div>
        <div className="flex justify-center gap-4 sm:gap-8 text-base sm:text-xl font-bold">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">SCORE</span>
            <div className="bg-yellow-400 text-black px-2 py-1 rounded font-mono">
              {gameState.score.toString().padStart(6, '0')}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-400">LIVES</span>
            <div className="flex gap-1">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className={`w-4 h-4 rounded-full ${
                  i < gameState.lives ? 'bg-red-400' : 'bg-gray-600'
                }`} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">LEVEL</span>
            <div className="bg-purple-400 text-black px-2 py-1 rounded font-mono">
              {gameState.level}
            </div>
          </div>
        </div>
      </div>
      
      <div
        ref={gameAreaRef}
        className="relative w-full max-w-2xl bg-black border-4 border-red-500 overflow-hidden rounded-lg shadow-2xl"
        style={{
          aspectRatio: `${GAME_WIDTH}/${GAME_HEIGHT}`,
          backgroundImage: `
            linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.1) 0%, transparent 70%)
          `,
          backgroundSize: '30px 30px, 30px 30px, 100% 100%'
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={(e) => e.preventDefault()}
        onClick={!gameState.gameStarted ? startGame : undefined}
      >
        {/* Bricks */}
        {bricks.map((column, c) =>
          column.map((brick, r) =>
            brick.status === 1 ? (
              <motion.div
                key={`${c}-${r}`}
                className="absolute border-2 border-white/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (c + r) * 0.05 }}
                style={{
                  left: `${(brick.x / GAME_WIDTH) * 100}%`,
                  top: `${(brick.y / GAME_HEIGHT) * 100}%`,
                  width: `${(BRICK_WIDTH / GAME_WIDTH) * 100}%`,
                  height: `${(BRICK_HEIGHT / GAME_HEIGHT) * 100}%`,
                  backgroundColor: brick.color,
                  boxShadow: `0 0 10px ${brick.color}, inset 0 0 10px rgba(255,255,255,0.3)`,
                  backgroundImage: `
                    linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(255,255,255,0.2) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.2) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.2) 75%)
                  `,
                  backgroundSize: '8px 8px',
                  backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                }}
              />
            ) : null
          )
        )}
        
        {/* Paddle */}
        <div 
          className="absolute bg-cyan-400 border-2 border-cyan-200 rounded"
          style={{
            left: `${(gameState.paddleX / GAME_WIDTH) * 100}%`,
            bottom: `${(10 / GAME_HEIGHT) * 100}%`,
            width: `${(PADDLE_WIDTH / GAME_WIDTH) * 100}%`,
            height: `${(PADDLE_HEIGHT / GAME_HEIGHT) * 100}%`,
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.8), inset 0 0 10px rgba(255,255,255,0.5)',
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(0,255,255,1) 50%, rgba(255,255,255,0.5) 100%)'
          }}
        />

        {/* Ball */}
        <motion.div 
          className="absolute bg-yellow-400 rounded-full border-2 border-yellow-200"
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 15px rgba(255, 255, 0, 0.8)',
              '0 0 25px rgba(255, 255, 0, 1)',
              '0 0 15px rgba(255, 255, 0, 0.8)'
            ]
          }}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{
            left: `${((gameState.ballX - BALL_RADIUS) / GAME_WIDTH) * 100}%`,
            top: `${((gameState.ballY - BALL_RADIUS) / GAME_HEIGHT) * 100}%`,
            width: `${(BALL_RADIUS * 2 / GAME_WIDTH) * 100}%`,
            height: `${(BALL_RADIUS * 2 / GAME_HEIGHT) * 100}%`,
            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 0, 1) 100%)'
          }}
        />
        
        {/* Game Instructions */}
        {!gameState.gameStarted && !gameState.gameOver && !gameState.gameWon && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center bg-black/60 border-2 border-cyan-400 rounded-lg p-4 sm:p-6"
            >
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 pixel-text mb-4">
                READY TO PLAY?
              </h3>
              <div className="text-sm sm:text-base text-white/80 mb-6 space-y-2">
                <p>• Move paddle with mouse or touch</p>
                <p>• Break all bricks to win!</p>
                <p>• Don't let the ball fall!</p>
                <p className="text-yellow-400">• Press SPACE to pause</p>
              </div>
              <motion.button
                onClick={startGame}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-lg text-base sm:text-xl pixel-text border-2 border-red-400 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 0, 0, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 START GAME
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* Pause Overlay */}
        {isPaused && gameState.gameStarted && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center bg-black/60 border-2 border-yellow-400 rounded-lg p-4 sm:p-6"
            >
              <div className="text-4xl mb-4">⏸️</div>
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 pixel-text mb-4">
                PAUSED
              </h3>
              <motion.button
                onClick={togglePause}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold rounded-lg text-base sm:text-xl pixel-text border-2 border-yellow-400 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ▶️ RESUME
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* Game Over/Win Overlay */}
        {(gameState.gameOver || gameState.gameWon) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center rounded-lg"
          >
            <div className="text-center bg-black/60 border-2 border-red-400 rounded-lg p-4 sm:p-6 shadow-2xl">
              <div className="text-5xl sm:text-6xl mb-4">
                {gameState.gameWon ? "🏆" : "💀"}
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 pixel-text drop-shadow-lg">
                {gameState.gameWon ? "🎉 LEVEL COMPLETE! 🎉" : "💀 GAME OVER 💀"}
              </p>
              <p className="text-lg sm:text-xl text-yellow-400 mb-6 font-bold">
                FINAL SCORE: {gameState.score.toString().padStart(6, '0')}
              </p>
              <motion.button
                onClick={resetGame}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold rounded-lg text-base sm:text-xl pixel-text border-2 border-red-400 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 0, 0, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                🎮 PLAY AGAIN
              </motion.button>
            </div>
          </motion.div>
        )}
        
        {/* Mobile Instructions */}
        {gameState.gameStarted && !isPaused && !gameState.gameOver && !gameState.gameWon && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/60 text-center block sm:hidden">
            Touch and drag to move paddle
          </div>
        )}
      </div>
    </div>
  )
}

export default Breakout


"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { playTone } from "@/lib/audio"
import { motion } from "framer-motion"

const Pong = () => {
  const [isClient, setIsClient] = useState(false)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const [gameState, setGameState] = useState({
    ballX: 300,
    ballY: 200,
    ballSpeedX: 4,
    ballSpeedY: 4,
    playerY: 150,
    aiY: 150,
    playerScore: 0,
    aiScore: 0,
    gameOver: false,
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || gameState.gameOver) return

    const gameLoop = () => {
      setGameState((prev) => {
        if (prev.gameOver) return prev

        const gameArea = gameAreaRef.current
        if (!gameArea) return prev

        const { width, height } = gameArea.getBoundingClientRect()
        const paddleHeight = 100
        const ballSize = 20

        let newBallX = prev.ballX + prev.ballSpeedX
        let newBallY = prev.ballY + prev.ballSpeedY
        let newBallSpeedX = prev.ballSpeedX
        let newBallSpeedY = prev.ballSpeedY
        let newPlayerScore = prev.playerScore
        let newAiScore = prev.aiScore
        let newGameOver = false

        // Ball collision with top/bottom walls
        if (newBallY <= 0 || newBallY >= height - ballSize) {
          newBallSpeedY = -newBallSpeedY
          playTone(360, 45, 0.03, 'sine')
        }

        // Ball collision with paddles
        if (
          // Player paddle
          (newBallX <= 30 &&
            newBallX > 20 &&
            newBallY > prev.playerY &&
            newBallY < prev.playerY + paddleHeight) ||
          // AI paddle
          (newBallX >= width - 30 - ballSize &&
            newBallX < width - 20 - ballSize &&
            newBallY > prev.aiY &&
            newBallY < prev.aiY + paddleHeight)
        ) {
          newBallSpeedX = -newBallSpeedX * 1.1 // Increase speed on hit
          playTone(420, 55, 0.04, 'sine')
        }

        // Score points
        if (newBallX <= 0) {
          newAiScore++
          newBallX = width / 2
          newBallY = height / 2
          newBallSpeedX = -4
          playTone(300, 130, 0.045, 'sine')
        } else if (newBallX >= width - ballSize) {
          newPlayerScore++
          newBallX = width / 2
          newBallY = height / 2
          newBallSpeedX = 4
          playTone(540, 130, 0.05, 'sine')
        }

        if (newPlayerScore >= 5 || newAiScore >= 5) {
          newGameOver = true
          playTone(240, 220, 0.055, 'sine')
        }

        // AI movement
        let newAiY = prev.aiY
        if (newBallY > newAiY + paddleHeight / 2) {
          newAiY += 3
        } else {
          newAiY -= 3
        }
        newAiY = Math.max(
          0,
          Math.min(newAiY, height - paddleHeight)
        )

        return {
          ...prev,
          ballX: newBallX,
          ballY: newBallY,
          ballSpeedX: newBallSpeedX,
          ballSpeedY: newBallSpeedY,
          playerScore: newPlayerScore,
          aiScore: newAiScore,
          aiY: newAiY,
          gameOver: newGameOver,
        }
      })

      requestAnimationFrame(gameLoop)
    }

    const animationFrameId = requestAnimationFrame(gameLoop)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isClient, gameState.gameOver])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current) return
    const rect = gameAreaRef.current.getBoundingClientRect()
    const newPlayerY = e.clientY - rect.top - 50 // 50 is half of paddle height
    setGameState((prev) => ({
      ...prev,
      playerY: Math.max(
        0,
        Math.min(newPlayerY, rect.height - 100)
      ),
    }))
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current) return
    const rect = gameAreaRef.current.getBoundingClientRect()
    const newPlayerY = e.touches[0].clientY - rect.top - 50
    setGameState((prev) => ({
      ...prev,
      playerY: Math.max(
        0,
        Math.min(newPlayerY, rect.height - 100)
      ),
    }))
  }
  
  const handleRestart = () => {
    const gameArea = gameAreaRef.current
    if (!gameArea) return
    const { width, height } = gameArea.getBoundingClientRect()
    setGameState({
        ballX: width / 2,
        ballY: height / 2,
        ballSpeedX: 4,
        ballSpeedY: 4,
        playerY: height / 2 - 50,
        aiY: height / 2 - 50,
        playerScore: 0,
        aiScore: 0,
        gameOver: false,
      })
  }

  if (!isClient) return null

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden p-2">
      <div className="flex-shrink-0 text-center mb-2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400 pixel-text animate-pulse mb-1 drop-shadow-lg">
          🏓 PONG CLASSIC 🏓
        </h2>
        <div className="text-xs sm:text-sm text-white/80 mb-2">
          The original arcade legend - First to 5 wins!
        </div>
        <div className="flex justify-center gap-2 sm:gap-4 text-sm sm:text-lg font-bold">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-cyan-400">YOU</span>
            <div className="bg-cyan-400 text-black px-2 py-1 rounded font-mono text-sm sm:text-lg">
              {gameState.playerScore}
            </div>
          </div>
          <div className="text-white/50">VS</div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="bg-red-500 text-white px-2 py-1 rounded font-mono text-sm sm:text-lg">
              {gameState.aiScore}
            </div>
            <span className="text-red-400">AI</span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div
          ref={gameAreaRef}
          className="relative w-full h-full max-w-2xl max-h-full bg-black border-2 sm:border-4 border-cyan-500 overflow-hidden cursor-none rounded-lg shadow-2xl"
          style={{
            aspectRatio: '4/3',
            backgroundImage: `
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 70%)
            `,
            backgroundSize: '40px 40px, 40px 40px, 100% 100%'
          }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={(e) => e.preventDefault()}
      >
        {/* Center Line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full border-l-4 border-dashed border-cyan-400/40"></div>
        
        {/* Score Display (In-game) */}
        <div className="absolute top-4 left-1/4 text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400/60 pixel-text">
          {gameState.playerScore}
        </div>
        <div className="absolute top-4 right-1/4 text-3xl sm:text-4xl md:text-5xl font-bold text-red-400/60 pixel-text">
          {gameState.aiScore}
        </div>
        
        {/* Power indicators */}
        <div className="absolute top-4 left-4 text-xs text-cyan-400/80 font-bold">
          PLAYER
        </div>
        <div className="absolute top-4 right-4 text-xs text-red-400/80 font-bold">
          AI
        </div>
        {/* Ball */}
        <motion.div
          className="absolute w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 rounded-full"
          style={{
            left: gameState.ballX,
            top: gameState.ballY,
            boxShadow: '0 0 15px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.4)',
            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 0, 1) 100%)'
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 15px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.4)',
              '0 0 20px rgba(255, 255, 0, 1), 0 0 40px rgba(255, 255, 0, 0.6)',
              '0 0 15px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.4)'
            ]
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />

        {/* Player Paddle */}
        <div
          className="absolute w-3 sm:w-4 md:w-5 h-20 sm:h-24 bg-cyan-400 rounded-sm"
          style={{
            left: 15,
            top: gameState.playerY,
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.3)',
            backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, rgba(0, 255, 255, 1) 50%, rgba(255, 255, 255, 0.3) 100%)'
          }}
        />

        {/* AI Paddle */}
        <div
          className="absolute w-3 sm:w-4 md:w-5 h-20 sm:h-24 bg-red-500 rounded-sm"
          style={{
            right: 15,
            top: gameState.aiY,
            boxShadow: '0 0 15px rgba(255, 0, 0, 0.6), 0 0 30px rgba(255, 0, 0, 0.3)',
            backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 0, 0, 1) 50%, rgba(255, 255, 255, 0.3) 100%)'
          }}
        />
        {gameState.gameOver && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center rounded-lg"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.3) 0%, transparent 70%)
              `
            }}
          >
            <div className="text-center bg-black/60 border-2 border-cyan-500 rounded-lg p-4 sm:p-6 shadow-2xl">
              <div className="text-5xl sm:text-6xl mb-4">
                {gameState.playerScore > gameState.aiScore ? "🏆" : "💀"}
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 pixel-text drop-shadow-lg">
                {gameState.playerScore > gameState.aiScore ? "🎉 VICTORY! 🎉" : "💀 GAME OVER 💀"}
              </p>
              <div className="text-lg sm:text-xl text-cyan-400 mb-4">
                Final Score: {gameState.playerScore} - {gameState.aiScore}
              </div>
              <motion.button
                onClick={handleRestart}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold rounded-lg text-base sm:text-xl pixel-text border-2 border-cyan-400 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 255, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                🎮 PLAY AGAIN
              </motion.button>
            </div>
          </motion.div>
        )}
        
          {/* Mobile Instructions */}
          {!gameState.gameOver && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/60 text-center block sm:hidden">
              Touch and drag to move paddle
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Pong

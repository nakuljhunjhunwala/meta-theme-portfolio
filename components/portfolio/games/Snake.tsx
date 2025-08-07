"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { playTone } from "@/lib/audio"
import { motion } from "framer-motion"

const BOARD_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 5, y: 5 }
const INITIAL_DIRECTION = { x: 0, y: -1 }

const Snake = () => {
  const [isClient, setIsClient] = useState(false)
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState(INITIAL_FOOD)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(150)
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const directionRef = useRef(direction)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const generateFood = useCallback((currentSnake: typeof snake) => {
    let newFood
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      }
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    setGameOver(false)
    setScore(0)
    setIsPaused(false)
    setSpeed(150)
  }

  const startGame = () => {
    if (!isPlaying) {
      resetGame()
      setIsPlaying(true)
      playTone(420, 120, 0.045, 'sine')
    }
  }

  const togglePause = () => {
    if (isPlaying && !gameOver) {
      setIsPaused(!isPaused)
      playTone(isPaused ? 360 : 280, 80, 0.035, 'sine')
    }
  }

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return

    setSnake(currentSnake => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }
      const currentDirection = directionRef.current

      head.x += currentDirection.x
      head.y += currentDirection.y

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true)
        setIsPlaying(false)
        playTone(240, 200, 0.055, 'sine')
        return currentSnake
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        setIsPlaying(false)
        playTone(240, 200, 0.055, 'sine')
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prevScore => {
          const newScore = prevScore + 10
          // Increase speed every 50 points
          if (newScore % 50 === 0) {
            setSpeed(prevSpeed => Math.max(80, prevSpeed - 10))
            playTone(540, 90, 0.04, 'sine')
          }
          return newScore
        })
        setFood(generateFood(newSnake))
        playTone(480, 80, 0.04, 'sine')
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [gameOver, isPaused, food, generateFood])

  useEffect(() => {
    if (isPlaying && !gameOver && !isPaused) {
      gameLoopRef.current = setInterval(moveSnake, speed)
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [moveSnake, speed, isPlaying, gameOver, isPaused])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isPlaying || isPaused || gameOver) return

    const { x, y } = directionRef.current
    
    switch (e.key) {
      case 'ArrowUp':
        if (y === 0) {
          directionRef.current = { x: 0, y: -1 }
          setDirection({ x: 0, y: -1 })
        }
        break
      case 'ArrowDown':
        if (y === 0) {
          directionRef.current = { x: 0, y: 1 }
          setDirection({ x: 0, y: 1 })
        }
        break
      case 'ArrowLeft':
        if (x === 0) {
          directionRef.current = { x: -1, y: 0 }
          setDirection({ x: -1, y: 0 })
        }
        break
      case 'ArrowRight':
        if (x === 0) {
          directionRef.current = { x: 1, y: 0 }
          setDirection({ x: 1, y: 0 })
        }
        break
      case ' ':
        e.preventDefault()
        togglePause()
        break
    }
  }, [isPlaying, isPaused, gameOver])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  // Mobile touch controls
  const handleTouchDirection = (newDirection: { x: number; y: number }) => {
    if (!isPlaying || isPaused || gameOver) return

    const { x, y } = directionRef.current
    
    // Prevent reverse direction
    if ((newDirection.x === -x && newDirection.y === -y) || 
        (newDirection.x === x && newDirection.y === y)) return

    directionRef.current = newDirection
    setDirection(newDirection)
  }

  if (!isClient) return null

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 text-center">
      <div className="mb-2 sm:mb-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-green-400 pixel-text animate-pulse mb-2">
          🐍 SNAKE GAME 🐍
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mb-2">
          <div className="text-lg sm:text-xl font-bold text-yellow-400">
            SCORE: <span className="text-white">{score}</span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-cyan-400">
            SPEED: <span className="text-white">{Math.floor((200 - speed) / 10)}</span>
          </div>
        </div>
      </div>

      <div 
        className="relative bg-black border-4 border-green-500 rounded-lg shadow-2xl mb-4"
        style={{
          width: Math.min(400, window.innerWidth - 40),
          height: Math.min(400, window.innerWidth - 40),
          backgroundImage: `
            linear-gradient(90deg, rgba(0, 255, 0, 0.05) 1px, transparent 1px),
            linear-gradient(rgba(0, 255, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: `${Math.min(400, window.innerWidth - 40) / BOARD_SIZE}px ${Math.min(400, window.innerWidth - 40) / BOARD_SIZE}px`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black/50"></div>
        
        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-75 ${
              index === 0 
                ? 'bg-yellow-400 border-2 border-yellow-200 shadow-lg shadow-yellow-400/50' 
                : 'bg-green-400 border border-green-200'
            }`}
            style={{
              left: `${(segment.x * (Math.min(400, window.innerWidth - 40) / BOARD_SIZE))}px`,
              top: `${(segment.y * (Math.min(400, window.innerWidth - 40) / BOARD_SIZE))}px`,
              width: `${Math.min(400, window.innerWidth - 40) / BOARD_SIZE - 1}px`,
              height: `${Math.min(400, window.innerWidth - 40) / BOARD_SIZE - 1}px`,
              borderRadius: index === 0 ? '50%' : '2px',
              boxShadow: index === 0 ? '0 0 15px rgba(255, 255, 0, 0.6)' : '0 0 5px rgba(0, 255, 0, 0.4)'
            }}
          >
            {index === 0 && (
              <div className="absolute inset-1 bg-yellow-300 rounded-full flex items-center justify-center text-xs">
                🐍
              </div>
            )}
          </div>
        ))}

        {/* Food */}
        <motion.div
          key={`${food.x}-${food.y}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bg-red-500 border-2 border-red-300 rounded-full shadow-lg shadow-red-500/50"
          style={{
            left: `${(food.x * (Math.min(400, window.innerWidth - 40) / BOARD_SIZE))}px`,
            top: `${(food.y * (Math.min(400, window.innerWidth - 40) / BOARD_SIZE))}px`,
            width: `${Math.min(400, window.innerWidth - 40) / BOARD_SIZE - 1}px`,
            height: `${Math.min(400, window.innerWidth - 40) / BOARD_SIZE - 1}px`,
            boxShadow: '0 0 15px rgba(255, 0, 0, 0.6)'
          }}
        >
          <div className="absolute inset-1 bg-red-400 rounded-full flex items-center justify-center text-xs">
            🍎
          </div>
        </motion.div>

        {/* Game Over/Pause Overlay */}
        {(gameOver || (!isPlaying && score > 0) || isPaused) && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded">
            <div className="text-center p-4">
              {gameOver && (
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2 pixel-text animate-pulse">
                    GAME OVER! 💀
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4">
                    FINAL SCORE: {score}
                  </div>
                </div>
              )}
              {isPaused && !gameOver && (
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4 pixel-text animate-pulse">
                  ⏸️ PAUSED ⏸️
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {!isPlaying ? (
            <motion.button
              onClick={startGame}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg border-2 border-green-400 pixel-text text-sm sm:text-base shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎮 START GAME
            </motion.button>
          ) : (
            <motion.button
              onClick={togglePause}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg border-2 border-yellow-400 pixel-text text-sm sm:text-base shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPaused ? "▶️ RESUME" : "⏸️ PAUSE"}
            </motion.button>
          )}
          
          {(gameOver || score > 0) && (
            <motion.button
              onClick={resetGame}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg border-2 border-red-400 pixel-text text-sm sm:text-base shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 RESET
            </motion.button>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="block sm:hidden">
          <div className="text-xs text-gray-400 mb-2 text-center">Touch controls:</div>
          <div className="grid grid-cols-3 gap-1 w-32">
            <div></div>
            <motion.button
              onTouchStart={() => handleTouchDirection({ x: 0, y: -1 })}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold p-2 rounded border border-purple-400 text-lg"
              whileTap={{ scale: 0.95 }}
            >
              ⬆️
            </motion.button>
            <div></div>
            
            <motion.button
              onTouchStart={() => handleTouchDirection({ x: -1, y: 0 })}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold p-2 rounded border border-purple-400 text-lg"
              whileTap={{ scale: 0.95 }}
            >
              ⬅️
            </motion.button>
            <motion.button
              onClick={togglePause}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold p-2 rounded border border-yellow-400 text-xs"
              whileTap={{ scale: 0.95 }}
            >
              ⏸️
            </motion.button>
            <motion.button
              onTouchStart={() => handleTouchDirection({ x: 1, y: 0 })}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold p-2 rounded border border-purple-400 text-lg"
              whileTap={{ scale: 0.95 }}
            >
              ➡️
            </motion.button>
            
            <div></div>
            <motion.button
              onTouchStart={() => handleTouchDirection({ x: 0, y: 1 })}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold p-2 rounded border border-purple-400 text-lg"
              whileTap={{ scale: 0.95 }}
            >
              ⬇️
            </motion.button>
            <div></div>
          </div>
        </div>

        {/* Desktop Instructions */}
        <div className="hidden sm:block text-xs text-gray-400 text-center max-w-md">
          <div className="mb-1">🎮 Use arrow keys to move • Space to pause</div>
          <div>🍎 Eat apples to grow • Avoid walls and yourself!</div>
        </div>
      </div>
    </div>
  )
}

export default Snake
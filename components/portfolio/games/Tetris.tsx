"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { playTone } from "@/lib/audio"

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const COLORS = {
  0: 'transparent',
  1: '#FF0D72', // I-piece
  2: '#0DC2FF', // O-piece
  3: '#0DFF72', // T-piece
  4: '#F538FF', // S-piece
  5: '#FF8E0D', // Z-piece
  6: '#FFE138', // J-piece
  7: '#3877FF', // L-piece
}

const PIECES = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: 1
  },
  O: {
    shape: [
      [2, 2],
      [2, 2]
    ],
    color: 2
  },
  T: {
    shape: [
      [0, 3, 0],
      [3, 3, 3],
      [0, 0, 0]
    ],
    color: 3
  },
  S: {
    shape: [
      [0, 4, 4],
      [4, 4, 0],
      [0, 0, 0]
    ],
    color: 4
  },
  Z: {
    shape: [
      [5, 5, 0],
      [0, 5, 5],
      [0, 0, 0]
    ],
    color: 5
  },
  J: {
    shape: [
      [6, 0, 0],
      [6, 6, 6],
      [0, 0, 0]
    ],
    color: 6
  },
  L: {
    shape: [
      [0, 0, 7],
      [7, 7, 7],
      [0, 0, 0]
    ],
    color: 7
  }
}

interface Piece {
  shape: number[][]
  x: number
  y: number
  color: number
}

const Tetris = () => {
  const [isClient, setIsClient] = useState(false)
  const [board, setBoard] = useState<number[][]>([])
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null)
  const [nextPiece, setNextPiece] = useState<Piece | null>(null)
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const dropTimeRef = useRef<number>(1000)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const createEmptyBoard = useCallback(() => {
    return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))
  }, [])

  const getRandomPiece = useCallback(() => {
    const pieceTypes = Object.keys(PIECES) as Array<keyof typeof PIECES>
    const randomType = pieceTypes[Math.floor(Math.random() * pieceTypes.length)]
    const piece = PIECES[randomType]
    
    return {
      shape: piece.shape.map(row => [...row]),
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2),
      y: 0,
      color: piece.color
    }
  }, [])

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard())
    setScore(0)
    setLines(0)
    setLevel(1)
    setGameOver(false)
    setIsPaused(false)
    setIsPlaying(false)
    dropTimeRef.current = 1000
    setCurrentPiece(null)
    setNextPiece(getRandomPiece())
  }, [createEmptyBoard, getRandomPiece])

  useEffect(() => {
    setIsClient(true)
    resetGame()
    try {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch {}
  }, [resetGame])

  const playBeep = useCallback((frequency = 440, durationMs = 100, type: OscillatorType = 'square', gain = 0.035) => {
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

  const isValidPosition = useCallback((piece: Piece, dx = 0, dy = 0, newShape?: number[][]) => {
    const shape = newShape || piece.shape
    
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const newX = piece.x + x + dx
          const newY = piece.y + y + dy
          
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return false
          }
          
          if (newY >= 0 && board[newY] && board[newY][newX] !== 0) {
            return false
          }
        }
      }
    }
    return true
  }, [board])

  const rotatePiece = useCallback((piece: Piece) => {
    const rotated = piece.shape[0].map((_, index) =>
      piece.shape.map(row => row[index]).reverse()
    )
    return rotated
  }, [])

  const clearLines = useCallback((newBoard: number[][]) => {
    let linesCleared = 0
    const clearedBoard = newBoard.filter(row => {
      if (row.every(cell => cell !== 0)) {
        linesCleared++
        return false
      }
      return true
    })
    
    while (clearedBoard.length < BOARD_HEIGHT) {
      clearedBoard.unshift(Array(BOARD_WIDTH).fill(0))
    }
    
    if (linesCleared > 0) {
      const points = [0, 40, 100, 300, 1200][linesCleared] * level
      setScore(prev => prev + points)
      // line clear: brief ascending arpeggio
      playTone(420, 55, 0.035, 'sine')
      setTimeout(() => playTone(500, 55, 0.035, 'sine'), 60)
      setTimeout(() => playTone(600, 55, 0.035, 'sine'), 120)
      setLines(prev => {
        const newLines = prev + linesCleared
        const newLevel = Math.floor(newLines / 10) + 1
        if (newLevel !== level) {
          setLevel(newLevel)
          dropTimeRef.current = Math.max(50, 1000 - (newLevel - 1) * 50)
          // level up chime
          setTimeout(() => playTone(640, 120, 0.045, 'sine'), 180)
        }
        return newLines
      })
    }
    
    return clearedBoard
  }, [level, playBeep])

  const placePiece = useCallback(() => {
    if (!currentPiece) return

    const newBoard = board.map(row => [...row])
    
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x] !== 0) {
          const boardY = currentPiece.y + y
          const boardX = currentPiece.x + x
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color
          }
        }
      }
    }
    
    const clearedBoard = clearLines(newBoard)
    setBoard(clearedBoard)
    
    // Check game over
    if (currentPiece.y <= 1) {
      setGameOver(true)
      setIsPlaying(false)
      playTone(240, 220, 0.055, 'sine')
    } else {
      setCurrentPiece(nextPiece)
      setNextPiece(getRandomPiece())
       // landed
       playTone(300, 60, 0.038, 'sine')
    }
  }, [currentPiece, board, nextPiece, getRandomPiece, clearLines])

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!currentPiece || gameOver || isPaused) return

    if (isValidPosition(currentPiece, dx, dy)) {
      setCurrentPiece(prev => prev ? { ...prev, x: prev.x + dx, y: prev.y + dy } : null)
      if (dy === 0) playTone(360, 28, 0.03, 'sine')
    } else if (dy > 0) {
      // Can't move down, place the piece
      placePiece()
    }
  }, [currentPiece, gameOver, isPaused, isValidPosition, placePiece, playBeep])

  const rotatePieceAction = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return

    const rotatedShape = rotatePiece(currentPiece)
    if (isValidPosition(currentPiece, 0, 0, rotatedShape)) {
      setCurrentPiece(prev => prev ? { ...prev, shape: rotatedShape } : null)
      playTone(420, 55, 0.035, 'sine')
    }
  }, [currentPiece, gameOver, isPaused, rotatePiece, isValidPosition, playBeep])

  const dropPiece = useCallback(() => {
    movePiece(0, 1)
  }, [movePiece])

  const hardDrop = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return

    let dropDistance = 0
    while (isValidPosition(currentPiece, 0, dropDistance + 1)) {
      dropDistance++
    }
    
    setCurrentPiece(prev => prev ? { ...prev, y: prev.y + dropDistance } : null)
    setTimeout(() => placePiece(), 50)
    playTone(300, 100, 0.04, 'sine')
  }, [currentPiece, gameOver, isPaused, isValidPosition, placePiece, playBeep])

  const startGame = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true)
      if (!currentPiece && nextPiece) {
        setCurrentPiece(nextPiece)
        setNextPiece(getRandomPiece())
      }
      playTone(420, 120, 0.045, 'sine')
    }
  }, [isPlaying, currentPiece, nextPiece, getRandomPiece, playBeep])

  const togglePause = useCallback(() => {
    if (isPlaying && !gameOver) {
      setIsPaused(!isPaused)
      playTone(isPaused ? 360 : 280, 80, 0.035, 'sine')
    }
  }, [isPlaying, gameOver, isPaused, playBeep])

  useEffect(() => {
    if (isPlaying && !gameOver && !isPaused) {
      gameLoopRef.current = setInterval(dropPiece, dropTimeRef.current)
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [dropPiece, isPlaying, gameOver, isPaused])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isPlaying) return

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        movePiece(-1, 0)
        break
      case 'ArrowRight':
        e.preventDefault()
        movePiece(1, 0)
        break
      case 'ArrowDown':
        e.preventDefault()
        movePiece(0, 1)
        break
      case 'ArrowUp':
      case ' ':
        e.preventDefault()
        rotatePieceAction()
        break
      case 'Enter':
        e.preventDefault()
        hardDrop()
        break
      case 'Escape':
        e.preventDefault()
        togglePause()
        break
    }
  }, [isPlaying, movePiece, rotatePieceAction, hardDrop, togglePause])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const renderBoard = () => {
    const boardWithCurrentPiece = board.map(row => [...row])
    
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x] !== 0) {
            const boardY = currentPiece.y + y
            const boardX = currentPiece.x + x
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              boardWithCurrentPiece[boardY][boardX] = currentPiece.color
            }
          }
        }
      }
    }
    
    return boardWithCurrentPiece
  }

  if (!isClient) return null

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden p-2">
      {/* Compact Header */}
      <div className="flex-shrink-0 text-center mb-2">
        <h2 className="text-lg sm:text-xl font-bold text-purple-400 pixel-text mb-1">
          🔷 TETRIS
        </h2>
      </div>

      {/* Main Game Area */}
      <div className="flex flex-1 gap-2 min-h-0 pb-16 sm:pb-2">
        {/* Game Board Container */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="relative w-full max-w-sm">
            <div 
              className="grid gap-[1px] p-1 bg-[#0b0f17] border border-white/10 rounded-md shadow-xl game-screen w-full select-none"
              style={{ 
                gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
                gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
                aspectRatio: `${BOARD_WIDTH}/${BOARD_HEIGHT}`,
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none'
              }}
          >
            {renderBoard().flat().map((cell, index) => {
              const y = Math.floor(index / BOARD_WIDTH)
              const x = index % BOARD_WIDTH
              return (
                <div
                  key={`${y}-${x}`}
                  className="border border-white/10 rounded-[1px]"
                  style={{
                    backgroundColor: COLORS[cell as keyof typeof COLORS],
                    boxShadow: cell !== 0 ? `0 0 4px ${COLORS[cell as keyof typeof COLORS]}55` : 'none',
                    backgroundImage: cell !== 0 ? 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 100%)' : 'none'
                  }}
                />
              )
            })}
          </div>

          {/* Game Over/Pause Overlay */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center bg-black/60 border-2 border-purple-400 rounded-lg p-3"
              >
                <div className="text-3xl mb-2">🎮</div>
                <h3 className="text-base font-bold text-purple-400 pixel-text mb-2">READY?</h3>
                <div className="text-xs text-white/80 mb-3 space-y-1">
                  <p>Arrow keys: move/rotate</p>
                  <p>Enter: hard drop</p>
                </div>
                <motion.button
                  onClick={startGame}
                  className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg pixel-text border border-purple-400 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  START
                </motion.button>
              </motion.div>
            </div>
          )}

          {isPaused && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center bg-black/60 border-2 border-yellow-400 rounded-lg p-3"
              >
                <div className="text-3xl mb-2">⏸️</div>
                <h3 className="text-base font-bold text-yellow-400 pixel-text mb-2">PAUSED</h3>
                <motion.button
                  onClick={togglePause}
                  className="px-3 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold rounded-lg pixel-text border border-yellow-400 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  RESUME
                </motion.button>
              </motion.div>
            </div>
          )}

            {gameOver && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center rounded-lg">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center bg-black/60 border-2 border-red-400 rounded-lg p-3 shadow-2xl"
                >
                  <div className="text-4xl mb-2">💀</div>
                  <p className="text-lg font-bold text-white mb-1 pixel-text">GAME OVER</p>
                  <p className="text-sm text-yellow-400 mb-3">Score: {score.toLocaleString()}</p>
                  <motion.button
                    onClick={resetGame}
                    className="px-3 py-2 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold rounded-lg pixel-text border border-red-400 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    PLAY AGAIN
                  </motion.button>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Compact Side Panel */}
        <div className="flex-shrink-0 flex flex-col gap-2 w-20 sm:w-24">
          {/* Next Piece */}
          <div className="bg-black/60 border border-purple-400 rounded-lg p-2 flex-1 sm:flex-initial">
            <h3 className="text-xs font-bold text-purple-400 pixel-text mb-1 text-center">NEXT</h3>
            <div className="grid gap-[1px] justify-center mx-auto" style={{ gridTemplateColumns: 'repeat(4, 1fr)', width: 'fit-content' }}>
              {Array(4).fill(null).map((_, y) =>
                Array(4).fill(null).map((_, x) => {
                  let cell = 0
                  if (nextPiece && nextPiece.shape[y] && nextPiece.shape[y][x]) {
                    cell = nextPiece.shape[y][x]
                  }
                  return (
                    <div
                      key={`${y}-${x}`}
                      className="w-3 h-3 sm:w-4 sm:h-4 border border-gray-800 rounded-sm"
                      style={{
                        backgroundColor: COLORS[cell as keyof typeof COLORS],
                        boxShadow: cell !== 0 ? `0 0 5px ${COLORS[cell as keyof typeof COLORS]}` : 'none'
                      }}
                    />
                  )
                })
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-black/60 border border-purple-400 rounded-lg p-2 flex-1 sm:flex-initial">
            <h3 className="text-xs font-bold text-purple-400 pixel-text mb-1 text-center">STATS</h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-white/80">Score</span>
                <span className="text-yellow-400 font-bold">{score}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Lines</span>
                <span className="text-green-400 font-bold">{lines}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Level</span>
                <span className="text-red-400 font-bold">{level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Mobile Controls - Fixed at bottom */}
      <div className="absolute bottom-2 left-2 right-2 sm:hidden">
        <div className="grid grid-cols-4 gap-1 mb-2">
          <motion.button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              movePiece(-1, 0)
            }}
            className="bg-purple-600 text-white font-bold p-2 rounded border border-purple-400 text-xs"
            whileTap={{ scale: 0.95 }}
          >
            ⬅️
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              rotatePieceAction()
            }}
            className="bg-yellow-600 text-white font-bold p-2 rounded border border-yellow-400 text-xs"
            whileTap={{ scale: 0.95 }}
          >
            🔄
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              movePiece(1, 0)
            }}
            className="bg-purple-600 text-white font-bold p-2 rounded border border-purple-400 text-xs"
            whileTap={{ scale: 0.95 }}
          >
            ➡️
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              hardDrop()
            }}
            className="bg-red-600 text-white font-bold p-2 rounded border border-red-400 text-xs"
            whileTap={{ scale: 0.95 }}
          >
            ⬇️
          </motion.button>
        </div>
        <div className="text-center">
          <motion.button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              togglePause()
            }}
            className="bg-gray-600 text-white font-bold px-3 py-1 rounded border border-gray-400 text-xs"
            whileTap={{ scale: 0.95 }}
          >
            {isPaused ? "▶️" : "⏸️"}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Tetris
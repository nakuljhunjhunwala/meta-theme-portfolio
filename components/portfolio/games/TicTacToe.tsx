
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { playTone } from "@/lib/audio"
import { motion } from "framer-motion"

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleClick = (i: number) => {
    if (winner || board[i]) return
    const newBoard = [...board]
    newBoard[i] = isXNext ? "X" : "O"
    setBoard(newBoard)
    setIsXNext(!isXNext)
    // soft move tone
    playTone(isXNext ? 420 : 360, 70, 0.04, "sine")
  }

  useEffect(() => {
    const calculateWinner = (squares: (string | null)[]) => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          return squares[a]
        }
      }
      return null
    }

    const newWinner = calculateWinner(board)
    if (newWinner) {
      setWinner(newWinner)
      // win jingle
      setTimeout(() => playTone(500, 100, 0.05, "sine"), 0)
      setTimeout(() => playTone(600, 120, 0.05, "sine"), 120)
    } else if (board.every((square) => square !== null)) {
      setWinner("Draw")
      // draw tone
      playTone(400, 120, 0.05, "sine")
    }
  }, [board])

  const handleRestart = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
  }

  const renderSquare = (i: number) => {
    const isWinningSquare =
      winner &&
      winner !== "Draw" &&
      calculateWinningLine(board)?.includes(i)
    return (
      <motion.button
        key={i}
        className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gray-900 border-4 ${
          isWinningSquare ? "border-green-400 shadow-lg shadow-green-400/50" : "border-purple-500"
        } flex items-center justify-center relative overflow-hidden touch-manipulation`}
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.05) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.05) 75%)
          `,
          backgroundSize: '10px 10px',
          backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
        }}
        onClick={() => handleClick(i)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        disabled={winner !== null || board[i] !== null}
      >
        <div className="absolute inset-1 bg-black/30 rounded border border-white/10"></div>
        <span
          className={`relative z-10 text-3xl sm:text-4xl md:text-6xl font-bold pixel-text drop-shadow-lg ${
            board[i] === "X" ? "text-cyan-400" : board[i] === "O" ? "text-yellow-400" : ""
          } ${isWinningSquare ? "animate-pulse text-green-300" : ""}`}
          style={{
            textShadow: board[i] === "X" 
              ? "0 0 15px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.4)"
              : board[i] === "O"
              ? "0 0 15px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.4)"
              : "none"
          }}
        >
          {board[i]}
        </span>
        {!board[i] && !winner && (
          <div className="absolute inset-0 flex items-center justify-center opacity-20 hover:opacity-40 transition-opacity">
            <span className="text-2xl text-white/50">
              {isXNext ? "✕" : "○"}
            </span>
          </div>
        )}
      </motion.button>
    )
  }

  const calculateWinningLine = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return lines[i]
      }
    }
    return null
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="mb-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 pixel-text animate-pulse mb-2 drop-shadow-lg">
          ❌⭕ TIC-TAC-TOE ❌⭕
        </h2>
        <div className="text-sm sm:text-base text-white/80">
          Classic 3-in-a-row battle!
        </div>
      </div>
      <div
        className={`grid grid-cols-3 gap-2 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-2 border-purple-500/50 shadow-2xl ${
          winner ? "pointer-events-none" : ""
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.2) 0%, transparent 70%)
          `
        }}
      >
        {Array(9)
          .fill(null)
          .map((_, i) => renderSquare(i))}
      </div>
      {winner && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="mt-4 sm:mt-6 text-center bg-black/80 border-2 border-green-400 rounded-lg p-4 shadow-lg"
        >
          <div className="text-4xl mb-2">
            {winner === "Draw" ? "🤝" : "🎉"}
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mb-4 pixel-text drop-shadow-lg">
            {winner === "Draw" ? "🤝 IT'S A DRAW! 🤝" : `🏆 WINNER: ${winner} 🏆`}
          </p>
          <motion.button
            onClick={handleRestart}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg text-base sm:text-xl pixel-text border-2 border-purple-400 shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(138, 43, 226, 0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            🎮 PLAY AGAIN
          </motion.button>
        </motion.div>
      )}
      {!winner && (
        <motion.div 
          className="mt-4 sm:mt-6 text-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="bg-black/60 border-2 border-purple-500/50 rounded-lg p-3 sm:p-4">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white pixel-text">
              NEXT PLAYER: {" "}
              <motion.span 
                className={`${isXNext ? "text-cyan-400" : "text-yellow-400"} drop-shadow-lg`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  textShadow: isXNext 
                    ? "0 0 10px rgba(0, 255, 255, 0.8)"
                    : "0 0 10px rgba(255, 255, 0, 0.8)"
                }}
              >
                {isXNext ? "❌ X" : "⭕ O"}
              </motion.span>
            </p>
            <div className="text-xs sm:text-sm text-white/60 mt-2">
              Tap any empty square to make your move!
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default TicTacToe

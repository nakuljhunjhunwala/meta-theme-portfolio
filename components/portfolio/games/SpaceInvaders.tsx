"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { playTone } from "@/lib/audio"

const GAME_WIDTH = 800
const GAME_HEIGHT = 600
const PLAYER_WIDTH = 60
const PLAYER_HEIGHT = 40
const INVADER_WIDTH = 40
const INVADER_HEIGHT = 30
const BULLET_WIDTH = 4
const BULLET_HEIGHT = 15
const INVADER_ROWS = 4
const INVADER_COLS = 8

interface Position {
  x: number
  y: number
}

interface Bullet extends Position {
  id: number
  isPlayerBullet: boolean
}

interface Invader extends Position {
  id: number
  type: number
  isAlive: boolean
}

const SpaceInvaders = () => {
  const [isClient, setIsClient] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const [playerPos, setPlayerPos] = useState<Position>({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 80 })
  const [bullets, setBullets] = useState<Bullet[]>([])
  const [invaders, setInvaders] = useState<Invader[]>([])
  const [invaderDirection, setInvaderDirection] = useState(1)
  const [lastShotTime, setLastShotTime] = useState(0)

  const gameLoopRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const keysRef = useRef<Set<string>>(new Set())
  const bulletIdRef = useRef(0)
  const invaderTickAccumRef = useRef(0)
  const playerPosRef = useRef<Position>({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 80 })
  const bulletsRef = useRef<Bullet[]>([])
  const invadersRef = useRef<Invader[]>([])
  const livesRef = useRef(3)
  const directionRef = useRef(1)
  const scoreRef = useRef(0)
  const levelRef = useRef(1)
  const lastCommitRef = useRef<number>(0)
  const lastShotTimeRef = useRef<number>(0)

  const createInvaders = useCallback(() => {
    const newInvaders: Invader[] = []
    const startX = 100
    const startY = 100
    const spacingX = 60
    const spacingY = 50

    for (let row = 0; row < INVADER_ROWS; row++) {
      for (let col = 0; col < INVADER_COLS; col++) {
        newInvaders.push({
          id: row * INVADER_COLS + col,
          x: startX + col * spacingX,
          y: startY + row * spacingY,
          type: row < 1 ? 3 : row < 3 ? 2 : 1, // Different types for different rows
          isAlive: true
        })
      }
    }
    return newInvaders
  }, [])

  const resetGame = useCallback(() => {
    setGameStarted(false)
    setGameOver(false)
    setIsPaused(false)
    setScore(0)
    setLives(3)
    setLevel(1)
    setPlayerPos({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 80 })
    playerPosRef.current = { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 80 }
    setBullets([])
    bulletsRef.current = []
    setInvaders(createInvaders())
    invadersRef.current = createInvaders()
    setInvaderDirection(1)
    directionRef.current = 1
    setLastShotTime(0)
    lastShotTimeRef.current = 0
    livesRef.current = 3
    scoreRef.current = 0
    levelRef.current = 1
    lastCommitRef.current = performance.now()
    keysRef.current.clear()
  }, [createInvaders])

  useEffect(() => {
    setIsClient(true)
    resetGame()
  }, [resetGame])

  // legacy stub removed; using playTone

  const startGame = useCallback(() => {
    if (!gameStarted) {
      setGameStarted(true)
      playTone(420, 120, 0.04, 'sine')
    }
  }, [gameStarted])

  const togglePause = useCallback(() => {
    if (gameStarted && !gameOver) {
      setIsPaused(!isPaused)
      playTone(isPaused ? 360 : 280, 80, 0.035, 'sine')
    }
  }, [gameStarted, gameOver, isPaused])

  const shootBullet = useCallback((isPlayer: boolean, x: number, y: number) => {
    const now = Date.now()
    if (isPlayer && now - lastShotTimeRef.current < 200) return
    if (isPlayer) {
      setLastShotTime(now)
      lastShotTimeRef.current = now
    }
    const newBullet = { id: bulletIdRef.current++, x, y, isPlayerBullet: isPlayer } as Bullet
    bulletsRef.current = [...bulletsRef.current, newBullet]
    setBullets(prev => [...prev, newBullet])
    playTone(isPlayer ? 440 : 300, isPlayer ? 70 : 60, isPlayer ? 0.04 : 0.035, 'sine')
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

    // Player movement (batch)
    setPlayerPos(prev => {
      let nx = prev.x
      const speed = 5 * dt
      if (keysRef.current.has('ArrowLeft') || keysRef.current.has('a')) {
        nx = Math.max(0, nx - speed)
      }
      if (keysRef.current.has('ArrowRight') || keysRef.current.has('d')) {
        nx = Math.min(GAME_WIDTH - PLAYER_WIDTH, nx + speed)
      }
      if (keysRef.current.has(' ')) {
        shootBullet(true, nx + PLAYER_WIDTH / 2, prev.y)
      }
      if (nx !== prev.x) return { ...prev, x: nx }
      return prev
    })

    // Update bullets
    setBullets(prev => {
      return prev
        .map(bullet => ({
          ...bullet,
          y: bullet.isPlayerBullet ? bullet.y - 8 * dt : bullet.y + 4 * dt
        }))
        .filter(bullet => bullet.y > -BULLET_HEIGHT && bullet.y < GAME_HEIGHT + BULLET_HEIGHT)
    })

    // Update invaders (throttled when many alive)
    setInvaders(prev => {
      const aliveInvaders = prev.filter(inv => inv.isAlive)
      const aliveCount = aliveInvaders.length
      
      // Throttle: when many invaders alive, step only every ~2 frames
      invaderTickAccumRef.current += dt
      const minStep = aliveCount > 30 ? 2 : 1
      if (invaderTickAccumRef.current < minStep) return prev
      invaderTickAccumRef.current = 0

      if (aliveCount === 0) {
        setLevel(l => l + 1)
        playTone(600, 110, 0.045, 'sine')
        setBullets([])
        return createInvaders()
      }

      let newDirection = invaderDirection
      let shouldMoveDown = false

      const leftMost = Math.min(...aliveInvaders.map(inv => inv.x))
      const rightMost = Math.max(...aliveInvaders.map(inv => inv.x))

      if ((rightMost >= GAME_WIDTH - INVADER_WIDTH && invaderDirection === 1) || (leftMost <= 0 && invaderDirection === -1)) {
        newDirection = -invaderDirection
        shouldMoveDown = true
        setInvaderDirection(newDirection)
      }

      const moveSpeed = (1 + level * 0.2) * dt

      // Also roll invader shooting here to avoid a second per-frame set
      if (Math.random() < 0.02) {
        const shooter = aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)]
        if (shooter) shootBullet(false, shooter.x + INVADER_WIDTH / 2, shooter.y + INVADER_HEIGHT)
      }

      return prev.map(invader => {
        if (!invader.isAlive) return invader
        return {
          ...invader,
          x: shouldMoveDown ? invader.x : invader.x + moveSpeed * invaderDirection,
          y: shouldMoveDown ? invader.y + 20 : invader.y
        }
      })
    })

    // Removed separate invader-shooting setState; now happens in movement block

    // Collision detection
    setBullets(prevBullets => {
      return prevBullets.filter(bullet => {
        // Bullet vs invaders
        if (bullet.isPlayerBullet) {
          const hitInvader = invaders.find(invader => 
            invader.isAlive &&
            bullet.x < invader.x + INVADER_WIDTH &&
            bullet.x + BULLET_WIDTH > invader.x &&
            bullet.y < invader.y + INVADER_HEIGHT &&
            bullet.y + BULLET_HEIGHT > invader.y
          )
          
          if (hitInvader) {
            setInvaders(prev => prev.map(inv => inv.id === hitInvader.id ? { ...inv, isAlive: false } : inv))
            setScore(prev => prev + hitInvader.type * 10)
            playTone(400, 80, 0.04, 'sine')
            return false // Remove bullet
          }
        } else {
          // Enemy bullet vs player
          if (bullet.x < playerPos.x + PLAYER_WIDTH &&
              bullet.x + BULLET_WIDTH > playerPos.x &&
              bullet.y < playerPos.y + PLAYER_HEIGHT &&
              bullet.y + BULLET_HEIGHT > playerPos.y) {
            
            setLives(prev => prev - 1)
            playTone(260, 90, 0.04, 'sine')
            return false // Remove bullet
          }
        }
        return true
      })
    })

    // Check if invaders reached player
    const playerReached = invaders.some(invader => 
      invader.isAlive && invader.y + INVADER_HEIGHT >= playerPos.y
    )
    
    if (playerReached) {
      setGameOver(true)
      setGameStarted(false)
      playTone(240, 220, 0.055, 'sine')
    }

    gameLoopRef.current = requestAnimationFrame(() => gameLoop(performance.now()))
  }, [gameStarted, isPaused, gameOver, invaderDirection, level, invaders, playerPos, shootBullet, createInvaders])

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
    
    if (e.key === 'Escape') {
      e.preventDefault()
      togglePause()
    }
  }, [togglePause])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysRef.current.delete(e.key)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  if (!isClient) return null

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden p-2">
      {/* Compact Header */}
      <div className="flex-shrink-0 flex justify-between items-center py-1 px-2 mb-2">
        <h2 className="text-lg sm:text-xl font-bold text-green-400 pixel-text">
          🛸 INVADERS
        </h2>
        <div className="flex gap-2 text-sm">
          <span className="text-yellow-400">{score.toString().padStart(6, '0')}</span>
          <span className="text-red-400">❤️{lives}</span>
          <span className="text-purple-400">L{level}</span>
        </div>
      </div>

      {/* Game Area - Flexible Height */}
      <div className="flex-1 relative min-h-0">
        <div
          className="relative w-full bg-[#0b0f17] border border-white/10 overflow-hidden rounded-md shadow-xl game-screen h-full"
          style={{
            aspectRatio: `${GAME_WIDTH}/${GAME_HEIGHT}`,
            maxHeight: '70vh',
            backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        >
        {/* Stars background */}
        <div className="absolute inset-0">
          {Array.from({ length: 60 }, (_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white/70"
              style={{
                left: `${(i * 157) % 100}%`,
                top: `${(i * 97) % 100}%`,
                opacity: 0.5 + ((i % 5) * 0.1)
              }}
            />
          ))}
        </div>

        {/* Player */}
        <motion.div
          className="absolute"
          style={{
            left: `${(playerPos.x / GAME_WIDTH) * 100}%`,
            top: `${(playerPos.y / GAME_HEIGHT) * 100}%`,
            width: `${(PLAYER_WIDTH / GAME_WIDTH) * 100}%`,
            height: `${(PLAYER_HEIGHT / GAME_HEIGHT) * 100}%`,
          }}
          animate={{ 
            scale: [1, 1.05, 1],
            filter: [
              'drop-shadow(0 0 10px #68d391)',
              'drop-shadow(0 0 20px #68d391)',
              'drop-shadow(0 0 10px #68d391)'
            ]
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {(() => {
            // Simple pixel rocket 8x6
            const sprite = [
              [0,0,0,1,1,0,0,0],
              [0,0,1,1,1,1,0,0],
              [0,1,1,1,1,1,1,0],
              [1,1,1,2,2,1,1,1],
              [0,0,1,1,1,1,0,0],
              [0,0,0,1,1,0,0,0],
            ]
            const colors: Record<number, string> = { 1: '#cbd5e1', 2: '#f6ad55' }
            const rows = sprite.length, cols = sprite[0].length
            const px = 100 / cols, py = 100 / rows
            return (
              <div className="relative w-full h-full">
                {sprite.flatMap((row,y)=>row.map((v,x)=>v? <div key={`${x}-${y}`} className="absolute" style={{left:`${x*px}%`,top:`${y*py}%`,width:`${px}%`,height:`${py}%`,backgroundColor:colors[v]}}/>:null))}
              </div>
            )
          })()}
        </motion.div>

        {/* Invaders */}
        {invaders.map(invader => (
          invader.isAlive && (
            <motion.div
              key={invader.id}
              className="absolute"
              style={{
                left: `${(invader.x / GAME_WIDTH) * 100}%`,
                top: `${(invader.y / GAME_HEIGHT) * 100}%`,
                width: `${(INVADER_WIDTH / GAME_WIDTH) * 100}%`,
                height: `${(INVADER_HEIGHT / GAME_HEIGHT) * 100}%`,
              }}
              animate={{ 
                scale: [1, invaders.length > 24 ? 1.02 : 1.1, 1],
                filter: ['drop-shadow(0 0 6px #a78bfa)','drop-shadow(0 0 12px #a78bfa)','drop-shadow(0 0 6px #a78bfa)']
              }}
              transition={{ duration: invaders.length > 24 ? 1.2 : 0.8, repeat: Infinity }}
            >
              {(() => {
                // 8x6 pixel invader
                const c = invader.type === 3 ? '#f472b6' : invader.type === 2 ? '#63b3ed' : '#f6e05e'
                const sprite = [
                  [0,0,1,0,0,1,0,0],
                  [0,1,1,1,1,1,1,0],
                  [1,1,0,1,1,0,1,1],
                  [1,1,1,1,1,1,1,1],
                  [0,1,0,0,0,0,1,0],
                  [1,0,0,0,0,0,0,1],
                ]
                const rows = sprite.length, cols = sprite[0].length
                const px = 100 / cols, py = 100 / rows
                return (
                  <div className="relative w-full h-full">
                    {sprite.flatMap((row,y)=>row.map((v,x)=>v? <div key={`${x}-${y}`} className="absolute" style={{left:`${x*px}%`,top:`${y*py}%`,width:`${px}%`,height:`${py}%`,backgroundColor:c}}/>:null))}
                  </div>
                )
              })()}
            </motion.div>
          )
        ))}

        {/* Bullets */}
        {bullets.map(bullet => (
          <div
            key={bullet.id}
            className={`absolute rounded-full ${
              bullet.isPlayerBullet 
                ? 'bg-yellow-400' 
                : 'bg-red-500'
            }`}
            style={{
              left: `${(bullet.x / GAME_WIDTH) * 100}%`,
              top: `${(bullet.y / GAME_HEIGHT) * 100}%`,
              width: `${(BULLET_WIDTH / GAME_WIDTH) * 100}%`,
              height: `${(BULLET_HEIGHT / GAME_HEIGHT) * 100}%`,
              boxShadow: bullet.isPlayerBullet 
                ? '0 0 10px #ffff00' 
                : '0 0 10px #ff0000'
            }}
          />
        ))}

                 {/* Game Start Overlay */}
         {!gameStarted && !gameOver && (
           <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="text-center bg-black/60 border-2 border-green-400 rounded-lg p-3"
             >
               <div className="text-3xl mb-2">🛸</div>
               <h3 className="text-base font-bold text-green-400 pixel-text mb-2">DEFEND EARTH!</h3>
               <div className="text-xs text-white/80 mb-3 space-y-1">
                 <p>• Arrow keys to move</p>
                 <p>• SPACE to shoot</p>
                 <p>• ESC to pause</p>
               </div>
               <motion.button
                 onClick={startGame}
                 className="px-3 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold rounded-lg pixel-text border border-green-400 text-sm"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 START BATTLE
               </motion.button>
             </motion.div>
           </div>
         )}

                 {/* Pause Overlay */}
         {isPaused && gameStarted && (
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

                 {/* Game Over Overlay */}
         {gameOver && (
           <div className="absolute inset-0 bg-black/90 flex items-center justify-center rounded-lg">
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="text-center bg-black/60 border-2 border-red-400 rounded-lg p-3 shadow-2xl"
             >
               <div className="text-4xl mb-2">💥</div>
               <p className="text-lg font-bold text-white mb-1 pixel-text">EARTH INVADED!</p>
               <p className="text-sm text-yellow-400 mb-3">Final Score: {score.toString().padStart(6, '0')}</p>
               <motion.button
                 onClick={resetGame}
                 className="px-3 py-2 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold rounded-lg pixel-text border border-red-400 text-sm"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 DEFEND AGAIN
               </motion.button>
             </motion.div>
           </div>
         )}

        </div>
        
      </div>

      {/* Compact Mobile Controls */}
       <div className="flex-shrink-0 pt-2 sm:hidden">
         <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto px-4">
           <motion.button
             onTouchStart={() => keysRef.current.add('ArrowLeft')}
             onTouchEnd={() => keysRef.current.delete('ArrowLeft')}
             className="bg-green-600 text-white font-bold p-2 rounded border border-green-400 text-sm"
             whileTap={{ scale: 0.95 }}
           >
             ⬅️ MOVE
           </motion.button>
           <motion.button
             onTouchStart={() => {
               setPlayerPos(prev => {
                 shootBullet(true, prev.x + PLAYER_WIDTH / 2, prev.y)
                 return prev
               })
             }}
             className="bg-yellow-600 text-white font-bold p-2 rounded border border-yellow-400 text-sm"
             whileTap={{ scale: 0.95 }}
           >
             🔫 SHOOT
           </motion.button>
           <motion.button
             onTouchStart={() => keysRef.current.add('ArrowRight')}
             onTouchEnd={() => keysRef.current.delete('ArrowRight')}
             className="bg-green-600 text-white font-bold p-2 rounded border border-green-400 text-sm"
             whileTap={{ scale: 0.95 }}
           >
             MOVE ➡️
           </motion.button>
         </div>
         <div className="text-center mt-2">
           <motion.button
             onClick={togglePause}
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

export default SpaceInvaders
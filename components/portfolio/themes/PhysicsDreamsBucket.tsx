"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { bucketList, getBucketListStats } from '@/constants/personal'
import dynamic from 'next/dynamic'

// Client-side only physics component
const PhysicsCanvas = dynamic(() => Promise.resolve(PhysicsCanvasComponent), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-white text-center">
        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
        <div>Loading Physics Engine...</div>
      </div>
    </div>
  )
})

// Physics Canvas Component (Client-side only)
function PhysicsCanvasComponent({ 
  dimensions,
}: {
  dimensions: { width: number; height: number }
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<any>(null)
  const worldRef = useRef<any>(null)
  const renderRef = useRef<any>(null)
  const runnerRef = useRef<any>(null)
  const dreamBodies = useRef<any[]>([])
  const [selectedBody, setSelectedBody] = useState<any>(null)
  const [isDragging, setIsDragging] = useState(false)
  const constraintRef = useRef<any>(null)
  const [isPhysicsReady, setIsPhysicsReady] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initializePhysics()
    }
    return () => cleanup()
  }, [dimensions])

  useEffect(() => {
    console.log('useEffect: Physics ready changed:', isPhysicsReady)
    console.log('useEffect: bucketList length:', bucketList?.length)
    
    if (isPhysicsReady && bucketList?.length > 0) {
      console.log('useEffect: Calling dropInDreams immediately')
      // Call immediately - now synchronous function
      dropInDreams()
    } else {
      console.log('useEffect: Not calling dropInDreams - conditions not met')
    }
  }, [isPhysicsReady])

  const cleanup = () => {
    if (runnerRef.current && engineRef.current) {
      const Matter = require('matter-js')
      Matter.Runner.stop(runnerRef.current)
    }
    if (renderRef.current) {
      const Matter = require('matter-js')
      Matter.Render.stop(renderRef.current)
    }
    if (engineRef.current) {
      const Matter = require('matter-js')
      Matter.Engine.clear(engineRef.current)
    }
    dreamBodies.current = []
  }

  const initializePhysics = () => {
    if (!canvasRef.current || typeof window === 'undefined') return

    const Matter = require('matter-js')
    cleanup()

    // Create engine
    const engine = Matter.Engine.create()
    engine.world.gravity.y = 1
    engine.world.gravity.scale = 0.001
    engineRef.current = engine
    worldRef.current = engine.world

    // Create render with custom rendering
    const render = Matter.Render.create({
      element: containerRef.current!,
      canvas: canvasRef.current!,
      engine: engine,
      options: {
        width: dimensions.width,
        height: dimensions.height,
        wireframes: false,
        background: 'transparent',
        showVelocity: false,
        showAngleIndicator: false,
        showDebug: false,
        showStats: false,
        pixelRatio: 1,
        enabled: true
      }
    })

    renderRef.current = render

    // Override render to draw custom dream pills with clean text
    Matter.Events.on(render, 'afterRender', () => {
      drawCleanDreamPills(render.context, render.canvas)
    })

    // Create runner
    const runner = Matter.Runner.create()
    runnerRef.current = runner

    // Create bucket boundaries
    createBucketBoundaries(Matter)
    
    // Enhance physics engine
    enhancePhysicsEngine(Matter, engine)

    Matter.Render.run(render)
    Matter.Runner.run(runner, engine)

    setIsPhysicsReady(true)
  }

  const drawCleanDreamPills = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!dreamBodies.current.length) return

    dreamBodies.current.forEach((body) => {
      if (!body.dreamData) return

      const { dreamData } = body
      const { x, y } = body.position
      const angle = body.angle

      // Skip if body is outside visible area (may have fallen through)
      if (y > dimensions.height + 100) return

      // Calculate pill dimensions based on actual text width
      ctx.font = 'bold 16px system-ui, -apple-system, sans-serif'
      const textMetrics = ctx.measureText(dreamData.title)
      const pillWidth = Math.max(100, textMetrics.width + 40) // Add padding
      const pillHeight = 42

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)

      // Clean pill background
      if (dreamData.completed) {
        ctx.fillStyle = 'rgba(34, 197, 94, 0.85)'
      } else {
        const baseColor = hexToRgb(dreamData.color) || { r: 99, g: 102, b: 241 }
        ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.85)`
      }

      // Draw clean pill shape
      ctx.beginPath()
      ctx.roundRect(-pillWidth/2, -pillHeight/2, pillWidth, pillHeight, pillHeight/2)
      ctx.fill()

      // Clean border
      ctx.strokeStyle = dreamData.completed 
        ? 'rgba(34, 197, 94, 1)' 
        : 'rgba(255, 255, 255, 0.4)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Subtle glass highlight (minimal)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.beginPath()
      ctx.roundRect(-pillWidth/2, -pillHeight/2, pillWidth, pillHeight/4, pillHeight/2)
      ctx.fill()

      // Clean, crisp text - larger font size
      ctx.fillStyle = 'white'
      ctx.font = 'bold 16px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Minimal text shadow for clarity
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
      ctx.shadowOffsetX = 1
      ctx.shadowOffsetY = 1
      ctx.shadowBlur = 2

      // Draw full title without truncation or icons
      const title = dreamData.title

      if (dreamData.completed) {
        // Clean strike through for completed dreams
        ctx.fillText(title, 0, 0)
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(-pillWidth/2 + 15, 0)
        ctx.lineTo(pillWidth/2 - 15, 0)
        ctx.stroke()
      } else {
        ctx.fillText(title, 0, 0)
      }

      // Reset shadow
      ctx.shadowColor = 'transparent'
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowBlur = 0

      ctx.restore()
    })
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const createBucketBoundaries = (Matter: any) => {
    if (!worldRef.current) return

    const thickness = 50 // Much thicker walls to prevent escape
    const bucketWidth = dimensions.width - 80
    const bucketHeight = dimensions.height - 40
    const bucketBottom = dimensions.height - 20

    // Create very strong bucket boundaries that prevent any escape
    const boundaries = [
      // Bottom - extra thick and wide
      Matter.Bodies.rectangle(dimensions.width / 2, bucketBottom + thickness / 2, bucketWidth + thickness, thickness, { 
        isStatic: true,
        render: { visible: false }, // Hidden for clean UI
        label: 'bottom'
      }),
      // Left wall - taller and thicker
      Matter.Bodies.rectangle(40 + thickness / 2, dimensions.height / 2, thickness, dimensions.height + 200, { 
        isStatic: true,
        render: { visible: false }, // Hidden for clean UI
        label: 'left'
      }),
      // Right wall - taller and thicker
      Matter.Bodies.rectangle(dimensions.width - 40 - thickness / 2, dimensions.height / 2, thickness, dimensions.height + 200, { 
        isStatic: true,
        render: { visible: false }, // Hidden for clean UI
        label: 'right'
      }),
      // Top barrier - much thicker to catch any high throws
      Matter.Bodies.rectangle(dimensions.width / 2, -100, dimensions.width + 200, 200, { 
        isStatic: true,
        render: { visible: false }, // Hidden for clean UI
        label: 'top'
      }),
      // Additional side barriers to prevent any edge escape
      Matter.Bodies.rectangle(-100, dimensions.height / 2, 200, dimensions.height + 400, { 
        isStatic: true,
        render: { visible: false }, // Hidden for clean UI
        label: 'left-barrier'
      }),
      Matter.Bodies.rectangle(dimensions.width + 100, dimensions.height / 2, 200, dimensions.height + 400, { 
        isStatic: true,
        render: { visible: false }, // Hidden for clean UI
        label: 'right-barrier'
      })
    ]

    Matter.World.add(worldRef.current!, boundaries)
  }

  const createDreamPill = (Matter: any, dream: any, x: number, y: number) => {
    // Calculate pill dimensions based on actual text measurement
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    ctx.font = 'bold 16px system-ui, -apple-system, sans-serif'
    const textMetrics = ctx.measureText(dream.title)
    const pillWidth = Math.max(100, textMetrics.width + 40) // Add padding
    const pillHeight = 42

    const body = Matter.Bodies.rectangle(x, y, pillWidth, pillHeight, {
      render: {
        visible: false // Use custom rendering instead
      },
      restitution: 0.5, // Less bouncy for cleaner feel
      friction: 0.2,
      frictionAir: 0.02,
      density: 0.001,
      chamfer: { radius: pillHeight / 2 }
    })

    // Attach dream data to physics body
    body.dreamData = {
      id: dream.id,
      title: dream.title,
      color: dream.color,
      completed: dream.completed,
      icon: dream.icon
    }

    return body
  }

  const dropInDreams = () => {
    if (!worldRef.current || typeof window === 'undefined') {
      console.log('dropInDreams: No world or not in browser')
      return
    }

    const Matter = require('matter-js')

    // Clear existing dreams
    dreamBodies.current.forEach(body => {
      Matter.World.remove(worldRef.current!, body)
    })
    dreamBodies.current = []

    console.log('dropInDreams: Dropping', bucketList.length, 'dreams simultaneously')

    // Create all dreams simultaneously - no delays, natural physics collisions
    bucketList.forEach((dream, i) => {
      // Spread across bucket width 
      const startX = (dimensions.width / (bucketList.length + 1)) * (i + 1)
      const startY = -80 // All start at same height for natural simultaneous drop
      
      try {
        const dreamBody = createDreamPill(Matter, dream, startX, startY)
        dreamBodies.current.push(dreamBody)
        Matter.World.add(worldRef.current!, dreamBody)
      } catch (error) {
        console.error(`Error creating dream "${dream.title}":`, error)
      }
    })
    
    console.log('dropInDreams: All', dreamBodies.current.length, 'dreams released! 🚀')
    
    // Temporarily disabled test circles to focus on dreams
    // for (let i = 0; i < 5; i++) {
    //   const testX = (dimensions.width / 6) * (i + 1)
    //   const testY = 50
    //   const testCircle = Matter.Bodies.circle(testX, testY, 10, {
    //     render: {
    //       fillStyle: i === 0 ? '#ff0000' : i === 1 ? '#00ff00' : i === 2 ? '#0000ff' : i === 3 ? '#ffff00' : '#ff00ff',
    //       strokeStyle: '#ffffff',
    //       lineWidth: 2
    //     }
    //   })
    //   Matter.World.add(worldRef.current!, testCircle)
    //   console.log(`dropInDreams: Added test circle ${i} at (${testX}, ${testY})`)
    // }
    console.log('dropInDreams: Test circles disabled to focus on dream positioning')
  }

  const enhancePhysicsEngine = (Matter: any, engine: any) => {
    // Disabled escape detection to allow natural physics and collisions
    // The strong boundary walls should contain the dreams naturally
    console.log('enhancePhysicsEngine: Escape detection disabled for natural physics')
    
    // Only reset for extreme physics glitches (way outside canvas)
    Matter.Events.on(engine, 'beforeUpdate', () => {
      dreamBodies.current.forEach(body => {
        const { x, y } = body.position
        
        // Only reset if EXTREMELY far outside (likely a physics engine error)
        if (x < -300 || x > dimensions.width + 300 || y > dimensions.height + 300) {
          console.log(`Extreme physics glitch detected - dream at (${x.toFixed(1)}, ${y.toFixed(1)}) - resetting`)
          // Drop back in from top instead of placing in center
          Matter.Body.setPosition(body, {
            x: Math.random() * (dimensions.width - 100) + 50,
            y: -50
          })
          Matter.Body.setVelocity(body, { x: 0, y: 0 })
        }
      })
    })
  }

  // Mouse interaction handling
  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (!canvasRef.current || !worldRef.current || typeof window === 'undefined') return

    const Matter = require('matter-js')
    const rect = canvasRef.current.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    const bodies = dreamBodies.current
    const mousePosition = { x: mouseX, y: mouseY }
    
    for (let body of bodies) {
      if (Matter.Bounds.contains(body.bounds, mousePosition)) {
        setSelectedBody(body)
        setIsDragging(true)
        
        const constraint = Matter.Constraint.create({
          pointA: mousePosition,
          bodyB: body,
          pointB: { x: 0, y: 0 },
          stiffness: 0.8,
          damping: 0.1,
          length: 0
        })
        
        constraintRef.current = constraint
        Matter.World.add(worldRef.current!, constraint)
        break
      }
    }
  }, [])

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!constraintRef.current || !isDragging || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    let mouseX = event.clientX - rect.left
    let mouseY = event.clientY - rect.top
    
    // Constrain mouse position to bucket boundaries to prevent escape
    const margin = 60
    mouseX = Math.max(margin, Math.min(mouseX, dimensions.width - margin))
    mouseY = Math.max(margin, Math.min(mouseY, dimensions.height - margin))
    
    constraintRef.current.pointA = { x: mouseX, y: mouseY }
  }, [isDragging, dimensions])

  const handleMouseUp = useCallback(() => {
    if (constraintRef.current && worldRef.current && typeof window !== 'undefined') {
      const Matter = require('matter-js')
      Matter.World.remove(worldRef.current, constraintRef.current)
      constraintRef.current = undefined
    }
    
    setSelectedBody(null)
    setIsDragging(false)
  }, [])



  return (
    <div className="relative">
      {/* Clean Bucket Container */}
      <div
        ref={containerRef}
        className="relative mx-auto"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          // Clean glass bucket design
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(12px)',
          borderRadius: '0 0 40px 40px', // Bucket shape
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Enhanced Bucket Handle */}
        <div 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '20px 20px 0 0',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          }}
        />

        {/* Clean Bucket Rim */}
        <div 
          className="absolute -top-1 -left-2 -right-2 h-4"
          style={{
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(8px)'
          }}
        />
        
        {/* Physics Canvas */}
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          style={{
            borderRadius: '0 0 38px 38px',
            display: 'block'
          }}
        />
      </div>
    </div>
  )
}

// Main Physics Dreams Bucket Component
const PhysicsDreamsBucket = () => {
  const [isClient, setIsClient] = useState(false)

  // Clean, responsive dimensions
  const [dimensions, setDimensions] = useState({
    width: 700,
    height: 500
  })

  useEffect(() => {
    setIsClient(true)
    
    const updateDimensions = () => {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      
      if (screenWidth < 640) {
        // Mobile - much wider and taller (adapted from retro theme)
        setDimensions({
          width: Math.min(screenWidth - 20, 380), // Increased width, less margin
          height: Math.min(screenHeight * 0.6, 500) // Adaptive height based on screen
        })
      } else if (screenWidth < 1024) {
        // Tablet
        setDimensions({
          width: Math.min(screenWidth - 60, 650),
          height: 520
        })
      } else {
        // Desktop
        setDimensions({
          width: Math.min(screenWidth - 200, 800),
          height: 560
        })
      }
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const stats = getBucketListStats()

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin w-12 h-12 border-3 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-lg">Loading Physics Dreams Bucket...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Clean Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            🪣 Dreams Bucket
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Interactive physics sandbox. Drag and throw your dreams around with realistic physics.
          </p>
        </motion.div>

        {/* Clean Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {[
            { label: 'Total Dreams', value: stats.total, icon: '🎯' },
            { label: 'Completed', value: stats.completed, icon: '✅' },
            { label: 'In Progress', value: stats.pending, icon: '🚀' }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="text-center p-4 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="text-2xl font-bold text-white mb-1">
                {stat.icon} {stat.value}
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Physics Canvas */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <PhysicsCanvas dimensions={dimensions} />
        </motion.div>

        {/* Clean Instructions */}
        <motion.div 
          className="text-center mt-8 text-white/70 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span>🖱️</span>
              <span>Click & drag to move dreams</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎯</span>
              <span>Throw with momentum</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🪣</span>
              <span>Dreams stay in the bucket</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PhysicsDreamsBucket
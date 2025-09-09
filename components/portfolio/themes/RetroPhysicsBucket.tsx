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
        <div className="animate-spin w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full mx-auto mb-2"></div>
        <div className="pixel-text">Loading Physics Engine...</div>
      </div>
    </div>
  )
})

// Physics Canvas Component (Client-side only) - EXACT COPY from Glass theme
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
    console.log('🔄 useEffect triggered!')
    console.log('🏗️ isPhysicsReady:', isPhysicsReady)
    console.log('📋 bucketList?.length:', bucketList?.length)
    console.log('🌍 worldRef.current exists:', !!worldRef.current)
    
    if (isPhysicsReady && bucketList?.length > 0) {
      console.log('✅ useEffect: All conditions met, calling dropInDreams')
      setTimeout(() => dropInDreams(), 100) // Small delay to ensure everything is ready
    } else {
      console.log('❌ useEffect: Conditions not met')
      console.log('   - isPhysicsReady:', isPhysicsReady)
      console.log('   - bucketList.length:', bucketList?.length)
    }
  }, [isPhysicsReady, bucketList])

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

    // Create engine with stable physics
    const engine = Matter.Engine.create()
    engine.world.gravity.y = 1
    engine.world.gravity.scale = 0.003 // Moderate gravity for stability
    // Stable performance
    engine.timing.timeScale = 1 // Normal time scale
    engine.constraintIterations = 4
    engine.positionIterations = 6
    engine.velocityIterations = 4
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

    // Override render to draw custom dream pills with RETRO styling
    Matter.Events.on(render, 'afterRender', () => {
      drawRetroDreamPills(render.context, render.canvas)
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
    
    // Force drop dreams after a short delay to ensure everything is ready
    setTimeout(() => {
      console.log('Manual trigger: Forcing dropInDreams after initialization')
      dropInDreams()
    }, 500)
  }

  // CHANGED: Retro styling instead of glass
  const drawRetroDreamPills = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!dreamBodies.current.length) return

    // Disable antialiasing for pixel-perfect rendering
    ctx.imageSmoothingEnabled = false

    dreamBodies.current.forEach((body) => {
      if (!body.dreamData) return

      const { dreamData } = body
      const { x, y } = body.position
      const angle = body.angle

      // Skip if body is outside visible area (may have fallen through)
      if (y > dimensions.height + 100) return

      // Calculate pill dimensions based on actual text width
      ctx.font = 'bold 14px monospace' // Retro monospace font
      const textMetrics = ctx.measureText(dreamData.title)
      const pillWidth = Math.max(100, textMetrics.width + 40) // Add padding
      const pillHeight = 42

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)

      // Retro pill background with solid colors
      if (dreamData.completed) {
        ctx.fillStyle = '#22c55e' // Solid green
      } else {
        const colors = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#8b5cf6', '#ec4899']
        const colorIndex = dreamData.title.charCodeAt(0) % colors.length
        ctx.fillStyle = colors[colorIndex]
      }

      // Draw retro pill shape (more rectangular)
      ctx.fillRect(-pillWidth/2, -pillHeight/2, pillWidth, pillHeight)

      // Retro border - thick black outline
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 3
      ctx.strokeRect(-pillWidth/2, -pillHeight/2, pillWidth, pillHeight)

      // Retro highlight - simple white top bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.fillRect(-pillWidth/2, -pillHeight/2, pillWidth, 8)

      // Retro shadow effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fillRect(-pillWidth/2 + 2, -pillHeight/2 + 2, pillWidth, pillHeight)

      // Pixel-perfect text - larger font size
      ctx.fillStyle = 'white'
      ctx.font = 'bold 14px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Black text outline for retro look
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 3
      ctx.strokeText(dreamData.title, 0, 0)
      ctx.fillText(dreamData.title, 0, 0)

      if (dreamData.completed) {
        // Retro strike through for completed dreams
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(-pillWidth/2 + 15, 0)
        ctx.lineTo(pillWidth/2 - 15, 0)
        ctx.stroke()
      }

      ctx.restore()
    })
  }

  const createBucketBoundaries = (Matter: any) => {
    if (!worldRef.current) return

    const thickness = 50 // Much thicker walls to prevent escape
    const bucketWidth = dimensions.width - 80
    const bucketHeight = dimensions.height - 40
    const bucketBottom = dimensions.height - 20

    // Create much stronger boundaries - should be virtually unbreakable
    console.log('Creating boundaries for dimensions:', dimensions.width, 'x', dimensions.height)
    
    const boundaries = [
      // Bottom - super thick and wide
      Matter.Bodies.rectangle(dimensions.width / 2, bucketBottom + thickness / 2, bucketWidth + thickness * 2, thickness, { 
        isStatic: true,
        render: { visible: false },
        label: 'bottom',
        restitution: 0.3,
        friction: 0.8
      }),
      // Left wall - much taller and thicker
      Matter.Bodies.rectangle(40 + thickness / 2, dimensions.height / 2, thickness, dimensions.height + 400, { 
        isStatic: true,
        render: { visible: false },
        label: 'left',
        restitution: 0.3,
        friction: 0.8
      }),
      // Right wall - much taller and thicker  
      Matter.Bodies.rectangle(dimensions.width - 40 - thickness / 2, dimensions.height / 2, thickness, dimensions.height + 400, { 
        isStatic: true,
        render: { visible: false },
        label: 'right',
        restitution: 0.3,
        friction: 0.8
      }),
      // Top invisible ceiling to catch high bounces
      Matter.Bodies.rectangle(dimensions.width / 2, -200, dimensions.width + 400, 100, { 
        isStatic: true,
        render: { visible: false },
        label: 'top-ceiling',
        restitution: 0.1
      }),
      // Extra side barriers far outside
      Matter.Bodies.rectangle(-200, dimensions.height / 2, 100, dimensions.height + 800, { 
        isStatic: true,
        render: { visible: false },
        label: 'left-barrier',
        restitution: 0.1
      }),
      Matter.Bodies.rectangle(dimensions.width + 200, dimensions.height / 2, 100, dimensions.height + 800, { 
        isStatic: true,
        render: { visible: false },
        label: 'right-barrier',
        restitution: 0.1
      })
    ]

    Matter.World.add(worldRef.current!, boundaries)
  }

  const createDreamPill = (Matter: any, dream: any, x: number, y: number) => {
    // Calculate pill dimensions based on actual text measurement
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    ctx.font = 'bold 14px monospace'
    const textMetrics = ctx.measureText(dream.title)
    const pillWidth = Math.max(80, Math.min(textMetrics.width + 30, dimensions.width - 60)) // Constrain to bucket width
    const pillHeight = 36 // Slightly smaller for mobile

    const body = Matter.Bodies.rectangle(x, y, pillWidth, pillHeight, {
      render: {
        visible: false // Use custom rendering instead
      },
      restitution: 0.4, // Less bouncy to stay in bucket
      friction: 0.6, // More friction to settle quickly
      frictionAir: 0.01, // Moderate air friction for control
      density: 0.003, // Good density for natural fall
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
    console.log('🚀 dropInDreams called!')
    console.log('🌍 worldRef.current:', !!worldRef.current)
    console.log('🪣 bucketList:', bucketList)
    console.log('📊 bucketList.length:', bucketList?.length)
    
    if (!worldRef.current || typeof window === 'undefined') {
      console.log('❌ dropInDreams: No world or not in browser')
      return
    }

    if (!bucketList || bucketList.length === 0) {
      console.log('❌ dropInDreams: No bucket list items found!')
      return
    }

    const Matter = require('matter-js')

    // Clear existing dreams
    dreamBodies.current.forEach(body => {
      Matter.World.remove(worldRef.current!, body)
    })
    dreamBodies.current = []

    console.log('✅ dropInDreams: Dropping', bucketList.length, 'dreams simultaneously')

    // Create all dreams simultaneously with safe positioning
    bucketList.forEach((dream, i) => {
      // Safe distribution across bucket width
      const spacing = Math.max(40, (dimensions.width - 160) / bucketList.length)
      const startX = 80 + (i * spacing) + (Math.random() * 20 - 10) // Smaller randomness
      const startY = -80 - (i * 15) // Start closer, more stagger
      
      try {
        const dreamBody = createDreamPill(Matter, dream, startX, startY)
        // Add gentle initial downward velocity
        Matter.Body.setVelocity(dreamBody, { x: 0, y: 1 })
        dreamBodies.current.push(dreamBody)
        Matter.World.add(worldRef.current!, dreamBody)
        console.log(`Added dream ${i + 1}/${bucketList.length}: ${dream.title}`)
      } catch (error) {
        console.error(`Error creating dream "${dream.title}":`, error)
      }
    })
    
    console.log('dropInDreams: All', dreamBodies.current.length, 'dreams released! 🚀')
  }

  const enhancePhysicsEngine = (Matter: any, engine: any) => {
    // Disabled escape detection to allow natural physics and collisions
    // The strong boundary walls should contain the dreams naturally
    console.log('enhancePhysicsEngine: Escape detection disabled for natural physics')
    
    // Only reset for extreme physics glitches (way outside canvas)
    Matter.Events.on(engine, 'beforeUpdate', () => {
      dreamBodies.current.forEach(body => {
        const { x, y } = body.position
        
        // Only reset if EXTREMELY far outside (real physics bugs only)
        if (x < -1000 || x > dimensions.width + 1000 || y > dimensions.height + 1000 || y < -1000) {
          console.log(`Real physics glitch detected - dream at (${x.toFixed(1)}, ${y.toFixed(1)}) - resetting`)
          // Drop back in from top instead of placing in center
          Matter.Body.setPosition(body, {
            x: Math.random() * (dimensions.width - 100) + 50,
            y: -100
          })
          Matter.Body.setVelocity(body, { x: 0, y: 2 })
        }
      })
    })
  }

  // Enhanced interaction handling for both mouse and touch
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
          stiffness: 0.9, // Increased for better responsiveness
          damping: 0.2,
          length: 0
        })
        
        constraintRef.current = constraint
        Matter.World.add(worldRef.current!, constraint)
        break
      }
    }
  }, [])

  // Touch event handlers for mobile
  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (!canvasRef.current || !worldRef.current || typeof window === 'undefined') return
    
    event.preventDefault() // Prevent scrolling
    const Matter = require('matter-js')
    const rect = canvasRef.current.getBoundingClientRect()
    const touch = event.touches[0]
    const touchX = touch.clientX - rect.left
    const touchY = touch.clientY - rect.top

    const bodies = dreamBodies.current
    const touchPosition = { x: touchX, y: touchY }
    
    for (let body of bodies) {
      if (Matter.Bounds.contains(body.bounds, touchPosition)) {
        setSelectedBody(body)
        setIsDragging(true)
        
        const constraint = Matter.Constraint.create({
          pointA: touchPosition,
          bodyB: body,
          pointB: { x: 0, y: 0 },
          stiffness: 0.9,
          damping: 0.2,
          length: 0
        })
        
        constraintRef.current = constraint
        Matter.World.add(worldRef.current!, constraint)
        break
      }
    }
  }, [])

  const handleTouchMove = useCallback((event: React.TouchEvent) => {
    if (!constraintRef.current || !isDragging || !canvasRef.current) return
    
    event.preventDefault() // Prevent scrolling
    const rect = canvasRef.current.getBoundingClientRect()
    const touch = event.touches[0]
    let touchX = touch.clientX - rect.left
    let touchY = touch.clientY - rect.top
    
    // Constrain touch position to bucket boundaries
    const margin = 60
    touchX = Math.max(margin, Math.min(touchX, dimensions.width - margin))
    touchY = Math.max(margin, Math.min(touchY, dimensions.height - margin))
    
    constraintRef.current.pointA = { x: touchX, y: touchY }
  }, [isDragging, dimensions])

  const handleTouchEnd = useCallback((event: React.TouchEvent) => {
    event.preventDefault()
    if (constraintRef.current && worldRef.current && typeof window !== 'undefined') {
      const Matter = require('matter-js')
      Matter.World.remove(worldRef.current, constraintRef.current)
      constraintRef.current = undefined
    }
    
    setSelectedBody(null)
    setIsDragging(false)
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
      {/* RETRO Bucket Container */}
      <div
        ref={containerRef}
        className="relative mx-auto pixel-perfect"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          // Retro bucket design - solid colors, thick borders
          background: '#374151', // Gray-700
          border: '3px solid #000000', // Thinner border for mobile
          borderRadius: '0 0 16px 16px', // Less rounded for mobile
          boxShadow: '3px 3px 0px #000000, inset 2px 2px 0px rgba(255, 255, 255, 0.3)',
          cursor: isDragging ? 'grabbing' : 'grab',
          imageRendering: 'pixelated',
          overflow: 'hidden' // Prevent visual overflow
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* Manual Drop Button */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={() => {
              console.log('🎯 Manual drop button clicked!')
              dropInDreams()
            }}
            className="px-3 py-1 bg-yellow-500 hover:bg-yellow-400 text-black font-bold border-2 border-black rounded pixel-text text-xs retro-button-3d"
          >
            🪣 DROP NOW!
          </button>
        </div>

        {/* Retro Bucket Handle */}
        <div 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6"
          style={{
            background: '#6b7280', // Gray-500
            border: '3px solid #000000',
            borderRadius: '10px 10px 0 0',
            boxShadow: '2px 2px 0px #000000',
            imageRendering: 'pixelated'
          }}
        />

        {/* Retro Bucket Rim */}
        <div 
          className="absolute -top-1 -left-2 -right-2 h-4"
          style={{
            background: '#9ca3af', // Gray-400
            borderRadius: '8px',
            border: '2px solid #000000',
            boxShadow: '2px 2px 0px #000000',
            imageRendering: 'pixelated'
          }}
        />

        {/* Scanlines overlay for retro CRT effect */}
        <div className="absolute inset-0 scanlines pointer-events-none z-10" />
        
        {/* Physics Canvas */}
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          style={{
            borderRadius: '0 0 16px 16px',
            display: 'block',
            imageRendering: 'pixelated',
            touchAction: 'none', // Prevent touch scrolling
            userSelect: 'none', // Prevent text selection
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none'
          }}
        />
      </div>

      {/* Retro Selected Item Info - Mobile Optimized */}
      {selectedBody && (selectedBody as any).dreamData && (
        <div className="absolute bottom-1 left-1 right-1 pointer-events-none z-20">
          <div className="bg-cyan-300 border-2 border-black rounded p-2 sm:p-3 pixel-perfect retro-container">
            <h4 className="text-black font-bold text-xs sm:text-sm md:text-base pixel-text leading-tight">
              {(selectedBody as any).dreamData.title}
            </h4>
            <div className={`text-xs sm:text-sm font-bold mt-1 pixel-text ${
              (selectedBody as any).dreamData.completed ? 'text-green-600' : 'text-red-600'
            }`}>
              {(selectedBody as any).dreamData.completed ? '✅ COMPLETED' : '⏳ PENDING'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Main Physics Dreams Bucket Component - SAME LOGIC, RETRO STYLING
const RetroPhysicsBucket = () => {
  const [isClient, setIsClient] = useState(false)

  // Enhanced responsive dimensions for better mobile experience
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
        // Mobile - much wider and taller
        setDimensions({
          width: Math.min(screenWidth - 20, 380), // Increased width
          height: Math.min(screenHeight * 0.6, 500) // Adaptive height
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
      <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
        <div className="text-center text-white">
          <div className="animate-spin w-12 h-12 border-3 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-sm sm:text-lg pixel-text">Loading Physics Dreams Bucket...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen py-4 sm:py-8">
      {/* Retro Header */}
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-yellow-400 pixel-text">
          🪣 DREAMS BUCKET
        </h2>
        <p className="text-white text-xs sm:text-sm md:text-base pixel-text max-w-xs sm:max-w-md lg:max-w-lg mx-auto px-2 leading-relaxed">
          Interactive physics sandbox for your aspirations
        </p>
      </motion.div>

      {/* Retro Stats Grid */}
      <motion.div 
        className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 px-1 sm:px-2 md:px-0 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {[
          { label: 'Dreams', shortLabel: 'Total', value: stats.total, icon: '🎯', color: 'bg-blue-500' },
          { label: 'Done', shortLabel: 'Complete', value: stats.completed, icon: '✅', color: 'bg-green-500' },
          { label: 'Active', shortLabel: 'Progress', value: stats.pending, icon: '🚀', color: 'bg-orange-500' }
        ].map((stat, index) => (
          <motion.div 
            key={stat.label} 
            className={`text-center p-1 sm:p-2 md:p-4 rounded border-2 sm:border-4 border-black ${stat.color} retro-button-3d pixel-perfect`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 pixel-text">
              {stat.icon} {stat.value}
            </div>
            <div className="text-white text-xs sm:text-sm md:text-base pixel-text leading-tight break-words">
              <span className="hidden sm:inline">{stat.label}</span>
              <span className="sm:hidden">{stat.shortLabel}</span>
            </div>
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

      {/* Retro Instructions */}
      <motion.div 
        className="text-center mt-6 bg-black border-2 sm:border-4 border-yellow-400 rounded p-3 sm:p-4 pixel-perfect retro-container mx-2 sm:mx-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-yellow-400 text-xs sm:text-sm md:text-base font-bold pixel-text mb-2">
          🎮 RETRO CONTROLS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm pixel-text text-white">
          <div className="flex items-center justify-center gap-2 p-2 bg-gray-800/50 rounded">
            <span>🖱️</span>
            <span className="text-center break-words">Click & drag dreams</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 bg-gray-800/50 rounded">
            <span>🎯</span>
            <span className="text-center break-words">Throw momentum</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 bg-gray-800/50 rounded">
            <span>🪣</span>
            <span className="text-center break-words">Dreams stay safe</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default RetroPhysicsBucket
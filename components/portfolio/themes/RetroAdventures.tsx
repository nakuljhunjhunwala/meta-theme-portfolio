"use client"

import React from 'react'
import RetroAdvancedMap from './RetroAdvancedMap'
import RetroPhysicsBucket from './RetroPhysicsBucket'

interface RetroAdventuresProps {
  addScore: (points: number, playSound_?: boolean) => void
  addCoins: (coins: number) => void
  unlockAchievement: (achievement: string) => void
}

export default function RetroAdventures({ addScore, addCoins, unlockAchievement }: RetroAdventuresProps) {
  return (
    <div className="space-y-8 w-full max-w-none">
      {/* Advanced Travel Map - Mario Style! - INCREASED WIDTH */}
      <div className="bg-green-400 border-4 border-yellow-400 rounded-lg p-4 pixel-perfect retro-container w-full">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white pixel-text drop-shadow-lg">
            🗺️ TRAVEL ADVENTURES & DREAM DESTINATIONS
          </h3>
          <div className="bg-white text-green-600 px-2 py-1 rounded text-xs font-bold inline-block border-2 border-black">
            DRAG & ZOOM ENABLED
          </div>
        </div>
        <div className="w-full">
          <RetroAdvancedMap />
        </div>
      </div>
      
      {/* Physics Dreams Bucket - Mario Style! - INCREASED WIDTH */}
      <div className="bg-pink-400 border-4 border-yellow-400 rounded-lg p-4 pixel-perfect retro-container w-full">
        <div className="text-center mb-4">
          <div className="bg-white text-purple-600 px-2 py-1 rounded text-xs font-bold inline-block border-2 border-black">
            DRAG & THROW YOUR DREAMS
          </div>
        </div>
        <div className="w-full">
          <RetroPhysicsBucket />
        </div>
      </div>
    </div>
  )
}

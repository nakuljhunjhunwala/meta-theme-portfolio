"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface GameModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
}

const GameModal: React.FC<GameModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-[#0d0f14] border-4 border-[#2f2f46] shadow-2xl w-full h-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] flex flex-col relative rounded-lg overflow-hidden crt-overlay game-screen"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(0, 255, 200, 0.06) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(0, 120, 255, 0.06) 0%, transparent 50%),
                linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.03) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.03) 75%)
              `,
              backgroundSize: '400px 400px, 400px 400px, 20px 20px, 20px 20px, 20px 20px, 20px 20px',
              backgroundPosition: '0 0, 100% 100%, 0 0, 0 10px, 10px -10px, -10px 0px'
            }}
          >
            <div className="flex items-center justify-between p-3 sm:p-4 bg-[#0d0f14] border-b-2 border-[#2f2f46] relative">
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative flex items-center">
                <h2 className="text-sm sm:text-base font-bold text-[#9ae6b4] pixel-text">
                  {title.toUpperCase()}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="relative text-white/70 hover:text-white transition-colors rounded p-1 sm:p-2 border border-white/10"
              >
                <X size={18} className="sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="flex-grow overflow-hidden p-2 sm:p-4 relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                {children}
              </div>
              <div className="crt-scanline"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GameModal


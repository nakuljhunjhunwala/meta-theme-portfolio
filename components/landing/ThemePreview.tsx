"use client"

import { motion } from "framer-motion"
import { X, ExternalLink } from "lucide-react"

interface Theme {
  id: string
  name: string
  description: string
  icon: string
  color: string
  preview: string
  bestFor: string
}

interface ThemePreviewProps {
  theme: Theme
  onClose: () => void
  onSelect: () => void
}

export default function ThemePreview({ theme, onClose, onSelect }: ThemePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-2xl w-full p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{theme.icon}</div>
            <div>
              <h3 className="text-2xl font-bold text-white">{theme.name}</h3>
              <p className="text-gray-300">{theme.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Preview Image */}
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-6 overflow-hidden">
          <img
            src={theme.preview || "/placeholder.svg"}
            alt={`${theme.name} preview`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Best For:</h4>
            <p className="text-gray-300">{theme.bestFor}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Features:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {getThemeFeatures(theme.id).map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            onClick={onSelect}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-semibold transition-all transform hover:scale-105"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Experience This Theme</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-semibold transition-colors"
          >
            Close Preview
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function getThemeFeatures(themeId: string): string[] {
  switch (themeId) {
    case "retro":
      return [
        "8-bit pixel art style",
        "Achievement system",
        "Mini-games",
        "Retro sound effects",
        "Mario-inspired colors",
        "Gamified navigation",
      ]
    case "code":
      return [
        "VS Code interface",
        "Syntax highlighting",
        "File explorer",
        "Integrated terminal",
        "Realistic IDE experience",
        "Code snippets",
      ]
    case "glass":
      return [
        "Glass morphism effects",
        "Smooth animations",
        "Modern design",
        "Interactive backgrounds",
        "Elegant typography",
        "Responsive layout",
      ]
    case "terminal":
      return [
        "Command-line interface",
        "Matrix-style effects",
        "Interactive commands",
        "Command history",
        "Terminal themes",
        "Easter eggs",
      ]
    default:
      return []
  }
}

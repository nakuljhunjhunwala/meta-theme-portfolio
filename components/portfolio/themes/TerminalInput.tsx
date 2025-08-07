"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { commandList } from "./useCommands"

interface TerminalInputProps {
  onCommand: (command: string) => void
}

export function TerminalInput({ onCommand }: TerminalInputProps) {
  const [value, setValue] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (value) {
      const newSuggestions = Object.keys(commandList).filter((cmd) => cmd.startsWith(value))
      setSuggestions(newSuggestions)
      setActiveSuggestion(0)
    } else {
      setSuggestions([])
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" || e.key === "ArrowRight") {
      e.preventDefault()
      if (suggestions.length > 0) {
        setValue(suggestions[activeSuggestion])
        setSuggestions([])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveSuggestion((prev) => (prev + 1) % suggestions.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCommand(value)
    setValue("")
    setSuggestions([])
  }

  return (
    <div className="bg-gray-800/80 p-4 border-t border-gray-700 flex-shrink-0">
      <div className="relative">
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400">~</span>
          <span className="text-gray-500 ml-2">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-300 ml-2 outline-none"
            autoComplete="off"
          />
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="w-2 h-4 bg-green-400"
          />
        </form>
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-full left-0 w-full bg-gray-700/80 backdrop-blur-sm rounded-md p-2 mb-2 text-xs"
            >
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {suggestions.map((s, i) => (
                  <li
                    key={s}
                    onClick={() => {
                      setValue(s)
                      setSuggestions([])
                    }}
                    className={`cursor-pointer transition-colors ${
                      i === activeSuggestion ? "text-yellow-400" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 
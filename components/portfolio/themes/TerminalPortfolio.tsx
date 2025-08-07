"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { personalInfo } from "@/constants/portfolio"
import { TerminalInput } from "./TerminalInput"
import { TerminalOutput } from "./TerminalOutput"
import { useCommands } from "./useCommands"

export interface Command {
  command: string
  output: React.ReactNode
}

export default function TerminalPortfolio() {
  const [history, setHistory] = useState<Command[]>([])
  const { executeCommand } = useCommands({ setHistory })

  const { unlockAchievement } = usePortfolioStore()

  useEffect(() => {
    unlockAchievement("terminal-master")
    executeCommand("welcome")
  }, [unlockAchievement, executeCommand])

  const handleCommand = (cmd: string) => {
    executeCommand(cmd)
  }

  return (
    <div
      className="bg-[#1a1b26] min-h-screen p-4 flex items-center justify-center font-mono text-sm antialiased"
            style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)",
        backgroundSize: "1.5rem 1.5rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-4xl h-[85vh] flex flex-col bg-[#282a36]/80 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden border border-gray-700"
      >
        <div className="bg-gray-800/80 p-3 flex items-center border-b border-gray-700 flex-shrink-0">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <p className="text-center text-xs md:text-sm text-gray-400 flex-1">
            {personalInfo.name}@portfolio: ~
          </p>
        </div>

        <TerminalOutput history={history} />
        <TerminalInput onCommand={handleCommand} />
      </motion.div>
    </div>
  )
}

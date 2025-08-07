"use client"

import { useEffect, useRef } from "react"
import type { Command } from "./TerminalPortfolio"
import { personalInfo } from "@/constants/portfolio"

interface TerminalOutputProps {
  history: Command[]
}

export function TerminalOutput({ history }: TerminalOutputProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 text-xs md:text-sm">
      {history.map((entry, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center">
            <span className="text-green-400">{personalInfo.name}@portfolio</span>
            <span className="text-gray-500">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-gray-500">$</span>
            <span className="text-gray-300 ml-2">{entry.command}</span>
          </div>
          <div className="text-gray-300 whitespace-pre-wrap ml-2">{entry.output}</div>
        </div>
      ))}
    </div>
  )
} 
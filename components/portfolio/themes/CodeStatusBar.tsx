"use client"

import { GitBranch, Wifi, CheckCircle } from "lucide-react"

interface CodeStatusBarProps {
  fileName: string
  lines: number
}

export function CodeStatusBar({ fileName, lines }: CodeStatusBarProps) {
  return (
    <div className="bg-[#007acc] text-white px-3 py-1 flex items-center justify-between text-xs md:text-sm">
      <div className="flex items-center gap-2 md:gap-4">
        <GitBranch className="w-4 h-4" />
        <span>main</span>
        <span className="hidden md:inline">·</span>
        <CheckCircle className="w-4 h-4 text-green-300" />
        <span className="hidden md:inline">No issues</span>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <span>Ln {lines}, Col 1</span>
        <span className="hidden md:inline">Spaces: 2</span>
        <span className="hidden md:inline">UTF-8</span>
        <Wifi className="w-4 h-4" />
      </div>
    </div>
  )
} 
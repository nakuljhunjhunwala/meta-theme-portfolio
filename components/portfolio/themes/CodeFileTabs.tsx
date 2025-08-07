"use client"

import { motion } from "framer-motion"
import { FileJson, FileText, Code, Braces } from "lucide-react"
import type { PortfolioFileType } from "./CodePortfolio"

interface CodeFileTabsProps {
  files: { name: PortfolioFileType; language: string }[]
  activeFile: PortfolioFileType
  setActiveFile: (file: PortfolioFileType) => void
}

const getIcon = (language: string) => {
  switch (language) {
    case "typescript":
      return <Code className="w-4 h-4 mr-2 text-blue-400" />
    case "json":
      return <Braces className="w-4 h-4 mr-2 text-yellow-400" />
    case "markdown":
      return <FileText className="w-4 h-4 mr-2 text-gray-400" />
    default:
      return <FileJson className="w-4 h-4 mr-2 text-gray-400" />
  }
}

export function CodeFileTabs({ files, activeFile, setActiveFile }: CodeFileTabsProps) {
  return (
    <div className="bg-[#252526] border-b border-[#3e3e42]">
      <div className="flex overflow-x-auto custom-scrollbar">
        {files.map((file) => (
          <button
            key={file.name}
            onClick={() => setActiveFile(file.name)}
            className={`relative flex items-center px-3 md:px-4 py-2 text-xs md:text-sm font-mono border-r border-[#3e3e42] transition-colors whitespace-nowrap ${
              activeFile === file.name ? "text-white" : "text-gray-400 hover:bg-[#1e1e1e] hover:text-white"
            }`}
          >
            {getIcon(file.language)}
            {file.name}
            {activeFile === file.name && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                layoutId="activeTabIndicator"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
} 
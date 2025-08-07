"use client"

import { motion } from "framer-motion"

interface CodeWindowProps {
  title: string
  children: React.ReactNode
}

export function CodeWindow({ title, children }: CodeWindowProps) {
  return (
    <div className="relative bg-[#282c34] border border-[#3e3e42] rounded-lg shadow-2xl overflow-hidden max-w-full">
      <div className="relative">
        <div className="bg-[#21252b] px-3 py-2 flex items-center justify-between border-b border-[#3e3e42]">
          <div className="flex items-center gap-2">
            <div className="flex gap-2 group">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] group-hover:bg-[#ff7871]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] group-hover:bg-[#ffca58]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28ca42] group-hover:bg-[#52d669]" />
            </div>
            <span className="text-gray-400 text-xs md:text-sm ml-2 truncate">{title}</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
} 
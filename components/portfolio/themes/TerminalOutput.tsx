"use client"

import { useEffect, useRef } from "react"
import type { Command } from "./TerminalPortfolio"
import { personalInfo } from "@/constants/portfolio"
import TravelEmbed from "../TravelEmbed"

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
          <div className="text-gray-300 whitespace-pre-wrap ml-2">
            {entry.output === '__TRAVEL_EMBED__' ? (
              <div className="my-2 border border-green-500/30 rounded-lg overflow-hidden">
                <div className="bg-green-500/10 px-3 py-1 text-[11px] text-green-400 border-b border-green-500/20 flex items-center gap-2">
                  <span>travel-explorer</span>
                  <span className="opacity-50">|</span>
                  <span className="opacity-60">interactive map</span>
                </div>
                <TravelEmbed
                  view="map"
                  height="350px"
                  showExploreButton={true}
                  exploreButtonText="travel --open"
                  exploreButtonClassName="mt-2 mb-1 text-[11px] text-green-400/60 hover:text-green-400 transition-colors cursor-pointer flex items-center gap-1 ml-2"
                  onTripClick={(slug) => window.open(`https://travel.nakuljhunjhunwala.in/trips/${slug}`, '_blank')}
                />
              </div>
            ) : entry.output}
          </div>
        </div>
      ))}
    </div>
  )
} 
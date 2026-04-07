"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePortfolioStore } from "@/stores/portfolioStore"
import {
  getTravelEmbedUrl,
  mapThemeForEmbed,
  onTravelMessage,
  sendToTravelEmbed,
} from "@/lib/travel-bridge"

interface TravelEmbedProps {
  /** Which view to embed: "map", "trips", or "trip/slug-name" */
  view: "map" | "trips" | `trip/${string}`
  /** Additional CSS classes on the outer wrapper */
  className?: string
  /** iframe height (CSS value). Default: "500px" */
  height?: string
  /** Show the "Explore Full Journey" button below iframe. Default: true */
  showExploreButton?: boolean
  /** Custom text for the explore button */
  exploreButtonText?: string
  /** Custom className for the explore button */
  exploreButtonClassName?: string
  /** Called when user clicks a trip in the iframe */
  onTripClick?: (slug: string, title: string) => void
  /** Called when user selects a state on the map */
  onStateSelect?: (state: string) => void
  /** Called when the iframe signals ready */
  onReady?: () => void
  /** Custom loading component */
  loadingComponent?: React.ReactNode
}

const TRAVEL_SITE_URL = "https://travel.nakuljhunjhunwala.in"

export default function TravelEmbed({
  view,
  className = "",
  height = "500px",
  showExploreButton = true,
  exploreButtonText = "Explore Full Journey",
  exploreButtonClassName,
  onTripClick,
  onStateSelect,
  onReady,
  loadingComponent,
}: TravelEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const currentTheme = usePortfolioStore((s) => s.currentTheme)
  const embedTheme = mapThemeForEmbed(currentTheme)

  const src = getTravelEmbedUrl(view, embedTheme)

  // Listen for messages from the travel iframe
  useEffect(() => {
    return onTravelMessage({
      onReady: () => {
        setIsLoaded(true)
        onReady?.()
      },
      onTripClicked: (slug, title) => {
        onTripClick?.(slug, title)
      },
      onStateSelected: (state) => {
        onStateSelect?.(state)
      },
    })
  }, [onReady, onTripClick, onStateSelect])

  // Notify iframe when parent theme changes
  useEffect(() => {
    if (!iframeRef.current || !isLoaded) return
    sendToTravelEmbed(iframeRef.current, {
      type: "PARENT_THEME_CHANGED",
      theme: embedTheme,
    })
  }, [embedTheme, isLoaded])

  // Timeout fallback — if iframe doesn't signal ready in 8s, show it anyway
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) setIsLoaded(true)
    }, 8000)
    return () => clearTimeout(timer)
  }, [isLoaded])

  const handleExploreClick = useCallback(() => {
    const url = view.startsWith("trip/")
      ? `${TRAVEL_SITE_URL}/trips/${view.replace("trip/", "")}`
      : TRAVEL_SITE_URL
    window.open(url, "_blank", "noopener")
  }, [view])

  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 py-8 ${className}`}>
        <p className="text-sm opacity-60">Travel portfolio is currently unavailable</p>
        <button
          onClick={handleExploreClick}
          className={exploreButtonClassName || "text-sm underline opacity-80 hover:opacity-100 transition-opacity"}
        >
          Visit travel.nakuljhunjhunwala.in directly
        </button>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* iframe container */}
      <div className="relative" style={{ height }}>
        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {loadingComponent || (
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin opacity-40" />
                <span className="text-xs opacity-40">Loading travel map...</span>
              </div>
            )}
          </div>
        )}

        {/* The iframe */}
        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
        <iframe
          ref={iframeRef}
          src={src}
          title="Travel Portfolio"
          className="w-full h-full border-0 rounded-lg"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.4s ease",
            background: "transparent",
            colorScheme: "normal",
          }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          // @ts-expect-error -- allowTransparency is a valid HTML attribute
          allowTransparency="true"
          onError={() => setHasError(true)}
        />
      </div>

      {/* Explore button */}
      {showExploreButton && (
        <button
          onClick={handleExploreClick}
          className={
            exploreButtonClassName ||
            "mt-3 flex items-center gap-1.5 mx-auto text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          }
        >
          {exploreButtonText}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </button>
      )}
    </div>
  )
}

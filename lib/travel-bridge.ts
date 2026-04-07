/**
 * postMessage bridge for communicating with the embedded travel portfolio iframe.
 *
 * Provides typed message sending/receiving and origin validation.
 */

import type { ThemeType } from "@/stores/portfolioStore"

// --- Incoming message types (travel iframe → meta-theme) ---

export type TravelIncomingMessage =
  | { type: "TRAVEL_EMBED_READY" }
  | { type: "TRAVEL_STATE_SELECTED"; state: string }
  | { type: "TRAVEL_TRIP_CLICKED"; slug: string; title: string }
  | { type: "TRAVEL_NAV_REQUEST"; url: string }

// --- Outgoing message types (meta-theme → travel iframe) ---

export type TravelOutgoingMessage =
  | { type: "PARENT_THEME_CHANGED"; theme: string }
  | { type: "PARENT_AUTH_TOKEN"; token: string }

const TRAVEL_ORIGIN = process.env.NODE_ENV === "production"
  ? "https://travel.nakuljhunjhunwala.in"
  : "http://localhost:3001"

const TRAVEL_BASE_URL = TRAVEL_ORIGIN

/** Build the full embed URL for a given view and theme. */
export function getTravelEmbedUrl(
  view: "map" | "trips" | `trip/${string}`,
  theme: ThemeType
): string {
  return `${TRAVEL_BASE_URL}/embed/${view}?theme=${theme}`
}

/** Send a typed message to the travel iframe. */
export function sendToTravelEmbed(
  iframe: HTMLIFrameElement,
  message: TravelOutgoingMessage
): void {
  iframe.contentWindow?.postMessage(message, TRAVEL_ORIGIN)
}

/** Map meta-theme ThemeType to travel embed theme string. */
export function mapThemeForEmbed(theme: ThemeType | "landing"): ThemeType {
  if (theme === "landing") return "glass"
  return theme
}

/**
 * Hook-compatible message listener factory.
 * Returns an unsubscribe function.
 */
export function onTravelMessage(
  handlers: Partial<{
    onReady: () => void
    onStateSelected: (state: string) => void
    onTripClicked: (slug: string, title: string) => void
    onNavRequest: (url: string) => void
  }>
): () => void {
  if (typeof window === "undefined") return () => { }

  const listener = (event: MessageEvent) => {
    // Validate origin
    if (
      process.env.NODE_ENV === "production" &&
      event.origin !== TRAVEL_ORIGIN
    ) {
      return
    }

    const data = event.data
    if (!data || typeof data !== "object" || !("type" in data)) return

    switch (data.type) {
      case "TRAVEL_EMBED_READY":
        handlers.onReady?.()
        break
      case "TRAVEL_STATE_SELECTED":
        handlers.onStateSelected?.(data.state)
        break
      case "TRAVEL_TRIP_CLICKED":
        handlers.onTripClicked?.(data.slug, data.title)
        break
      case "TRAVEL_NAV_REQUEST":
        handlers.onNavRequest?.(data.url)
        break
    }
  }

  window.addEventListener("message", listener)
  return () => window.removeEventListener("message", listener)
}

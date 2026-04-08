interface RateLimitEntry {
  minuteCount: number
  minuteResetAt: number
  hourCount: number
  hourResetAt: number
}

const store = new Map<string, RateLimitEntry>()

const MINUTE_LIMIT = 10
const HOUR_LIMIT = 50
const MINUTE_MS = 60 * 1000
const HOUR_MS = 60 * 60 * 1000
const CLEANUP_INTERVAL = 5 * 60 * 1000

let cleanupTimer: ReturnType<typeof setInterval> | null = null

function ensureCleanup() {
  if (cleanupTimer) return
  cleanupTimer = setInterval(() => {
    const now = Date.now()
    for (const [ip, entry] of store) {
      if (now > entry.minuteResetAt && now > entry.hourResetAt) {
        store.delete(ip)
      }
    }
  }, CLEANUP_INTERVAL)
  // Allow process to exit without waiting for this timer
  if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref()
  }
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetIn: number
}

export function checkRateLimit(ip: string): RateLimitResult {
  ensureCleanup()
  const now = Date.now()
  let entry = store.get(ip)

  if (!entry) {
    entry = {
      minuteCount: 0,
      minuteResetAt: now + MINUTE_MS,
      hourCount: 0,
      hourResetAt: now + HOUR_MS,
    }
    store.set(ip, entry)
  }

  // Reset windows if expired
  if (now > entry.minuteResetAt) {
    entry.minuteCount = 0
    entry.minuteResetAt = now + MINUTE_MS
  }
  if (now > entry.hourResetAt) {
    entry.hourCount = 0
    entry.hourResetAt = now + HOUR_MS
  }

  // Check minute limit
  if (entry.minuteCount >= MINUTE_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.ceil((entry.minuteResetAt - now) / 1000),
    }
  }

  // Check hour limit
  if (entry.hourCount >= HOUR_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.ceil((entry.hourResetAt - now) / 1000),
    }
  }

  entry.minuteCount++
  entry.hourCount++

  const minuteRemaining = MINUTE_LIMIT - entry.minuteCount
  const hourRemaining = HOUR_LIMIT - entry.hourCount

  return {
    allowed: true,
    remaining: Math.min(minuteRemaining, hourRemaining),
    resetIn: Math.ceil((entry.minuteResetAt - now) / 1000),
  }
}

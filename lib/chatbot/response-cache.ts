interface CacheEntry {
  answer: string
  createdAt: number
}

const MAX_SIZE = 100
const TTL_MS = 60 * 60 * 1000 // 1 hour

const cache = new Map<string, CacheEntry>()

function normalizeKey(question: string): string {
  return question.toLowerCase().trim().replace(/\s+/g, " ")
}

export function getCached(question: string): string | null {
  const key = normalizeKey(question)
  const entry = cache.get(key)

  if (!entry) return null

  if (Date.now() - entry.createdAt > TTL_MS) {
    cache.delete(key)
    return null
  }

  // Move to end (most recently used) by re-inserting
  cache.delete(key)
  cache.set(key, entry)

  return entry.answer
}

export function setCache(question: string, answer: string): void {
  const key = normalizeKey(question)

  // Evict oldest if at capacity
  if (cache.size >= MAX_SIZE && !cache.has(key)) {
    const firstKey = cache.keys().next().value
    if (firstKey !== undefined) {
      cache.delete(firstKey)
    }
  }

  cache.set(key, { answer, createdAt: Date.now() })
}

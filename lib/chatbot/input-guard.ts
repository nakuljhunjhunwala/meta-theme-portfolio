import { z } from "zod"

export const chatRequestSchema = z.object({
  message: z
    .string()
    .min(2, "Message too short")
    .max(500, "Message too long")
    .trim(),
})

export type ChatRequest = z.infer<typeof chatRequestSchema>

const INJECTION_PATTERNS = [
  "ignore previous instructions",
  "ignore all previous",
  "disregard above",
  "disregard all previous",
  "new instructions:",
  "you are now",
  "forget your instructions",
  "override your instructions",
]

const HTML_TAG_REGEX = /<[^>]*>/g
const URL_REGEX = /https?:\/\/\S+/gi

export function sanitizeInput(message: string): string {
  const cleaned = message.replace(HTML_TAG_REGEX, "").trim()

  const lower = cleaned.toLowerCase()
  for (const pattern of INJECTION_PATTERNS) {
    if (lower.includes(pattern)) {
      throw new InputGuardError("Message contains disallowed content.")
    }
  }

  if (URL_REGEX.test(cleaned)) {
    throw new InputGuardError("Please ask a question without including URLs.")
  }

  return cleaned
}

export class InputGuardError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InputGuardError"
  }
}

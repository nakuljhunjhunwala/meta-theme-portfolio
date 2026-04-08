import { NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/chatbot/rate-limiter"
import { chatRequestSchema, sanitizeInput, InputGuardError } from "@/lib/chatbot/input-guard"
import { getCached, setCache } from "@/lib/chatbot/response-cache"
import { buildSystemPrompt } from "@/lib/chatbot/knowledge-base"
import { generateChatResponse } from "@/lib/chatbot/gemini-client"

export const dynamic = "force-dynamic"

function getClientIP(request: Request): string {
  const headers = new Headers(request.headers)
  const forwarded = headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  return (
    headers.get("x-real-ip") ??
    headers.get("cf-connecting-ip") ??
    "unknown"
  )
}

function corsHeaders() {
  const origin =
    process.env.NODE_ENV === "production"
      ? "https://nakuljhunjhunwala.in"
      : "*"
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() })
}

export async function POST(request: Request) {
  const ip = getClientIP(request)

  // Rate limit
  const rateResult = checkRateLimit(ip)
  if (!rateResult.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many requests. Please try again in ${rateResult.resetIn} seconds.`,
      },
      {
        status: 429,
        headers: {
          ...corsHeaders(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rateResult.resetIn),
          "Retry-After": String(rateResult.resetIn),
        },
      }
    )
  }

  // Parse body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400, headers: corsHeaders() }
    )
  }

  // Validate
  const parsed = chatRequestSchema.safeParse(body)
  if (!parsed.success) {
    const msg = parsed.error.errors[0]?.message ?? "Invalid input."
    return NextResponse.json(
      { success: false, error: msg },
      { status: 400, headers: corsHeaders() }
    )
  }

  // Sanitize
  let cleanMessage: string
  try {
    cleanMessage = sanitizeInput(parsed.data.message)
  } catch (err) {
    if (err instanceof InputGuardError) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 400, headers: corsHeaders() }
      )
    }
    return NextResponse.json(
      { success: false, error: "Invalid message." },
      { status: 400, headers: corsHeaders() }
    )
  }

  // Cache check
  const cached = getCached(cleanMessage)
  if (cached) {
    return NextResponse.json(
      { success: true, reply: cached, cached: true },
      {
        headers: {
          ...corsHeaders(),
          "X-RateLimit-Remaining": String(rateResult.remaining),
        },
      }
    )
  }

  // Gemini call
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: "Chat service is temporarily unavailable." },
        { status: 503, headers: corsHeaders() }
      )
    }

    const systemPrompt = buildSystemPrompt()
    const reply = await generateChatResponse(systemPrompt, cleanMessage)

    setCache(cleanMessage, reply)

    return NextResponse.json(
      { success: true, reply, cached: false },
      {
        headers: {
          ...corsHeaders(),
          "X-RateLimit-Remaining": String(rateResult.remaining),
        },
      }
    )
  } catch (err) {
    if (err instanceof Error && err.message === "QUOTA_EXCEEDED") {
      return NextResponse.json(
        {
          success: false,
          error: "The AI service is temporarily at capacity. Please try again later or contact Nakul directly at jhunjhunwalanakul@gmail.com",
        },
        { status: 503, headers: corsHeaders() }
      )
    }
    return NextResponse.json(
      {
        success: false,
        error: "I'm having trouble connecting. Please try again or contact Nakul directly at jhunjhunwalanakul@gmail.com",
      },
      { status: 500, headers: corsHeaders() }
    )
  }
}

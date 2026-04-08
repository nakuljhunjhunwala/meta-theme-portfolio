"use client"

import { useState, useCallback } from "react"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

interface ChatState {
  messages: ChatMessage[]
  isOpen: boolean
  isLoading: boolean
  hasUnread: boolean
}

export function useChatbot() {
  const [state, setState] = useState<ChatState>({
    messages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm Nakul's portfolio assistant. Ask me about his skills, experience, projects, or anything on his resume!",
        timestamp: Date.now(),
      },
    ],
    isOpen: false,
    isLoading: false,
    hasUnread: false,
  })

  const toggleOpen = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      hasUnread: false,
    }))
  }, [])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      isLoading: true,
    }))

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = await res.json()

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.success
          ? data.reply
          : data.error ?? "Something went wrong. Please try again.",
        timestamp: Date.now(),
      }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMsg].slice(-50),
        isLoading: false,
        hasUnread: !prev.isOpen,
      }))
    } catch {
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "Something went wrong. Please try again or contact Nakul directly.",
        timestamp: Date.now(),
      }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMsg],
        isLoading: false,
      }))
    }
  }, [])

  const clearChat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      messages: [
        {
          id: "welcome",
          role: "assistant",
          content:
            "Hi! I'm Nakul's portfolio assistant. Ask me about his skills, experience, projects, or anything on his resume!",
          timestamp: Date.now(),
        },
      ],
    }))
  }, [])

  return {
    messages: state.messages,
    isOpen: state.isOpen,
    isLoading: state.isLoading,
    hasUnread: state.hasUnread,
    toggleOpen,
    sendMessage,
    clearChat,
  }
}

"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Send, X, Trash2, Sparkles, Bot, User } from "lucide-react"
import type { ChatMessage } from "@/hooks/useChatbot"
import ChatMarkdown from "./ChatMarkdown"

interface ChatOverlayProps {
  messages: ChatMessage[]
  isLoading: boolean
  onSend: (text: string) => void
  onClear: () => void
  onClose: () => void
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 28, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
}

const messageVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 350, damping: 30 },
  },
}

export default function ChatOverlay({
  messages,
  isLoading,
  onSend,
  onClear,
  onClose,
}: ChatOverlayProps) {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 300)
    return () => clearTimeout(timer)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    onSend(input)
    setInput("")
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(12px)" }}
        transition={{ duration: 0.3 }}
      />

      {/* Card */}
      <motion.div
        className="relative w-full max-w-lg h-[min(85vh,700px)] flex flex-col rounded-3xl overflow-hidden
          bg-[#FAFAF8] shadow-[0_25px_80px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)]"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header */}
        <div className="relative flex items-center justify-between px-6 py-4 border-b border-stone-200/80">
          {/* Subtle gradient line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400" />

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-md shadow-indigo-200/50">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-stone-800 tracking-tight">
                Portfolio Assistant
              </h3>
              <p className="text-[11px] text-stone-400 font-medium">
                Powered by AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <motion.button
              onClick={onClear}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Clear chat"
            >
              <Trash2 size={16} />
            </motion.button>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Close (Esc)"
            >
              <X size={16} />
            </motion.button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scroll-smooth">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              className={`flex items-end gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: i === messages.length - 1 ? 0.1 : 0 }}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-indigo-500 to-violet-500"
                    : "bg-stone-200"
                }`}
              >
                {msg.role === "user" ? (
                  <User size={13} className="text-white" />
                ) : (
                  <Bot size={13} className="text-stone-500" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[80%] px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-[14px] leading-relaxed rounded-2xl rounded-br-md shadow-md shadow-indigo-200/30"
                    : "bg-white text-stone-700 rounded-2xl rounded-bl-md shadow-sm border border-stone-100"
                }`}
              >
                {msg.role === "assistant" ? (
                  <ChatMarkdown content={msg.content} />
                ) : (
                  msg.content
                )}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <motion.div
              className="flex items-end gap-2.5"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-stone-200">
                <Bot size={13} className="text-stone-500" />
              </div>
              <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-stone-100">
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-2 h-2 rounded-full bg-stone-300"
                      animate={{
                        y: [0, -6, 0],
                        backgroundColor: ["#d6d3d1", "#a8a29e", "#d6d3d1"],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="px-5 py-4 border-t border-stone-200/80 bg-white/60">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 500))}
                placeholder="Ask about Nakul's skills, experience, projects..."
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-2xl text-[14px] text-stone-700 placeholder:text-stone-400
                  bg-stone-100/80 border border-stone-200/60
                  focus:outline-none focus:ring-2 focus:ring-indigo-300/50 focus:border-indigo-300
                  disabled:opacity-50 transition-all duration-200"
              />
            </div>
            <motion.button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex items-center justify-center w-11 h-11 rounded-xl
                bg-gradient-to-br from-indigo-500 to-violet-500 text-white
                shadow-md shadow-indigo-200/40
                disabled:opacity-30 disabled:shadow-none
                transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92, rotate: -10 }}
            >
              <Send size={16} />
            </motion.button>
          </form>

          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-[11px] text-stone-400">
              AI-powered · Responses may not be 100% accurate
            </span>
            <span className="text-[11px] text-stone-400 tabular-nums">
              {input.length}/500
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

"use client"

import { Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useChatbot } from "@/hooks/useChatbot"
import ChatOverlay from "./ChatOverlay"

export default function ChatBubble() {
  const chat = useChatbot()

  return (
    <>
      {/* Trigger — bottom-center prominent pill */}
      <AnimatePresence>
        {!chat.isOpen && (
          <motion.div
            className="fixed bottom-6 left-0 right-0 z-[9998] flex justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <motion.button
              onClick={chat.toggleOpen}
              className="pointer-events-auto flex items-center gap-2.5 px-6 py-3 rounded-full
                bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500
                text-white text-sm font-semibold tracking-wide
                shadow-[0_0_20px_rgba(99,102,241,0.4),0_0_60px_rgba(139,92,246,0.2)]
                hover:shadow-[0_0_30px_rgba(99,102,241,0.6),0_0_80px_rgba(139,92,246,0.3)]
                transition-shadow duration-300 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Pulse ring */}
              <motion.span
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <Sparkles size={18} className="relative z-10" />
              <span className="relative z-10">Ask AI</span>

              {chat.hasUnread && (
                <motion.span
                  className="relative z-10 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_6px_rgba(252,211,77,0.6)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-page overlay */}
      <AnimatePresence>
        {chat.isOpen && (
          <ChatOverlay
            messages={chat.messages}
            isLoading={chat.isLoading}
            onSend={chat.sendMessage}
            onClear={chat.clearChat}
            onClose={chat.toggleOpen}
          />
        )}
      </AnimatePresence>
    </>
  )
}

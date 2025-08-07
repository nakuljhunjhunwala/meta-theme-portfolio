"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 left-20 w-8 h-8 bg-purple-500 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-32 w-6 h-6 bg-pink-500 rounded-full"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-32 left-40 w-4 h-4 bg-blue-500 rounded-full"
          animate={{ 
            y: [0, -25, 0],
            opacity: [0.2, 0.7, 0.2]
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="text-center z-10">
        <motion.div
          className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        />
        <motion.h2
          className="text-white text-2xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Loading Portfolio
        </motion.h2>
        <motion.p
          className="text-gray-400 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Preparing your experience...
        </motion.p>
        
        {/* Loading dots */}
        <motion.div 
          className="flex justify-center space-x-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-purple-500 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

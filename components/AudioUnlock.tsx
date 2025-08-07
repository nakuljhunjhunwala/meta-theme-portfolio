"use client"

import { useEffect } from "react"
import { attachGlobalAudioUnlock } from "@/lib/audio"

export default function AudioUnlock() {
  useEffect(() => {
    attachGlobalAudioUnlock()
  }, [])
  return null
}


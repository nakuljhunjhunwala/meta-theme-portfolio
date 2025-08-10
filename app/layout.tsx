import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google"
import "./globals.css"
import AudioUnlock from "../components/AudioUnlock"
import { buildSiteMetadata } from "@/lib/seo"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
})

export const metadata: Metadata = buildSiteMetadata()

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0f17",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${pressStart.variable}`}>
      <body className={`${inter.className} antialiased bg-[#0b0f17] text-white`}>
        <AudioUnlock />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

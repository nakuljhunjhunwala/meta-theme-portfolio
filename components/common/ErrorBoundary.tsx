"use client"

import React from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Portfolio Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4 relative overflow-hidden">
          {/* Background shapes */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-12 h-12 bg-red-500/30 rounded-full animate-pulse" />
            <div className="absolute top-40 right-32 w-8 h-8 bg-orange-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-32 left-40 w-6 h-6 bg-yellow-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center relative z-10">
            <AlertTriangle className="w-20 h-20 text-red-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-bold text-white mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              The portfolio encountered an unexpected error. Don't worry, this happens sometimes! Let's get you back on track.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full text-white font-semibold transition-all transform hover:scale-105 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Reload Portfolio</span>
            </button>
            
            {/* Retry suggestion */}
            <p className="text-gray-500 text-sm mt-6">
              If the problem persists, try refreshing your browser or contact support.
            </p>
            
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-gray-400 cursor-pointer hover:text-white transition-colors">
                  🔍 Developer Error Details
                </summary>
                <pre className="mt-4 text-xs text-red-300 bg-black/40 p-4 rounded-lg overflow-auto max-h-40 border border-red-500/20">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

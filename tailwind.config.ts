import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Custom theme colors
        retro: {
          green: "#00ff00",
          "green-dark": "#00cc00",
          "green-light": "#33ff33",
          amber: "#ffbf00",
          red: "#ff0000",
        },
        code: {
          bg: "#1e1e1e",
          "bg-light": "#2d2d30",
          "bg-lighter": "#3e3e42",
          blue: "#007acc",
          "blue-light": "#0891b2",
          "blue-dark": "#0e7490",
        },
        glass: {
          white: "rgba(255, 255, 255, 0.1)",
          "white-light": "rgba(255, 255, 255, 0.2)",
          "white-dark": "rgba(255, 255, 255, 0.05)",
        },
        terminal: {
          green: "#00ff00",
          "green-dark": "#00cc00",
          black: "#000000",
          "gray-dark": "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "Monaco", "monospace"],
      },
      animation: {
        "retro-glow": "retro-glow 2s ease-in-out infinite",
        "terminal-cursor": "terminal-cursor 1s infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "scan-line": "scan-line 2s linear infinite",
      },
      keyframes: {
        "retro-glow": {
          "0%, 100%": {
            textShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
          },
          "50%": {
            textShadow: "0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor",
          },
        },
        "terminal-cursor": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}

export default config

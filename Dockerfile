# ---------- Base builder ----------
    FROM node:20-alpine AS deps
    WORKDIR /app
    
    # Install OS deps
    RUN apk add --no-cache libc6-compat
    
    # Install dependencies with npm
    COPY package.json package-lock.json* ./
    RUN npm ci
    
    # ---------- Builder ----------
    FROM node:20-alpine AS builder
    WORKDIR /app
    ENV NEXT_TELEMETRY_DISABLED=1
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    
    # Build Next.js
    RUN npm run build
    
    # ---------- Runner ----------
    FROM node:20-alpine AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    ENV HOSTNAME=0.0.0.0
    ENV PORT=3000
    
    # Create non-root user
    RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
    
    # Copy standalone server and public assets
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    
    USER nextjs
    
    # Start Next.js server
    CMD ["node", "server.js"]
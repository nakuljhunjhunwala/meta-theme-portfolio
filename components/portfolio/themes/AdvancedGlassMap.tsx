"use client"

import { useMemo, useState, useRef } from "react"
import { ComposableMap, Geographies, Geography, Marker, Line, ZoomableGroup } from "react-simple-maps"
import { geoCentroid } from "d3-geo"
import { motion, AnimatePresence } from "framer-motion"
import { getVisitedPlaces, getDreamDestinations, type TravelExperience } from "@/constants/personal"
import { MapPin, RotateCcw, Filter } from "lucide-react"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
const INDIA = { lat: 20.5937, lng: 78.9629 }

const OFFSETS: Array<[number, number]> = [
  [10, -10],
  [10, 12],
  [-12, 12],
  [-12, -10],
  [14, 0],
  [-14, 0],
  [0, 16],
  [0, -16],
]

// Simple grid-bucket clustering to assign a stable offset index for nearby points
function buildOffsetIndexMap(points: Array<TravelExperience>, cell = 2.5) {
  const buckets = new Map<string, TravelExperience[]>()
  for (const p of points) {
    if (!p.coordinates) continue
    const key = `${Math.floor(p.coordinates.lat / cell)}:${Math.floor(p.coordinates.lng / cell)}`
    const arr = buckets.get(key) || []
    arr.push(p)
    buckets.set(key, arr)
  }
  const index = new Map<string, number>()
  for (const [, arr] of buckets) {
    // deterministic order
    arr.sort((a, b) => a.location.localeCompare(b.location))
    arr.forEach((p, i) => index.set(p.id, i % OFFSETS.length))
  }
  return index
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export default function AdvancedGlassMap() {
  const visitedPlaces = getVisitedPlaces()
  const dreamDestinations = getDreamDestinations()
  const allPlaces = [...visitedPlaces, ...dreamDestinations]

  const [showVisited, setShowVisited] = useState(true)
  const [showDreams, setShowDreams] = useState(true)
  const [center, setCenter] = useState<[number, number]>([INDIA.lng, INDIA.lat])
  const [zoom, setZoom] = useState(1.5)
  const [indiaOnly, setIndiaOnly] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState<TravelExperience | null>(null)
  
  const rafRef = useRef<number | null>(null)
  const animStartRef = useRef<number | null>(null)
  const fromCenterRef = useRef<[number, number]>(center)
  const toCenterRef = useRef<[number, number]>(center)
  const fromZoomRef = useRef(zoom)
  const toZoomRef = useRef(zoom)
  const animatingRef = useRef(false)

  const visited = useMemo(() => allPlaces.filter((d) => d.visited), [allPlaces])
  const dreams = useMemo(() => allPlaces.filter((d) => !d.visited), [allPlaces])
  const visiblePoints = useMemo(
    () => [...(showVisited ? visited : []), ...(showDreams ? dreams : [])].filter(p => p.coordinates),
    [showVisited, showDreams, visited, dreams],
  )
  const offsetIndexMap = useMemo(() => buildOffsetIndexMap(visiblePoints), [visiblePoints])

  function animateTo(nextCenter: [number, number], nextZoom: number, duration = 1100) {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    animStartRef.current = null
    fromCenterRef.current = center
    fromZoomRef.current = zoom
    toCenterRef.current = nextCenter
    toZoomRef.current = nextZoom
    animatingRef.current = true

    const step = (ts: number) => {
      if (!animStartRef.current) animStartRef.current = ts
      const t = Math.min(1, (ts - animStartRef.current) / duration)
      const k = easeInOut(t)
      const cx = fromCenterRef.current[0] + (toCenterRef.current[0] - fromCenterRef.current[0]) * k
      const cy = fromCenterRef.current[1] + (toCenterRef.current[1] - fromCenterRef.current[1]) * k
      const z = fromZoomRef.current + (toZoomRef.current - fromZoomRef.current) * k
      setCenter([cx, cy])
      setZoom(z)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        animatingRef.current = false
        rafRef.current = null
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }

  const resetView = () => {
    animateTo([INDIA.lng, INDIA.lat], 1.4, 900)
  }



  return (
    <div className="w-full space-y-6">
      {/* Glass Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-black/20 border border-white/30 rounded-3xl p-4 sm:p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            🗺️ Interactive Travel Journey
          </h3>
          <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
            Explore my travel adventures across India and around the world. Click markers to zoom in and toggle filters to customize your view.
          </p>
        </div>

        {/* Status Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-2 sm:p-3">
            <div className="text-white/70 text-xs">Focus Region</div>
            <div className="text-white font-medium text-sm">{indiaOnly ? '🇮🇳 India' : '🌍 Global'}</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-2 sm:p-3">
            <div className="text-white/70 text-xs">Animation</div>
            <div className="text-white font-medium text-sm">Smooth & Fluid</div>
          </div>
        </div>

        {/* Filter Controls - Mobile First */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-white/90">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </div>
          
          {/* Filter Checkboxes - Stacked on Mobile */}
          <div className="space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-3">
            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-green-500 rounded"
                checked={showVisited}
                onChange={(e) => setShowVisited(e.target.checked)}
              />
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
                Visited ({visited.length})
              </span>
            </label>
            
            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-purple-500 rounded"
                checked={showDreams}
                onChange={(e) => setShowDreams(e.target.checked)}
              />
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />
                Dreams ({dreams.length})
              </span>
            </label>

            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-500 rounded"
                checked={indiaOnly}
                onChange={(e) => setIndiaOnly(e.target.checked)}
              />
              <span>🇮🇳 India Focus</span>
            </label>
          </div>

          {/* Action Buttons - Mobile Optimized */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={resetView}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/10 text-white/80 hover:bg-white/20 border border-white/20 transition-all flex-shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset View</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Interactive Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/30 rounded-3xl p-6 shadow-2xl"
      >
        <div className="relative w-full rounded-2xl overflow-hidden">
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{ center: [78.9629, 20.5937], scale: 150 }}
            className="z-10"
            style={{ width: "100%", height: "clamp(400px, 60vh, 700px)" }}
          >
            <ZoomableGroup
              center={center}
              zoom={zoom}
              minZoom={1}
              maxZoom={8}
              onMoveEnd={({ coordinates, zoom }: { coordinates: [number, number], zoom: number }) => {
                setCenter(coordinates)
                setZoom(zoom)
              }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: any[] }) => {
                  const geos = indiaOnly ? geographies.filter((g: any) => g.properties?.name === "India") : geographies
                  return geos.map((geo: any) => {
                    const isIndia = geo.properties?.name === "India"
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => {
                          const c = geoCentroid(geo)
                          if (c && Number.isFinite(c[0]) && Number.isFinite(c[1])) {
                            setCenter([c[0], c[1]] as [number, number])
                            setZoom((z) => Math.min(Math.max(z * 1.8, 2), 6))
                          }
                        }}
                        style={{
                          default: {
                            fill: isIndia ? "rgba(34, 197, 94, 0.2)" : "rgba(255, 255, 255, 0.1)",
                            stroke: isIndia ? "rgba(34, 197, 94, 0.6)" : "rgba(255, 255, 255, 0.3)",
                            strokeWidth: isIndia ? 1.2 : 0.5,
                            outline: "none",
                            cursor: "pointer",
                          },
                          hover: {
                            fill: isIndia ? "rgba(34, 197, 94, 0.3)" : "rgba(255, 255, 255, 0.15)",
                            stroke: isIndia ? "rgba(34, 197, 94, 0.8)" : "rgba(255, 255, 255, 0.5)",
                            strokeWidth: isIndia ? 1.5 : 0.7,
                            outline: "none",
                          },
                          pressed: { outline: "none" },
                        }}
                      />
                    )
                  })
                }}
              </Geographies>

              {/* India anchor point */}
              <Marker coordinates={[INDIA.lng, INDIA.lat]}>
                <g>
                  <circle r={8} fill="rgba(34, 197, 94, 0.2)" className="animate-ping" />
                  <circle r={5} fill="rgba(34, 197, 94, 0.4)" />
                  <circle r={3} fill="rgba(34, 197, 94, 1)" />
                </g>
              </Marker>

              {/* Journey lines for visited places */}
              {showVisited &&
                visited.filter(p => p.coordinates).map((p) => (
                  <Line
                    key={`visited-${p.id}`}
                    from={[INDIA.lng, INDIA.lat]}
                    to={[p.coordinates!.lng, p.coordinates!.lat]}
                    stroke="rgba(34, 197, 94, 0.8)"
                    strokeWidth={1.2}
                    strokeLinecap="round"
                    strokeDasharray="5 3"
                    className="animate-dash"
                  />
                ))}

              {/* Journey lines for dream destinations */}
              {showDreams &&
                dreams.filter(p => p.coordinates).map((p) => (
                  <Line
                    key={`dream-${p.id}`}
                    from={[INDIA.lng, INDIA.lat]}
                    to={[p.coordinates!.lng, p.coordinates!.lat]}
                    stroke="rgba(168, 85, 247, 0.8)"
                    strokeWidth={1.2}
                    strokeLinecap="round"
                    strokeDasharray="3 6"
                    className="animate-dash-slow"
                  />
                ))}

              {/* Visited place markers */}
              {showVisited &&
                visited.filter(p => p.coordinates).map((p) => {
                  const idx = offsetIndexMap.get(p.id) ?? 0
                  const [bDx, bDy] = OFFSETS[idx]
                  const nearby = visiblePoints.filter(
                    (q) =>
                      q.coordinates &&
                      Math.abs(q.coordinates.lat - p.coordinates!.lat) < 2 &&
                      Math.abs(q.coordinates.lng - p.coordinates!.lng) < 2,
                  ).length
                  const spread = nearby >= 3 ? 1.8 : nearby === 2 ? 1.4 : 1.15
                  const dx = bDx * spread
                  const dy = bDy * spread

                  return (
                    <Marker
                      key={p.id}
                      coordinates={[p.coordinates!.lng, p.coordinates!.lat]}
                      onClick={() => {
                        setSelectedPlace(p)
                        animateTo([p.coordinates!.lng, p.coordinates!.lat], 5, 800)
                      }}
                    >
                      <g className="marker cursor-pointer">
                        <circle r={Math.max(6, 10 / zoom)} fill="rgba(34, 197, 94, 0.3)" className="animate-ping" />
                        <circle r={Math.max(4, 6 / zoom)} fill="rgba(34, 197, 94, 0.8)" />
                        <circle r={Math.max(2.5, 4 / zoom)} fill="rgba(255, 255, 255, 1)" />
                        <text
                          fontSize={Math.max(6, 10 / zoom)}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="rgba(34, 197, 94, 1)"
                          fontWeight="bold"
                        >
                          📍
                        </text>
                        <g transform={`scale(${1 / Math.max(zoom, 1)})`}>
                          <line 
                            x1={0} 
                            y1={0} 
                            x2={dx - 2} 
                            y2={dy + 2} 
                            stroke="rgba(255, 255, 255, 0.8)" 
                            strokeWidth="2"
                          />
                          <text
                            x={dx}
                            y={dy}
                            fontSize={Math.max(8, 12 / zoom)}
                            fontWeight="600"
                            fill="rgba(255, 255, 255, 1)"
                            stroke="rgba(0, 0, 0, 0.5)"
                            strokeWidth="3"
                            paintOrder="stroke"
                            dominantBaseline="middle"
                            textAnchor={dx >= 0 ? "start" : "end"}
                          >
                            {p.location}
                          </text>
                        </g>
                      </g>
                    </Marker>
                  )
                })}

              {/* Dream destination markers */}
              {showDreams &&
                dreams.filter(p => p.coordinates).map((p) => {
                  const idx = offsetIndexMap.get(p.id) ?? 0
                  const [bDx, bDy] = OFFSETS[(idx + 1) % OFFSETS.length]
                  const nearby = visiblePoints.filter(
                    (q) =>
                      q.coordinates &&
                      Math.abs(q.coordinates.lat - p.coordinates!.lat) < 2 &&
                      Math.abs(q.coordinates.lng - p.coordinates!.lng) < 2,
                  ).length
                  const spread = nearby >= 3 ? 1.8 : nearby === 2 ? 1.4 : 1.15
                  const dx = bDx * spread
                  const dy = bDy * spread

                  return (
                    <Marker
                      key={p.id}
                      coordinates={[p.coordinates!.lng, p.coordinates!.lat]}
                      onClick={() => {
                        setSelectedPlace(p)
                        animateTo([p.coordinates!.lng, p.coordinates!.lat], 5, 800)
                      }}
                    >
                      <g className="marker cursor-pointer">
                        <circle r={Math.max(6, 10 / zoom)} fill="rgba(168, 85, 247, 0.3)" className="animate-ping" />
                        <circle r={Math.max(4, 6 / zoom)} fill="rgba(168, 85, 247, 0.8)" />
                        <circle r={Math.max(2.5, 4 / zoom)} fill="rgba(255, 255, 255, 1)" />
                        <text
                          fontSize={Math.max(6, 10 / zoom)}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="rgba(168, 85, 247, 1)"
                          fontWeight="bold"
                        >
                          ✨
                        </text>
                        <g transform={`scale(${1 / Math.max(zoom, 1)})`}>
                          <line 
                            x1={0} 
                            y1={0} 
                            x2={dx - 2} 
                            y2={dy + 2} 
                            stroke="rgba(255, 255, 255, 0.8)" 
                            strokeWidth="2"
                          />
                          <text
                            x={dx}
                            y={dy}
                            fontSize={Math.max(8, 12 / zoom)}
                            fontWeight="600"
                            fill="rgba(255, 255, 255, 1)"
                            stroke="rgba(0, 0, 0, 0.5)"
                            strokeWidth="3"
                            paintOrder="stroke"
                            dominantBaseline="middle"
                            textAnchor={dx >= 0 ? "start" : "end"}
                          >
                            {p.location}
                          </text>
                        </g>
                      </g>
                    </Marker>
                  )
                })}
            </ZoomableGroup>
          </ComposableMap>

          {/* Glass overlay for map styling */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-[0.5px] pointer-events-none rounded-2xl" />
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="backdrop-blur-xl bg-black/20 border border-white/30 rounded-2xl p-4 shadow-2xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-white">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
              <span>Visited: {visited.length}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />
              <span>Dreams: {dreams.length}</span>
            </div>
          </div>
          <div className="text-xs text-white/70">
            Click markers to explore • Smooth animations • India-focused journey
          </div>
        </div>
      </motion.div>

      {/* Place Detail Modal */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPlace(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full backdrop-blur-xl bg-black/30 border border-white/30 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal content similar to previous implementation */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">
                    {selectedPlace.category === 'city' ? '🏙️' :
                     selectedPlace.category === 'nature' ? '🏔️' :
                     selectedPlace.category === 'historical' ? '🏛️' :
                     selectedPlace.category === 'adventure' ? '⛰️' :
                     selectedPlace.category === 'cultural' ? '🎭' : '🌅'}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedPlace.location}</h3>
                    <p className="text-white/70 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedPlace.country}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="text-white/60 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                {selectedPlace.visited ? (
                  <div className="inline-flex items-center space-x-2 bg-green-500/30 border border-green-400/50 rounded-full px-3 py-1 text-sm">
                    <span>📍</span>
                    <span>Visited {selectedPlace.visitDate}</span>
                    {selectedPlace.duration && <span>• {selectedPlace.duration}</span>}
                  </div>
                ) : (
                  <div className="inline-flex items-center space-x-2 bg-purple-500/30 border border-purple-400/50 rounded-full px-3 py-1 text-sm">
                    <span>✨</span>
                    <span>Dream Destination</span>
                  </div>
                )}
              </div>

              {selectedPlace.visited && selectedPlace.memories && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">My Memories</h4>
                  <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                    <p className="text-white/90 italic">"{selectedPlace.memories}"</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-blue-300">
                  {selectedPlace.visited ? 'Highlights I Experienced' : 'Why I Want to Visit'}
                </h4>
                {selectedPlace.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm text-white/90">
                    <span className={selectedPlace.visited ? 'text-green-400' : 'text-purple-400'}>•</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes dash {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -20; }
        }
        
        @keyframes dash-slow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -25; }
        }
        
        .animate-dash { 
          animation: dash 2s linear infinite; 
        }
        
        .animate-dash-slow { 
          animation: dash-slow 3s linear infinite; 
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-dash, .animate-dash-slow, .animate-ping { 
            animation: none !important; 
          }
        }
        
        .marker { 
          transition: transform 200ms ease; 
        }
        
        .marker:hover { 
          transform: scale(1.15); 
        }
      `}</style>
    </div>
  )
}

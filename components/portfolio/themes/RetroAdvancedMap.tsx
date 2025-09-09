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

export default function RetroAdvancedMap() {
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
    [showVisited, showDreams, visited, dreams]
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

  const handleMarkerClick = (place: TravelExperience) => {
    if (place.coordinates) {
      const targetZoom = 5
      animateTo([place.coordinates.lng, place.coordinates.lat], targetZoom, 800)
    }
    setSelectedPlace(place)
  }

  const handleResetView = () => {
    animateTo([INDIA.lng, INDIA.lat], 1.4, 900)
  }

  const filteredPlaces = useMemo(() => {
    let places = visiblePoints
    if (indiaOnly) {
      places = places.filter(place => place.country === 'India')
    }
    return places
  }, [visiblePoints, indiaOnly])

  // Use static projection config like Glass theme - no rotation issues
  const projectionConfig = { 
    center: [78.9629, 20.5937] as [number, number], 
    scale: 150 
  }

  return (
    <div className="w-full h-full">
      {/* Mario-Style Controls Panel - Happy Colors! */}
      <div className="mb-4 p-4 bg-blue-500 border-4 border-yellow-400 rounded pixel-perfect retro-container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Filter Controls */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-sm pixel-text">🎮 LEVEL FILTERS</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowVisited(!showVisited)}
                className={`px-3 py-1 text-xs font-bold border-2 border-black transition-all retro-button-3d ${
                  showVisited 
                    ? 'bg-green-400 text-white' 
                    : 'bg-gray-600 text-white'
                }`}
              >
                🏰 VISITED ({visited.length})
              </button>
              <button
                onClick={() => setShowDreams(!showDreams)}
                className={`px-3 py-1 text-xs font-bold border-2 border-black transition-all retro-button-3d ${
                  showDreams 
                    ? 'bg-purple-400 text-white' 
                    : 'bg-gray-600 text-white'
                }`}
              >
                🔒 LOCKED ({dreams.length})
              </button>
            </div>
          </div>

          {/* Region Filter */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-sm pixel-text">🌍 FOCUS REGION</h3>
            <button
              onClick={() => {
                setIndiaOnly(!indiaOnly)
                if (!indiaOnly) {
                  // When switching to India mode, focus on India
                  animateTo([INDIA.lng, INDIA.lat], 3, 900)
                } else {
                  // When switching back to global, zoom out
                  animateTo([INDIA.lng, INDIA.lat], 1.4, 900)
                }
              }}
                             // text colour white not black and not selected something else the white colour
                className={`px-3 py-1 text-xs font-bold border-2 border-black transition-all retro-button-3d ${
                  indiaOnly 
                   ? 'bg-orange-400 text-white' 
                   : 'bg-cyan-400 text-white'
                }`}
            >
              🇮🇳 INDIA ONLY
            </button>
          </div>

          {/* Controls */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-sm pixel-text">🕹️ MAP CONTROLS</h3>
            <button
              onClick={handleResetView}
              className="px-3 py-1 text-xs font-bold bg-pink-400 text-white border-2 border-black hover:bg-pink-300 transition-all retro-button-3d"
            >
              <RotateCcw className="w-3 h-3 inline mr-1" />
              RESET VIEW
            </button>
          </div>
        </div>

        {/* Mario-Style Status Panel */}
        <div className="mt-4 p-2 bg-white border-2 border-black rounded">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-green-600 text-lg font-bold">{visited.length}</div>
              <div className="text-black text-xs font-bold">⭐ STARS</div>
            </div>
            <div>
              <div className="text-red-600 text-lg font-bold">{dreams.length}</div>
              <div className="text-black text-xs font-bold">🔒 LOCKED</div>
            </div>
            <div>
              <div className="text-blue-600 text-lg font-bold">{filteredPlaces.length}</div>
              <div className="text-black text-xs font-bold">👁️ VISIBLE</div>
            </div>
            <div>
              <div className="text-purple-600 text-lg font-bold">{Math.round(zoom * 10) / 10}x</div>
              <div className="text-black text-xs font-bold">🔍 ZOOM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mario-Style Map Container - Bright & Happy! */}
      <div className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] lg:h-[700px] bg-cyan-300 border-4 border-yellow-400 rounded overflow-hidden pixel-perfect retro-container">
        {/* Mario clouds background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-16 h-10 bg-white rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                top: `${5 + (i % 3) * 15}%`,
              }}
            >
              <div className="absolute -left-4 top-2 w-8 h-6 bg-white rounded-full" />
              <div className="absolute -right-4 top-2 w-8 h-6 bg-white rounded-full" />
            </div>
          ))}
        </div>
        
        {/* Pixel grid overlay - less prominent */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none z-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            imageRendering: 'pixelated'
          }}
        />

        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={projectionConfig}
          className="z-10"
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup
            center={center}
            zoom={zoom}
            minZoom={1}
            maxZoom={8}
            onMoveEnd={({ coordinates, zoom }: { coordinates: [number, number], zoom: number }) => {
              if (!animatingRef.current) {
                setCenter(coordinates)
                setZoom(zoom)
              }
            }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) => {
                const geos = indiaOnly ? geographies.filter(geo => geo.properties?.name === "India") : geographies
                return geos.map((geo) => {
                  const isIndia = geo.properties?.name === "India"
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isIndia ? "#fbbf24" : "#16a34a"} // Gold for India, green for others - like Mario coins!
                      stroke="#000000" // Black borders like Mario
                      strokeWidth={isIndia ? 2 : 1} // Slightly thicker border for India
                      style={{
                        default: {
                          outline: "none"
                        },
                        hover: {
                          outline: "none",
                          fill: isIndia ? "#f59e0b" : "#22c55e", // Darker gold on hover for India
                        },
                        pressed: {
                          outline: "none",
                          fill: isIndia ? "#f59e0b" : "#22c55e"
                        }
                      }}
                    />
                  )
                })
              }}
            </Geographies>

            {/* Journey lines for visited places */}
            {showVisited &&
              visited.filter(p => p.coordinates && (!indiaOnly || p.country === 'India')).map((p) => (
                <Line
                  key={`visited-${p.id}`}
                  from={[INDIA.lng, INDIA.lat]}
                  to={[p.coordinates!.lng, p.coordinates!.lat]}
                  stroke="#007bff" // sky blue for visited
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  strokeDasharray="5 3"
                />
              ))}

            {/* Journey lines for dream destinations */}
            {showDreams &&
              dreams.filter(p => p.coordinates && (!indiaOnly || p.country === 'India')).map((p) => (
                <Line
                  key={`dream-${p.id}`}
                  from={[INDIA.lng, INDIA.lat]}
                  to={[p.coordinates!.lng, p.coordinates!.lat]}
                  stroke="#ec4899" // Pink for dreams
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  strokeDasharray="3 6"
                />
              ))}

            {/* Location Markers - Glass Theme Approach with Retro Styling */}
            {filteredPlaces.filter(p => p.coordinates).map((place, i) => {
              if (!place.coordinates) return null
              const idx = offsetIndexMap.get(place.id) ?? 0
              const [bDx, bDy] = OFFSETS[idx]
              const nearby = filteredPlaces.filter(
                (q) =>
                  q.coordinates &&
                  Math.abs(q.coordinates.lat - place.coordinates!.lat) < 2 &&
                  Math.abs(q.coordinates.lng - place.coordinates!.lng) < 2,
              ).length
              const spread = nearby >= 3 ? 1.8 : nearby === 2 ? 1.4 : 1.15
              const dx = bDx * spread
              const dy = bDy * spread

              return (
                <Marker
                  key={place.id}
                  coordinates={[place.coordinates.lng, place.coordinates.lat]}
                  onClick={() => handleMarkerClick(place)}
                >
                  <g className="marker cursor-pointer">
                    {/* Mario-Style Marker with much better zoom scaling */}
                    <circle 
                      r={Math.max(2, 6 / zoom)} 
                      fill={place.visited ? "#fbbf24" : "#ec4899"}
                      stroke="#000"
                      strokeWidth="2"
                    />
                    <circle 
                      r={Math.max(1.5, 4 / zoom)} 
                      fill={place.visited ? "#22c55e" : "#8b5cf6"}
                      stroke="#000"
                      strokeWidth="1"
                    />
                    <circle 
                      r={Math.max(1, 2.5 / zoom)} 
                      fill="white"
                    />
                    
                    {/* Mario-style Icon */}
                    <text
                      fontSize={Math.max(3, 5 / zoom)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#000"
                      fontWeight="bold"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {place.visited ? "⭐" : "🌟"}
                    </text>
                    
                    {/* Label with proper scaling */}
                    <g transform={`scale(${1 / Math.max(zoom, 1)})`}>
                      <line 
                        x1={0} 
                        y1={0} 
                        x2={dx - 2} 
                        y2={dy + 2} 
                        stroke="#000" 
                        strokeWidth="3"
                      />
                      <text
                        x={dx}
                        y={dy}
                        fontSize={Math.max(12, 16 / zoom)}
                        fontWeight="bold"
                        fill="#fbbf24"
                        stroke="#000"
                        strokeWidth="3"
                        paintOrder="stroke"
                        dominantBaseline="middle"
                        textAnchor={dx >= 0 ? "start" : "end"}
                        style={{ fontFamily: 'monospace' }}
                      >
                        {place.location}
                      </text>
                    </g>
                  </g>
                </Marker>
              )
            })}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Mario-Style Place Details Modal */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-900/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPlace(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white border-4 border-black rounded p-6 max-w-md w-full pixel-perfect retro-container"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mario-Style Status Badge */}
              <div className="text-center mb-4">
                <span className={`inline-block px-3 py-1 rounded text-xs font-bold border-2 border-black ${
                  selectedPlace.visited 
                    ? 'bg-green-400 text-black' 
                    : 'bg-pink-400 text-black'
                }`}>
                  {selectedPlace.visited ? '⭐ LEVEL COMPLETED' : '🔒 LOCKED LEVEL'}
                </span>
              </div>

              {/* Location Info */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-blue-600 font-bold text-xl pixel-text">
                    {selectedPlace.location.toUpperCase()}
                  </h3>
                  <p className="text-blue-600 font-bold">{selectedPlace.country}</p>
                </div>

                {/* Mario-style Rating */}
                {selectedPlace.visited && selectedPlace.rating && (
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < selectedPlace.rating! ? 'text-orange-500' : 'text-gray-400'
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                )}

                {/* Details */}
                <div className="bg-blue-100 border-2 border-black rounded p-3">
                  <p className="text-blue-800 text-sm font-medium">
                    {selectedPlace.memories || 
                     selectedPlace.highlights?.join(', ') || 
                     'A mysterious destination awaiting exploration...'}
                  </p>
                </div>

                {/* Visit Info */}
                {selectedPlace.visited && (
                  <div className="bg-green-400 border-2 border-black rounded p-3">
                    <div className="text-green-800 text-sm">
                      <div className="font-bold">📅 Mission Date: {selectedPlace.visitDate}</div>
                      {selectedPlace.duration && (
                        <div className="font-bold">⏱️ Duration: {selectedPlace.duration}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                {selectedPlace.highlights && selectedPlace.highlights.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-purple-600 text-sm font-bold pixel-text">🏆 ACHIEVEMENTS:</div>
                    {selectedPlace.highlights.slice(0, 3).map((highlight, index) => (
                      <div key={index} className="text-purple-600 text-sm flex items-center font-medium">
                        <span className="text-purple-600 mr-2">⭐</span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                )}

                {/* Mario-Style Close Button */}
                <div className="text-center">
                  <button
                    onClick={() => setSelectedPlace(null)}
                    className="px-6 py-2 bg-red-500 text-white font-bold border-2 border-black hover:bg-red-400 transition-all retro-button-3d pixel-text"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
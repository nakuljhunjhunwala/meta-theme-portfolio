import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ThemeType = "retro" | "code" | "glass" | "terminal" | "neuro" | "brutal"
export type JourneyType = "quick" | "guided" | "explore"

interface UserPreferences {
  language: string
  reducedMotion: boolean
  highContrast: boolean
  fontSize: "small" | "medium" | "large"
}

interface VisitData {
  visitCount: number
  firstVisit: string
  lastVisit: string
  totalTimeSpent: number
  themesExplored: ThemeType[]
  achievementsUnlocked: string[]
  lastTheme?: ThemeType
  lastJourney?: JourneyType
}

interface PortfolioState {
  // Core state
  isInitialized: boolean
  currentTheme: ThemeType | "landing"
  selectedJourney: JourneyType | null
  isLoading: boolean

  // User data
  preferences: UserPreferences
  visitData: VisitData

  // Actions
  initializePortfolio: () => void
  setTheme: (theme: ThemeType | "landing") => void
  setJourneyType: (journey: JourneyType) => void
  updatePreferences: (prefs: Partial<UserPreferences>) => void
  resetToLanding: () => void
  unlockAchievement: (achievement: string) => void
  trackTimeSpent: (seconds: number) => void
  visitCount: number
}

const defaultPreferences: UserPreferences = {
  language: "en",
  reducedMotion: false,
  highContrast: false,
  fontSize: "medium",
}

const defaultVisitData: VisitData = {
  visitCount: 0,
  firstVisit: new Date().toISOString(),
  lastVisit: new Date().toISOString(),
  totalTimeSpent: 0,
  themesExplored: [],
  achievementsUnlocked: [],
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      isInitialized: false,
      currentTheme: "landing",
      selectedJourney: null,
      isLoading: false,
      preferences: defaultPreferences,
      visitData: defaultVisitData,
      visitCount: 0,

      initializePortfolio: () => {
        const state = get()

        // Prevent multiple initializations in the same session
        if (state.isInitialized) {
          return
        }

        const now = new Date().toISOString()
        const newVisitCount = state.visitData.visitCount + 1

        set({
          isInitialized: true,
          visitCount: newVisitCount,
          visitData: {
            ...state.visitData,
            visitCount: newVisitCount,
            lastVisit: now,
            firstVisit: state.visitData.visitCount === 0 ? now : state.visitData.firstVisit,
          },
        })
      },

      setTheme: (theme: ThemeType | "landing") => {
        const state = get()
        set({
          currentTheme: theme,
          isLoading: false,
          visitData: {
            ...state.visitData,
            lastTheme: theme as ThemeType,
            themesExplored:
              theme !== "landing" && !state.visitData.themesExplored.includes(theme as ThemeType)
                ? [...state.visitData.themesExplored, theme as ThemeType]
                : state.visitData.themesExplored,
          },
        })
      },

      setJourneyType: (journey: JourneyType) => {
        const state = get()
        set({
          selectedJourney: journey,
          visitData: {
            ...state.visitData,
            lastJourney: journey,
          },
        })
      },

      updatePreferences: (prefs: Partial<UserPreferences>) => {
        const state = get()
        set({
          preferences: { ...state.preferences, ...prefs },
        })
      },

      resetToLanding: () => {
        set({
          currentTheme: "landing",
          selectedJourney: null,
        })
      },

      unlockAchievement: (achievement: string) => {
        const state = get()
        if (!state.visitData.achievementsUnlocked.includes(achievement)) {
          set({
            visitData: {
              ...state.visitData,
              achievementsUnlocked: [...state.visitData.achievementsUnlocked, achievement],
            },
          })
        }
      },

      trackTimeSpent: (seconds: number) => {
        const state = get()
        set({
          visitData: {
            ...state.visitData,
            totalTimeSpent: state.visitData.totalTimeSpent + seconds,
          },
        })
      },


    }),
    {
      name: "portfolio-storage",
      partialize: (state) => ({
        preferences: state.preferences,
        visitData: state.visitData,
        currentTheme: state.currentTheme,
        selectedJourney: state.selectedJourney,
      }),
    },
  ),
)

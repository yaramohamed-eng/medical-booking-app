import { create } from 'zustand'

const FAVORITES_KEY = 'medbook_favorites'
const PROFILE_KEY = 'medbook_profile'
const THEME_KEY = 'medbook_theme'

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const useAppStore = create((set, get) => ({
  // ----- Favorites (Zustand global store requirement) -----
  favoriteIds: loadJSON(FAVORITES_KEY, []),
  toggleFavorite: (doctorId) => {
    const current = get().favoriteIds
    const next = current.includes(doctorId)
      ? current.filter((id) => id !== doctorId)
      : [...current, doctorId]
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
    set({ favoriteIds: next })
  },
  isFavorite: (doctorId) => get().favoriteIds.includes(doctorId),

  // ----- Theme -----
  theme: loadJSON(THEME_KEY, 'light'),
  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light'
    localStorage.setItem(THEME_KEY, JSON.stringify(next))
    set({ theme: next })
  },

  // ----- Profile -----
  profile: loadJSON(PROFILE_KEY, { name: '', email: '', phone: '' }),
  setProfile: (profile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
    set({ profile })
  },

  // ----- Toast feedback -----
  toast: null,
  showToast: (message, type = 'success') => {
    set({ toast: { message, type, id: Date.now() } })
  },
  clearToast: () => set({ toast: null }),
}))

export default useAppStore

import { Outlet } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import useAppStore from './stores/useAppStore'

function RouteFallback() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 flex justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
    </div>
  )
}

export default function App() {
  const theme = useAppStore((s) => s.theme)

  // Apply dark mode class to <html> for Tailwind's darkMode: 'class'
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Toast />
    </div>
  )
}

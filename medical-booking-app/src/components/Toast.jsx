import { useEffect } from 'react'
import useAppStore from '../stores/useAppStore'

export default function Toast() {
  const toast = useAppStore((s) => s.toast)
  const clearToast = useAppStore((s) => s.clearToast)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(clearToast, 3000)
    return () => clearTimeout(timer)
  }, [toast, clearToast])

  if (!toast) return null

  const color =
    toast.type === 'error'
      ? 'bg-red-600'
      : toast.type === 'info'
      ? 'bg-slate-700'
      : 'bg-emerald-600'

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`${color} text-white px-4 py-3 rounded-lg shadow-lg text-sm`}>
        {toast.message}
      </div>
    </div>
  )
}

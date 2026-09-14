import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DoctorCard from '../components/DoctorCard'
import { getDoctors } from '../services/api'
import useAppStore from '../stores/useAppStore'

function DoctorCardSkeleton() {
  return (
    <div className="card p-4 flex flex-col gap-3 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-3.5 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
      <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="flex gap-2 pt-2">
        <div className="h-9 flex-1 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-9 flex-1 rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  )
}

export default function FavoritesPage() {
  const [doctors, setDoctors] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'

  const favoriteIds = useAppStore((s) => s.favoriteIds)
  const toggleFavorite = useAppStore((s) => s.toggleFavorite)

  useEffect(() => {
    let ignore = false
    setStatus('loading')
    getDoctors()
      .then((data) => {
        if (!ignore) {
          setDoctors(data)
          setStatus('success')
        }
      })
      .catch(() => {
        if (!ignore) setStatus('error')
      })
    return () => {
      ignore = true
    }
  }, [])

  const favoriteDoctors = doctors.filter((d) => favoriteIds.includes(d.id))

  return (
    <div>
      <section className="bg-brand-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14 text-center">
          <p className="inline-block text-xs font-semibold tracking-wide uppercase bg-gold-400 text-brand-900 px-3 py-1 rounded-full mb-4">
            Your starred doctors
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Favorites</h1>
          <p className="text-brand-100 max-w-xl mx-auto">
            All the doctors you've starred, in one place. Book an appointment
            straight from here.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {status === 'loading' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <DoctorCardSkeleton key={i} />
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="card p-6 text-center text-red-600">
            Could not load doctors. Make sure the API server is running
            (<code>npm run server</code>) and try again.
          </div>
        )}

        {status === 'success' && favoriteDoctors.length === 0 && (
          <div className="card p-8 text-center">
            <p className="text-4xl mb-3">★</p>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              You haven't starred any doctors yet.
            </p>
            <Link to="/doctors" className="btn-primary inline-block">
              Browse Doctors
            </Link>
          </div>
        )}

        {status === 'success' && favoriteDoctors.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteDoctors.map((doctor, i) => (
              <div
                key={doctor.id}
                className="animate-[fadeIn_0.4s_ease-out_forwards]"
                style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}
              >
                <DoctorCard
                  doctor={doctor}
                  isFavorite={favoriteIds.includes(doctor.id)}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

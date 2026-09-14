import { useEffect, useMemo, useState } from 'react'
import DoctorCard from '../components/DoctorCard'
import { getDoctors } from '../services/api'
import useAppStore from '../stores/useAppStore'
import useDebounce from '../hooks/useDebounce'

const PAGE_SIZE = 4

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

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'

  // Controlled input requirement (doctor search field)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400) // bonus: debounced search
  const [specialty, setSpecialty] = useState('All')
  const [page, setPage] = useState(1) // bonus: pagination

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

  const specialties = useMemo(
    () => ['All', ...new Set(doctors.map((d) => d.specialty))],
    [doctors]
  )

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch = doc.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
      const matchesSpecialty = specialty === 'All' || doc.specialty === specialty
      return matchesSearch && matchesSpecialty
    })
  }, [doctors, debouncedSearch, specialty])

  // Reset to page 1 whenever the result set changes
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, specialty])

  const totalPages = Math.max(1, Math.ceil(filteredDoctors.length / PAGE_SIZE))
  const paginatedDoctors = filteredDoctors.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14 text-center">
          <p className="inline-block text-xs font-semibold tracking-wide uppercase bg-gold-400 text-brand-900 px-3 py-1 rounded-full mb-4">
            Trusted care, one tap away
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Find your doctor</h1>
          <p className="text-brand-100 max-w-xl mx-auto mb-6">
            Search by name or browse by specialty, then book an appointment in
            just a few clicks.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              className="input !bg-white/95 !text-slate-900 flex-1"
              placeholder="Search doctor by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Specialty pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setSpecialty(s)}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                specialty === s
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-brand-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {status === 'loading' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
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

        {status === 'success' && filteredDoctors.length === 0 && (
          <div className="card p-6 text-center text-slate-500">
            No doctors match your search. Try a different name or specialty.
          </div>
        )}

        {status === 'success' && filteredDoctors.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedDoctors.map((doctor, i) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  className="btn-secondary"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      page === i + 1
                        ? 'bg-brand-600 text-white'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="btn-secondary"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

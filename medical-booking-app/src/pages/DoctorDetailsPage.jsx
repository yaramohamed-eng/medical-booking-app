import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoctorById } from '../services/api'
import useAppStore from '../stores/useAppStore'

export default function DoctorDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState(null)
  const [status, setStatus] = useState('loading')

  const isFavorite = useAppStore((s) => s.isFavorite(id))
  const toggleFavorite = useAppStore((s) => s.toggleFavorite)

  useEffect(() => {
    let ignore = false
    setStatus('loading')
    getDoctorById(id)
      .then((data) => {
        if (!ignore) {
          setDoctor(data)
          setStatus('success')
        }
      })
      .catch(() => {
        if (!ignore) setStatus('error')
      })
    return () => {
      ignore = true
    }
  }, [id])

  if (status === 'loading') {
    return <p className="max-w-3xl mx-auto px-4 py-10 text-center">Loading doctor details...</p>
  }

  if (status === 'error' || !doctor) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <p className="text-red-600 mb-4">Doctor not found.</p>
        <Link to="/doctors" className="btn-primary">
          Back to Doctors
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="text-sm text-brand-600 mb-4">
        ← Back
      </button>

      <div className="card p-6 flex flex-col sm:flex-row gap-6">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-28 h-28 rounded-full object-cover mx-auto sm:mx-0"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{doctor.name}</h1>
            <button
              onClick={() => toggleFavorite(doctor.id)}
              className={`text-2xl ${isFavorite ? 'text-amber-400' : 'text-slate-300'}`}
              aria-label="Toggle favorite"
            >
              ★
            </button>
          </div>
          <p className="text-brand-600 font-medium mb-3">{doctor.specialty}</p>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{doctor.bio}</p>

          <div className="mb-4">
            <p className="label !mb-2">Available Days</p>
            <div className="flex flex-wrap gap-2">
              {doctor.days?.map((day) => (
                <span
                  key={day}
                  className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="label !mb-2">Sample Time Slots</p>
            <div className="flex flex-wrap gap-2">
              {doctor.slots?.map((slot) => (
                <span
                  key={slot}
                  className="text-xs px-2 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-slate-700 dark:text-brand-400"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>

          <Link to={`/book?doctorId=${doctor.id}`} className="btn-primary">
            Book an Appointment
          </Link>
        </div>
      </div>
    </div>
  )
}

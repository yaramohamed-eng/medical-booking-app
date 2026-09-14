import { Link } from 'react-router-dom'

export default function DoctorCard({ doctor, isFavorite, onToggleFavorite }) {
  return (
    <div className="card p-4 flex flex-col gap-3 h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-brand-200 dark:hover:border-brand-500">
      <div className="flex items-start gap-3">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gold-400"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{doctor.name}</h3>
          <p className="text-sm text-brand-600">{doctor.specialty}</p>
        </div>
        <button
          onClick={() => onToggleFavorite(doctor.id)}
          aria-label="Toggle favorite"
          className={`text-xl transition-transform hover:scale-110 ${
            isFavorite ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'
          }`}
        >
          ★
        </button>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
        {doctor.bio}
      </p>

      <div className="flex flex-wrap gap-1">
        {doctor.days?.map((day) => (
          <span
            key={day}
            className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
          >
            {day}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-auto pt-2">
        <Link to={`/doctors/${doctor.id}`} className="btn-secondary flex-1">
          View Details
        </Link>
        <Link to={`/book?doctorId=${doctor.id}`} className="btn-primary flex-1">
          Book
        </Link>
      </div>
    </div>
  )
}

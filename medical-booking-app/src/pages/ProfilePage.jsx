import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAppStore from '../stores/useAppStore'

export default function ProfilePage() {
  const profile = useAppStore((s) => s.profile)
  const setProfile = useAppStore((s) => s.setProfile)
  const favoriteIds = useAppStore((s) => s.favoriteIds)
  const showToast = useAppStore((s) => s.showToast)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: profile,
  })

  const onSubmit = (values) => {
    setProfile(values)
    showToast('Profile saved.')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">My Profile</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        This information can be used to speed up future bookings.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-4">
        <div>
          <label className="label">Full Name</label>
          <input
            className="input"
            placeholder="John Doe"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="you@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
            })}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label">Phone</label>
          <input
            className="input"
            placeholder="01xxxxxxxxx"
            {...register('phone', { required: 'Phone number is required' })}
          />
          {errors.phone && <p className="error-text">{errors.phone.message}</p>}
        </div>

        <button type="submit" className="btn-primary w-full">
          Save Profile
        </button>
      </form>

      <div className="card p-6 mt-6">
        <h2 className="font-semibold mb-2">Favorite Doctors</h2>
        {favoriteIds.length === 0 ? (
          <p className="text-sm text-slate-500">
            You haven't added any favorite doctors yet. Tap the ★ on a doctor card to add one.
          </p>
        ) : (
          <p className="text-sm text-slate-500">
            You have {favoriteIds.length} favorite doctor{favoriteIds.length > 1 ? 's' : ''}.
          </p>
        )}
        <Link to="/favorites" className="btn-secondary inline-block mt-3">
          View Favorites
        </Link>
      </div>
    </div>
  )
}

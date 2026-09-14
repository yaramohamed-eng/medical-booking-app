import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">🔎</p>
      <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        The page you're looking for doesn't exist or was moved.
      </p>
      <Link to="/doctors" className="btn-primary">
        Back to Doctors
      </Link>
    </div>
  )
}

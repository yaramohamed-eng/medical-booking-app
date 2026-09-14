import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppointmentCard from '../components/AppointmentCard'
import ConfirmDialog from '../components/ConfirmDialog'
import { deleteAppointment, getAppointments, getDoctors } from '../services/api'
import useAppStore from '../stores/useAppStore'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [status, setStatus] = useState('loading')
  const [pendingDelete, setPendingDelete] = useState(null)

  const navigate = useNavigate()
  const showToast = useAppStore((s) => s.showToast)

  const loadData = () => {
    setStatus('loading')
    Promise.all([getAppointments(), getDoctors()])
      .then(([appts, docs]) => {
        setAppointments(appts)
        setDoctors(docs)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(() => {
    loadData()
  }, [])

  const doctorMap = Object.fromEntries(doctors.map((d) => [d.id, d]))

  const handleEdit = (appointment) => {
    navigate(`/book?edit=${appointment.id}`)
  }

  const handleDeleteConfirmed = async () => {
    if (!pendingDelete) return
    try {
      await deleteAppointment(pendingDelete.id)
      setAppointments((prev) => prev.filter((a) => a.id !== pendingDelete.id))
      showToast('Appointment cancelled.')
    } catch {
      showToast('Could not cancel the appointment.', 'error')
    } finally {
      setPendingDelete(null)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Appointments</h1>
          <p className="text-slate-500 dark:text-slate-400">
            View, reschedule, or cancel your bookings.
          </p>
        </div>
        <Link to="/book" className="btn-primary hidden sm:inline-flex">
          + New Appointment
        </Link>
      </div>

      {status === 'loading' && <p>Loading your appointments...</p>}

      {status === 'error' && (
        <div className="card p-6 text-center text-red-600">
          Could not load appointments. Make sure the API server is running
          (<code>npm run server</code>).
        </div>
      )}

      {status === 'success' && appointments.length === 0 && (
        <div className="card p-6 text-center text-slate-500">
          You have no appointments yet.
          <div className="mt-4">
            <Link to="/doctors" className="btn-primary">
              Find a Doctor
            </Link>
          </div>
        </div>
      )}

      {status === 'success' && appointments.length > 0 && (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              doctor={doctorMap[appt.doctorId]}
              onEdit={handleEdit}
              onDelete={setPendingDelete}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Cancel appointment?"
        message="This will permanently remove this appointment. This action cannot be undone."
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  )
}

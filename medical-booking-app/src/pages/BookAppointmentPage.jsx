import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  createAppointment,
  getAppointmentById,
  getDoctors,
  updateAppointment,
} from '../services/api'
import useAppStore from '../stores/useAppStore'

export default function BookAppointmentPage() {
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const preselectedDoctorId = searchParams.get('doctorId') || ''

  const navigate = useNavigate()
  const showToast = useAppStore((s) => s.showToast)

  const [doctors, setDoctors] = useState([])
  const [loadingDoctors, setLoadingDoctors] = useState(true)

  // Small uncontrolled-input example, per project requirement (useRef, not RHF-managed)
  const insuranceRef = useRef(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      doctorId: preselectedDoctorId,
      patientName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      note: '',
    },
  })

  // Load doctor list for the select field
  useEffect(() => {
    getDoctors()
      .then(setDoctors)
      .finally(() => setLoadingDoctors(false))
  }, [])

  // If editing, load the existing appointment and prefill the form
  useEffect(() => {
    if (!editId) return
    getAppointmentById(editId).then((appt) => {
      reset({
        doctorId: appt.doctorId,
        patientName: appt.patientName,
        email: appt.email,
        phone: appt.phone,
        date: appt.date,
        time: appt.time,
        note: appt.note || '',
      })
      if (insuranceRef.current) {
        insuranceRef.current.value = appt.insuranceNumber || ''
      }
    })
  }, [editId, reset])

  const onSubmit = async (formValues) => {
    const payload = {
      ...formValues,
      insuranceNumber: insuranceRef.current?.value || '',
    }

    try {
      if (editId) {
        await updateAppointment(editId, payload)
        showToast('Appointment updated successfully.')
      } else {
        await createAppointment(payload)
        showToast('Appointment booked successfully.')
      }
      navigate('/appointments')
    } catch (err) {
      showToast('Something went wrong. Please try again.', 'error')
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">
        {editId ? 'Edit Appointment' : 'Book an Appointment'}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        Fill in your details and pick a convenient date and time.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-4">
        <div>
          <label className="label">Doctor</label>
          <select
            className="input"
            disabled={loadingDoctors}
            {...register('doctorId', { required: 'Please select a doctor' })}
          >
            <option value="">-- Select a doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} · {doc.specialty}
              </option>
            ))}
          </select>
          {errors.doctorId && <p className="error-text">{errors.doctorId.message}</p>}
        </div>

        <div>
          <label className="label">Full Name</label>
          <input
            className="input"
            placeholder="John Doe"
            {...register('patientName', { required: 'Name is required' })}
          />
          {errors.patientName && <p className="error-text">{errors.patientName.message}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
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
              {...register('phone', {
                required: 'Phone number is required',
                minLength: { value: 8, message: 'Enter a valid phone number' },
              })}
            />
            {errors.phone && <p className="error-text">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Date</label>
            <input
              type="date"
              className="input"
              {...register('date', { required: 'Date is required' })}
            />
            {errors.date && <p className="error-text">{errors.date.message}</p>}
          </div>
          <div>
            <label className="label">Time</label>
            <input
              type="time"
              className="input"
              {...register('time', { required: 'Time is required' })}
            />
            {errors.time && <p className="error-text">{errors.time.message}</p>}
          </div>
        </div>

        <div>
          <label className="label">Note (optional)</label>
          <textarea
            className="input"
            rows={3}
            placeholder="Anything the doctor should know beforehand..."
            {...register('note')}
          />
        </div>

        {/* Uncontrolled input example using useRef, intentionally not managed by RHF */}
        <div>
          <label className="label">Insurance Number (optional)</label>
          <input
            ref={insuranceRef}
            defaultValue=""
            className="input"
            placeholder="e.g. INS-12345"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
            {isSubmitting ? 'Saving...' : editId ? 'Save Changes' : 'Confirm Booking'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/appointments')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

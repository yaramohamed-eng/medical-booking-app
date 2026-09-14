export default function AppointmentCard({ appointment, doctor, onEdit, onDelete }) {
  return (
    <div className="card p-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <img
        src={doctor?.image}
        alt={doctor?.name || 'Doctor'}
        className="w-14 h-14 rounded-full object-cover border border-slate-200 dark:border-slate-700"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{doctor?.name || 'Unknown doctor'}</h3>
        <p className="text-sm text-brand-600">{doctor?.specialty}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          📅 {appointment.date} &nbsp; 🕐 {appointment.time}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Patient: {appointment.patientName}
        </p>
        {appointment.note && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
            "{appointment.note}"
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <button onClick={() => onEdit(appointment)} className="btn-secondary">
          Edit
        </button>
        <button onClick={() => onDelete(appointment)} className="btn-danger">
          Delete
        </button>
      </div>
    </div>
  )
}

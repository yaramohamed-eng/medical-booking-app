export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="card p-6 max-w-sm w-full">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-danger">
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

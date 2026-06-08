import { AlertTriangle, X } from 'lucide-react';

interface FormAlertProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

/**
 * Inline form validation alert — tampil di dalam dialog/form
 * dengan styling yang konsisten dan animasi fade-in.
 */
export function FormAlert({ message, onClose, className = '' }: FormAlertProps) {
  if (!message) return null;

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm animate-in fade-in duration-200 ${className}`}
      style={{
        background: 'rgba(239, 68, 68, 0.08)',
        border: '1px solid rgba(239, 68, 68, 0.25)',
        color: '#dc2626',
      }}
    >
      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
      <span className="flex-1 font-medium">{message}</span>
      {onClose && (
        <button onClick={onClose} className="shrink-0 hover:opacity-70 transition">
          <X size={14} />
        </button>
      )}
    </div>
  );
}

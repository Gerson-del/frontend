import type { ReactNode } from "react";
import { X } from "lucide-react";
interface ModalProps {
  title: string;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}
export default function Modal({
  title,
  onClose,
  className = "",
  children,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className={`relative z-10  max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Cerrar modal"
        >
          <X />
        </button>
        <h2 className="min-w-0 flex-1 truncate text-lg font-semibold text-gray-900">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}

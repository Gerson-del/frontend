import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, name, error, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </div>
  );
}

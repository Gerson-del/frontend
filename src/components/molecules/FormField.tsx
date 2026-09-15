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
      <label htmlFor={name}>{label}</label>

      {children}
      {error && <span>{error}</span>}
    </div>
  );
}

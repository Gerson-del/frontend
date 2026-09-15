interface SelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

export default function Select({
  name,
  value,
  onChange,
  children,
}: SelectProps) {
  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
    >
      {children}
    </select>
  );
}

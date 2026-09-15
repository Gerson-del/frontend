interface spinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function Spinner({ size = "md", text = "" }: spinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };
  return (
    <div className="flex gap-2">
      <p>{text}</p>
      <div
        className={`${sizes[size]} rounded-full animate-spin border-2 border-gray-300 border-t-blue-300`}
      ></div>
    </div>
  );
}

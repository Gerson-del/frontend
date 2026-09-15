import { ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "menu"
  | "menuItem"
  | "menuItemDanger";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  icon,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed",

    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",

    danger:
      "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed",

    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",

    menu: "bg-transparent text-gray-500 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed",

    menuItem:
      "w-full justify-start rounded-none bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed",

    menuItemDanger:
      "w-full justify-start rounded-none bg-white text-gray-700 hover:bg-red-50 hover:text-red-500 disabled:text-gray-400 disabled:cursor-not-allowed",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-md
        font-medium
        transition-colors
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

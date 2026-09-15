import React from "react";

type TextVariant =
  | "primary"
  | "secondary"
  | "muted"
  | "danger"
  | "success"
  | "warning"
  | "label"
  | "white"
  | "headerText";

type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type TextWeight = "normal" | "medium" | "semibold" | "bold";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
}

export default function Text({
  variant = "primary",
  size = "md",
  weight = "normal",
  className = "",
  children,
  ...props
}: TextProps) {
  const variants: Record<TextVariant, string> = {
    primary: "text-gray-900",
    secondary: "text-gray-600",
    muted: "text-gray-400",
    danger: "text-red-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    label: "text-gray-700",
    white: "text-white",
    headerText: "mb-4  font-bold tracking-tight text-heading md:text-5xl",
  };

  const sizes: Record<TextSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };

  const weights: Record<TextWeight, string> = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  return (
    <p
      className={`${variants[variant]} ${sizes[size]} ${weights[weight]} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

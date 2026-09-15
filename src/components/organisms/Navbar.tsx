import type { ComponentProps } from "react";

interface NavbarProps extends ComponentProps<"nav"> {}

export default function Navbar({ children, ...props }: NavbarProps) {
  return <nav {...props}>{children}</nav>;
}

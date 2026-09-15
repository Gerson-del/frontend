import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

interface NavItemProps extends ComponentProps<typeof Link> {
  icon?: ReactNode;
}

export default function NavItem({ children, icon, ...props }: NavItemProps) {
  return (
    <Link
      {...props}
      className="
        group flex items-center gap-3 rounded-l-xl
        px-6 py-3
        text-sm font-medium text-gray-700
        transition-all duration-200
        hover:bg-white hover:text-blue-700

      "
    >
      {icon && (
        <span className="flex h-8 w-8 shrink-0  items-center justify-center">
          {icon}
        </span>
      )}

      <span className="text-left">{children}</span>
    </Link>
  );
}

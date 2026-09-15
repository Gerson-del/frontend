import { useEffect, useRef } from "react";
import { ReactNode } from "react";
import { EllipsisVertical } from "lucide-react";
import Button from "./Button";

interface Action {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  variant?: "default" | "danger";
}

interface ActionMenuProps {
  actions: Action[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function ActionsMenu({
  actions,
  isOpen,
  onToggle,
  onClose,
}: ActionMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <Button
        onClick={onToggle}
        variant="menu"
        icon={<EllipsisVertical size={18} />}
        aria-label="Abrir acciones"
      />

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {actions.map((action) => (
            <div key={action.label}>
              <Button
                onClick={() => {
                  action.onClick();
                  onClose();
                }}
                icon={action.icon}
                variant={
                  action.variant === "danger" ? "menuItemDanger" : "menuItem"
                }
              >
                {action.label}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

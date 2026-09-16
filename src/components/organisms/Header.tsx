import Navbar from "./Navbar";
import NavItem from "../molecules/NavItem";
import { LogOut } from "lucide-react";
import { Building, Briefcase, FileText, House, Home } from "lucide-react";
import Button from "../atoms/Button";

export default function Header() {
  return (
    <header className="flex h-16 w-full items-center px-6 justify-between ">
      <Navbar className="flex items-center gap-4">
        <NavItem href="/dashboard/" icon={<Home />}>
          Inicio
        </NavItem>

        <NavItem href="/dashboard/notificaciones" icon={<Briefcase />}>
          Notificaciones
        </NavItem>

        <NavItem href="/dashboard/usuarios" icon={<Building />}>
          usuarios
        </NavItem>

        <NavItem href="/dashboard/tickets" icon={<FileText />}>
          tickets
        </NavItem>

        <NavItem href="/dashboard/reportes" icon={<FileText />}>
          Reportes
        </NavItem>
      </Navbar>

      <Button icon={<LogOut></LogOut>} variant="danger">
        Cerrar sesion
      </Button>
    </header>
  );
}

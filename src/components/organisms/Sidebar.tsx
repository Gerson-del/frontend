import Navbar from "./Navbar";
import NavItem from "../molecules/NavItem";
import SidebarHeader from "../molecules/SidebarHeader";
import SidebarFooter from "../molecules/SidebarFooter";
import { Building, Briefcase, FileText, House, Home } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col  bg-blue-500">
      <SidebarHeader />

      <Navbar className="flex-1">
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

      <SidebarFooter />
    </aside>
  );
}

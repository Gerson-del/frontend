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

        <NavItem href="/dashboard/applications" icon={<Briefcase />}>
          Postulaciones
        </NavItem>

        <NavItem href="/dashboard/companies" icon={<Building />}>
          Empresas
        </NavItem>

        <NavItem href="/dashboard/job_positions" icon={<FileText />}>
          Vacantes
        </NavItem>
      </Navbar>

      <SidebarFooter />
    </aside>
  );
}

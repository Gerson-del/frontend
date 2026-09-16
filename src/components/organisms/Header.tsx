"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import NavItem from "../molecules/NavItem";
import { LogOut } from "lucide-react";
import { Building, Briefcase, FileText, Home } from "lucide-react";
import Button from "../atoms/Button";
import { authService } from "@/services/authService";

const canManageUsers = (role: string | null) =>
  role === "admin" || role === "agente";

export default function Header() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    authService
      .getMe()
      .then(({ data }) => setRole(data.role))
      .catch(() => setRole(null));
  }, []);

  async function handleLogout() {
    await authService.logout();
    router.push("/login");
  }

  return (
    <header className="flex h-16 w-full items-center px-6 justify-between ">
      <Navbar className="flex items-center gap-4 mx-40">
        <NavItem href="/dashboard/" icon={<Home />}>
          Inicio
        </NavItem>

        <NavItem href="/dashboard/notificaciones" icon={<Briefcase />}>
          Notificaciones
        </NavItem>

        {canManageUsers(role) && (
          <NavItem href="/dashboard/usuarios" icon={<Building />}>
            usuarios
          </NavItem>
        )}

        <NavItem href="/dashboard/tickets" icon={<FileText />}>
          tickets
        </NavItem>

        <NavItem href="/dashboard/reportes" icon={<FileText />}>
          Reportes
        </NavItem>
      </Navbar>

      <Button icon={<LogOut></LogOut>} variant="danger" onClick={handleLogout}>
        Cerrar sesion
      </Button>
    </header>
  );
}

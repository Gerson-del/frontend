import { User } from "@/types/user";
import { SquarePen, UserCheck, UserX } from "lucide-react";
import { Column } from "@/types/table";
import ActionsMenu from "@/components/atoms/ActionsMenu";
import Text from "@/components/atoms/Text";

interface UsersColumnsProps {
  onEdit: (user: User) => void;
  onToggleStatus: (user: User) => void;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
}

export default function getUsersColumns({
  onEdit,
  onToggleStatus,
  openMenuId,
  setOpenMenuId,
}: UsersColumnsProps): Column<User>[] {
  return [
    {
      id: "name",
      header: "Nombre",
      render: (user) => (
        <Text variant="primary" size="sm" weight="medium">
          {`${user.primer_nombre} ${user.apellido_paterno}`.trim()}
        </Text>
      ),
    },
    {
      id: "email",
      header: "Correo",
      render: (user) => (
        <Text variant="primary" size="sm" weight="medium">
          {user.users?.email ?? "-"}
        </Text>
      ),
    },
    {
      id: "role",
      header: "Rol",
      render: (user) => (
        <Text variant="primary" size="sm" weight="medium">
          {user.roles.name}
        </Text>
      ),
    },
    {
      id: "area",
      header: "Área",
      render: (user) => (
        <Text variant="primary" size="sm" weight="medium">
          {user.areas.name}
        </Text>
      ),
    },
    {
      id: "status",
      header: "Estado",
      render: (user) => (
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
            user.status === "activo"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {user.status}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      render: (user) => (
        <div className="flex items-center gap-2">
          <ActionsMenu
            actions={[
              {
                label: "Editar",
                icon: <SquarePen size={16} />,
                onClick: () => onEdit(user),
              },
              {
                label: user.status === "activo" ? "Dar de baja" : "Dar de alta",
                icon:
                  user.status === "activo" ? (
                    <UserX size={16} />
                  ) : (
                    <UserCheck size={16} />
                  ),
                variant: user.status === "activo" ? "danger" : "default",
                onClick: () => onToggleStatus(user),
              },
            ]}
            isOpen={openMenuId === user.id}
            onToggle={() => {
              setOpenMenuId(openMenuId === user.id ? null : user.id);
            }}
            onClose={() => setOpenMenuId(null)}
          />
        </div>
      ),
    },
  ];
}
import { Ticket, TicketPriority, TicketStatus } from "@/types/ticket";
import { Column } from "@/types/table";
import { UserCog, SquarePen, Trash2 } from "lucide-react";
import ActionsMenu from "@/components/atoms/ActionsMenu";
import Text from "@/components/atoms/Text";

interface TicketsColumnsProps {
  onAssign: (ticket: Ticket) => void;
  onEditStatus: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
}

const priorityStyles: Record<TicketPriority, string> = {
  baja: "bg-gray-100 text-gray-700",
  media: "bg-blue-100 text-blue-700",
  alta: "bg-orange-100 text-orange-700",
  critica: "bg-red-100 text-red-700",
};

const priorityLabels: Record<TicketPriority, string> = {
  baja: "Baja",
  media: "Media",
  alta: "Alta",
  critica: "Crítica",
};

const statusStyles: Record<TicketStatus, string> = {
  abierto: "bg-blue-100 text-blue-700",
  en_progreso: "bg-yellow-100 text-yellow-700",
  resuelto: "bg-green-100 text-green-700",
  cerrado: "bg-gray-100 text-gray-500",
  cancelado: "bg-red-100 text-red-700",
};

const statusLabels: Record<TicketStatus, string> = {
  abierto: "Abierto",
  en_progreso: "En progreso",
  resuelto: "Resuelto",
  cerrado: "Cerrado",
  cancelado: "Cancelado",
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function getTicketsColumns({
  onAssign,
  onEditStatus,
  onDelete,
  openMenuId,
  setOpenMenuId,
}: TicketsColumnsProps): Column<Ticket>[] {
  return [
    {
      id: "code",
      header: "Código",
      render: (ticket) => (
        <Text variant="primary" size="sm" weight="medium">
          {ticket.code}
        </Text>
      ),
    },
    {
      id: "title",
      header: "Asunto",
      render: (ticket) => (
        <Text variant="primary" size="sm" weight="medium">
          {ticket.title}
        </Text>
      ),
    },
    {
      id: "priority",
      header: "Prioridad",
      render: (ticket) => (
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${priorityStyles[ticket.priority]}`}
        >
          {priorityLabels[ticket.priority]}
        </span>
      ),
    },
    {
      id: "status",
      header: "Estado",
      render: (ticket) => (
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[ticket.status]}`}
        >
          {statusLabels[ticket.status]}
        </span>
      ),
    },
    {
      id: "assignedTo",
      header: "Asignado A",
      render: (ticket) => (
        <Text variant="primary" size="sm" weight="medium">
          {ticket.users_tickets_assigned_toTousers
            ? `${ticket.users_tickets_assigned_toTousers.primer_nombre} ${ticket.users_tickets_assigned_toTousers.apellido_paterno}`
            : "Sin asignar"}
        </Text>
      ),
    },
    {
      id: "updatedAt",
      header: "Última actualización",
      render: (ticket) => (
        <Text variant="primary" size="sm" weight="normal">
          {formatDate(ticket.updated_at)}
        </Text>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      render: (ticket) => (
        <div className="flex items-center gap-2">
          <ActionsMenu
            actions={[
              {
                label: "Asignar",
                icon: <UserCog size={16} />,
                onClick: () => onAssign(ticket),
              },
              {
                label: "Cambiar prioridad/estado",
                icon: <SquarePen size={16} />,
                onClick: () => onEditStatus(ticket),
              },
              {
                label: "Eliminar",
                icon: <Trash2 size={16} />,
                variant: "danger",
                onClick: () => onDelete(ticket),
              },
            ]}
            isOpen={openMenuId === ticket.id}
            onToggle={() =>
              setOpenMenuId(openMenuId === ticket.id ? null : ticket.id)
            }
            onClose={() => setOpenMenuId(null)}
          />
        </div>
      ),
    },
  ];
}

"use client";

import Button from "@/components/atoms/Button";
import DataTable from "@/components/organisms/DataTable";
import Spinner from "@/components/atoms/Spinner";
import Modal from "@/components/organisms/Modal";
import Text from "@/components/atoms/Text";
import TicketForm from "./TicketForm";
import AssignTicketForm from "./AssignTicketForm";
import TicketStatusForm from "./TicketStatusForm";
import getTicketsColumns from "./TicketsColumns";
import { useTickets } from "./useTickets";
import { ApiError } from "@/errors/errors";
import { Ticket, TicketFormData, TicketPriority, TicketStatus } from "@/types/ticket";
import { FileText, Plus } from "lucide-react";
import { useState } from "react";

export default function TicketsClient() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [ticketToAssign, setTicketToAssign] = useState<Ticket | null>(null);
  const [ticketToEditStatus, setTicketToEditStatus] = useState<Ticket | null>(
    null,
  );
  const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>(null);
  const {
    tickets,
    categories,
    areas,
    isLoading,
    isSubmitting,
    error,
    createTicket,
    updatePriorityAndStatus,
    assignTicket,
    deleteTicket,
  } = useTickets();

  const showError = (error: unknown) => {
    if (error instanceof ApiError) {
      alert(error.message);
      return;
    }

    alert("Ocurrió un error inesperado");
  };

  const handleCreate = async (data: TicketFormData) => {
    try {
      await createTicket({
        area_id: data.area_id,
        category_id: data.category_id,
        title: data.title,
        description: data.description,
        priority: data.priority,
      });
      setIsCreateModalOpen(false);
    } catch (error) {
      showError(error);
    }
  };

  const handleAssignSubmit = async (assignedTo: string | null) => {
    if (!ticketToAssign) return;

    try {
      await assignTicket(ticketToAssign.id, assignedTo);
      setTicketToAssign(null);
    } catch (error) {
      showError(error);
    }
  };

  const handleEditStatusSubmit = async (data: {
    priority: TicketPriority;
    status: TicketStatus;
  }) => {
    if (!ticketToEditStatus) return;

    try {
      await updatePriorityAndStatus(ticketToEditStatus, data);
      setTicketToEditStatus(null);
    } catch (error) {
      showError(error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!ticketToDelete) return;

    try {
      await deleteTicket(ticketToDelete.id);
      setTicketToDelete(null);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <main>
      <div className="p-4">
        <div className="mb-6 flex flex-col gap-2 p-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <FileText />
            <Text variant="primary" size="2xl" weight="bold">
              Tickets
            </Text>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsCreateModalOpen(true)}
            icon={<Plus />}
          >
            Crear nuevo ticket
          </Button>
        </div>

        <Text variant="primary" size="sm" weight="normal">
          Administra los tickets del sistema
        </Text>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Spinner size="md" text="Cargando tickets..." />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-8">
          <Text variant="danger" size="sm" weight="medium">
            {error}
          </Text>
        </div>
      ) : (
        <DataTable
          size="lg"
          variant="colored"
          data={tickets}
          columns={getTicketsColumns({
            onAssign: setTicketToAssign,
            onEditStatus: setTicketToEditStatus,
            onDelete: setTicketToDelete,
            openMenuId,
            setOpenMenuId,
          })}
          getRowKey={(t) => t.id}
        />
      )}

      {isCreateModalOpen && (
        <Modal
          title="Crear nuevo ticket"
          onClose={() => setIsCreateModalOpen(false)}
        >
          <TicketForm
            categories={categories}
            areas={areas}
            onSubmit={handleCreate}
            onClose={() => setIsCreateModalOpen(false)}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}

      {ticketToAssign && (
        <Modal
          title={`Asignar ${ticketToAssign.code}`}
          onClose={() => setTicketToAssign(null)}
        >
          <AssignTicketForm
            ticket={ticketToAssign}
            onSubmit={handleAssignSubmit}
            onClose={() => setTicketToAssign(null)}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}

      {ticketToEditStatus && (
        <Modal
          title={`Cambiar prioridad/estado — ${ticketToEditStatus.code}`}
          onClose={() => setTicketToEditStatus(null)}
        >
          <TicketStatusForm
            ticket={ticketToEditStatus}
            onSubmit={handleEditStatusSubmit}
            onClose={() => setTicketToEditStatus(null)}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}

      {ticketToDelete && (
        <Modal
          title="Eliminar ticket"
          onClose={() => setTicketToDelete(null)}
        >
          <div className="flex flex-col gap-4 py-4">
            <Text variant="danger" size="sm" weight="medium">
              Esta acción no se puede deshacer.
            </Text>
            <Text variant="primary" size="sm" weight="normal">
              ¿Seguro que quieres eliminar el ticket {ticketToDelete.code} — “
              {ticketToDelete.title}”?
            </Text>
          </div>

          <div className="flex flex-row justify-between gap-2 p-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setTicketToDelete(null)}
            >
              Cancelar
            </Button>

            <Button
              type="button"
              variant="danger"
              disabled={isSubmitting}
              onClick={handleConfirmDelete}
            >
              Eliminar
            </Button>
          </div>
        </Modal>
      )}
    </main>
  );
}

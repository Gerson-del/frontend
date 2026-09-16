"use client";

import { useState } from "react";
import { FormField } from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import { Ticket, TicketPriority, TicketStatus } from "@/types/ticket";

interface TicketStatusFormProps {
  ticket: Ticket;
  onSubmit: (data: { priority: TicketPriority; status: TicketStatus }) => void;
  onClose: () => void;
  isSubmitting: boolean;
}

export default function TicketStatusForm({
  ticket,
  onSubmit,
  onClose,
  isSubmitting,
}: TicketStatusFormProps) {
  const [priority, setPriority] = useState<TicketPriority>(ticket.priority);
  const [status, setStatus] = useState<TicketStatus>(ticket.status);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ priority, status });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 py-4">
        <FormField label="Prioridad" name="priority">
          <Select
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TicketPriority)}
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
            <option value="critica">Crítica</option>
          </Select>
        </FormField>

        <FormField label="Estado" name="status">
          <Select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TicketStatus)}
          >
            <option value="abierto">Abierto</option>
            <option value="en_progreso">En progreso</option>
            <option value="resuelto">Resuelto</option>
            <option value="cerrado">Cerrado</option>
            <option value="cancelado">Cancelado</option>
          </Select>
        </FormField>
      </div>

      <div className="flex flex-row justify-between gap-2 p-2">
        <Button type="button" variant="danger" onClick={onClose}>
          Cancelar
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          Guardar cambios
        </Button>
      </div>
    </form>
  );
}

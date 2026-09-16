"use client";

import { useEffect, useState } from "react";
import { FormField } from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Spinner from "@/components/atoms/Spinner";
import { usersService } from "@/services/usersService";
import { User } from "@/types/user";
import { Ticket } from "@/types/ticket";

interface AssignTicketFormProps {
  ticket: Ticket;
  onSubmit: (assignedTo: string | null) => void;
  onClose: () => void;
  isSubmitting: boolean;
}

export default function AssignTicketForm({
  ticket,
  onSubmit,
  onClose,
  isSubmitting,
}: AssignTicketFormProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [assignedTo, setAssignedTo] = useState(ticket.assigned_to ?? "");

  useEffect(() => {
    let cancelled = false;

    usersService
      .getAll()
      .then((response) => {
        if (!cancelled) {
          setUsers(response.data.filter((user) => user.status === "activo"));
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(assignedTo || null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner size="md" text="Cargando usuarios..." />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="py-4">
        <FormField label="Asignar a" name="assigned_to">
          <Select
            name="assigned_to"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Sin asignar</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {`${user.primer_nombre} ${user.apellido_paterno}`}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <div className="flex flex-row justify-between gap-2 p-2">
        <Button type="button" variant="danger" onClick={onClose}>
          Cancelar
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          Guardar
        </Button>
      </div>
    </form>
  );
}

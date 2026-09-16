import { useEffect, useState } from "react";
import { Area } from "@/types/user";
import {
  Category,
  CreateTicketInput,
  Ticket,
  TicketPriority,
  TicketStatus,
} from "@/types/ticket";
import { ticketsService } from "@/services/ticketsService";
import { usersService } from "@/services/usersService";
import { ApiError } from "@/errors/errors";

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const [ticketsResponse, categoriesResponse, areasResponse] =
          await Promise.all([
            ticketsService.getAll(),
            ticketsService.getCategories(),
            usersService.getAreas(),
          ]);

        if (cancelled) return;

        setTickets(ticketsResponse.data);
        setCategories(categoriesResponse.data);
        setAreas(areasResponse.data);
        setError(null);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof ApiError ? err.message : "Ocurrió un error inesperado",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  const createTicket = async (data: CreateTicketInput) => {
    try {
      setIsSubmitting(true);
      const response = await ticketsService.create(data);
      setTickets((prev) => [response.data, ...prev]);
      return response.data;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updatePriorityAndStatus = async (
    ticket: Ticket,
    data: { priority: TicketPriority; status: TicketStatus },
  ) => {
    try {
      setIsSubmitting(true);
      let updated = ticket;

      if (data.priority !== ticket.priority) {
        const response = await ticketsService.updatePriority(ticket.id, {
          priority: data.priority,
        });
        updated = response.data;
      }

      if (data.status !== ticket.status) {
        const response = await ticketsService.updateStatus(ticket.id, {
          status: data.status,
        });
        updated = response.data;
      }

      setTickets((prev) =>
        prev.map((t) => (t.id === ticket.id ? updated : t)),
      );
      return updated;
    } finally {
      setIsSubmitting(false);
    }
  };

  const assignTicket = async (id: string, assignedTo: string | null) => {
    try {
      setIsSubmitting(true);
      const response = await ticketsService.assign(id, {
        assigned_to: assignedTo,
      });
      setTickets((prev) =>
        prev.map((ticket) => (ticket.id === id ? response.data : ticket)),
      );
      return response.data;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTicket = async (id: string) => {
    try {
      setIsSubmitting(true);
      await ticketsService.delete(id);
      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}

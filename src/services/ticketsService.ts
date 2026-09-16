import { apiService } from "./apiService";
import type {
  AssignTicketInput,
  Category,
  CreateTicketInput,
  Ticket,
  UpdateTicketPriorityInput,
  UpdateTicketStatusInput,
} from "@/types/ticket";
import type { ApiResponse } from "@/types/api";

export const ticketsService = {
  getAll: () => apiService.get<ApiResponse<Ticket[]>>("/tickets"),

  create: (data: CreateTicketInput) =>
    apiService.post<ApiResponse<Ticket>>("/tickets", data),

  getCategories: () =>
    apiService.get<ApiResponse<Category[]>>("/tickets/categories"),

  updatePriority: (id: string, data: UpdateTicketPriorityInput) =>
    apiService.patch<ApiResponse<Ticket>>(`/tickets/${id}/priority`, data),

  updateStatus: (id: string, data: UpdateTicketStatusInput) =>
    apiService.patch<ApiResponse<Ticket>>(`/tickets/${id}/status`, data),

  assign: (id: string, data: AssignTicketInput) =>
    apiService.patch<ApiResponse<Ticket>>(`/tickets/${id}/assign`, data),

  delete: (id: string) => apiService.delete(`/tickets/${id}`),
};

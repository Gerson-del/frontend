export type TicketPriority = "baja" | "media" | "alta" | "critica";
export type TicketStatus =
  | "abierto"
  | "en_progreso"
  | "resuelto"
  | "cerrado"
  | "cancelado";

export interface Category {
  id: string;
  name: string;
  description?: string | null;
}

interface TicketPersonRef {
  id: string;
  primer_nombre: string;
  apellido_paterno: string;
}

export interface Ticket {
  id: string;
  code: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  area_id: string;
  category_id: string;
  created_by: string;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  areas: { id: string; name: string };
  categories: { id: string; name: string };
  users_tickets_created_byTousers: TicketPersonRef;
  users_tickets_assigned_toTousers: TicketPersonRef | null;
}

export interface CreateTicketInput {
  area_id: string;
  category_id: string;
  title: string;
  description: string;
  priority: TicketPriority;
}

export interface TicketFormData {
  area_id: string;
  category_id: string;
  title: string;
  description: string;
  priority: TicketPriority;
}

export interface UpdateTicketPriorityInput {
  priority: TicketPriority;
}

export interface UpdateTicketStatusInput {
  status: TicketStatus;
}

export interface AssignTicketInput {
  assigned_to: string | null;
}

export type UserStatus = "activo" | "inactivo";

export interface Role {
  id: string;
  name: string;
}

export interface Area {
  id: string;
  name: string;
}

export interface User {
  id: string;
  primer_nombre: string;
  segundo_nombre?: string;
  apellido_paterno: string;
  apellido_materno?: string;
  role_id: string;
  area_id: string;
  status: UserStatus;
  created_at: string;
  updated_at: string;
  roles: Role;
  areas: Area;
  users: { email: string | null };
}

export interface CreateUserInput {
  primer_nombre: string;
  segundo_nombre?: string;
  apellido_paterno: string;
  apellido_materno?: string;
  email: string;
  password: string;
  role_id: string;
  area_id: string;
}

export interface UpdateUserInput {
  primer_nombre?: string;
  segundo_nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  role_id?: string;
  area_id?: string;
}

export interface UpdateStatusInput {
  status: UserStatus;
}

export interface UserFormData {
  primer_nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  password: string;
  role_id: string;
  area_id: string;
}
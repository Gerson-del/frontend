import { apiService } from "./apiService";
import type {
  Area,
  CreateUserInput,
  Role,
  UpdateStatusInput,
  UpdateUserInput,
  User,
} from "@/types/user";
import type { ApiResponse } from "@/types/api";

export const usersService = {
  getAll: () => apiService.get<ApiResponse<User[]>>("/users"),

  getById: (id: string) => apiService.get<ApiResponse<User>>(`/users/${id}`),

  create: (data: CreateUserInput) =>
    apiService.post<ApiResponse<User>>("/users", data),

  update: (id: string, data: UpdateUserInput) =>
    apiService.patch<ApiResponse<User>>(`/users/${id}`, data),

  updateStatus: (id: string, data: UpdateStatusInput) =>
    apiService.patch<ApiResponse<User>>(`/users/${id}/status`, data),

  delete: (id: string) => apiService.delete(`/users/${id}`),

  getRoles: () => apiService.get<ApiResponse<Role[]>>("/users/roles"),

  getAreas: () => apiService.get<ApiResponse<Area[]>>("/users/areas"),
};
import { apiService } from "./apiService";
import type {
  Company,
  CreateCompanyInput,
  UpdateCompanyInput,
} from "@/types/company";
import type { ApiResponse } from "@/types/api";

export const companiesService = {
  getAll: () => apiService.get<ApiResponse<Company[]>>("/companies"),

  getById: (id: string) =>
    apiService.get<ApiResponse<Company>>(`/companies/${id}`),

  create: (data: CreateCompanyInput) =>
    apiService.post<ApiResponse<Company>>("/companies", data),

  update: (id: string, data: UpdateCompanyInput) =>
    apiService.patch<ApiResponse<Company>>(`/companies/${id}`, data),

  delete: (id: string) => apiService.delete(`/companies/${id}`),
};

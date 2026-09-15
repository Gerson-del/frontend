import { apiService } from "./apiService";
import type { ApiResponse } from "@/types/api";
import type {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
} from "@/app/(auth)/types/auth-form.types";

export const authService = {
  login: (data: LoginFormData) =>
    apiService.post<ApiResponse<unknown>>("/auth/login", data),

  register: (data: RegisterFormData) =>
    apiService.post<ApiResponse<unknown>>("/auth/register", data),

  forgotPassword: (data: ForgotPasswordFormData) =>
    apiService.post<ApiResponse<unknown>>("/auth/forgot-password", data),

  resetPassword: (data: ResetPasswordFormData) =>
    apiService.post<ApiResponse<unknown>>("/auth/reset-password", data),
};

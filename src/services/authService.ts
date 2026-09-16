import { supabase } from "@/lib/supabase";
import { apiService } from "./apiService";
import { ApiError } from "@/errors/errors";
import type { Me } from "@/types/auth";
import type { ApiResponse } from "@/types/api";
import type {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
} from "@/app/(auth)/types/auth-form.types";

function toApiError(message: string, status?: number): ApiError {
  return new ApiError(status ?? 400, message);
}

export const authService = {
  async login(data: LoginFormData) {
    const { data: result, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw toApiError(error.message, error.status);

    return result;
  },

  async register(data: RegisterFormData) {
    const { data: result, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          primer_nombre: data.primer_nombre,
          segundo_nombre: data.segundo_nombre,
          apellido_paterno: data.apellido_paterno,
          apellido_materno: data.apellido_materno,
        },
      },
    });

    if (error) throw toApiError(error.message, error.status);

    return result;
  },

  async forgotPassword(data: ForgotPasswordFormData) {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw toApiError(error.message, error.status);
  },

  async resetPassword(data: ResetPasswordFormData) {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) throw toApiError(error.message, error.status);
  },

  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw toApiError(error.message, error.status);
  },

  getMe: () => apiService.get<ApiResponse<Me>>("/auth/me"),
};

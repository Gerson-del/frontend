import { ApiError } from "@/errors/errors";
import { supabase } from "@/lib/supabase";

const API_URL = "http://localhost:4000/api";

async function getAccessToken(): Promise<string | undefined> {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token;
  } catch {
    return undefined;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.message || "Ocurrió un error inesperado",
    );
  }

  return data;
}

function buildHeaders(extra?: Record<string, string>) {
  return { "Content-Type": "application/json", ...extra };
}

async function authHeaders(): Promise<Record<string, string>> {
  const token = await getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const apiService = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: await authHeaders(),
    });
    return handleResponse<T>(response);
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: buildHeaders(await authHeaders()),
      body: JSON.stringify(data),
    });

    return handleResponse<T>(response);
  },

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PATCH",
      headers: buildHeaders(await authHeaders()),
      body: JSON.stringify(data),
    });

    return handleResponse<T>(response);
  },

  async delete(endpoint: string): Promise<void> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: await authHeaders(),
    });

    return handleResponse<void>(response);
  },
};
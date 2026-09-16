"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/layouts/AuthLayout";
import LoginForm from "../components/LoginForm";
import Text from "@/components/atoms/Text";
import { authService } from "@/services/authService";
import { supabase } from "@/lib/supabase";
import { ApiError } from "@/errors/errors";
import type { LoginFormData } from "../types/auth-form.types";

const initialData: LoginFormData = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState<LoginFormData>(initialData);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/dashboard");
      }
    });
  }, [router]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await authService.login(data);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "No se pudo iniciar sesión",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Iniciar sesión"
      subtitle="Ingresa tus credenciales para continuar"
      footer={
        <div className="flex flex-col gap-2">
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <span>
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Regístrate
            </Link>
          </span>
        </div>
      }
    >
      {error && (
        <Text variant="danger" size="sm" className="mb-4">
          {error}
        </Text>
      )}

      <LoginForm
        data={data}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </AuthLayout>
  );
}

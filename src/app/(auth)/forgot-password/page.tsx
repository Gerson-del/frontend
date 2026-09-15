"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/layouts/AuthLayout";
import ForgotPassword from "../components/ForgotPassword";
import Text from "@/components/atoms/Text";
import { authService } from "@/services/authService";
import { ApiError } from "@/errors/errors";
import type { ForgotPasswordFormData } from "../types/auth-form.types";

const initialData: ForgotPasswordFormData = {
  email: "",
};

export default function ForgotPasswordPage() {
  const [data, setData] = useState<ForgotPasswordFormData>(initialData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await authService.forgotPassword(data);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "No se pudo enviar el enlace",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Recuperar contraseña"
      subtitle="Te enviaremos un enlace a tu correo para restablecerla"
      footer={
        <Link href="/login" className="text-blue-600 hover:underline">
          Volver a iniciar sesión
        </Link>
      }
    >
      {error && (
        <Text variant="danger" size="sm" className="mb-4">
          {error}
        </Text>
      )}

      {success ? (
        <Text variant="success" size="sm">
          Si el correo existe, recibirás un enlace para restablecer tu
          contraseña en unos minutos.
        </Text>
      ) : (
        <ForgotPassword
          data={data}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </AuthLayout>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/layouts/AuthLayout";
import ResetPassword from "../components/ResetPassword";
import Text from "@/components/atoms/Text";
import { authService } from "@/services/authService";
import { ApiError } from "@/errors/errors";
import type { ResetPasswordFormData } from "../types/auth-form.types";

const initialData: ResetPasswordFormData = {
  password: "",
  confirmPassword: "",
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const [data, setData] = useState<ResetPasswordFormData>(initialData);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (data.password !== data.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setIsSubmitting(true);

    try {
      await authService.resetPassword(data);
      router.push("/login");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "No se pudo cambiar la contraseña",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Restablecer contraseña"
      subtitle="Ingresa tu nueva contraseña"
    >
      {error && (
        <Text variant="danger" size="sm" className="mb-4">
          {error}
        </Text>
      )}

      <ResetPassword
        data={data}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </AuthLayout>
  );
}

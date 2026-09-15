"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/layouts/AuthLayout";
import RegisterForm from "../components/RegisterForm";
import Text from "@/components/atoms/Text";
import { authService } from "@/services/authService";
import { ApiError } from "@/errors/errors";
import type { RegisterFormData } from "../types/auth-form.types";

const initialData: RegisterFormData = {
  email: "",
  password: "",
  confirmPassword: "",
  primer_nombre: "",
  segundo_nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  role_id: "",
  area_id: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const [data, setData] = useState<RegisterFormData>(initialData);
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
      await authService.register(data);
      router.push("/login");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "No se pudo completar el registro",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Completa tus datos para registrarte"
      footer={
        <span>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </span>
      }
    >
      {error && (
        <Text variant="danger" size="sm" className="mb-4">
          {error}
        </Text>
      )}

      <RegisterForm
        data={data}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </AuthLayout>
  );
}

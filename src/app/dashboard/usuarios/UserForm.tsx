"use client";

import { FormField } from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import { Area, Role, User, UserFormData } from "@/types/user";
import { useState } from "react";

interface UserFormProps {
  roles: Role[];
  areas: Area[];
  user?: User;
  onSubmit: (data: UserFormData) => void;
  onClose: () => void;
  isSubmitting: boolean;
}

export default function UserForm({
  roles,
  areas,
  user,
  onSubmit,
  onClose,
  isSubmitting,
}: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    primer_nombre: user?.primer_nombre ?? "",
    segundo_nombre: user?.segundo_nombre ?? "",
    apellido_paterno: user?.apellido_paterno ?? "",
    apellido_materno: user?.apellido_materno ?? "",
    email: "",
    password: "",
    role_id: user?.role_id ?? "",
    area_id: user?.area_id ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="py-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Primer nombre" name="primer_nombre">
            <Input
              type="text"
              name="primer_nombre"
              value={formData.primer_nombre}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField label="Segundo nombre" name="segundo_nombre">
            <Input
              type="text"
              name="segundo_nombre"
              value={formData.segundo_nombre}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Apellido paterno" name="apellido_paterno">
            <Input
              type="text"
              name="apellido_paterno"
              value={formData.apellido_paterno}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField label="Apellido materno" name="apellido_materno">
            <Input
              type="text"
              name="apellido_materno"
              value={formData.apellido_materno}
              onChange={handleChange}
            />
          </FormField>
        </div>

        {!user && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Correo" name="email">
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormField>

            <FormField label="Contraseña" name="password">
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </FormField>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Rol" name="role_id">
            <Select
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
            >
              <option value="">Selecciona un rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Área" name="area_id">
            <Select
              name="area_id"
              value={formData.area_id}
              onChange={handleChange}
            >
              <option value="">Selecciona un área</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </Select>
          </FormField>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2 md:flex-row md:justify-between">
        <Button type="submit" disabled={isSubmitting}>
          {user ? "Guardar cambios" : "Crear usuario"}
        </Button>

        <Button type="button" variant="danger" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
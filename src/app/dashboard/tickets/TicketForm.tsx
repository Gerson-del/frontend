"use client";

import { FormField } from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import TextArea from "@/components/atoms/TextArea";
import Button from "@/components/atoms/Button";
import { Area } from "@/types/user";
import { Category, TicketFormData } from "@/types/ticket";
import { useState } from "react";

interface TicketFormProps {
  categories: Category[];
  areas: Area[];
  onSubmit: (data: TicketFormData) => void;
  onClose: () => void;
  isSubmitting: boolean;
}

export default function TicketForm({
  categories,
  areas,
  onSubmit,
  onClose,
  isSubmitting,
}: TicketFormProps) {
  const [formData, setFormData] = useState<TicketFormData>({
    area_id: "",
    category_id: "",
    title: "",
    description: "",
    priority: "media",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <FormField label="Asunto del ticket" name="title">
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormField>
          </div>

          <div className="flex-1">
            <FormField label="Área" name="area_id">
              <Select
                name="area_id"
                value={formData.area_id}
                onChange={handleChange}
              >
                <option value="">Selecciona un área</option>
                {areas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>

          <div className="flex-1">
            <FormField label="Categoría" name="category_id">
              <Select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>

          <div className="flex-1">
            <FormField label="Prioridad" name="priority">
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </Select>
            </FormField>
          </div>
        </div>

        <FormField label="Descripción" name="description">
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormField>

        <Button type="button" variant="secondary" disabled>
          Adjuntar evidencia
        </Button>
      </div>

      <div className="flex flex-row justify-between gap-2 p-2">
        <Button type="button" variant="danger" onClick={onClose}>
          Cancelar
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          Enviar ticket
        </Button>
      </div>
    </form>
  );
}

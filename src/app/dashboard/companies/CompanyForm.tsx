"use client";

import { FormField } from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import { CompanyFormData } from "@/types/company";
import { useState } from "react";
import Button from "@/components/atoms/Button";

interface CompanyFormProps {
  initialData?: CompanyFormData;
  onSubmit: (formData: CompanyFormData) => void;
  onClose: () => void;
  isSubmitting: boolean;
}

export default function CompanyForm({
  initialData,
  onSubmit,
  onClose,
  isSubmitting,
}: CompanyFormProps) {
  const [formData, setFormData] = useState<CompanyFormData>(
    initialData ?? {
      name: "",
      website: "",
      industry: "",
      description: "",
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <FormField label="Nombre" name="name">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Website" name="website">
          <Input
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Industry" name="industry">
          <Input
            name="industry"
            value={formData.industry}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Description" name="description">
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormField>
      </div>

      <div className="flex flex-col gap-2 p-2 md:flex-row md:justify-between">
        <Button type="submit" disabled={isSubmitting}>
          Guardar
        </Button>

        <Button type="button" variant="danger" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

import { useState } from "react";
import {
  Company,
  CreateCompanyInput,
  UpdateCompanyInput,
} from "@/types/company";
import { companiesService } from "@/services/companiesService";

export function useCompanies(initialCompanies: Company[]) {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createCompany = async (data: CreateCompanyInput) => {
    try {
      setIsSubmitting(true);

      const response = await companiesService.create(data);

      setCompanies((prev) => [...prev, response.data]);

      return response.data;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateCompany = async (id: string, data: UpdateCompanyInput) => {
    try {
      setIsSubmitting(true);

      const response = await companiesService.update(id, data);

      setCompanies((prev) =>
        prev.map((company) => (company.id === id ? response.data : company)),
      );

      return response.data;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCompany = async (id: string) => {
    try {
      setIsSubmitting(true);

      await companiesService.delete(id);

      setCompanies((prev) => prev.filter((company) => company.id !== id));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    companies,
    isSubmitting,
    createCompany,
    updateCompany,
    deleteCompany,
  };
}

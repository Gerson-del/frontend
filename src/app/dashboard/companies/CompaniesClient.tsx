"use client";

import Button from "@/components/atoms/Button";
import DataTable from "@/components/organisms/DataTable";
import Spinner from "@/components/atoms/Spinner";
import CompanyForm from "./CompanyForm";
import { Building } from "lucide-react";
import { ApiError } from "@/errors/errors";
import { useCompanies } from "./useCompanies";
import Text from "@/components/atoms/Text";
import { Plus } from "lucide-react";
import {
  Company,
  CreateCompanyInput,
  UpdateCompanyInput,
} from "@/types/company";

import Modal from "@/components/organisms/Modal";

import { useState } from "react";
import getCompanyColumns from "./CompanyColumns";
interface CompanyClientProps {
  initialCompanies: Company[];
}

export default function CompaniesClient({
  initialCompanies,
}: CompanyClientProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const {
    companies,
    createCompany,
    deleteCompany,
    isSubmitting,
    updateCompany,
  } = useCompanies(initialCompanies);

  const handleCreate = async (data: CreateCompanyInput) => {
    try {
      await createCompany(data);
      setIsCreateModalOpen(false);
      // Aqui pondremos un toast
    } catch (error) {
      console.error(error);
      if (error instanceof ApiError) {
        alert(error.message);
        return;
      }

      alert("Ocurrió un error inesperado");
      // Aqui pondremos un toast
    }
  };

  const handleUpdate = async (id: string, data: UpdateCompanyInput) => {
    try {
      await updateCompany(id, data);

      setSelectedCompany(null);
      alert(`Compañía ${data.name} editada con éxito`);
    } catch (error) {
      console.error(error);

      if (error instanceof ApiError) {
        alert(error.message);
        return;
      }

      alert("Ocurrió un error inesperado");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que quieres eliminar esta compañía?",
    );

    if (!confirmed) return;

    try {
      await deleteCompany(id);

      alert("Compañía eliminada correctamente");
    } catch (error) {
      console.error(error);

      if (error instanceof ApiError) {
        alert(error.message);
        return;
      }

      alert("Ocurrió un error inesperado");
    }
  };

  return (
    <main>
      <div className=" p-4">
        <div className="flex flex-col p-2  mb-6">
          <div className="flex md:justify-between items-center  md:flex-row flex-col gap-2 p-2">
            <div className="flex gap-2 items-center">
              <Building></Building>
              <Text variant="primary" size="2xl" weight="bold">
                Compañias
              </Text>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsCreateModalOpen(true)}
              icon={<Plus />}
            >
              Nueva compañia
            </Button>
          </div>

          <Text variant="primary" size="sm" weight="normal">
            Administra las compañias a las que has aplicado
          </Text>
        </div>

        <DataTable
          size="lg"
          variant="colored"
          data={companies}
          columns={getCompanyColumns({
            setSelectedCompany,
            onDelete: handleDelete,
            openMenuId,
            setOpenMenuId,
          })}
          getRowKey={(company) => company.id}
        />
      </div>

      {selectedCompany && (
        <Modal
          title={`editar ${selectedCompany.name}`}
          onClose={() => {
            setSelectedCompany(null);
          }}
        >
          <CompanyForm
            initialData={{
              name: selectedCompany.name,
              website: selectedCompany.website ?? "",
              industry: selectedCompany.industry ?? "",
              description: selectedCompany.description ?? "",
            }}
            onSubmit={(data) => handleUpdate(selectedCompany.id, data)}
            onClose={() => {
              setSelectedCompany(null);
            }}
            isSubmitting={isSubmitting}
          />

          {isSubmitting && (
            <div className="flex p-2 justify-center items-center ">
              <Spinner size="md" text="Cargando..." />
            </div>
          )}
        </Modal>
      )}

      {isCreateModalOpen && (
        <Modal
          title={`Crear nueva compañia`}
          onClose={() => {
            setIsCreateModalOpen(false);
          }}
        >
          <CompanyForm
            onSubmit={handleCreate}
            onClose={() => setIsCreateModalOpen(false)}
            isSubmitting={isSubmitting}
          />
          {isSubmitting && (
            <div className="flex  p-2 justify-center items-center">
              <Spinner size="md" text="Cargando..." />
            </div>
          )}
        </Modal>
      )}
    </main>
  );
}

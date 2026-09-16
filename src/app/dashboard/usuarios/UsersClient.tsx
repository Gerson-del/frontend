"use client";

import Button from "@/components/atoms/Button";
import DataTable from "@/components/organisms/DataTable";
import Spinner from "@/components/atoms/Spinner";
import Modal from "@/components/organisms/Modal";
import Text from "@/components/atoms/Text";
import UserForm from "./UserForm";
import getUsersColumns from "./UsersColumns";
import { useUsers } from "./useUsers";
import { ApiError } from "@/errors/errors";
import { User, UserFormData } from "@/types/user";
import { Users, Plus } from "lucide-react";
import { useState } from "react";

export default function UsersClient() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const {
    users,
    roles,
    areas,
    isLoading,
    isSubmitting,
    error,
    createUser,
    updateUser,
    changeStatus,
  } = useUsers();

  const showError = (error: unknown) => {
    if (error instanceof ApiError) {
      alert(error.message);
      return;
    }

    alert("Ocurrió un error inesperado");
  };

  const handleCreate = async (data: UserFormData) => {
    try {
      await createUser({
        primer_nombre: data.primer_nombre,
        segundo_nombre: data.segundo_nombre || undefined,
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno || undefined,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
        area_id: data.area_id,
      });
      setIsCreateModalOpen(false);
    } catch (error) {
      showError(error);
    }
  };

  const handleUpdate = async (data: UserFormData) => {
    if (!selectedUser) return;

    try {
      await updateUser(selectedUser.id, {
        primer_nombre: data.primer_nombre,
        segundo_nombre: data.segundo_nombre || undefined,
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno || undefined,
        role_id: data.role_id,
        area_id: data.area_id,
      });
      setSelectedUser(null);
    } catch (error) {
      showError(error);
    }
  };

  const handleToggleStatus = async (user: User) => {
    const newStatus = user.status === "activo" ? "inactivo" : "activo";
    const action = newStatus === "activo" ? "dar de alta" : "dar de baja";
    const confirmed = window.confirm(
      `¿Seguro que quieres ${action} a ${user.primer_nombre} ${user.apellido_paterno}? El historial de trabajo se conserva.`,
    );

    if (!confirmed) return;

    try {
      await changeStatus(user.id, newStatus);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <main>
      <div className="p-4">
        <div className="mb-6 flex flex-col gap-2 p-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Users />
            <Text variant="primary" size="2xl" weight="bold">
              Usuarios
            </Text>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsCreateModalOpen(true)}
            icon={<Plus />}
          >
            Nuevo usuario
          </Button>
        </div>

        <Text variant="primary" size="sm" weight="normal">
          Administra usuarios, roles y áreas del sistema
        </Text>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Spinner size="md" text="Cargando usuarios..." />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-8">
          <Text variant="danger" size="sm" weight="medium">
            {error}
          </Text>
        </div>
      ) : (
        <DataTable
          size="lg"
          variant="colored"
          data={users}
          columns={getUsersColumns({
            onEdit: setSelectedUser,
            onToggleStatus: handleToggleStatus,
            openMenuId,
            setOpenMenuId,
          })}
          getRowKey={(user) => user.id}
        />
      )}

      {selectedUser && (
        <Modal
          title={`Editar ${selectedUser.primer_nombre} ${selectedUser.apellido_paterno}`}
          onClose={() => setSelectedUser(null)}
        >
          <UserForm
            roles={roles}
            areas={areas}
            user={selectedUser}
            onSubmit={handleUpdate}
            onClose={() => setSelectedUser(null)}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}

      {isCreateModalOpen && (
        <Modal title="Crear nuevo usuario" onClose={() => setIsCreateModalOpen(false)}>
          <UserForm
            roles={roles}
            areas={areas}
            onSubmit={handleCreate}
            onClose={() => setIsCreateModalOpen(false)}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}
    </main>
  );
}
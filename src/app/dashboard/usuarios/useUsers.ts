import { useEffect, useState } from "react";
import {
  Area,
  CreateUserInput,
  Role,
  UpdateUserInput,
  User,
  UserStatus,
} from "@/types/user";
import { usersService } from "@/services/usersService";
import { ApiError } from "@/errors/errors";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const [usersResponse, rolesResponse, areasResponse] =
          await Promise.all([
            usersService.getAll(),
            usersService.getRoles(),
            usersService.getAreas(),
          ]);

        if (cancelled) return;

        setUsers(usersResponse.data);
        setRoles(rolesResponse.data);
        setAreas(areasResponse.data);
        setError(null);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof ApiError ? err.message : "Ocurrió un error inesperado",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  const createUser = async (data: CreateUserInput) => {
    try {
      setIsSubmitting(true);
      const response = await usersService.create(data);
      setUsers((prev) => [...prev, response.data]);
      return response.data;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateUser = async (id: string, data: UpdateUserInput) => {
    try {
      setIsSubmitting(true);
      const response = await usersService.update(id, data);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? response.data : user)),
      );
      return response.data;
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeStatus = async (id: string, status: UserStatus) => {
    try {
      setIsSubmitting(true);
      const response = await usersService.updateStatus(id, { status });
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? response.data : user)),
      );
      return response.data;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    users,
    roles,
    areas,
    isLoading,
    isSubmitting,
    error,
    createUser,
    updateUser,
    changeStatus,
  };
}
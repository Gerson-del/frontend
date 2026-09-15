import { RegisterFormProps } from "../types/auth-form.types";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";

export default function RegisterForm({
  data,
  onChange,
  onSubmit,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <FormField label="Correo" name="email">
        <Input
          type="email"
          name="email"
          value={data.email}
          onChange={onChange}
        />
      </FormField>

      <FormField label="Contraseña" name="password">
        <Input
          type="password"
          name="password"
          value={data.password}
          onChange={onChange}
        />
      </FormField>

      <FormField label="Confirmar contraseña" name="confirmPassword">
        <Input
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={onChange}
        />
      </FormField>

      <FormField label="Primer nombre" name="primer_nombre">
        <Input
          type="text"
          name="primer_nombre"
          value={data.primer_nombre}
          onChange={onChange}
        />
      </FormField>

      <FormField label="Segundo nombre" name="segundo_nombre">
        <Input
          type="text"
          name="segundo_nombre"
          value={data.segundo_nombre ?? ""}
          onChange={onChange}
        />
      </FormField>

      <FormField label="Apellido paterno" name="apellido_paterno">
        <Input
          type="text"
          name="apellido_paterno"
          value={data.apellido_paterno}
          onChange={onChange}
        />
      </FormField>

      <FormField label="Apellido materno" name="apellido_materno">
        <Input
          type="text"
          name="apellido_materno"
          value={data.apellido_materno ?? ""}
          onChange={onChange}
        />
      </FormField>

      <FormField label="Área" name="area_id">
        <Input
          type="text"
          name="area_id"
          value={data.area_id}
          onChange={onChange}
        />
      </FormField>

      <FormField label="Rol" name="role_id">
        <Input
          type="text"
          name="role_id"
          value={data.role_id}
          onChange={onChange}
        />
      </FormField>

      <Button variant="primary" type="submit">
        Registrarse
      </Button>
    </form>
  );
}

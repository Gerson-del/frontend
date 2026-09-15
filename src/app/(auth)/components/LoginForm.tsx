import { LoginFormProps } from "../types/auth-form.types";
import { FormField } from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

export default function LoginForm({
  data,
  onChange,
  onSubmit,
  isSubmitting,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}

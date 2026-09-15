import { ResetPasswordProps } from "../types/auth-form.types";
import { FormField } from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

export default function ResetPassword({
  data,
  onChange,
  onSubmit,
  isSubmitting,
}: ResetPasswordProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField label="Contraseña" name="password">
        <Input
          type="password"
          name="password"
          value={data.password}
          onChange={onChange}
        />
      </FormField>

      <FormField label="Confirma contraseña" name="confirmPassword">
        <Input
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={onChange}
        />
      </FormField>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Guardando..." : "Cambiar contraseña"}
      </Button>
    </form>
  );
}

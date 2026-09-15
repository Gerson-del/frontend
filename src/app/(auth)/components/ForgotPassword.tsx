import { ForgotPasswordProps } from "../types/auth-form.types";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";

export default function ForgotPassword({
  data,
  onChange,
  onSubmit,
  isSubmitting,
}: ForgotPasswordProps) {
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

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar enlace"}
      </Button>
    </form>
  );
}

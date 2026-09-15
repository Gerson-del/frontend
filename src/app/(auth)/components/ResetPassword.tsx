import { ResetPasswordProps } from "../types/auth-form.types";
import { FormField } from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

export default function ResetPassword({
  data,
  onChange,
  onSubmit,
}: ResetPasswordProps) {
  return (
    <div>
      <FormField label="Contraseña" name="password">
        <Input
          type="password"
          name="password"
          value={data.password}
          onChange={onChange}
        />
      </FormField>

      <FormField label="Confirma contraseña" name="password">
        <Input
          type="password"
          name="password"
          value={data.confirmPassword}
          onChange={onChange}
        />
      </FormField>
    </div>
  );
}

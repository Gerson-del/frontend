import { LoginFormProps } from "../types/auth-form.types";
import { FormField } from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";

export default function LoginForm({
  data,
  onChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <div>
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
    </div>
  );
}

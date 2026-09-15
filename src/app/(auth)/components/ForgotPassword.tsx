import { ForgotPasswordProps } from "../types/auth-form.types";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";

export default function ForgotPassword({
  data,
  onChange,
}: ForgotPasswordProps) {
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
    </div>
  );
}

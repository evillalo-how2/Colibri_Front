import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../shared/components/ui/Button";
import { FormError } from "../../../shared/components/ui/FormError";
import { Input } from "../../../shared/components/ui/Input";
import {
  type UserPasswordFormValues,
  userPasswordSchema,
} from "../schemas/userPassword.schema";
import type { User } from "../types/user.types";

type ChangeUserPasswordModalProps = {
  isOpen: boolean;
  user: User | null;
  isSubmitting: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onSubmit: (values: UserPasswordFormValues) => Promise<void>;
};

export function ChangeUserPasswordModal({
  isOpen,
  user,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit,
}: ChangeUserPasswordModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserPasswordFormValues>({
    resolver: zodResolver(userPasswordSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        new_password: "",
        confirm_password: "",
      });
    }
  }, [isOpen, reset]);

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    reset();
    onClose();
  }

  async function handleChangePassword(values: UserPasswordFormValues) {
    await onSubmit(values);
  }

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f1f]/30 px-4 py-8 backdrop-blur-sm">
      <section className="w-full max-w-xl rounded-[2rem] border border-white/80 bg-white/95 p-8 shadow-2xl shadow-[#afc4c0]/30">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
            Seguridad
          </p>
          <h2 className="mt-3 text-3xl font-light text-[#1f1f1f]">
            Cambiar contraseña
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#7a8588]">
            Establece una nueva contraseña para {user.full_name}. Las sesiones
            activas de este usuario serán revocadas.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(handleChangePassword)}>
          <Input
            id="admin_new_password"
            label="Nueva contraseña"
            type="password"
            placeholder="NuevaClaveSegura123!"
            autoComplete="new-password"
            error={errors.new_password?.message}
            {...register("new_password")}
          />

          <Input
            id="admin_confirm_password"
            label="Confirmar contraseña"
            type="password"
            placeholder="Repite la contraseña"
            autoComplete="new-password"
            error={errors.confirm_password?.message}
            {...register("confirm_password")}
          />

          <div className="rounded-2xl border border-[#d6e2e0] bg-[#f5f7f6] px-4 py-3 text-sm leading-6 text-[#7a8588]">
            Usa mínimo 12 caracteres, una mayúscula, una minúscula, un número y
            un símbolo. No uses espacios.
          </div>

          <FormError message={errorMessage} />

          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>

            <Button type="submit" isLoading={isSubmitting}>
              Guardar contraseña
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
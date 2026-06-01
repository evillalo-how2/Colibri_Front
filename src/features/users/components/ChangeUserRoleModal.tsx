import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../shared/components/ui/Button";
import { FormError } from "../../../shared/components/ui/FormError";
import {
  type ChangeUserRoleFormValues,
  changeUserRoleSchema,
} from "../schemas/user.schema";
import type { User } from "../types/user.types";
import { UserRoleBadge } from "./UserRoleBadge";

type ChangeUserRoleModalProps = {
  isOpen: boolean;
  user: User | null;
  isSubmitting: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onSubmit: (values: ChangeUserRoleFormValues) => Promise<void>;
};

const selectClassName =
  "w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] focus:ring-4 focus:ring-[#afc4c0]/20";

export function ChangeUserRoleModal({
  isOpen,
  user,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit,
}: ChangeUserRoleModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeUserRoleFormValues>({
    resolver: zodResolver(changeUserRoleSchema),
    defaultValues: {
      user_type: "client",
    },
  });

  useEffect(() => {
    if (!user || !isOpen) {
      return;
    }

    reset({
      user_type: user.user_type,
    });
  }, [user, isOpen, reset]);

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    reset();
    onClose();
  }

  async function handleChangeRole(values: ChangeUserRoleFormValues) {
    await onSubmit(values);
  }

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f1f]/30 px-4 py-8 backdrop-blur-sm">
      <section className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white/95 p-8 shadow-2xl shadow-[#afc4c0]/30">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
            Rol de acceso
          </p>
          <h2 className="mt-3 text-3xl font-light text-[#1f1f1f]">
            Cambiar rol
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#7a8588]">
            Modifica el tipo de acceso de este usuario. Esta acción está
            separada de la edición básica por seguridad.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-[#d6e2e0] bg-[#f5f7f6] px-4 py-4">
          <p className="text-sm font-medium text-[#4b4b4b]">
            {user.full_name}
          </p>
          <p className="mt-1 text-xs text-[#7a8588]">{user.email}</p>

          <div className="mt-3">
            <UserRoleBadge role={user.user_type} />
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(handleChangeRole)}>
          <div>
            <label
              htmlFor="change_user_type"
              className="mb-2 block text-sm text-[#4b4b4b]"
            >
              Nuevo rol
            </label>

            <select
              id="change_user_type"
              className={selectClassName}
              {...register("user_type")}
            >
              <option value="admin">Administración</option>
              <option value="psychologist">Psicóloga</option>
              <option value="assistant">Asistente</option>
              <option value="client">Cliente</option>
            </select>

            {errors.user_type?.message ? (
              <p className="mt-2 text-sm text-[#e98ba3]">
                {errors.user_type.message}
              </p>
            ) : null}
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
              Guardar rol
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
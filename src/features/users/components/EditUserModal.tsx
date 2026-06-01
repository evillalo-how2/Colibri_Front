import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../shared/components/ui/Button";
import { FormError } from "../../../shared/components/ui/FormError";
import { Input } from "../../../shared/components/ui/Input";
import {
  type UpdateUserFormValues,
  updateUserSchema,
} from "../schemas/user.schema";
import type { User } from "../types/user.types";

type EditUserModalProps = {
  isOpen: boolean;
  user: User | null;
  isSubmitting: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onSubmit: (values: UpdateUserFormValues) => Promise<void>;
};

export function EditUserModal({
  isOpen,
  user,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit,
}: EditUserModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: "",
      full_name: "",
    },
  });

  useEffect(() => {
    if (!user || !isOpen) {
      return;
    }

    reset({
      email: user.email,
      full_name: user.full_name,
    });
  }, [user, isOpen, reset]);

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    reset();
    onClose();
  }

  async function handleUpdateUser(values: UpdateUserFormValues) {
    await onSubmit(values);
  }

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f1f]/30 px-4 py-8 backdrop-blur-sm">
      <section className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white/95 p-8 shadow-2xl shadow-[#afc4c0]/30">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
            Editar acceso
          </p>
          <h2 className="mt-3 text-3xl font-light text-[#1f1f1f]">
            Editar usuario
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#7a8588]">
            Actualiza los datos básicos de la cuenta. El rol y el estado se
            gestionarán en acciones separadas.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(handleUpdateUser)}>
          <Input
            id="edit_full_name"
            label="Nombre completo"
            type="text"
            placeholder="Karen Chico"
            autoComplete="name"
            error={errors.full_name?.message}
            {...register("full_name")}
          />

          <Input
            id="edit_email"
            label="Email"
            type="email"
            placeholder="usuario@psicomichi.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="rounded-2xl border border-[#d6e2e0] bg-[#f5f7f6] px-4 py-3 text-sm leading-6 text-[#7a8588]">
            <strong className="text-[#4b4b4b]">Rol actual:</strong>{" "}
            {user.user_type}
            <br />
            <strong className="text-[#4b4b4b]">Estado actual:</strong>{" "}
            {user.is_active ? "Activo" : "Inactivo"}
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
              Guardar cambios
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
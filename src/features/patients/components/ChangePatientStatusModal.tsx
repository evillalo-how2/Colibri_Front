import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../shared/components/ui/Button";
import { FormError } from "../../../shared/components/ui/FormError";
import {
  type UpdatePatientStatusFormValues,
  updatePatientStatusSchema,
} from "../schemas/patient.schema";
import type { Patient } from "../types/patient.types";
import { PatientStatusBadge } from "./PatientStatusBadge";

type ChangePatientStatusModalProps = {
  isOpen: boolean;
  patient: Patient | null;
  isSubmitting: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onSubmit: (values: UpdatePatientStatusFormValues) => Promise<void>;
};

const selectClassName =
  "w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] focus:ring-4 focus:ring-[#afc4c0]/20";

const textareaClassName =
  "min-h-28 w-full resize-y rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition placeholder:text-[#a8b2b4] focus:border-[#afc4c0] focus:ring-4 focus:ring-[#afc4c0]/20";

export function ChangePatientStatusModal({
  isOpen,
  patient,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit,
}: ChangePatientStatusModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePatientStatusFormValues>({
    resolver: zodResolver(updatePatientStatusSchema),
    defaultValues: {
      status: "new",
      status_note: "",
    },
  });

  useEffect(() => {
    if (!isOpen || !patient) {
      return;
    }

    reset({
      status: patient.status,
      status_note: "",
    });
  }, [isOpen, patient, reset]);

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    reset();
    onClose();
  }

  async function handleChangeStatus(values: UpdatePatientStatusFormValues) {
    await onSubmit(values);
  }

  if (!isOpen || !patient) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f1f]/30 px-4 py-8 backdrop-blur-sm">
      <section className="w-full max-w-xl rounded-[2rem] border border-white/80 bg-white/95 p-8 shadow-2xl shadow-[#afc4c0]/30">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
            Seguimiento
          </p>

          <h2 className="mt-3 text-3xl font-light text-[#1f1f1f]">
            Cambiar estado
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#7a8588]">
            Actualiza el estado administrativo del paciente y registra una nota
            breve del motivo del cambio.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-[#d6e2e0] bg-[#f5f7f6] px-4 py-4">
          <p className="text-sm font-medium text-[#4b4b4b]">
            {patient.full_name}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-xs text-[#7a8588]">Estado actual:</span>
            <PatientStatusBadge status={patient.status} />
          </div>

          {patient.status_note ? (
            <p className="mt-3 text-xs leading-5 text-[#7a8588]">
              Última nota: {patient.status_note}
            </p>
          ) : null}
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(handleChangeStatus)}>
          <div>
            <label
              htmlFor="change_patient_status"
              className="mb-2 block text-sm text-[#4b4b4b]"
            >
              Nuevo estado
            </label>

            <select
              id="change_patient_status"
              className={selectClassName}
              {...register("status")}
            >
              <option value="new">Nuevo</option>
              <option value="contacted">Contactado</option>
              <option value="active">Activo</option>
              <option value="follow_up">Seguimiento</option>
              <option value="inactive">Inactivo</option>
            </select>

            {errors.status?.message ? (
              <p className="mt-2 text-sm text-[#e98ba3]">
                {errors.status.message}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="change_patient_status_note"
              className="mb-2 block text-sm text-[#4b4b4b]"
            >
              Motivo del cambio
            </label>

            <textarea
              id="change_patient_status_note"
              placeholder="Ej. Se le dio seguimiento por WhatsApp y pidió agendar cita."
              className={textareaClassName}
              {...register("status_note")}
            />

            {errors.status_note?.message ? (
              <p className="mt-2 text-sm text-[#e98ba3]">
                {errors.status_note.message}
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
              Guardar estado
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
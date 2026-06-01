import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "../../../shared/components/ui/Button";
import { DatePicker } from "../../../shared/components/ui/DatePicker";
import { FormError } from "../../../shared/components/ui/FormError";
import { Input } from "../../../shared/components/ui/Input";
import {
  type CreatePatientFormValues,
  createPatientSchema,
} from "../schemas/patient.schema";

type CreatePatientModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onSubmit: (values: CreatePatientFormValues) => Promise<void>;
};

const selectClassName =
  "w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] focus:ring-4 focus:ring-[#afc4c0]/20";

const textareaClassName =
  "min-h-28 w-full resize-y rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition placeholder:text-[#a8b2b4] focus:border-[#afc4c0] focus:ring-4 focus:ring-[#afc4c0]/20";

export function CreatePatientModal({
  isOpen,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit,
}: CreatePatientModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreatePatientFormValues>({
    resolver: zodResolver(createPatientSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      birth_date: "",
      gender: "",
      preferred_modality: "unspecified",
      source: "",
      initial_reason: "",
      internal_notes: "",
    },
  });

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    reset();
    onClose();
  }

  async function handleCreatePatient(values: CreatePatientFormValues) {
    await onSubmit(values);
    reset();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f1f]/30 px-4 py-8 backdrop-blur-sm">
      <section className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white/95 shadow-2xl shadow-[#afc4c0]/30">
        <div className="px-8 pb-4 pt-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
            Nuevo registro
          </p>

          <h2 className="mt-3 text-3xl font-light text-[#1f1f1f]">
            Registrar paciente
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#7a8588]">
            Captura datos administrativos, motivo inicial y notas internas
            simples. El nombre y al menos un medio de contacto son obligatorios.
          </p>
        </div>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleSubmit(handleCreatePatient)}
        >
          <div className="min-h-0 flex-1 space-y-8 overflow-y-auto px-8 py-4">
            <section className="space-y-5">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#9fb8b4]">
                  Datos generales
                </p>

                <h3 className="mt-2 text-2xl font-light text-[#1f1f1f]">
                  Información del paciente
                </h3>
              </div>

              <Input
                id="patient_full_name"
                label="Nombre completo"
                type="text"
                placeholder="Monserrat Pérez"
                autoComplete="name"
                error={errors.full_name?.message}
                {...register("full_name")}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  id="patient_email"
                  label="Email"
                  type="email"
                  placeholder="paciente@example.com"
                  autoComplete="email"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <Input
                  id="patient_phone"
                  label="Teléfono"
                  type="tel"
                  placeholder="6141234567"
                  autoComplete="tel"
                  error={errors.phone?.message}
                  {...register("phone")}
                />

                <Controller
                  control={control}
                  name="birth_date"
                  render={({ field }) => (
                    <DatePicker
                      id="patient_birth_date"
                      label="Fecha de nacimiento"
                      value={field.value ?? ""}
                      error={errors.birth_date?.message}
                      onChange={field.onChange}
                    />
                  )}
                />

                <div>
                  <label
                    htmlFor="patient_gender"
                    className="mb-2 block text-sm text-[#4b4b4b]"
                  >
                    Género
                  </label>

                  <select
                    id="patient_gender"
                    className={selectClassName}
                    {...register("gender", {
                      setValueAs: (value) => (value === "" ? null : value),
                    })}
                  >
                    <option value="">Sin definir</option>
                    <option value="male">Hombre</option>
                    <option value="female">Mujer</option>
                    <option value="non_binary">No binario</option>
                  </select>

                  {errors.gender?.message ? (
                    <p className="mt-2 text-sm text-[#e98ba3]">
                      {errors.gender.message}
                    </p>
                  ) : null}
                </div>
              </div>
            </section>

            <section className="space-y-5 rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6]/70 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#9fb8b4]">
                  Gestión
                </p>

                <h3 className="mt-2 text-2xl font-light text-[#1f1f1f]">
                  Canal de atención
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="patient_preferred_modality"
                    className="mb-2 block text-sm text-[#4b4b4b]"
                  >
                    Modalidad preferida
                  </label>

                  <select
                    id="patient_preferred_modality"
                    className={selectClassName}
                    {...register("preferred_modality")}
                  >
                    <option value="unspecified">Sin definir</option>
                    <option value="online">Online</option>
                    <option value="in_person">Presencial</option>
                    <option value="hybrid">Híbrida</option>
                  </select>

                  {errors.preferred_modality?.message ? (
                    <p className="mt-2 text-sm text-[#e98ba3]">
                      {errors.preferred_modality.message}
                    </p>
                  ) : null}
                </div>

                <Input
                  id="patient_source"
                  label="Origen"
                  type="text"
                  placeholder="Instagram, WhatsApp, referido..."
                  error={errors.source?.message}
                  {...register("source")}
                />
              </div>
            </section>

            <section className="space-y-5 rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6]/70 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#9fb8b4]">
                  Seguimiento inicial
                </p>

                <h3 className="mt-2 text-2xl font-light text-[#1f1f1f]">
                  Motivo y notas internas
                </h3>
              </div>

              <div>
                <label
                  htmlFor="patient_initial_reason"
                  className="mb-2 block text-sm text-[#4b4b4b]"
                >
                  Motivo inicial
                </label>

                <textarea
                  id="patient_initial_reason"
                  className={textareaClassName}
                  placeholder="Describe brevemente el motivo inicial de contacto..."
                  {...register("initial_reason")}
                />

                {errors.initial_reason?.message ? (
                  <p className="mt-2 text-sm text-[#e98ba3]">
                    {errors.initial_reason.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="patient_internal_notes"
                  className="mb-2 block text-sm text-[#4b4b4b]"
                >
                  Notas internas
                </label>

                <textarea
                  id="patient_internal_notes"
                  className={textareaClassName}
                  placeholder="Notas administrativas o contexto relevante..."
                  {...register("internal_notes")}
                />

                {errors.internal_notes?.message ? (
                  <p className="mt-2 text-sm text-[#e98ba3]">
                    {errors.internal_notes.message}
                  </p>
                ) : null}
              </div>
            </section>
          </div>

          <div className="border-t border-[#d6e2e0] bg-white/95 px-8 pb-8 pt-4">
            <FormError message={errorMessage} />

            <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Registrar paciente"}
              </Button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
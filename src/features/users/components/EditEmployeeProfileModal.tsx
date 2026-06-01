import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../shared/components/ui/Button";
import { FormError } from "../../../shared/components/ui/FormError";
import { Input } from "../../../shared/components/ui/Input";
import {
  type EmployeeProfileFormValues,
  employeeProfileSchema,
} from "../schemas/employeeProfile.schema";
import type { EmployeeProfile, User } from "../types/user.types";

type EditEmployeeProfileModalProps = {
  isOpen: boolean;
  user: User | null;
  profile: EmployeeProfile | null;
  isLoadingProfile: boolean;
  isSubmitting: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onSubmit: (values: EmployeeProfileFormValues) => Promise<void>;
};

const selectClassName =
  "w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] focus:ring-4 focus:ring-[#afc4c0]/20";

const textareaClassName =
  "min-h-28 w-full resize-y rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition placeholder:text-[#a8b2b4] focus:border-[#afc4c0] focus:ring-4 focus:ring-[#afc4c0]/20";

const defaultValues: EmployeeProfileFormValues = {
  legal_name: "",
  preferred_name: "",
  birth_date: "",
  gender: "",

  phone: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",

  address_line: "",
  neighborhood: "",
  city: "",
  state: "",
  zip_code: "",
  country: "México",

  job_title: "",
  department: "",
  employment_type: null,
  hire_date: "",
  termination_date: "",
  work_schedule: "",
  notes: "",

  curp: "",
  rfc: "",
  nss: "",
  professional_license: "",

  ine_document_note: "",
  curp_document_note: "",
  rfc_document_note: "",
  nss_document_note: "",
  proof_of_address_note: "",
  professional_license_note: "",
  contract_document_note: "",
  documents_notes: "",
};

function profileToFormValues(
  profile: EmployeeProfile | null,
): EmployeeProfileFormValues {
  if (!profile) {
    return defaultValues;
  }

  return {
    legal_name: profile.legal_name ?? "",
    preferred_name: profile.preferred_name ?? "",
    birth_date: profile.birth_date ?? "",
    gender: profile.gender ?? "",

    phone: profile.phone ?? "",
    emergency_contact_name: profile.emergency_contact_name ?? "",
    emergency_contact_phone: profile.emergency_contact_phone ?? "",

    address_line: profile.address_line ?? "",
    neighborhood: profile.neighborhood ?? "",
    city: profile.city ?? "",
    state: profile.state ?? "",
    zip_code: profile.zip_code ?? "",
    country: profile.country ?? "México",

    job_title: profile.job_title ?? "",
    department: profile.department ?? "",
    employment_type: profile.employment_type ?? null,
    hire_date: profile.hire_date ?? "",
    termination_date: profile.termination_date ?? "",
    work_schedule: profile.work_schedule ?? "",
    notes: profile.notes ?? "",

    curp: profile.curp ?? "",
    rfc: profile.rfc ?? "",
    nss: profile.nss ?? "",
    professional_license: profile.professional_license ?? "",

    ine_document_note: profile.ine_document_note ?? "",
    curp_document_note: profile.curp_document_note ?? "",
    rfc_document_note: profile.rfc_document_note ?? "",
    nss_document_note: profile.nss_document_note ?? "",
    proof_of_address_note: profile.proof_of_address_note ?? "",
    professional_license_note: profile.professional_license_note ?? "",
    contract_document_note: profile.contract_document_note ?? "",
    documents_notes: profile.documents_notes ?? "",
  };
}

export function EditEmployeeProfileModal({
  isOpen,
  user,
  profile,
  isLoadingProfile,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit,
}: EditEmployeeProfileModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeProfileFormValues>({
    resolver: zodResolver(employeeProfileSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    reset(profileToFormValues(profile));
  }, [isOpen, profile, reset]);

  function handleClose() {
    if (isSubmitting || isLoadingProfile) {
      return;
    }

    reset(defaultValues);
    onClose();
  }

  async function handleSubmitProfile(values: EmployeeProfileFormValues) {
    await onSubmit(values);
  }

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f1f]/30 px-4 py-8 backdrop-blur-sm">
      <section className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white/95 p-8 shadow-2xl shadow-[#afc4c0]/30">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
            Perfil laboral
          </p>
          <h2 className="mt-3 text-3xl font-light text-[#1f1f1f]">
            Editar perfil interno
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#7a8588]">
            Actualiza la información laboral, administrativa y las notas de
            documentos de {user.full_name}.
          </p>
        </div>

        {isLoadingProfile ? (
          <div className="rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6]/70 p-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
              Cargando
            </p>
            <h3 className="mt-3 text-2xl font-light text-[#1f1f1f]">
              Consultando perfil laboral
            </h3>
          </div>
        ) : (
          <form
            className="space-y-8"
            onSubmit={handleSubmit(handleSubmitProfile)}
          >
            <section className="space-y-5 rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6]/70 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#9fb8b4]">
                  Información básica
                </p>
                <h3 className="mt-2 text-2xl font-light text-[#1f1f1f]">
                  Datos personales internos
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  id="edit_profile_legal_name"
                  label="Nombre legal"
                  type="text"
                  placeholder="Nombre como aparece en documentos"
                  {...register("legal_name")}
                />

                <Input
                  id="edit_profile_preferred_name"
                  label="Nombre preferido"
                  type="text"
                  placeholder="Nombre de uso diario"
                  {...register("preferred_name")}
                />

                <Input
                  id="edit_profile_birth_date"
                  label="Fecha de nacimiento"
                  type="date"
                  {...register("birth_date")}
                />

                <Input
                  id="edit_profile_gender"
                  label="Género"
                  type="text"
                  placeholder="Opcional"
                  {...register("gender")}
                />

                <Input
                  id="edit_profile_phone"
                  label="Teléfono"
                  type="tel"
                  placeholder="614..."
                  {...register("phone")}
                />

                <Input
                  id="edit_profile_emergency_contact_name"
                  label="Contacto de emergencia"
                  type="text"
                  placeholder="Nombre del contacto"
                  {...register("emergency_contact_name")}
                />

                <Input
                  id="edit_profile_emergency_contact_phone"
                  label="Teléfono de emergencia"
                  type="tel"
                  placeholder="614..."
                  {...register("emergency_contact_phone")}
                />
              </div>
            </section>

            <section className="space-y-5 rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6]/70 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#9fb8b4]">
                  Dirección
                </p>
                <h3 className="mt-2 text-2xl font-light text-[#1f1f1f]">
                  Datos de domicilio
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  id="edit_profile_address_line"
                  label="Dirección"
                  type="text"
                  placeholder="Calle, número, referencias"
                  {...register("address_line")}
                />

                <Input
                  id="edit_profile_neighborhood"
                  label="Colonia"
                  type="text"
                  {...register("neighborhood")}
                />

                <Input
                  id="edit_profile_city"
                  label="Ciudad"
                  type="text"
                  {...register("city")}
                />

                <Input
                  id="edit_profile_state"
                  label="Estado"
                  type="text"
                  {...register("state")}
                />

                <Input
                  id="edit_profile_zip_code"
                  label="Código postal"
                  type="text"
                  {...register("zip_code")}
                />

                <Input
                  id="edit_profile_country"
                  label="País"
                  type="text"
                  {...register("country")}
                />
              </div>
            </section>

            <section className="space-y-5 rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6]/70 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#9fb8b4]">
                  Datos laborales
                </p>
                <h3 className="mt-2 text-2xl font-light text-[#1f1f1f]">
                  Puesto y relación laboral
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  id="edit_profile_job_title"
                  label="Puesto"
                  type="text"
                  placeholder="Psicóloga, asistente, administración..."
                  {...register("job_title")}
                />

                <Input
                  id="edit_profile_department"
                  label="Departamento"
                  type="text"
                  placeholder="Clínica, administración..."
                  {...register("department")}
                />

                <div>
                  <label
                    htmlFor="edit_profile_employment_type"
                    className="mb-2 block text-sm text-[#4b4b4b]"
                  >
                    Tipo de relación
                  </label>
                  <select
                    id="edit_profile_employment_type"
                    className={selectClassName}
                    {...register("employment_type", {
                      setValueAs: (value) => (value === "" ? null : value),
                    })}
                  >
                    <option value="">Sin definir</option>
                    <option value="employee">Empleado</option>
                    <option value="contractor">Contratista</option>
                    <option value="external">Externo</option>
                    <option value="intern">Practicante</option>
                  </select>
                  {errors.employment_type?.message ? (
                    <p className="mt-2 text-sm text-[#e98ba3]">
                      {errors.employment_type.message}
                    </p>
                  ) : null}
                </div>

                <Input
                  id="edit_profile_hire_date"
                  label="Fecha de ingreso"
                  type="date"
                  {...register("hire_date")}
                />

                <Input
                  id="edit_profile_termination_date"
                  label="Fecha de baja"
                  type="date"
                  {...register("termination_date")}
                />

                <Input
                  id="edit_profile_work_schedule"
                  label="Horario"
                  type="text"
                  placeholder="Lunes a viernes..."
                  {...register("work_schedule")}
                />
              </div>

              <div>
                <label
                  htmlFor="edit_profile_notes"
                  className="mb-2 block text-sm text-[#4b4b4b]"
                >
                  Notas laborales
                </label>
                <textarea
                  id="edit_profile_notes"
                  placeholder="Notas internas del perfil laboral"
                  className={textareaClassName}
                  {...register("notes")}
                />
              </div>
            </section>

            <section className="space-y-5 rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6]/70 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#9fb8b4]">
                  Datos administrativos
                </p>
                <h3 className="mt-2 text-2xl font-light text-[#1f1f1f]">
                  Identificadores
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  id="edit_profile_curp"
                  label="CURP"
                  type="text"
                  placeholder="Opcional"
                  {...register("curp")}
                />

                <Input
                  id="edit_profile_rfc"
                  label="RFC"
                  type="text"
                  placeholder="Opcional"
                  {...register("rfc")}
                />

                <Input
                  id="edit_profile_nss"
                  label="NSS"
                  type="text"
                  placeholder="Opcional"
                  {...register("nss")}
                />

                <Input
                  id="edit_profile_professional_license"
                  label="Cédula profesional"
                  type="text"
                  placeholder="Opcional"
                  {...register("professional_license")}
                />
              </div>
            </section>

            <section className="space-y-5 rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6]/70 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#9fb8b4]">
                  Documentos
                </p>
                <h3 className="mt-2 text-2xl font-light text-[#1f1f1f]">
                  Notas de documentos
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#7a8588]">
                  No se suben archivos todavía. Solo registra si el documento
                  fue recibido, validado o queda pendiente.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  id="edit_profile_ine_document_note"
                  label="INE"
                  type="text"
                  placeholder="Recibida físicamente / pendiente..."
                  {...register("ine_document_note")}
                />

                <Input
                  id="edit_profile_curp_document_note"
                  label="Documento CURP"
                  type="text"
                  placeholder="Validado / pendiente..."
                  {...register("curp_document_note")}
                />

                <Input
                  id="edit_profile_rfc_document_note"
                  label="Documento RFC"
                  type="text"
                  placeholder="Validado / pendiente..."
                  {...register("rfc_document_note")}
                />

                <Input
                  id="edit_profile_nss_document_note"
                  label="Documento NSS"
                  type="text"
                  placeholder="Validado / pendiente..."
                  {...register("nss_document_note")}
                />

                <Input
                  id="edit_profile_proof_of_address_note"
                  label="Comprobante de domicilio"
                  type="text"
                  placeholder="Recibido / pendiente..."
                  {...register("proof_of_address_note")}
                />

                <Input
                  id="edit_profile_professional_license_note"
                  label="Cédula profesional"
                  type="text"
                  placeholder="Validada / pendiente..."
                  {...register("professional_license_note")}
                />

                <Input
                  id="edit_profile_contract_document_note"
                  label="Contrato"
                  type="text"
                  placeholder="Firmado / pendiente..."
                  {...register("contract_document_note")}
                />
              </div>

              <div>
                <label
                  htmlFor="edit_profile_documents_notes"
                  className="mb-2 block text-sm text-[#4b4b4b]"
                >
                  Notas generales de documentos
                </label>
                <textarea
                  id="edit_profile_documents_notes"
                  placeholder="Notas generales sobre documentos físicos o pendientes"
                  className={textareaClassName}
                  {...register("documents_notes")}
                />
              </div>
            </section>

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
                Guardar perfil
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
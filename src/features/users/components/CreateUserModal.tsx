import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "../../../shared/components/ui/Button";
import { FormError } from "../../../shared/components/ui/FormError";
import { Input } from "../../../shared/components/ui/Input";
import {
  type CreateUserFormValues,
  createUserSchema,
} from "../schemas/user.schema";

type CreateUserModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onSubmit: (values: CreateUserFormValues) => Promise<void>;
};

const selectClassName =
  "w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] focus:ring-4 focus:ring-[#afc4c0]/20";

const textareaClassName =
  "min-h-28 w-full resize-y rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition placeholder:text-[#a8b2b4] focus:border-[#afc4c0] focus:ring-4 focus:ring-[#afc4c0]/20";

const internalRoles = ["admin", "psychologist", "assistant"];

export function CreateUserModal({
  isOpen,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit,
}: CreateUserModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      user_type: "client",
      is_active: true,

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
    },
  });

  const selectedUserType = useWatch({ control, name: "user_type" });
  const showEmployeeProfile = internalRoles.includes(selectedUserType);

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    reset();
    onClose();
  }

  async function handleCreateUser(values: CreateUserFormValues) {
    await onSubmit(values);
    reset();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f1f]/30 px-4 py-8 backdrop-blur-sm">
      <section className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white/95 p-8 shadow-2xl shadow-[#afc4c0]/30">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
            Nuevo acceso
          </p>
          <h2 className="mt-3 text-3xl font-light text-[#1f1f1f]">
            Crear usuario
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#7a8588]">
            Registra una nueva cuenta de acceso. Si es usuario interno, también
            puedes capturar información laboral y notas de documentos.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit(handleCreateUser)}>
          <section className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#9fb8b4]">
                Cuenta de acceso
              </p>
              <h3 className="mt-2 text-2xl font-light text-[#1f1f1f]">
                Datos principales
              </h3>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                id="full_name"
                label="Nombre completo"
                type="text"
                placeholder="Karen Chico"
                autoComplete="name"
                error={errors.full_name?.message}
                {...register("full_name")}
              />

              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="usuario@psicomichi.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <Input
              id="password"
              label="Contraseña temporal"
              type="password"
              placeholder="NubeMorada123!"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="user_type"
                  className="mb-2 block text-sm text-[#4b4b4b]"
                >
                  Rol
                </label>
                <select
                  id="user_type"
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

              <div>
                <label
                  htmlFor="is_active"
                  className="mb-2 block text-sm text-[#4b4b4b]"
                >
                  Estado
                </label>
                <select
                  id="is_active"
                  className={selectClassName}
                  {...register("is_active", {
                    setValueAs: (value) => value === "true",
                  })}
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
            </div>
          </section>

          {showEmployeeProfile ? (
            <>
              <section className="space-y-5 rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6]/70 p-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#9fb8b4]">
                    Perfil laboral
                  </p>
                  <h3 className="mt-2 text-2xl font-light text-[#1f1f1f]">
                    Información básica
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#7a8588]">
                    Esta sección aplica solo para usuarios internos: admin,
                    psicóloga o asistente.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Input
                    id="legal_name"
                    label="Nombre legal"
                    type="text"
                    placeholder="Nombre como aparece en documentos"
                    {...register("legal_name")}
                  />

                  <Input
                    id="preferred_name"
                    label="Nombre preferido"
                    type="text"
                    placeholder="Nombre de uso diario"
                    {...register("preferred_name")}
                  />

                  <Input
                    id="birth_date"
                    label="Fecha de nacimiento"
                    type="date"
                    {...register("birth_date")}
                  />

                  <Input
                    id="gender"
                    label="Género"
                    type="text"
                    placeholder="Opcional"
                    {...register("gender")}
                  />

                  <Input
                    id="phone"
                    label="Teléfono"
                    type="tel"
                    placeholder="614..."
                    {...register("phone")}
                  />

                  <Input
                    id="emergency_contact_name"
                    label="Contacto de emergencia"
                    type="text"
                    placeholder="Nombre del contacto"
                    {...register("emergency_contact_name")}
                  />

                  <Input
                    id="emergency_contact_phone"
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
                    id="address_line"
                    label="Dirección"
                    type="text"
                    placeholder="Calle, número, referencias"
                    {...register("address_line")}
                  />

                  <Input
                    id="neighborhood"
                    label="Colonia"
                    type="text"
                    {...register("neighborhood")}
                  />

                  <Input
                    id="city"
                    label="Ciudad"
                    type="text"
                    {...register("city")}
                  />

                  <Input
                    id="state"
                    label="Estado"
                    type="text"
                    {...register("state")}
                  />

                  <Input
                    id="zip_code"
                    label="Código postal"
                    type="text"
                    {...register("zip_code")}
                  />

                  <Input
                    id="country"
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
                    id="job_title"
                    label="Puesto"
                    type="text"
                    placeholder="Psicóloga, asistente, administración..."
                    {...register("job_title")}
                  />

                  <Input
                    id="department"
                    label="Departamento"
                    type="text"
                    placeholder="Clínica, administración..."
                    {...register("department")}
                  />

                  <div>
                    <label
                      htmlFor="employment_type"
                      className="mb-2 block text-sm text-[#4b4b4b]"
                    >
                      Tipo de relación
                    </label>
                    <select
                      id="employment_type"
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
                  </div>

                  <Input
                    id="hire_date"
                    label="Fecha de ingreso"
                    type="date"
                    {...register("hire_date")}
                  />

                  <Input
                    id="termination_date"
                    label="Fecha de baja"
                    type="date"
                    {...register("termination_date")}
                  />

                  <Input
                    id="work_schedule"
                    label="Horario"
                    type="text"
                    placeholder="Lunes a viernes..."
                    {...register("work_schedule")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="mb-2 block text-sm text-[#4b4b4b]"
                  >
                    Notas laborales
                  </label>
                  <textarea
                    id="notes"
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
                    id="curp"
                    label="CURP"
                    type="text"
                    placeholder="Opcional"
                    {...register("curp")}
                  />

                  <Input
                    id="rfc"
                    label="RFC"
                    type="text"
                    placeholder="Opcional"
                    {...register("rfc")}
                  />

                  <Input
                    id="nss"
                    label="NSS"
                    type="text"
                    placeholder="Opcional"
                    {...register("nss")}
                  />

                  <Input
                    id="professional_license"
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
                    id="ine_document_note"
                    label="INE"
                    type="text"
                    placeholder="Recibida físicamente / pendiente..."
                    {...register("ine_document_note")}
                  />

                  <Input
                    id="curp_document_note"
                    label="Documento CURP"
                    type="text"
                    placeholder="Validado / pendiente..."
                    {...register("curp_document_note")}
                  />

                  <Input
                    id="rfc_document_note"
                    label="Documento RFC"
                    type="text"
                    placeholder="Validado / pendiente..."
                    {...register("rfc_document_note")}
                  />

                  <Input
                    id="nss_document_note"
                    label="Documento NSS"
                    type="text"
                    placeholder="Validado / pendiente..."
                    {...register("nss_document_note")}
                  />

                  <Input
                    id="proof_of_address_note"
                    label="Comprobante de domicilio"
                    type="text"
                    placeholder="Recibido / pendiente..."
                    {...register("proof_of_address_note")}
                  />

                  <Input
                    id="professional_license_note"
                    label="Cédula profesional"
                    type="text"
                    placeholder="Validada / pendiente..."
                    {...register("professional_license_note")}
                  />

                  <Input
                    id="contract_document_note"
                    label="Contrato"
                    type="text"
                    placeholder="Firmado / pendiente..."
                    {...register("contract_document_note")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="documents_notes"
                    className="mb-2 block text-sm text-[#4b4b4b]"
                  >
                    Notas generales de documentos
                  </label>
                  <textarea
                    id="documents_notes"
                    placeholder="Notas generales sobre documentos físicos o pendientes"
                    className={textareaClassName}
                    {...register("documents_notes")}
                  />
                </div>
              </section>
            </>
          ) : (
            <div className="rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6]/70 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[#9fb8b4]">
                Perfil laboral
              </p>
              <h3 className="mt-2 text-2xl font-light text-[#1f1f1f]">
                No aplica para cliente
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#7a8588]">
                El perfil laboral solo se registra para usuarios internos.
              </p>
            </div>
          )}

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
              Crear usuario
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
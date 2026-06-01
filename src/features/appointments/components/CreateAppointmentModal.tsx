import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../shared/utils/apiError";

import { Button } from "../../../shared/components/ui/Button";
import { DatePicker } from "../../../shared/components/ui/DatePicker";
import { FormError } from "../../../shared/components/ui/FormError";
import { Input } from "../../../shared/components/ui/Input";
import { TimePicker } from "../../../shared/components/ui/TimePicker";

import { patientService } from "../../patients/services/patientService";
import type { Patient } from "../../patients/types/patient.types";
import { serviceService } from "../../services/services/serviceService";
import type { Service } from "../../services/types/service.types";
import { userService } from "../../users/services/userService";
import type { User } from "../../users/types/user.types";
import {
  DEFAULT_CREATE_APPOINTMENT_VALUES,
  createAppointmentSchema,
  type CreateAppointmentFormValues,
} from "../schemas/appointment.schema";
import { appointmentService } from "../services/appointmentService";
import {
  APPOINTMENT_MODALITIES,
  APPOINTMENT_MODALITY_LABELS,
} from "../types/appointment.types";
import { mapCreateAppointmentFormToRequest } from "../utils/appointmentMappers";
import { APPOINTMENT_TIME_STEP_MINUTES } from "../config/appointment.config";

function getTodayAtStartOfDay(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today;
}

function getMaxAppointmentDate(): Date {
  const maxDate = getTodayAtStartOfDay();
  maxDate.setFullYear(maxDate.getFullYear() + 2);

  return maxDate;
}

function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

type CreateAppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentCreated: () => void;
};

export function CreateAppointmentModal({
  isOpen,
  onClose,
  onAppointmentCreated,
}: CreateAppointmentModalProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [assignableUsers, setAssignableUsers] = useState<User[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  const minAppointmentDate = useMemo(() => getTodayAtStartOfDay(), []);
  const maxAppointmentDate = useMemo(() => getMaxAppointmentDate(), []);

  const defaultFormValues = useMemo<CreateAppointmentFormValues>(
    () => ({
      ...DEFAULT_CREATE_APPOINTMENT_VALUES,
      scheduled_date: formatDateForInput(minAppointmentDate),
    }),
    [minAppointmentDate],
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateAppointmentFormValues>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let shouldIgnoreResponse = false;

    async function loadOptions() {
      try {
        setIsLoadingOptions(true);

        const [patientsResponse, servicesResponse, usersResponse] =
          await Promise.all([
            patientService.getPatients({
              is_active: true,
              page: 1,
              limit: 50,
            }),
            serviceService.getServices({
              is_active: true,
              requires_appointment: true,
              page: 1,
              limit: 50,
            }),
            userService.getUsers({
              is_active: true,
              page: 1,
              limit: 50,
            }),
          ]);

        if (shouldIgnoreResponse) {
          return;
        }

        setPatients(patientsResponse.items);
        setServices(servicesResponse.items);
        setAssignableUsers(
          usersResponse.items.filter((user) => user.user_type !== "client"),
        );
      } catch (error) {
        if (shouldIgnoreResponse) {
          return;
        }

        console.error(error);
        toast.error(getApiErrorMessage(error) || "No se pudieron cargar pacientes, servicios o usuarios.");
      } finally {
        if (!shouldIgnoreResponse) {
          setIsLoadingOptions(false);
        }
      }
    }

    void loadOptions();

    return () => {
      shouldIgnoreResponse = true;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    reset(defaultFormValues);
    onClose();
  }

  const onSubmit: SubmitHandler<CreateAppointmentFormValues> = async (
    values,
  ) => {
    try {
      const payload = mapCreateAppointmentFormToRequest(values);

      await appointmentService.createAppointment(payload);

      toast.success("Cita creada correctamente.");
      reset(defaultFormValues);
      onAppointmentCreated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        getApiErrorMessage(error) || "No se pudo crear la cita. Revisa que no exista empalme y que la fecha sea válida.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f1f]/40 px-4 py-6 backdrop-blur-sm">
      <section className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[#d6e2e0] bg-white shadow-2xl">
        <header className="border-b border-[#d6e2e0] px-6 py-5">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#9fb8b4]">
            Agenda
          </p>

          <h2 className="mt-2 text-2xl font-light text-[#1f1f1f]">
            Nueva cita
          </h2>

          <p className="mt-2 text-sm text-[#7a8588]">
            Programa una cita vinculando paciente, servicio, fecha y
            responsable.
          </p>
        </header>

        <form
          id="create-appointment-form"
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="min-h-0 flex-1 space-y-8 overflow-y-auto px-6 py-6">
            {isLoadingOptions ? (
              <div className="rounded-2xl bg-[#f5f7f6] p-4 text-sm text-[#7a8588]">
                Cargando pacientes, servicios y responsables...
              </div>
            ) : null}

            <section className="grid gap-4 md:grid-cols-3">
              <label className="space-y-2">
                <span className="text-sm text-[#4b4b4b]">Paciente</span>

                <select
                  disabled={isSubmitting || isLoadingOptions}
                  className="h-12 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
                  {...register("patient_id")}
                >
                  <option value="">Selecciona un paciente</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.full_name}
                    </option>
                  ))}
                </select>

                <FormError message={errors.patient_id?.message} />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-[#4b4b4b]">Servicio</span>

                <select
                  disabled={isSubmitting || isLoadingOptions}
                  className="h-12 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
                  {...register("service_id")}
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.catalog_code} · {service.name}
                    </option>
                  ))}
                </select>

                <FormError message={errors.service_id?.message} />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-[#4b4b4b]">Responsable</span>

                <select
                  disabled={isSubmitting || isLoadingOptions}
                  className="h-12 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
                  {...register("assigned_to_user_id")}
                >
                  <option value="">Sin asignar / automático</option>
                  {assignableUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.full_name}
                    </option>
                  ))}
                </select>

                <FormError message={errors.assigned_to_user_id?.message} />
              </label>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              <div>
                <Controller
                  control={control}
                  name="scheduled_date"
                  render={({ field }) => (
                    <DatePicker
                      id="scheduled_date"
                      label="Fecha"
                      value={
                        field.value || formatDateForInput(minAppointmentDate)
                      }
                      minDate={minAppointmentDate}
                      maxDate={maxAppointmentDate}
                      placeholder="Selecciona la fecha de la cita"
                      error={errors.scheduled_date?.message}
                      onChange={(value) => field.onChange(value ?? "")}
                    />
                  )}
                />

                <FormError message={errors.scheduled_date?.message} />
              </div>

              <div>
                <Controller
                  control={control}
                  name="scheduled_time"
                  render={({ field }) => (
                    <TimePicker
                      id="scheduled_time"
                      label="Hora"
                      value={field.value}
                      disabled={isSubmitting}
                      minuteStep={APPOINTMENT_TIME_STEP_MINUTES}
                      error={errors.scheduled_time?.message}
                      onChange={field.onChange}
                    />
                  )}
                />

                <FormError message={errors.scheduled_time?.message} />
              </div>

              <label className="space-y-2">
                <span className="text-sm text-[#4b4b4b]">Modalidad</span>

                <select
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
                  {...register("modality")}
                >
                  {APPOINTMENT_MODALITIES.map((modality) => (
                    <option key={modality} value={modality}>
                      {APPOINTMENT_MODALITY_LABELS[modality]}
                    </option>
                  ))}
                </select>

                <FormError message={errors.modality?.message} />
              </label>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div>
                <Input
                  label="Ubicación"
                  placeholder="Consultorio Karen Chico"
                  disabled={isSubmitting}
                  {...register("location")}
                />

                <FormError message={errors.location?.message} />
              </div>

              <div>
                <Input
                  label="Enlace de reunión"
                  placeholder="https://meet.google.com/..."
                  disabled={isSubmitting}
                  {...register("meeting_url")}
                />

                <FormError message={errors.meeting_url?.message} />
              </div>
            </section>

            <section>
              <label className="space-y-2">
                <span className="text-sm text-[#4b4b4b]">Notas</span>

                <textarea
                  rows={4}
                  placeholder="Notas administrativas de la cita."
                  disabled={isSubmitting}
                  className="w-full resize-none rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition placeholder:text-[#a7b1b3] focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
                  {...register("notes")}
                />

                <FormError message={errors.notes?.message} />
              </label>
            </section>
          </div>

          <footer className="flex flex-col-reverse gap-3 border-t border-[#d6e2e0] px-6 py-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              disabled={isSubmitting}
              onClick={handleClose}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              form="create-appointment-form"
              disabled={isSubmitting || isLoadingOptions}
            >
              {isSubmitting ? "Guardando..." : "Crear cita"}
            </Button>
          </footer>
        </form>
      </section>
    </div>
  );
}
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "../../../shared/components/ui/Button";
import { PageHeader } from "../../../shared/components/ui/PageHeader";
import { getApiErrorMessage } from "../../../shared/utils/apiError";
import { ChangePatientStatusModal } from "../components/ChangePatientStatusModal";
import { CreatePatientModal } from "../components/CreatePatientModal";
import { EditPatientModal } from "../components/EditPatientModal";
import {
  type PatientsFiltersValue,
  PatientsFilters,
} from "../components/PatientsFilters";
import { PatientsTable } from "../components/PatientsTable";
import type {
  CreatePatientFormValues,
  UpdatePatientFormValues,
  UpdatePatientStatusFormValues,
} from "../schemas/patient.schema";
import { patientService } from "../services/patientService";
import type {
  Patient,
  PatientsListQuery,
  PatientsListResponse,
} from "../types/patient.types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const DEFAULT_FILTERS: PatientsFiltersValue = {
  search: "",
  status: "all",
  preferredModality: "all",
  activity: "all",
};

function buildPatientsQuery(filters: PatientsFiltersValue): PatientsListQuery {
  return {
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
    search: filters.search.trim() || undefined,
    status: filters.status === "all" ? undefined : filters.status,
    preferred_modality:
      filters.preferredModality === "all"
        ? undefined
        : filters.preferredModality,
    is_active:
      filters.activity === "all" ? undefined : filters.activity === "active",
  };
}

function normalizeOptionalFormValue(
  value: string | null | undefined,
): string | null {
  if (!value) {
    return null;
  }

  return value.trim() || null;
}

function normalizePatientGender(
  value: CreatePatientFormValues["gender"] | UpdatePatientFormValues["gender"],
): Patient["gender"] {
  if (!value) {
    return null;
  }

  return value;
}

export function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [meta, setMeta] = useState<PatientsListResponse | null>(null);
  const [filters, setFilters] = useState<PatientsFiltersValue>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdatingPatient, setIsUpdatingPatient] = useState(false);
  const [editErrorMessage, setEditErrorMessage] = useState<string | null>(null);

  const [statusPatient, setStatusPatient] = useState<Patient | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusErrorMessage, setStatusErrorMessage] = useState<string | null>(
    null,
  );

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);
  const [createErrorMessage, setCreateErrorMessage] = useState<string | null>(
    null,
  );

  async function fetchPatients(nextFilters: PatientsFiltersValue) {
    const response = await patientService.getPatients(
      buildPatientsQuery(nextFilters),
    );

    setPatients(response.items);
    setMeta(response);
    setErrorMessage(null);
  }

  async function loadPatients(nextFilters: PatientsFiltersValue = filters) {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await fetchPatients(nextFilters);
    } catch (error) {
      setPatients([]);
      setMeta(null);
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreatePatient(values: CreatePatientFormValues) {
    setIsCreatingPatient(true);
    setCreateErrorMessage(null);

    try {
      await patientService.createPatient({
        full_name: values.full_name,
        email: normalizeOptionalFormValue(values.email),
        phone: normalizeOptionalFormValue(values.phone),
        birth_date: normalizeOptionalFormValue(values.birth_date),
        gender: normalizePatientGender(values.gender),
        preferred_modality: values.preferred_modality,
        source: normalizeOptionalFormValue(values.source),
        initial_reason: normalizeOptionalFormValue(values.initial_reason),
        internal_notes: normalizeOptionalFormValue(values.internal_notes),
      });

      toast.success("Paciente registrado correctamente.");
      setIsCreateModalOpen(false);

      await loadPatients(filters);
    } catch (error) {
      const message = getApiErrorMessage(error);

      setCreateErrorMessage(message);
      toast.error(message);

      throw error;
    } finally {
      setIsCreatingPatient(false);
    }
  }

  async function handleUpdatePatient(values: UpdatePatientFormValues) {
    if (!selectedPatient) {
      return;
    }

    setIsUpdatingPatient(true);
    setEditErrorMessage(null);

    try {
      await patientService.updatePatient(selectedPatient.id, {
        full_name: values.full_name,
        email: normalizeOptionalFormValue(values.email),
        phone: normalizeOptionalFormValue(values.phone),
        birth_date: normalizeOptionalFormValue(values.birth_date),
        gender: normalizePatientGender(values.gender),
        preferred_modality: values.preferred_modality,
        source: normalizeOptionalFormValue(values.source),
        initial_reason: normalizeOptionalFormValue(values.initial_reason),
        internal_notes: normalizeOptionalFormValue(values.internal_notes),
      });

      toast.success("Paciente actualizado correctamente.");
      setIsEditModalOpen(false);
      setSelectedPatient(null);

      await loadPatients(filters);
    } catch (error) {
      const message = getApiErrorMessage(error);

      setEditErrorMessage(message);
      toast.error(message);

      throw error;
    } finally {
      setIsUpdatingPatient(false);
    }
  }

  async function handleUpdatePatientStatus(
    values: UpdatePatientStatusFormValues,
  ) {
    if (!statusPatient) {
      return;
    }

    setIsUpdatingStatus(true);
    setStatusErrorMessage(null);

    try {
      await patientService.updatePatientStatus(statusPatient.id, {
        status: values.status,
        status_note: values.status_note,
      });

      toast.success("Estado del paciente actualizado correctamente.");
      setIsStatusModalOpen(false);
      setStatusPatient(null);

      await loadPatients(filters);
    } catch (error) {
      const message = getApiErrorMessage(error);

      setStatusErrorMessage(message);
      toast.error(message);

      throw error;
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  function handleOpenStatusModal(patient: Patient) {
    setStatusErrorMessage(null);
    setStatusPatient(patient);
    setIsStatusModalOpen(true);
  }

  function handleCloseStatusModal() {
    if (isUpdatingStatus) {
      return;
    }

    setStatusErrorMessage(null);
    setIsStatusModalOpen(false);
    setStatusPatient(null);
  }

  function handleOpenEditModal(patient: Patient) {
    setEditErrorMessage(null);
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    if (isUpdatingPatient) {
      return;
    }

    setEditErrorMessage(null);
    setIsEditModalOpen(false);
    setSelectedPatient(null);
  }

  function handleOpenCreateModal() {
    setCreateErrorMessage(null);
    setIsCreateModalOpen(true);
  }

  function handleCloseCreateModal() {
    if (isCreatingPatient) {
      return;
    }

    setCreateErrorMessage(null);
    setIsCreateModalOpen(false);
  }

  function handleFilterChange<K extends keyof PatientsFiltersValue>(
    key: K,
    value: PatientsFiltersValue[K],
  ) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  }

  function handleSubmitFilters() {
    void loadPatients(filters);
  }

  function handleClearFilters() {
    setFilters(DEFAULT_FILTERS);
    void loadPatients(DEFAULT_FILTERS);
  }

  useEffect(() => {
    let shouldIgnore = false;

    async function loadInitialPatients() {
      try {
        const response = await patientService.getPatients(
          buildPatientsQuery(DEFAULT_FILTERS),
        );

        if (shouldIgnore) {
          return;
        }

        setPatients(response.items);
        setMeta(response);
        setErrorMessage(null);
      } catch (error) {
        if (shouldIgnore) {
          return;
        }

        setPatients([]);
        setMeta(null);
        setErrorMessage(getApiErrorMessage(error));
      } finally {
        if (!shouldIgnore) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialPatients();

    return () => {
      shouldIgnore = true;
    };
  }, []);

  return (
    <section>
      <PageHeader
        eyebrow="Pacientes"
        title="Gestión de pacientes"
        description="Consulta, registra y actualiza los datos administrativos de los pacientes dentro de Psicomichi."
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-[#d6e2e0] px-4 py-2 text-sm text-[#4b4b4b]">
              {meta ? `${meta.total} pacientes encontrados` : "Pacientes"}
            </span>

            <span className="rounded-full bg-[#f5f7f6] px-4 py-2 text-sm text-[#7a8588]">
              Página {meta?.page ?? DEFAULT_PAGE} · Límite{" "}
              {meta?.limit ?? DEFAULT_LIMIT}
            </span>
          </div>

          <Button type="button" onClick={handleOpenCreateModal}>
            Registrar paciente
          </Button>
        </div>
      </PageHeader>

      <PatientsFilters
        values={filters}
        isLoading={isLoading}
        onChange={handleFilterChange}
        onSubmit={handleSubmitFilters}
        onClear={handleClearFilters}
      />

      {isLoading ? (
        <div className="rounded-[2rem] border border-white/80 bg-white/80 p-8 text-center shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
            Cargando
          </p>
          <h2 className="mt-3 text-2xl font-light text-[#1f1f1f]">
            Preparando pacientes
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#7a8588]">
            Estamos consultando los registros disponibles en el backend.
          </p>

          <div className="mx-auto mt-6 h-2 w-24 overflow-hidden rounded-full bg-[#d6e2e0]">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#afc4c0]" />
          </div>
        </div>
      ) : null}

      {!isLoading && errorMessage ? (
        <div className="rounded-[2rem] border border-[#e98ba3]/30 bg-white/80 p-8 shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-[#e98ba3]">
            Error
          </p>
          <h2 className="mt-3 text-2xl font-light text-[#1f1f1f]">
            No pudimos cargar los pacientes
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#9f4f64]">
            {errorMessage}
          </p>

          <Button
            type="button"
            variant="secondary"
            onClick={() => void loadPatients(filters)}
            className="mt-6"
          >
            Intentar de nuevo
          </Button>
        </div>
      ) : null}

      {!isLoading && !errorMessage && patients.length === 0 ? (
        <div className="rounded-[2rem] border border-white/80 bg-white/80 p-8 text-center shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
            Sin registros
          </p>
          <h2 className="mt-3 text-2xl font-light text-[#1f1f1f]">
            No encontramos pacientes
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#7a8588]">
            Ajusta los filtros o limpia la búsqueda para volver a consultar
            todos los pacientes disponibles.
          </p>
        </div>
      ) : null}

      {!isLoading && !errorMessage && patients.length > 0 ? (
        <PatientsTable
          patients={patients}
          onEditPatient={handleOpenEditModal}
          onChangePatientStatus={handleOpenStatusModal}
        />
      ) : null}

      <CreatePatientModal
        isOpen={isCreateModalOpen}
        isSubmitting={isCreatingPatient}
        errorMessage={createErrorMessage}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreatePatient}
      />

      <EditPatientModal
        isOpen={isEditModalOpen}
        patient={selectedPatient}
        isSubmitting={isUpdatingPatient}
        errorMessage={editErrorMessage}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdatePatient}
      />

      <ChangePatientStatusModal
        isOpen={isStatusModalOpen}
        patient={statusPatient}
        isSubmitting={isUpdatingStatus}
        errorMessage={statusErrorMessage}
        onClose={handleCloseStatusModal}
        onSubmit={handleUpdatePatientStatus}
      />
    </section>
  );
}
import { endpoints } from "../../../api/endpoints";
import { http } from "../../../api/http";
import type {
  CreatePatientRequest,
  Patient,
  PatientsListQuery,
  PatientsListResponse,
  UpdatePatientRequest,
  UpdatePatientStatusRequest,
} from "../types/patient.types";

function buildPatientsQueryParams(query?: PatientsListQuery) {
  if (!query) {
    return {};
  }

  return {
    search: query.search || undefined,
    status: query.status || undefined,
    preferred_modality: query.preferred_modality || undefined,
    is_active: query.is_active,
    page: query.page,
    limit: query.limit,
  };
}

export const patientService = {
  async getPatients(query?: PatientsListQuery): Promise<PatientsListResponse> {
    const response = await http.get<PatientsListResponse>(
      endpoints.patients.base,
      {
        params: buildPatientsQueryParams(query),
      },
    );

    return response.data;
  },

  async getPatientById(patientId: string): Promise<Patient> {
    const response = await http.get<Patient>(
      endpoints.patients.byId(patientId),
    );

    return response.data;
  },

  async createPatient(payload: CreatePatientRequest): Promise<Patient> {
    const response = await http.post<Patient>(
      endpoints.patients.base,
      payload,
    );

    return response.data;
  },

  async updatePatient(
    patientId: string,
    payload: UpdatePatientRequest,
  ): Promise<Patient> {
    const response = await http.patch<Patient>(
      endpoints.patients.byId(patientId),
      payload,
    );

    return response.data;
  },

  async updatePatientStatus(
    patientId: string,
    payload: UpdatePatientStatusRequest,
  ): Promise<Patient> {
    const response = await http.patch<Patient>(
      endpoints.patients.status(patientId),
      payload,
    );

    return response.data;
  },
};
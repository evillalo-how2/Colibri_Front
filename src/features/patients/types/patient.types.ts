export type PatientStatus =
  | "new"
  | "contacted"
  | "active"
  | "follow_up"
  | "inactive";

export type PatientModality =
  | "online"
  | "in_person"
  | "hybrid"
  | "unspecified";

export type Patient = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  birth_date: string | null;
  gender: PatientGender | null;
  preferred_modality: PatientModality;
  status: PatientStatus;
  status_note: string | null;
  source: string | null;
  initial_reason: string | null;
  internal_notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PatientsListQuery = {
  search?: string;
  status?: PatientStatus;
  preferred_modality?: PatientModality;
  is_active?: boolean;
  page?: number;
  limit?: number;
};

export type PatientsListResponse = {
  items: Patient[];
  total: number;
  page: number;
  limit: number;
};

export type CreatePatientRequest = {
  full_name: string;
  email?: string | null;
  phone?: string | null;
  birth_date?: string | null;
  gender?: PatientGender | null;
  preferred_modality: PatientModality;
  source?: string | null;
  initial_reason?: string | null;
  internal_notes?: string | null;
};

export type UpdatePatientRequest = {
  full_name?: string;
  email?: string | null;
  phone?: string | null;
  birth_date?: string | null;
  gender?: PatientGender | null;
  preferred_modality?: PatientModality;
  source?: string | null;
  initial_reason?: string | null;
  internal_notes?: string | null;
};

export type UpdatePatientStatusRequest = {
  status: PatientStatus;
  status_note: string;
};

export type PatientGender = "male" | "female" | "non_binary";
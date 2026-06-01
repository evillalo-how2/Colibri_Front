import type { UserType } from "../../auth/types/auth.types";

export type User = {
  id: string;
  email: string;
  full_name: string;
  user_type: UserType;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
};

export type UsersListQuery = {
  search?: string;
  user_type?: UserType;
  is_active?: boolean;
  page?: number;
  limit?: number;
};

export type UsersListResponse = {
  items: User[];
  total: number;
  page: number;
  limit: number;
};

export type CreateUserRequest = {
  email: string;
  full_name: string;
  password: string;
  user_type: UserType;
  is_active: boolean;
};

export type UpdateUserRequest = {
  email?: string;
  full_name?: string;
};

export type ChangeUserRoleRequest = {
  user_type: UserType;
};

export type UserStatus = "active" | "inactive";

export type EmploymentType = "employee" | "contractor" | "external" | "intern";

export type EmployeeProfile = {
  id: string;
  user_id: string;

  legal_name: string | null;
  preferred_name: string | null;
  birth_date: string | null;
  gender: string | null;

  phone: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;

  address_line: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  country: string | null;

  job_title: string | null;
  department: string | null;
  employment_type: EmploymentType | null;
  hire_date: string | null;
  termination_date: string | null;
  work_schedule: string | null;
  notes: string | null;

  curp: string | null;
  rfc: string | null;
  nss: string | null;
  professional_license: string | null;

  ine_document_note: string | null;
  curp_document_note: string | null;
  rfc_document_note: string | null;
  nss_document_note: string | null;
  proof_of_address_note: string | null;
  professional_license_note: string | null;
  contract_document_note: string | null;
  documents_notes: string | null;

  created_at: string;
  updated_at: string;
};

export type EmployeeProfileUpsertRequest = {
  legal_name?: string | null;
  preferred_name?: string | null;
  birth_date?: string | null;
  gender?: string | null;

  phone?: string | null;
  emergency_contact_name?: string | null;
  emergency_contact_phone?: string | null;

  address_line?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  state?: string | null;
  zip_code?: string | null;
  country?: string | null;

  job_title?: string | null;
  department?: string | null;
  employment_type?: EmploymentType | null;
  hire_date?: string | null;
  termination_date?: string | null;
  work_schedule?: string | null;
  notes?: string | null;

  curp?: string | null;
  rfc?: string | null;
  nss?: string | null;
  professional_license?: string | null;

  ine_document_note?: string | null;
  curp_document_note?: string | null;
  rfc_document_note?: string | null;
  nss_document_note?: string | null;
  proof_of_address_note?: string | null;
  professional_license_note?: string | null;
  contract_document_note?: string | null;
  documents_notes?: string | null;
};
export type UpdateUserPasswordRequest = {
  new_password: string;
};

export type MessageResponse = {
  message: string;
};
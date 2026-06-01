import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .transform((value) => (value === "" ? null : value))
  .nullable()
  .optional();

const optionalDate = z
  .string()
  .transform((value) => (value === "" ? null : value))
  .nullable()
  .optional();

export const employeeProfileSchema = z.object({
  legal_name: optionalText,
  preferred_name: optionalText,
  birth_date: optionalDate,
  gender: optionalText,

  phone: optionalText,
  emergency_contact_name: optionalText,
  emergency_contact_phone: optionalText,

  address_line: optionalText,
  neighborhood: optionalText,
  city: optionalText,
  state: optionalText,
  zip_code: optionalText,
  country: optionalText,

  job_title: optionalText,
  department: optionalText,
  employment_type: z
    .enum(["employee", "contractor", "external", "intern"])
    .nullable()
    .optional(),
  hire_date: optionalDate,
  termination_date: optionalDate,
  work_schedule: optionalText,
  notes: optionalText,

  curp: optionalText,
  rfc: optionalText,
  nss: optionalText,
  professional_license: optionalText,

  ine_document_note: optionalText,
  curp_document_note: optionalText,
  rfc_document_note: optionalText,
  nss_document_note: optionalText,
  proof_of_address_note: optionalText,
  professional_license_note: optionalText,
  contract_document_note: optionalText,
  documents_notes: optionalText,
});

export type EmployeeProfileFormValues = z.infer<typeof employeeProfileSchema>;
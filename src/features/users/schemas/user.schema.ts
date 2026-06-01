import { z } from "zod";

const passwordRegex = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /\d/,
  symbol: /[^A-Za-z0-9]/,
  spaces: /\s/,
};

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

const employmentTypeSchema = z
  .enum(["employee", "contractor", "external", "intern"])
  .nullable()
  .optional();

export const createUserSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio.")
    .email("Ingresa un email válido."),
  full_name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio.")
    .min(3, "El nombre debe tener al menos 3 caracteres."),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria.")
    .min(12, "La contraseña debe tener al menos 12 caracteres.")
    .max(128, "La contraseña no debe superar 128 caracteres.")
    .refine((value) => passwordRegex.lowercase.test(value), {
      message: "La contraseña debe incluir una minúscula.",
    })
    .refine((value) => passwordRegex.uppercase.test(value), {
      message: "La contraseña debe incluir una mayúscula.",
    })
    .refine((value) => passwordRegex.number.test(value), {
      message: "La contraseña debe incluir un número.",
    })
    .refine((value) => passwordRegex.symbol.test(value), {
      message: "La contraseña debe incluir un símbolo.",
    })
    .refine((value) => !passwordRegex.spaces.test(value), {
      message: "La contraseña no debe contener espacios.",
    }),
  user_type: z.enum(["admin", "psychologist", "assistant", "client"], {
    message: "Selecciona un rol válido.",
  }),
  is_active: z.boolean(),

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
  employment_type: employmentTypeSchema,
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

export const updateUserSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio.")
    .email("Ingresa un email válido."),
  full_name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio.")
    .min(3, "El nombre debe tener al menos 3 caracteres."),
});

export const changeUserRoleSchema = z.object({
  user_type: z.enum(["admin", "psychologist", "assistant", "client"], {
    message: "Selecciona un rol válido.",
  }),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
export type ChangeUserRoleFormValues = z.infer<typeof changeUserRoleSchema>;
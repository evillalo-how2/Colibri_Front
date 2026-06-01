import { z } from "zod";

const emailRegex = /^[^\s@]{2,}@[^\s@]{2,}\.[A-Za-z]{2,}$/;

function isValidMexicanPhone(value: string | null | undefined) {
  if (!value) {
    return true;
  }

  return /^\d{10}$/.test(value);
}

function isValidBirthDate(value: string | null | undefined) {
  if (!value) {
    return true;
  }

  const date = new Date(`${value}T00:00:00`);
  const minDate = new Date("1900-01-01T00:00:00");
  const today = new Date();

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return date >= minDate && date <= today;
}

const optionalText = z
  .string()
  .trim()
  .transform((value) => (value === "" ? null : value))
  .nullable()
  .optional();

const optionalPhone = z
  .string()
  .trim()
  .transform((value) => (value === "" ? null : value))
  .nullable()
  .optional()
  .refine((value) => isValidMexicanPhone(value), {
    message: "El teléfono debe tener exactamente 10 dígitos.",
  });

const optionalEmail = z
  .string()
  .trim()
  .transform((value) => (value === "" ? null : value))
  .nullable()
  .optional()
  .refine((value) => !value || emailRegex.test(value), {
    message: "Ingresa un email válido.",
  });

const optionalDate = z
  .string()
  .transform((value) => (value === "" ? null : value))
  .nullable()
  .optional()
  .refine((value) => isValidBirthDate(value), {
    message: "La fecha de nacimiento no es válida.",
  });

const genderSchema = z
  .union([z.enum(["male", "female", "non_binary"]), z.literal("")])
  .transform((value) => (value === "" ? null : value))
  .nullable()
  .optional();

const patientModalitySchema = z.enum(
  ["online", "in_person", "hybrid", "unspecified"],
  {
    message: "Selecciona una modalidad válida.",
  },
);

const patientStatusSchema = z.enum(
  ["new", "contacted", "active", "follow_up", "inactive"],
  {
    message: "Selecciona un estado válido.",
  },
);

const patientBaseFormSchema = z
  .object({
    full_name: z
      .string()
      .trim()
      .min(1, "El nombre es obligatorio.")
      .min(3, "El nombre debe tener al menos 3 caracteres."),

    email: optionalEmail,
    phone: optionalPhone,
    birth_date: optionalDate,
    gender: genderSchema,

    preferred_modality: patientModalitySchema,

    source: optionalText,
    initial_reason: optionalText,
    internal_notes: optionalText,
  })
  .refine(
    (values) => {
      const hasEmail = Boolean(values.email?.trim());
      const hasPhone = Boolean(values.phone?.trim());

      return hasEmail || hasPhone;
    },
    {
      path: ["phone"],
      message: "Agrega al menos un medio de contacto: email o teléfono.",
    },
  );

export const createPatientSchema = patientBaseFormSchema;

export const updatePatientSchema = patientBaseFormSchema;

export const updatePatientStatusSchema = z.object({
  status: patientStatusSchema,
  status_note: z
    .string()
    .trim()
    .min(1, "Agrega una nota del cambio de estado.")
    .min(5, "La nota debe tener al menos 5 caracteres."),
});

export type CreatePatientFormValues = z.input<typeof createPatientSchema>;
export type UpdatePatientFormValues = z.input<typeof updatePatientSchema>;
export type UpdatePatientStatusFormValues = z.input<
  typeof updatePatientStatusSchema
>;

export type CreatePatientPayloadValues = z.output<typeof createPatientSchema>;
export type UpdatePatientPayloadValues = z.output<typeof updatePatientSchema>;
export type UpdatePatientStatusPayloadValues = z.output<
  typeof updatePatientStatusSchema
>;
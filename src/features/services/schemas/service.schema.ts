import { z } from "zod";
import type {
  ServiceCurrency,
  ServiceModality,
  ServiceType,
} from "../types/service.types";

const serviceTypes: [ServiceType, ...ServiceType[]] = [
  "therapy",
  "workshop",
  "course",
  "book",
  "digital_product",
  "physical_product",
  "activity",
  "event",
  "retreat",
  "other",
];

const serviceModalities: [ServiceModality, ...ServiceModality[]] = [
  "online",
  "in_person",
  "hybrid",
  "digital",
  "not_applicable",
  "unspecified",
];

const serviceCurrencies: [ServiceCurrency, ...ServiceCurrency[]] = [
  "MXN",
  "USD",
];

function isValidMoney(value: string) {
  return /^\d+(\.\d{1,2})?$/.test(value.trim());
}

function optionalNumberStringSchema(message: string) {
  return z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d+$/.test(value), {
      message,
    });
}

export const createServiceSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "El nombre debe tener al menos 3 caracteres.")
      .max(120, "El nombre no puede superar 120 caracteres."),

    short_description: z
      .string()
      .trim()
      .max(240, "La descripción corta no puede superar 240 caracteres."),

    description: z
      .string()
      .trim()
      .max(5000, "La descripción completa no puede superar 5000 caracteres."),

    type: z.enum(serviceTypes, {
      message: "Selecciona un tipo válido.",
    }),

    modality: z.enum(serviceModalities, {
      message: "Selecciona una modalidad válida.",
    }),

    price: z
      .string()
      .trim()
      .min(1, "El precio es obligatorio.")
      .refine(isValidMoney, {
        message: "El precio debe ser un número válido con máximo 2 decimales.",
      })
      .refine((value) => Number(value) >= 0, {
        message: "El precio no puede ser negativo.",
      })
      .refine((value) => Number(value) <= 999999.99, {
        message: "El precio es demasiado alto.",
      }),

    currency: z.enum(serviceCurrencies, {
      message: "Selecciona una moneda válida.",
    }),

    duration_minutes: optionalNumberStringSchema(
      "La duración debe ser un número entero.",
    ).refine(
      (value) => value === "" || (Number(value) >= 5 && Number(value) <= 1440),
      {
        message: "La duración debe estar entre 5 y 1440 minutos.",
      },
    ),

    is_stock_limited: z.boolean(),

    stock_quantity: optionalNumberStringSchema(
      "El stock debe ser un número entero.",
    ),

    is_active: z.boolean(),

    is_public: z.boolean(),

    requires_appointment: z.boolean(),

    display_order: optionalNumberStringSchema(
      "El orden debe ser un número entero.",
    ),

    cover_image_url: z
      .string()
      .trim()
      .refine((value) => value === "" || z.string().url().safeParse(value).success, {
        message: "La imagen debe ser una URL válida.",
      })
      .refine((value) => value.length <= 1000, {
        message: "La URL de imagen es demasiado larga.",
      }),

    metadata_audience: z
      .string()
      .trim()
      .max(240, "La audiencia no puede superar 240 caracteres."),

    metadata_delivery_method: z
      .string()
      .trim()
      .max(240, "El método de entrega no puede superar 240 caracteres."),
  })
  .superRefine((values, context) => {
    const requiresAppointment = values.requires_appointment;
    const hasDuration = values.duration_minutes.trim() !== "";
    const hasStock = values.stock_quantity.trim() !== "";

    if (requiresAppointment && !hasDuration) {
      context.addIssue({
        code: "custom",
        path: ["duration_minutes"],
        message: "La duración es obligatoria cuando requiere cita.",
      });
    }

    if (values.is_stock_limited && !hasStock) {
      context.addIssue({
        code: "custom",
        path: ["stock_quantity"],
        message: "El stock es obligatorio cuando el servicio maneja inventario.",
      });
    }

    if (values.type === "therapy") {
      if (!requiresAppointment) {
        context.addIssue({
          code: "custom",
          path: ["requires_appointment"],
          message: "Una terapia debe requerir cita.",
        });
      }

      if (!hasDuration) {
        context.addIssue({
          code: "custom",
          path: ["duration_minutes"],
          message: "Una terapia debe tener duración.",
        });
      }

      if (values.is_stock_limited || hasStock) {
        context.addIssue({
          code: "custom",
          path: ["stock_quantity"],
          message: "Una terapia no debe manejar stock.",
        });
      }
    }

    if (values.type === "digital_product") {
      if (requiresAppointment) {
        context.addIssue({
          code: "custom",
          path: ["requires_appointment"],
          message: "Un producto digital no debe requerir cita.",
        });
      }

      if (hasDuration) {
        context.addIssue({
          code: "custom",
          path: ["duration_minutes"],
          message: "Un producto digital no debe tener duración.",
        });
      }

      if (values.is_stock_limited || hasStock) {
        context.addIssue({
          code: "custom",
          path: ["stock_quantity"],
          message: "Un producto digital no debe manejar stock.",
        });
      }
    }

    if (values.type === "book" || values.type === "physical_product") {
      if (requiresAppointment) {
        context.addIssue({
          code: "custom",
          path: ["requires_appointment"],
          message: "Un libro o producto físico no debe requerir cita.",
        });
      }

      if (hasDuration) {
        context.addIssue({
          code: "custom",
          path: ["duration_minutes"],
          message: "Un libro o producto físico no debe tener duración.",
        });
      }
    }

    if (values.is_public) {
      if (values.short_description.trim() === "") {
        context.addIssue({
          code: "custom",
          path: ["short_description"],
          message:
            "La descripción corta es obligatoria para publicar el servicio.",
        });
      }

      if (values.description.trim() === "") {
        context.addIssue({
          code: "custom",
          path: ["description"],
          message:
            "La descripción completa es obligatoria para publicar el servicio.",
        });
      }
    }
  });

export type CreateServiceFormValues = z.infer<typeof createServiceSchema>;

export const DEFAULT_CREATE_SERVICE_VALUES: CreateServiceFormValues = {
  name: "",
  short_description: "",
  description: "",
  type: "therapy",
  modality: "online",
  price: "",
  currency: "MXN",
  duration_minutes: "60",
  is_stock_limited: false,
  stock_quantity: "",
  is_active: true,
  is_public: false,
  requires_appointment: true,
  display_order: "0",
  cover_image_url: "",
  metadata_audience: "",
  metadata_delivery_method: "",
};
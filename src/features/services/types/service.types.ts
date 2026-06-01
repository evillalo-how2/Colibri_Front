export type ServiceCurrency = "MXN" | "USD";

export type ServiceType =
  | "therapy"
  | "workshop"
  | "course"
  | "book"
  | "digital_product"
  | "physical_product"
  | "activity"
  | "event"
  | "retreat"
  | "other";

export type ServiceModality =
  | "online"
  | "in_person"
  | "hybrid"
  | "digital"
  | "not_applicable"
  | "unspecified";

export const SERVICE_TYPES: ServiceType[] = [
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

export const SERVICE_MODALITIES: ServiceModality[] = [
  "online",
  "in_person",
  "hybrid",
  "digital",
  "not_applicable",
  "unspecified",
];

export const SERVICE_CURRENCIES: ServiceCurrency[] = ["MXN", "USD"];

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  therapy: "Terapia",
  workshop: "Taller",
  course: "Curso",
  book: "Libro",
  digital_product: "Producto digital",
  physical_product: "Producto físico",
  activity: "Actividad",
  event: "Evento",
  retreat: "Retiro",
  other: "Otro",
};

export const SERVICE_MODALITY_LABELS: Record<ServiceModality, string> = {
  online: "En línea",
  in_person: "Presencial",
  hybrid: "Híbrida",
  digital: "Digital",
  not_applicable: "No aplica",
  unspecified: "No especificada",
};

export const SERVICE_CURRENCY_LABELS: Record<ServiceCurrency, string> = {
  MXN: "MXN",
  USD: "USD",
};

export type Service = {
  id: string;
  name: string;
  slug: string;
  catalog_code: string;
  short_description: string | null;
  description: string | null;
  type: ServiceType;
  modality: ServiceModality;
  price_cents: number;
  currency: ServiceCurrency;
  duration_minutes: number | null;
  stock_quantity: number | null;
  is_stock_limited: boolean;
  is_active: boolean;
  is_public: boolean;
  requires_appointment: boolean;
  display_order: number;
  cover_image_url: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};

export type ServicesListQuery = {
  search?: string;
  type?: ServiceType;
  modality?: ServiceModality;
  is_active?: boolean;
  is_public?: boolean;
  requires_appointment?: boolean;
  page?: number;
  limit?: number;
};

export type ServicesListResponse = {
  items: Service[];
  total: number;
  page: number;
  limit: number;
};

export type CreateServiceRequest = {
  name: string;
  short_description?: string | null;
  description?: string | null;
  type: ServiceType;
  modality: ServiceModality;
  price_cents: number;
  currency: ServiceCurrency;
  duration_minutes?: number | null;
  stock_quantity?: number | null;
  is_stock_limited: boolean;
  is_active: boolean;
  is_public: boolean;
  requires_appointment: boolean;
  display_order: number;
  cover_image_url?: string | null;
  metadata?: Record<string, unknown> | null;
};

export type UpdateServiceRequest = {
  name?: string;
  short_description?: string | null;
  description?: string | null;
  type?: ServiceType;
  modality?: ServiceModality;
  price_cents?: number;
  currency?: ServiceCurrency;
  duration_minutes?: number | null;
  stock_quantity?: number | null;
  is_stock_limited?: boolean;
  is_active?: boolean;
  is_public?: boolean;
  requires_appointment?: boolean;
  display_order?: number;
  cover_image_url?: string | null;
  metadata?: Record<string, unknown> | null;
};
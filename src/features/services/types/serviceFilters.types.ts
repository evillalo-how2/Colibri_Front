import type {
  ServiceModality,
  ServiceType,
} from "./service.types";

export type ServicesFiltersValues = {
  search: string;
  type: ServiceType | "";
  modality: ServiceModality | "";
  is_active: "" | "true" | "false";
  is_public: "" | "true" | "false";
  requires_appointment: "" | "true" | "false";
};

export const DEFAULT_SERVICES_FILTERS: ServicesFiltersValues = {
  search: "",
  type: "",
  modality: "",
  is_active: "",
  is_public: "",
  requires_appointment: "",
};
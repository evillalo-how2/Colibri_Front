import type { CreateServiceFormValues } from "../schemas/service.schema";
import type {
  CreateServiceRequest,
  Service,
  UpdateServiceRequest,
} from "../types/service.types";
import { centsToPriceInput, priceInputToCents } from "./serviceFormatters";

function stringToNullableText(value: string): string | null {
  const trimmedValue = value.trim();

  return trimmedValue === "" ? null : trimmedValue;
}

function stringToNullableNumber(value: string): number | null {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    return null;
  }

  return Number(trimmedValue);
}

function nullableNumberToString(value: number | null): string {
  if (value === null) {
    return "";
  }

  return String(value);
}

function nullableTextToString(value: string | null): string {
  return value ?? "";
}

function getMetadataStringValue(
  metadata: Record<string, unknown> | null,
  key: string,
): string {
  const value = metadata?.[key];

  return typeof value === "string" ? value : "";
}

function buildServiceMetadata(values: CreateServiceFormValues) {
  const metadata: Record<string, string> = {};

  const audience = stringToNullableText(values.metadata_audience);
  const deliveryMethod = stringToNullableText(values.metadata_delivery_method);

  if (audience) {
    metadata.audience = audience;
  }

  if (deliveryMethod) {
    metadata.delivery_method = deliveryMethod;
  }

  return Object.keys(metadata).length > 0 ? metadata : null;
}

export function mapCreateServiceFormToRequest(
  values: CreateServiceFormValues,
): CreateServiceRequest {
  return {
    name: values.name.trim(),
    short_description: stringToNullableText(values.short_description),
    description: stringToNullableText(values.description),
    type: values.type,
    modality: values.modality,
    price_cents: priceInputToCents(values.price),
    currency: values.currency,
    duration_minutes: stringToNullableNumber(values.duration_minutes),
    stock_quantity: stringToNullableNumber(values.stock_quantity),
    is_stock_limited: values.is_stock_limited,
    is_active: values.is_active,
    is_public: values.is_public,
    requires_appointment: values.requires_appointment,
    display_order: stringToNullableNumber(values.display_order) ?? 0,
    cover_image_url: stringToNullableText(values.cover_image_url),
    metadata: buildServiceMetadata(values),
  };
}

export function mapUpdateServiceFormToRequest(
  values: CreateServiceFormValues,
): UpdateServiceRequest {
  return {
    name: values.name.trim(),
    short_description: stringToNullableText(values.short_description),
    description: stringToNullableText(values.description),
    type: values.type,
    modality: values.modality,
    price_cents: priceInputToCents(values.price),
    currency: values.currency,
    duration_minutes: stringToNullableNumber(values.duration_minutes),
    stock_quantity: stringToNullableNumber(values.stock_quantity),
    is_stock_limited: values.is_stock_limited,
    is_active: values.is_active,
    is_public: values.is_public,
    requires_appointment: values.requires_appointment,
    display_order: stringToNullableNumber(values.display_order) ?? 0,
    cover_image_url: stringToNullableText(values.cover_image_url),
    metadata: buildServiceMetadata(values),
  };
}

export function mapServiceToServiceFormValues(
  service: Service,
): CreateServiceFormValues {
  return {
    name: service.name,
    short_description: nullableTextToString(service.short_description),
    description: nullableTextToString(service.description),
    type: service.type,
    modality: service.modality,
    price: centsToPriceInput(service.price_cents),
    currency: service.currency,
    duration_minutes: nullableNumberToString(service.duration_minutes),
    is_stock_limited: service.is_stock_limited,
    stock_quantity: nullableNumberToString(service.stock_quantity),
    is_active: service.is_active,
    is_public: service.is_public,
    requires_appointment: service.requires_appointment,
    display_order: String(service.display_order),
    cover_image_url: nullableTextToString(service.cover_image_url),
    metadata_audience: getMetadataStringValue(service.metadata, "audience"),
    metadata_delivery_method: getMetadataStringValue(
      service.metadata,
      "delivery_method",
    ),
  };
}
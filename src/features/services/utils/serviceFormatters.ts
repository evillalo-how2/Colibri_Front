import type { ServiceCurrency } from "../types/service.types";

export function formatServicePrice(
  priceCents: number,
  currency: ServiceCurrency,
): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
  }).format(priceCents / 100);
}

export function priceInputToCents(value: string): number {
  const normalizedValue = value.replace(",", ".").trim();
  const parsedValue = Number(normalizedValue);

  if (Number.isNaN(parsedValue)) {
    return 0;
  }

  return Math.round(parsedValue * 100);
}

export function centsToPriceInput(priceCents: number): string {
  return (priceCents / 100).toFixed(2);
}
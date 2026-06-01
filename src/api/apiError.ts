import { AxiosError } from "axios";

type ApiErrorResponse = {
  detail?: string;
  message?: string;
  error?: {
    message?: string;
  };
};

export function getApiErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    return data?.error?.message ?? data?.message ?? data?.detail ?? fallback;
  }

  return fallback;
}
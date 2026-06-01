import axios from "axios";
import type { ApiErrorResponse } from "../types/api.types";

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.error?.message ||
      "Ocurrió un error al comunicarse con el servidor."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error inesperado.";
}
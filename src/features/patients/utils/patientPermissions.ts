import type { CurrentUser } from "../../auth/types/auth.types";

export function canAccessPatients(currentUser: CurrentUser | null): boolean {
  if (!currentUser) {
    return false;
  }

  return (
    currentUser.is_superuser ||
    currentUser.user_type === "admin" ||
    currentUser.user_type === "psychologist" ||
    currentUser.user_type === "assistant"
  );
}
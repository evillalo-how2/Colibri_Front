import type {
  CurrentUser,
  UserType,
} from "../../auth/types/auth.types";

const APPOINTMENT_ACCESS_USER_TYPES: UserType[] = [
  "admin",
  "psychologist",
  "assistant",
];

const APPOINTMENT_MANAGE_USER_TYPES: UserType[] = [
  "admin",
  "psychologist",
  "assistant",
];

export function canAccessAppointments(
  currentUser: CurrentUser | null,
): boolean {
  if (!currentUser) {
    return false;
  }

  if (currentUser.is_superuser) {
    return true;
  }

  return APPOINTMENT_ACCESS_USER_TYPES.includes(currentUser.user_type);
}

export function canManageAppointments(
  currentUser: CurrentUser | null,
): boolean {
  if (!currentUser) {
    return false;
  }

  if (currentUser.is_superuser) {
    return true;
  }

  return APPOINTMENT_MANAGE_USER_TYPES.includes(currentUser.user_type);
}
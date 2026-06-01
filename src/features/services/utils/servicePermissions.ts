import type {
  CurrentUser,
  UserType,
} from "../../auth/types/auth.types";

const SERVICE_ACCESS_USER_TYPES: UserType[] = [
  "admin",
  "psychologist",
  "assistant",
];

const SERVICE_MANAGE_USER_TYPES: UserType[] = ["admin", "psychologist"];

export function canAccessServices(currentUser: CurrentUser | null): boolean {
  if (!currentUser) {
    return false;
  }

  if (currentUser.is_superuser) {
    return true;
  }

  return SERVICE_ACCESS_USER_TYPES.includes(currentUser.user_type);
}

export function canManageServices(currentUser: CurrentUser | null): boolean {
  if (!currentUser) {
    return false;
  }

  if (currentUser.is_superuser) {
    return true;
  }

  return SERVICE_MANAGE_USER_TYPES.includes(currentUser.user_type);
}

export function canCreateService(currentUser: CurrentUser | null): boolean {
  return canManageServices(currentUser);
}

export function canEditService(currentUser: CurrentUser | null): boolean {
  return canManageServices(currentUser);
}

export function canPublishService(currentUser: CurrentUser | null): boolean {
  return canManageServices(currentUser);
}

export function canToggleServiceStatus(
  currentUser: CurrentUser | null,
): boolean {
  return canManageServices(currentUser);
}
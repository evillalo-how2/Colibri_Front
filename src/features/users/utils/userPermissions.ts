import type { CurrentUser } from "../../auth/types/auth.types";
import type { User } from "../types/user.types";

export function canManageUsers(currentUser: CurrentUser | null): boolean {
  if (!currentUser) {
    return false;
  }

  return currentUser.is_superuser || currentUser.user_type === "admin";
}

export function canChangeUserPasswordForTarget(
  currentUser: CurrentUser | null,
  targetUser: User,
): boolean {
  if (!canManageUsers(currentUser)) {
    return false;
  }

  if (targetUser.is_superuser && !currentUser?.is_superuser) {
    return false;
  }

  return true;
}

export function canToggleUserStatusForTarget(
  currentUser: CurrentUser | null,
  targetUser: User,
): boolean {
  if (!canManageUsers(currentUser)) {
    return false;
  }

  if (currentUser?.id === targetUser.id) {
    return false;
  }

  if (targetUser.is_superuser && !currentUser?.is_superuser) {
    return false;
  }

  return true;
}
import { useEffect, useRef, useState } from "react";

import { Button } from "../../../shared/components/ui/Button";
import type { User } from "../types/user.types";

type UserActionsMenuProps = {
  user: User;
  canChangeUserPassword: boolean;
  canToggleUserStatus: boolean;
  onEditUser: (user: User) => void;
  onEditEmployeeProfile: (user: User) => void;
  onChangeUserRole: (user: User) => void;
  onChangeUserPassword: (user: User) => void;
  onToggleUserStatus: (user: User) => void;
};

export function UserActionsMenu({
  user,
  onEditUser,
  onEditEmployeeProfile,
  onChangeUserRole,
  onToggleUserStatus,
  onChangeUserPassword,
  canChangeUserPassword,
  canToggleUserStatus,
}: UserActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const canHaveEmployeeProfile = [
    "admin",
    "psychologist",
    "assistant",
  ].includes(user.user_type);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function handleEdit() {
    setIsOpen(false);
    onEditUser(user);
  }

  function handleEditEmployeeProfile() {
    setIsOpen(false);
    onEditEmployeeProfile(user);
  }

  function handleChangeRole() {
    setIsOpen(false);
    onChangeUserRole(user);
  }

  function handleToggleStatus() {
    setIsOpen(false);
    onToggleUserStatus(user);
  }

  function handleChangePassword() {
    setIsOpen(false);
    onChangeUserPassword(user);
  }

  return (
    <div ref={menuRef} className="relative inline-flex">
      <Button
        type="button"
        variant="secondary"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="px-4 py-2 text-xs"
      >
        Acciones
      </Button>

      {isOpen ? (
        <div className="absolute right-0 top-12 z-20 w-52 overflow-hidden rounded-2xl border border-[#d6e2e0] bg-white shadow-xl shadow-[#afc4c0]/20">
          <button
            type="button"
            onClick={handleEdit}
            className="block w-full px-4 py-3 text-left text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
          >
            Editar datos
          </button>

          {canHaveEmployeeProfile ? (
            <button
              type="button"
              onClick={handleEditEmployeeProfile}
              className="block w-full px-4 py-3 text-left text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
            >
              Editar perfil laboral
            </button>
          ) : null}

          <button
            type="button"
            onClick={handleChangeRole}
            className="block w-full px-4 py-3 text-left text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
          >
            Cambiar rol
          </button>

          {canToggleUserStatus ? (
            <button
              type="button"
              onClick={handleToggleStatus}
              className={`block w-full px-4 py-3 text-left text-sm transition hover:bg-[#f5f7f6] ${
                user.is_active ? "text-[#9f4f64]" : "text-[#4b4b4b]"
              }`}
            >
              {user.is_active ? "Desactivar usuario" : "Activar usuario"}
            </button>
          ) : null}
          {canChangeUserPassword ? (
            <button
              type="button"
              onClick={handleChangePassword}
              className="block w-full px-4 py-3 text-left text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
            >
              Cambiar contraseña
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

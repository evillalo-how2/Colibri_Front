import { useState } from "react";
import type { Service } from "../types/service.types";

type ServiceActionsMenuProps = {
  service: Service;
  canManage: boolean;
  onEdit: (service: Service) => void;
  onPublish: (service: Service) => void;
  onUnpublish: (service: Service) => void;
  onActivate: (service: Service) => void;
  onDeactivate: (service: Service) => void;
};

export function ServiceActionsMenu({
  service,
  canManage,
  onEdit,
  onPublish,
  onUnpublish,
  onActivate,
  onDeactivate,
}: ServiceActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  function handleEdit() {
    closeMenu();
    onEdit(service);
  }

  function handleTogglePublic() {
    closeMenu();

    if (service.is_public) {
      onUnpublish(service);
      return;
    }

    onPublish(service);
  }

  function handleToggleActive() {
    closeMenu();

    if (service.is_active) {
      onDeactivate(service);
      return;
    }

    onActivate(service);
  }

  if (!canManage) {
    return (
      <span className="text-sm text-[#9fb8b4]">
        Solo lectura
      </span>
    );
  }

  return (
    <div className="relative inline-flex justify-end">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="rounded-2xl border border-[#afc4c0] bg-white px-4 py-2 text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
      >
        Acciones
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-12 z-20 w-52 overflow-hidden rounded-2xl border border-[#d6e2e0] bg-white shadow-lg">
          <button
            type="button"
            onClick={handleEdit}
            className="block w-full px-4 py-3 text-left text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
          >
            Editar
          </button>

          <button
            type="button"
            onClick={handleTogglePublic}
            className="block w-full px-4 py-3 text-left text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
          >
            {service.is_public ? "Ocultar del catálogo" : "Publicar"}
          </button>

          <button
            type="button"
            onClick={handleToggleActive}
            className={
              service.is_active
                ? "block w-full px-4 py-3 text-left text-sm text-[#9f4f64] transition hover:bg-[#f5f7f6]"
                : "block w-full px-4 py-3 text-left text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
            }
          >
            {service.is_active ? "Desactivar" : "Activar"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
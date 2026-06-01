import type {
  PendingServiceAction,
  ServiceActionType,
} from "../types/serviceAction.types";

type ServiceActionConfirmModalProps = {
  pendingAction: PendingServiceAction;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ACTION_CONTENT: Record<
  ServiceActionType,
  {
    title: string;
    description: string;
    confirmLabel: string;
    danger?: boolean;
  }
> = {
  publish: {
    title: "Publicar servicio",
    description:
      "Este servicio será visible en el catálogo público si cumple con la información requerida.",
    confirmLabel: "Publicar",
  },
  unpublish: {
    title: "Ocultar servicio",
    description:
      "Este servicio dejará de mostrarse públicamente, pero seguirá disponible en el panel interno.",
    confirmLabel: "Ocultar",
  },
  activate: {
    title: "Activar servicio",
    description:
      "Este servicio volverá a estar disponible para uso interno dentro del sistema.",
    confirmLabel: "Activar",
  },
  deactivate: {
    title: "Desactivar servicio",
    description:
      "Este servicio se desactivará y también dejará de mostrarse públicamente.",
    confirmLabel: "Desactivar",
    danger: true,
  },
};

export function ServiceActionConfirmModal({
  pendingAction,
  isSubmitting,
  onClose,
  onConfirm,
}: ServiceActionConfirmModalProps) {
  if (!pendingAction) {
    return null;
  }

  const content = ACTION_CONTENT[pendingAction.type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f1f]/40 px-4 py-6 backdrop-blur-sm">
      <section className="w-full max-w-xl rounded-3xl border border-[#d6e2e0] bg-white shadow-2xl">
        <header className="border-b border-[#d6e2e0] px-6 py-5">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#9fb8b4]">
            Confirmación
          </p>

          <h2 className="mt-2 text-2xl font-light text-[#1f1f1f]">
            {content.title}
          </h2>
        </header>

        <div className="space-y-4 px-6 py-6">
          <p className="text-sm leading-6 text-[#7a8588]">
            {content.description}
          </p>

          <div className="rounded-2xl border border-[#d6e2e0] bg-[#f5f7f6] p-4">
            <p className="text-sm font-medium text-[#4b4b4b]">
              {pendingAction.service.name}
            </p>

            <p className="mt-1 text-xs text-[#7a8588]">
              Clave:{" "}
              <span className="font-medium text-[#4b4b4b]">
                {pendingAction.service.catalog_code}
              </span>
            </p>

            <p className="mt-1 text-xs text-[#7a8588]">
              Slug: {pendingAction.service.slug}
            </p>
          </div>
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-[#d6e2e0] px-6 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="rounded-2xl border border-[#afc4c0] bg-white px-5 py-3 text-sm font-medium text-[#4b4b4b] transition hover:bg-[#f5f7f6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={onConfirm}
            className={
              content.danger
                ? "rounded-2xl bg-[#9f4f64] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#8b4357] disabled:cursor-not-allowed disabled:opacity-60"
                : "rounded-2xl bg-[#afc4c0] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#9fb8b4] disabled:cursor-not-allowed disabled:opacity-60"
            }
          >
            {isSubmitting ? "Procesando..." : content.confirmLabel}
          </button>
        </footer>
      </section>
    </div>
  );
}
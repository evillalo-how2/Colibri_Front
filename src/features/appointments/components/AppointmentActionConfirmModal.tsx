import type {
  AppointmentActionType,
  PendingAppointmentAction,
} from "../types/appointmentAction.types";

type AppointmentActionConfirmModalProps = {
  pendingAction: PendingAppointmentAction;
  isSubmitting: boolean;
  reason: string;
  onReasonChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
};

const ACTION_CONTENT: Record<
  AppointmentActionType,
  {
    title: string;
    description: string;
    confirmLabel: string;
    reasonLabel?: string;
    reasonPlaceholder?: string;
    danger?: boolean;
  }
> = {
  confirm: {
    title: "Confirmar cita",
    description:
      "La cita quedará marcada como confirmada dentro de la agenda.",
    confirmLabel: "Confirmar",
  },
  complete: {
    title: "Completar cita",
    description:
      "La cita quedará marcada como completada. Usa esta acción cuando la sesión haya terminado.",
    confirmLabel: "Completar",
  },
  cancel: {
    title: "Cancelar cita",
    description:
      "La cita será cancelada. Esta acción liberará el horario para futuras citas.",
    confirmLabel: "Cancelar cita",
    reasonLabel: "Motivo de cancelación",
    reasonPlaceholder: "Ej. Paciente canceló por WhatsApp.",
    danger: true,
  },
  no_show: {
    title: "Marcar como no asistió",
    description:
      "La cita quedará registrada como no asistida. Puedes agregar una nota administrativa.",
    confirmLabel: "Marcar no asistió",
    reasonLabel: "Nota opcional",
    reasonPlaceholder: "Ej. No respondió mensajes y no se presentó.",
    danger: true,
  },
};

export function AppointmentActionConfirmModal({
  pendingAction,
  isSubmitting,
  reason,
  onReasonChange,
  onClose,
  onConfirm,
}: AppointmentActionConfirmModalProps) {
  if (!pendingAction) {
    return null;
  }

  const content = ACTION_CONTENT[pendingAction.type];
  const requiresReason = pendingAction.type === "cancel";
  const isReasonMissing = requiresReason && reason.trim() === "";

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
              {pendingAction.appointment.patient.full_name}
            </p>

            <p className="mt-1 text-xs text-[#7a8588]">
              Servicio: {pendingAction.appointment.service.name}
            </p>

            <p className="mt-1 text-xs text-[#7a8588]">
              Clave:{" "}
              <span className="font-medium text-[#4b4b4b]">
                {pendingAction.appointment.service.catalog_code}
              </span>
            </p>
          </div>

          {content.reasonLabel ? (
            <label className="space-y-2">
              <span className="text-sm text-[#4b4b4b]">
                {content.reasonLabel}
              </span>

              <textarea
                rows={4}
                value={reason}
                disabled={isSubmitting}
                onChange={(event) => onReasonChange(event.target.value)}
                placeholder={content.reasonPlaceholder}
                className="w-full resize-none rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition placeholder:text-[#a7b1b3] focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
              />

              {isReasonMissing ? (
                <p className="text-sm text-[#9f4f64]">
                  El motivo de cancelación es obligatorio.
                </p>
              ) : null}
            </label>
          ) : null}
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
            disabled={isSubmitting || isReasonMissing}
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
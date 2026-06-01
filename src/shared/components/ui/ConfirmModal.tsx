import { Button } from "./Button";

type ConfirmModalVariant = "default" | "danger";

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  variant?: ConfirmModalVariant;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

const variantClasses: Record<ConfirmModalVariant, string> = {
  default: "text-[#4b4b4b]",
  danger: "text-[#9f4f64]",
};

export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancelar",
  isSubmitting = false,
  variant = "default",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  if (!isOpen) {
    return null;
  }

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f1f]/30 px-4 py-8 backdrop-blur-sm">
      <section className="w-full max-w-lg rounded-[2rem] border border-white/80 bg-white/95 p-8 shadow-2xl shadow-[#afc4c0]/30">
        <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
          Confirmación
        </p>

        <h2 className={`mt-3 text-3xl font-light ${variantClasses[variant]}`}>
          {title}
        </h2>

        <p className="mt-4 text-sm leading-6 text-[#7a8588]">
          {description}
        </p>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            isLoading={isSubmitting}
            className={
              variant === "danger"
                ? "bg-[#e98ba3] hover:bg-[#d97790]"
                : undefined
            }
          >
            {confirmLabel}
          </Button>
        </div>
      </section>
    </div>
  );
}
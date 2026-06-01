import { zodResolver } from "@hookform/resolvers/zod";
import {
  useEffect,
} from "react";
import {
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../../../shared/components/ui/Button";
import { FormError } from "../../../shared/components/ui/FormError";
import { Input } from "../../../shared/components/ui/Input";
import {
  DEFAULT_CREATE_SERVICE_VALUES,
  createServiceSchema,
  type CreateServiceFormValues,
} from "../schemas/service.schema";
import { serviceService } from "../services/serviceService";
import {
  SERVICE_CURRENCIES,
  SERVICE_CURRENCY_LABELS,
  SERVICE_MODALITIES,
  SERVICE_MODALITY_LABELS,
  SERVICE_TYPES,
  SERVICE_TYPE_LABELS,
  type Service,
} from "../types/service.types";
import {
  mapServiceToServiceFormValues,
  mapUpdateServiceFormToRequest,
} from "../utils/serviceMappers";

type EditServiceModalProps = {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onServiceUpdated: () => void;
};

export function EditServiceModal({
  service,
  isOpen,
  onClose,
  onServiceUpdated,
}: EditServiceModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateServiceFormValues>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: DEFAULT_CREATE_SERVICE_VALUES,
  });

  const selectedType = useWatch({
    control,
    name: "type",
  });

  const requiresAppointment = useWatch({
    control,
    name: "requires_appointment",
  });

  const isStockLimited = useWatch({
    control,
    name: "is_stock_limited",
  });

  const isPublic = useWatch({
    control,
    name: "is_public",
  });

  useEffect(() => {
    if (!isOpen || !service) {
      return;
    }

    reset(mapServiceToServiceFormValues(service));
  }, [isOpen, reset, service]);

  if (!isOpen || !service) {
    return null;
  }

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    reset(DEFAULT_CREATE_SERVICE_VALUES);
    onClose();
  }

  const onSubmit: SubmitHandler<CreateServiceFormValues> = async (values) => {
    try {
      const payload = mapUpdateServiceFormToRequest(values);

      await serviceService.updateService(service.id, payload);

      toast.success("Servicio actualizado correctamente.");
      onServiceUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar el servicio.");
    }
  };

  function applySuggestedRulesByType(type: CreateServiceFormValues["type"]) {
    if (type === "therapy") {
      setValue("requires_appointment", true, { shouldValidate: true });
      setValue("duration_minutes", "60", { shouldValidate: true });
      setValue("is_stock_limited", false, { shouldValidate: true });
      setValue("stock_quantity", "", { shouldValidate: true });
      return;
    }

    if (type === "digital_product") {
      setValue("requires_appointment", false, { shouldValidate: true });
      setValue("duration_minutes", "", { shouldValidate: true });
      setValue("is_stock_limited", false, { shouldValidate: true });
      setValue("stock_quantity", "", { shouldValidate: true });
      setValue("modality", "digital", { shouldValidate: true });
      return;
    }

    if (type === "book" || type === "physical_product") {
      setValue("requires_appointment", false, { shouldValidate: true });
      setValue("duration_minutes", "", { shouldValidate: true });
      setValue("modality", "not_applicable", { shouldValidate: true });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f1f]/40 px-4 py-6 backdrop-blur-sm">
      <section className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-[#d6e2e0] bg-white shadow-2xl">
        <header className="border-b border-[#d6e2e0] px-6 py-5">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#9fb8b4]">
            Catálogo
          </p>

          <h2 className="mt-2 text-2xl font-light text-[#1f1f1f]">
            Editar servicio
          </h2>

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#7a8588]">
            <span className="rounded-full bg-[#f5f7f6] px-3 py-1">
              Clave:{" "}
              <span className="font-medium text-[#4b4b4b]">
                {service.catalog_code}
              </span>
            </span>

            <span className="rounded-full bg-[#f5f7f6] px-3 py-1">
              Slug: {service.slug}
            </span>
          </div>
        </header>

        <form
          id="edit-service-form"
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="min-h-0 flex-1 space-y-8 overflow-y-auto px-6 py-6">
            <section className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Input
                  label="Nombre"
                  placeholder="Sesión individual online"
                  disabled={isSubmitting}
                  {...register("name")}
                />
                <FormError message={errors.name?.message} />
              </div>

              <div className="md:col-span-2">
                <Input
                  label="Descripción corta"
                  placeholder="Acompañamiento psicológico individual por videollamada."
                  disabled={isSubmitting}
                  {...register("short_description")}
                />
                <FormError message={errors.short_description?.message} />
              </div>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm text-[#4b4b4b]">
                  Descripción completa
                </span>
                <textarea
                  rows={4}
                  placeholder="Describe qué incluye, a quién va dirigido y cómo se entrega."
                  disabled={isSubmitting}
                  className="w-full resize-none rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition placeholder:text-[#a7b1b3] focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
                  {...register("description")}
                />
                <FormError message={errors.description?.message} />
              </label>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              <label className="space-y-2">
                <span className="text-sm text-[#4b4b4b]">Tipo</span>
                <select
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
                  {...register("type", {
                    onChange: (event) =>
                      applySuggestedRulesByType(event.target.value),
                  })}
                >
                  {SERVICE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {SERVICE_TYPE_LABELS[type]}
                    </option>
                  ))}
                </select>
                <FormError message={errors.type?.message} />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-[#4b4b4b]">Modalidad</span>
                <select
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
                  {...register("modality")}
                >
                  {SERVICE_MODALITIES.map((modality) => (
                    <option key={modality} value={modality}>
                      {SERVICE_MODALITY_LABELS[modality]}
                    </option>
                  ))}
                </select>
                <FormError message={errors.modality?.message} />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-[#4b4b4b]">Moneda</span>
                <select
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
                  {...register("currency")}
                >
                  {SERVICE_CURRENCIES.map((currency) => (
                    <option key={currency} value={currency}>
                      {SERVICE_CURRENCY_LABELS[currency]}
                    </option>
                  ))}
                </select>
                <FormError message={errors.currency?.message} />
              </label>

              <div>
                <Input
                  label="Precio"
                  placeholder="850.00"
                  inputMode="decimal"
                  disabled={isSubmitting}
                  {...register("price")}
                />
                <FormError message={errors.price?.message} />
              </div>

              <div>
                <Input
                  label="Duración en minutos"
                  placeholder="60"
                  inputMode="numeric"
                  disabled={isSubmitting || !requiresAppointment}
                  {...register("duration_minutes")}
                />
                <FormError message={errors.duration_minutes?.message} />
              </div>

              <div>
                <Input
                  label="Orden"
                  placeholder="0"
                  inputMode="numeric"
                  disabled={isSubmitting}
                  {...register("display_order")}
                />
                <FormError message={errors.display_order?.message} />
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <label className="flex items-start gap-3 rounded-2xl border border-[#d6e2e0] bg-[#f5f7f6] p-4">
                <input
                  type="checkbox"
                  className="mt-1"
                  disabled={isSubmitting}
                  {...register("requires_appointment")}
                />
                <span>
                  <span className="block text-sm font-medium text-[#4b4b4b]">
                    Requiere cita
                  </span>
                  <span className="text-sm text-[#7a8588]">
                    Úsalo para sesiones, terapias o actividades con agenda.
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-[#d6e2e0] bg-[#f5f7f6] p-4">
                <input
                  type="checkbox"
                  className="mt-1"
                  disabled={isSubmitting}
                  {...register("is_stock_limited")}
                />
                <span>
                  <span className="block text-sm font-medium text-[#4b4b4b]">
                    Maneja stock
                  </span>
                  <span className="text-sm text-[#7a8588]">
                    Úsalo para libros o productos físicos limitados.
                  </span>
                </span>
              </label>

              {isStockLimited ? (
                <div>
                  <Input
                    label="Cantidad en stock"
                    placeholder="10"
                    inputMode="numeric"
                    disabled={isSubmitting}
                    {...register("stock_quantity")}
                  />
                  <FormError message={errors.stock_quantity?.message} />
                </div>
              ) : null}

              <label className="flex items-start gap-3 rounded-2xl border border-[#d6e2e0] bg-[#f5f7f6] p-4">
                <input
                  type="checkbox"
                  className="mt-1"
                  disabled={isSubmitting}
                  {...register("is_active")}
                />
                <span>
                  <span className="block text-sm font-medium text-[#4b4b4b]">
                    Activo
                  </span>
                  <span className="text-sm text-[#7a8588]">
                    El servicio puede usarse internamente.
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-[#d6e2e0] bg-[#f5f7f6] p-4">
                <input
                  type="checkbox"
                  className="mt-1"
                  disabled={isSubmitting}
                  {...register("is_public")}
                />
                <span>
                  <span className="block text-sm font-medium text-[#4b4b4b]">
                    Público
                  </span>
                  <span className="text-sm text-[#7a8588]">
                    Se mostrará en el catálogo público.
                  </span>
                </span>
              </label>
            </section>

            {isPublic ? (
              <div className="rounded-2xl border border-[#d6e2e0] bg-[#f5f7f6] p-4 text-sm text-[#7a8588]">
                Para publicar, el servicio debe tener nombre, descripción corta
                y descripción completa.
              </div>
            ) : null}

            <section className="grid gap-4 md:grid-cols-2">
              <div>
                <Input
                  label="URL de imagen"
                  placeholder="https://..."
                  disabled={isSubmitting}
                  {...register("cover_image_url")}
                />
                <FormError message={errors.cover_image_url?.message} />
              </div>

              <div>
                <Input
                  label="Audiencia"
                  placeholder="Adolescentes y adultos"
                  disabled={isSubmitting}
                  {...register("metadata_audience")}
                />
                <FormError message={errors.metadata_audience?.message} />
              </div>

              <div>
                <Input
                  label="Método de entrega"
                  placeholder="Videollamada, consultorio, descarga digital..."
                  disabled={isSubmitting}
                  {...register("metadata_delivery_method")}
                />
                <FormError message={errors.metadata_delivery_method?.message} />
              </div>
            </section>

            <div className="rounded-2xl border border-[#d6e2e0] bg-[#f5f7f6] p-4 text-sm text-[#7a8588]">
              Tipo seleccionado:{" "}
              <span className="font-medium text-[#4b4b4b]">
                {SERVICE_TYPE_LABELS[selectedType]}
              </span>
            </div>
          </div>

          <footer className="flex flex-col-reverse gap-3 border-t border-[#d6e2e0] px-6 py-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              disabled={isSubmitting}
              onClick={handleClose}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              form="edit-service-form"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </Button>
          </footer>
        </form>
      </section>
    </div>
  );
}
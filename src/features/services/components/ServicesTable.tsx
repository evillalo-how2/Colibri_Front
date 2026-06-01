import type { Service } from "../types/service.types";
import { formatServicePrice } from "../utils/serviceFormatters";
import { ServiceActiveBadge } from "./ServiceActiveBadge";
import { ServiceAppointmentBadge } from "./ServiceAppointmentBadge";
import { ServiceModalityBadge } from "./ServiceModalityBadge";
import { ServiceTypeBadge } from "./ServiceTypeBadge";
import { ServiceActionsMenu } from "./ServiceActionsMenu";
import { ServiceVisibilityBadge } from "./ServiceVisibilityBadge";

type ServicesTableProps = {
  services: Service[];
  isLoading: boolean;
  canManage: boolean;
  onEditService: (service: Service) => void;
  onPublishService: (service: Service) => void;
  onUnpublishService: (service: Service) => void;
  onActivateService: (service: Service) => void;
  onDeactivateService: (service: Service) => void;
};

function formatStock(service: Service) {
  if (!service.is_stock_limited) {
    return "No limitado";
  }

  return `${service.stock_quantity ?? 0} disponibles`;
}

function formatDuration(service: Service) {
  if (!service.duration_minutes) {
    return "Sin duración";
  }

  return `${service.duration_minutes} min`;
}

export function ServicesTable({
  services,
  isLoading,
  canManage,
  onEditService,
  onPublishService,
  onUnpublishService,
  onActivateService,
  onDeactivateService,
}: ServicesTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl bg-[#f5f7f6] p-6 text-sm text-[#7a8588]">
        Cargando servicios...
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="rounded-2xl bg-[#f5f7f6] p-6 text-sm text-[#7a8588]">
        No hay servicios registrados con los filtros seleccionados.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1320px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#d6e2e0] text-xs uppercase tracking-[0.25em] text-[#9fb8b4]">
              <th className="w-[340px] px-5 py-4 font-normal">Servicio</th>
              <th className="px-5 py-4 font-normal">Tipo</th>
              <th className="px-5 py-4 font-normal">Modalidad</th>
              <th className="px-5 py-4 font-normal">Precio</th>
              <th className="px-5 py-4 font-normal">Duración</th>
              <th className="px-5 py-4 font-normal">Cita</th>
              <th className="px-5 py-4 font-normal">Estado</th>
              <th className="px-5 py-4 font-normal">Visibilidad</th>
              <th className="px-5 py-4 font-normal">Stock</th>
              <th className="px-5 py-4 text-right font-medium">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className="border-b border-[#d6e2e0]/70 text-sm text-[#4b4b4b] last:border-b-0 hover:bg-[#f5f7f6]/80"
              >
                <td className="px-5 py-5 align-middle">
                  <div className="max-w-[340px] py-1">
                    <p className="text-sm font-semibold text-[#4b4b4b]">
                      {service.name}
                    </p>

                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#7a8588]">
                      {service.short_description ||
                        "Sin descripción corta registrada."}
                    </p>

                    <div className="mt-3 space-y-1 text-xs text-[#9fb8b4]">
                      <p>
                        Clave:{" "}
                        <span className="font-medium text-[#4b4b4b]">
                          {service.catalog_code}
                        </span>
                      </p>

                      <p>Slug: {service.slug}</p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py- align-middle">
                  <div className="whitespace-nowrap">
                    <ServiceTypeBadge type={service.type} />
                  </div>
                </td>

                <td className="px-5 py-5 align-middle">
                  <div className="whitespace-nowrap">
                    <ServiceModalityBadge modality={service.modality} />
                  </div>
                </td>

                <td className="px-5 py-5 align-middle">
                  <p className="whitespace-nowrap font-medium text-[#1f1f1f]">
                    {formatServicePrice(service.price_cents, service.currency)}
                  </p>

                  <p className="mt-1 text-xs text-[#7a8588]">
                    {service.currency}
                  </p>
                </td>

                <td className="whitespace-nowrap px-5 py-5 align-middle text-sm text-[#7a8588]">
                  {formatDuration(service)}
                </td>

                <td className="px-5 py-5 align-middle">
                  <div className="whitespace-nowrap">
                    <ServiceAppointmentBadge
                      requiresAppointment={service.requires_appointment}
                    />
                  </div>
                </td>

                <td className="px-5 py-5 align-middle">
                  <div className="whitespace-nowrap">
                    <ServiceActiveBadge isActive={service.is_active} />
                  </div>
                </td>

                <td className="px-5 py-5 align-middle">
                  <div className="whitespace-nowrap">
                    <ServiceVisibilityBadge isPublic={service.is_public} />
                  </div>
                </td>

                <td className="whitespace-nowrap px-5 py-5 align-middle text-sm text-[#7a8588]">
                  {formatStock(service)}
                </td>

                <td className="px-5 py-5 text-right align-middle">
                  <ServiceActionsMenu
                    service={service}
                    canManage={canManage}
                    onEdit={onEditService}
                    onPublish={onPublishService}
                    onUnpublish={onUnpublishService}
                    onActivate={onActivateService}
                    onDeactivate={onDeactivateService}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

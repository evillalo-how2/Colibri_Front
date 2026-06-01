import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuthStore } from "../../auth/store/authStore";
import { CreateServiceModal } from "../components/CreateServiceModal";
import { EditServiceModal } from "../components/EditServiceModal";
import { ServiceActionConfirmModal } from "../components/ServiceActionConfirmModal";
import { ServicesFilters } from "../components/ServicesFilters";
import { ServicesTable } from "../components/ServicesTable";
import { serviceService } from "../services/serviceService";
import type {
  PendingServiceAction,
  ServiceActionType,
} from "../types/serviceAction.types";
import {
  DEFAULT_SERVICES_FILTERS,
  type ServicesFiltersValues,
} from "../types/serviceFilters.types";
import type { Service, ServicesListQuery } from "../types/service.types";
import { canManageServices } from "../utils/servicePermissions";

const INITIAL_SERVICES_QUERY: ServicesListQuery = {
  page: 1,
  limit: 10,
};

function stringBooleanToBoolean(value: "" | "true" | "false") {
  if (value === "") {
    return undefined;
  }

  return value === "true";
}

function buildServicesQuery(filters: ServicesFiltersValues): ServicesListQuery {
  return {
    search: filters.search || undefined,
    type: filters.type || undefined,
    modality: filters.modality || undefined,
    is_active: stringBooleanToBoolean(filters.is_active),
    is_public: stringBooleanToBoolean(filters.is_public),
    requires_appointment: stringBooleanToBoolean(filters.requires_appointment),
    page: 1,
    limit: 10,
  };
}

export function ServicesPage() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const canManage = canManageServices(currentUser);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<ServicesFiltersValues>(
    DEFAULT_SERVICES_FILTERS,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [pendingAction, setPendingAction] =
    useState<PendingServiceAction>(null);
  const [isActionSubmitting, setIsActionSubmitting] = useState(false);

  async function fetchServices(query: ServicesListQuery) {
    try {
      setIsLoading(true);

      const response = await serviceService.getServices(query);

      setServices(response.items);
      setTotal(response.total);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar los servicios.");
    } finally {
      setIsLoading(false);
    }
  }

  function openServiceActionConfirm(type: ServiceActionType, service: Service) {
    setPendingAction({
      type,
      service,
    });
  }

  function closeServiceActionConfirm() {
    if (isActionSubmitting) {
      return;
    }

    setPendingAction(null);
  }

  function handleSearch() {
    void fetchServices(buildServicesQuery(filters));
  }

  function handleClearFilters() {
    setFilters(DEFAULT_SERVICES_FILTERS);
    void fetchServices(INITIAL_SERVICES_QUERY);
  }

  function handleServiceCreated() {
    void fetchServices(buildServicesQuery(filters));
  }

  function handleEditService(service: Service) {
    setSelectedService(service);
  }

  function handleCloseEditModal() {
    setSelectedService(null);
  }

  function handleServiceUpdated() {
    void fetchServices(buildServicesQuery(filters));
  }

  function handlePublishService(service: Service) {
    openServiceActionConfirm("publish", service);
  }

  function handleUnpublishService(service: Service) {
    openServiceActionConfirm("unpublish", service);
  }

  function handleActivateService(service: Service) {
    openServiceActionConfirm("activate", service);
  }

  function handleDeactivateService(service: Service) {
    openServiceActionConfirm("deactivate", service);
  }

  async function handleConfirmServiceAction() {
    if (!pendingAction) {
      return;
    }

    try {
      setIsActionSubmitting(true);

      if (pendingAction.type === "publish") {
        await serviceService.publishService(pendingAction.service.id);
        toast.success("Servicio publicado correctamente.");
      }

      if (pendingAction.type === "unpublish") {
        await serviceService.unpublishService(pendingAction.service.id);
        toast.success("Servicio ocultado correctamente.");
      }

      if (pendingAction.type === "activate") {
        await serviceService.activateService(pendingAction.service.id);
        toast.success("Servicio activado correctamente.");
      }

      if (pendingAction.type === "deactivate") {
        await serviceService.deactivateService(pendingAction.service.id);
        toast.success("Servicio desactivado correctamente.");
      }

      setPendingAction(null);
      await fetchServices(buildServicesQuery(filters));
    } catch (error) {
      console.error(error);

      if (pendingAction.type === "publish") {
        toast.error(
          "No se pudo publicar el servicio. Revisa que tenga descripción corta y descripción completa.",
        );
        return;
      }

      toast.error("No se pudo completar la acción.");
    } finally {
      setIsActionSubmitting(false);
    }
  }

  useEffect(() => {
    let shouldIgnoreResponse = false;

    serviceService
      .getServices(INITIAL_SERVICES_QUERY)
      .then((response) => {
        if (shouldIgnoreResponse) {
          return;
        }

        setServices(response.items);
        setTotal(response.total);
      })
      .catch((error) => {
        if (shouldIgnoreResponse) {
          return;
        }

        console.error(error);
        toast.error("No se pudieron cargar los servicios.");
      })
      .finally(() => {
        if (shouldIgnoreResponse) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      shouldIgnoreResponse = true;
    };
  }, []);

  return (
    <section className="space-y-6">
      <header className="rounded-[2rem] border border-[#d6e2e0] bg-white px-6 py-5 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#9fb8b4]">
          Catálogo
        </p>

        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-light text-[#1f1f1f]">
              Servicios y productos
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-[#7a8588]">
              Administra sesiones, talleres, cursos, libros, productos
              digitales, eventos y otros elementos del catálogo.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#d6e2e0] px-4 py-2 text-sm text-[#4b4b4b]">
                {total} servicio{total === 1 ? "" : "s"} encontrado
                {total === 1 ? "" : "s"}
              </span>

              <span className="rounded-full bg-[#f5f7f6] px-4 py-2 text-sm text-[#7a8588]">
                Página 1 · Límite 10
              </span>
            </div>
          </div>

          {canManage ? (
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="rounded-2xl bg-[#afc4c0] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#9fb8b4]"
            >
              Nuevo servicio
            </button>
          ) : null}
        </div>
      </header>

      <ServicesFilters
        values={filters}
        isLoading={isLoading}
        onChange={setFilters}
        onSearch={handleSearch}
        onClear={handleClearFilters}
      />

      <ServicesTable
        services={services}
        isLoading={isLoading}
        canManage={canManage}
        onEditService={handleEditService}
        onPublishService={handlePublishService}
        onUnpublishService={handleUnpublishService}
        onActivateService={handleActivateService}
        onDeactivateService={handleDeactivateService}
      />

      <CreateServiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onServiceCreated={handleServiceCreated}
      />

      <EditServiceModal
        isOpen={Boolean(selectedService)}
        service={selectedService}
        onClose={handleCloseEditModal}
        onServiceUpdated={handleServiceUpdated}
      />

      <ServiceActionConfirmModal
        pendingAction={pendingAction}
        isSubmitting={isActionSubmitting}
        onClose={closeServiceActionConfirm}
        onConfirm={() => {
          void handleConfirmServiceAction();
        }}
      />
    </section>
  );
}

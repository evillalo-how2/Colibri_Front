import { endpoints } from "../../../api/endpoints";
import { http } from "../../../api/http";
import type {
  CreateServiceRequest,
  Service,
  ServicesListQuery,
  ServicesListResponse,
  UpdateServiceRequest,
} from "../types/service.types";

function buildServicesQueryParams(query?: ServicesListQuery) {
  if (!query) {
    return {};
  }

  return {
    search: query.search || undefined,
    type: query.type || undefined,
    modality: query.modality || undefined,
    is_active: query.is_active,
    is_public: query.is_public,
    requires_appointment: query.requires_appointment,
    page: query.page,
    limit: query.limit,
  };
}

export const serviceService = {
  async getServices(query?: ServicesListQuery): Promise<ServicesListResponse> {
    const response = await http.get<ServicesListResponse>(
      endpoints.services.base,
      {
        params: buildServicesQueryParams(query),
      },
    );

    return response.data;
  },

  async getServiceById(serviceId: string): Promise<Service> {
    const response = await http.get<Service>(
      endpoints.services.byId(serviceId),
    );

    return response.data;
  },

  async createService(payload: CreateServiceRequest): Promise<Service> {
    const response = await http.post<Service>(
      endpoints.services.base,
      payload,
    );

    return response.data;
  },

  async updateService(
    serviceId: string,
    payload: UpdateServiceRequest,
  ): Promise<Service> {
    const response = await http.patch<Service>(
      endpoints.services.byId(serviceId),
      payload,
    );

    return response.data;
  },

  async activateService(serviceId: string): Promise<Service> {
    const response = await http.patch<Service>(
      endpoints.services.activate(serviceId),
    );

    return response.data;
  },

  async deactivateService(serviceId: string): Promise<Service> {
    const response = await http.patch<Service>(
      endpoints.services.deactivate(serviceId),
    );

    return response.data;
  },

  async publishService(serviceId: string): Promise<Service> {
    const response = await http.patch<Service>(
      endpoints.services.publish(serviceId),
    );

    return response.data;
  },

  async unpublishService(serviceId: string): Promise<Service> {
    const response = await http.patch<Service>(
      endpoints.services.unpublish(serviceId),
    );

    return response.data;
  },
};
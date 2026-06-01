import { endpoints } from "../../../api/endpoints";
import { http } from "../../../api/http";
import type {
  Appointment,
  AppointmentsListQuery,
  AppointmentsListResponse,
  CancelAppointmentRequest,
  CreateAppointmentRequest,
  NoShowAppointmentRequest,
  RescheduleAppointmentRequest,
  UpdateAppointmentRequest,
} from "../types/appointment.types";

function buildAppointmentsQueryParams(query?: AppointmentsListQuery) {
  if (!query) {
    return {};
  }

  return {
    search: query.search || undefined,
    patient_id: query.patient_id || undefined,
    service_id: query.service_id || undefined,
    status: query.status || undefined,
    modality: query.modality || undefined,
    date_from: query.date_from || undefined,
    date_to: query.date_to || undefined,
    created_source: query.created_source || undefined,
    created_by_user_id: query.created_by_user_id || undefined,
    assigned_to_user_id: query.assigned_to_user_id || undefined,
    page: query.page,
    limit: query.limit,
  };
}

export const appointmentService = {
  async getAppointments(
    query?: AppointmentsListQuery,
  ): Promise<AppointmentsListResponse> {
    const response = await http.get<AppointmentsListResponse>(
      endpoints.appointments.base,
      {
        params: buildAppointmentsQueryParams(query),
      },
    );

    return response.data;
  },

  async getAppointmentById(appointmentId: string): Promise<Appointment> {
    const response = await http.get<Appointment>(
      endpoints.appointments.byId(appointmentId),
    );

    return response.data;
  },

  async createAppointment(
    payload: CreateAppointmentRequest,
  ): Promise<Appointment> {
    const response = await http.post<Appointment>(
      endpoints.appointments.base,
      payload,
    );

    return response.data;
  },

  async updateAppointment(
    appointmentId: string,
    payload: UpdateAppointmentRequest,
  ): Promise<Appointment> {
    const response = await http.patch<Appointment>(
      endpoints.appointments.byId(appointmentId),
      payload,
    );

    return response.data;
  },

  async confirmAppointment(appointmentId: string): Promise<Appointment> {
    const response = await http.patch<Appointment>(
      endpoints.appointments.confirm(appointmentId),
    );

    return response.data;
  },

  async completeAppointment(appointmentId: string): Promise<Appointment> {
    const response = await http.patch<Appointment>(
      endpoints.appointments.complete(appointmentId),
    );

    return response.data;
  },

  async cancelAppointment(
    appointmentId: string,
    payload: CancelAppointmentRequest,
  ): Promise<Appointment> {
    const response = await http.patch<Appointment>(
      endpoints.appointments.cancel(appointmentId),
      payload,
    );

    return response.data;
  },

  async markAppointmentNoShow(
    appointmentId: string,
    payload: NoShowAppointmentRequest,
  ): Promise<Appointment> {
    const response = await http.patch<Appointment>(
      endpoints.appointments.noShow(appointmentId),
      payload,
    );

    return response.data;
  },

  async rescheduleAppointment(
    appointmentId: string,
    payload: RescheduleAppointmentRequest,
  ): Promise<Appointment> {
    const response = await http.patch<Appointment>(
      endpoints.appointments.reschedule(appointmentId),
      payload,
    );

    return response.data;
  },
};

export const endpoints = {
  auth: {
    login: "/auth/login",
    me: "/auth/me",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    logoutAll: "/auth/logout-all",
    changePassword: "/auth/change-password",
  },
  users: {
    base: "/users",
    byId: (userId: string) => `/users/${userId}`,
    role: (userId: string) => `/users/${userId}/role`,
    activate: (userId: string) => `/users/${userId}/activate`,
    deactivate: (userId: string) => `/users/${userId}/deactivate`,
    profile: (userId: string) => `/users/${userId}/profile`,
    password: (userId: string) => `/users/${userId}/password`,
  },
  patients: {
    base: "/patients",
    byId: (patientId: string) => `/patients/${patientId}`,
    status: (patientId: string) => `/patients/${patientId}/status`,
  },
  services: {
    base: "/services",
    byId: (serviceId: string) => `/services/${serviceId}`,
    activate: (serviceId: string) => `/services/${serviceId}/activate`,
    deactivate: (serviceId: string) => `/services/${serviceId}/deactivate`,
    publish: (serviceId: string) => `/services/${serviceId}/publish`,
    unpublish: (serviceId: string) => `/services/${serviceId}/unpublish`,
  },
  appointments: {
    base: "/appointments",
    byId: (appointmentId: string) => `/appointments/${appointmentId}`,
    confirm: (appointmentId: string) =>
      `/appointments/${appointmentId}/confirm`,
    complete: (appointmentId: string) =>
      `/appointments/${appointmentId}/complete`,
    cancel: (appointmentId: string) => `/appointments/${appointmentId}/cancel`,
    noShow: (appointmentId: string) => `/appointments/${appointmentId}/no-show`,
    reschedule: (appointmentId: string) =>
      `/appointments/${appointmentId}/reschedule`,
  },
} as const;

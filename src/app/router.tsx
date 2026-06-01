import { createBrowserRouter, Navigate } from "react-router-dom";

import {
  LazyAppointmentsPage,
  LazyDashboardPage,
  LazyLandingPage,
  LazyLoginPage,
  LazyPatientsPage,
  LazyServicesPage,
  LazyUsersPage,
} from "./lazyRouteElements";

import { AdminRoute } from "../routes/AdminRoute";
import { PrivateRoute } from "../routes/PrivateRoute";
import { PublicRoute } from "../routes/PublicRoute";
import { PatientsRoute } from "../routes/PatientsRoute";
import { ServicesRoute } from "../routes/ServicesRoute";
import { AppointmentsRoute } from "../routes/AppointmentsRoute";

import { PrivateLayout } from "../layouts/PrivateLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LazyLandingPage />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LazyLoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <LazyDashboardPage />,
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <LazyUsersPage />
          </AdminRoute>
        ),
      },
      {
        path: "patients",
        element: (
          <PatientsRoute>
            <LazyPatientsPage />
          </PatientsRoute>
        ),
      },
      {
        path: "services",
        element: (
          <ServicesRoute>
            <LazyServicesPage />
          </ServicesRoute>
        ),
      },
      {
        path: "appointments",
        element: (
          <AppointmentsRoute>
            <LazyAppointmentsPage />
          </AppointmentsRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
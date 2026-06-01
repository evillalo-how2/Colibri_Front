import { lazy } from "react";

import { SuspenseRoute } from "../shared/components/ui/SuspenseRoute";

const LandingPage = lazy(() =>
    import("../features/landing/pages/LandingPage").then((module) => ({
        default: module.LandingPage,
    }))
);

const LoginPage = lazy(() =>
    import("../features/auth/pages/LoginPage").then((module) => ({
        default: module.LoginPage,
    }))
);

const DashboardPage = lazy(() =>
    import("../pages/DashboardPage").then((module) => ({
        default: module.DashboardPage,
    }))
);

const UsersPage = lazy(() =>
    import("../features/users/pages/UsersPage").then((module) => ({
        default: module.UsersPage,
    }))
);

const PatientsPage = lazy(() =>
    import("../features/patients/pages/PatientsPage").then((module) => ({
        default: module.PatientsPage,
    }))
);

const ServicesPage = lazy(() =>
    import("../features/services/pages/ServicesPage").then((module) => ({
        default: module.ServicesPage,
    }))
);

const AppointmentsPage = lazy(() =>
    import("../features/appointments/pages/AppointmentsPage").then((module) => ({
        default: module.AppointmentsPage,
    }))
);

export function LazyLandingPage() {
    return (
        <SuspenseRoute>
            <LandingPage />
        </SuspenseRoute>
    );
}

export function LazyLoginPage() {
    return (
        <SuspenseRoute>
            <LoginPage />
        </SuspenseRoute>
    );
}

export function LazyDashboardPage() {
    return (
        <SuspenseRoute>
            <DashboardPage />
        </SuspenseRoute>
    );
}

export function LazyUsersPage() {
    return (
        <SuspenseRoute>
            <UsersPage />
        </SuspenseRoute>
    );
}

export function LazyPatientsPage() {
    return (
        <SuspenseRoute>
            <PatientsPage />
        </SuspenseRoute>
    );
}

export function LazyServicesPage() {
    return (
        <SuspenseRoute>
            <ServicesPage />
        </SuspenseRoute>
    );
}

export function LazyAppointmentsPage() {
    return (
        <SuspenseRoute>
            <AppointmentsPage />
        </SuspenseRoute>
    );
}
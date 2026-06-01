import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuthStore } from "../store/authStore";
import { RouteLoader } from "../../../shared/components/ui/RouteLoader";

type AuthSessionGateProps = {
    children: ReactNode;
    access: "private" | "public";
};

export function AuthSessionGate({ children, access }: AuthSessionGateProps) {
    const location = useLocation();

    const currentUser = useAuthStore((state) => state.currentUser);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isBootstrapping = useAuthStore((state) => state.isBootstrapping);
    const hasBootstrapped = useAuthStore((state) => state.hasBootstrapped);
    const bootstrapSession = useAuthStore((state) => state.bootstrapSession);

    useEffect(() => {
        if (!hasBootstrapped && !isBootstrapping) {
            void bootstrapSession();
        }
    }, [bootstrapSession, hasBootstrapped, isBootstrapping]);

    if (!hasBootstrapped || isBootstrapping) {
        return (
            <RouteLoader
                title="Validando sesión"
                description="Estamos revisando tu acceso de forma segura."
            />
        );
    }

    if (access === "private" && (!isAuthenticated || !currentUser)) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (access === "public" && isAuthenticated && currentUser) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
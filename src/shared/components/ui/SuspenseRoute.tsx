import { Suspense, type ReactNode } from "react";
import { RouteLoader } from "./RouteLoader";

type SuspenseRouteProps = {
    children: ReactNode;
};

export function SuspenseRoute({ children }: SuspenseRouteProps) {
    return (
        <Suspense
            fallback={
                <RouteLoader
                    title="Cargando vista"
                    description="Preparando el contenido..."
                />
            }
        >
            {children}
        </Suspense>
    );
}
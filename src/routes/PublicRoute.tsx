import type { ReactNode } from "react";
import { AuthSessionGate } from "../features/auth/components/AuthSessionGate";

type PublicRouteProps = {
  children: ReactNode;
};

export function PublicRoute({ children }: PublicRouteProps) {
  return <AuthSessionGate access="public">{children}</AuthSessionGate>;
}
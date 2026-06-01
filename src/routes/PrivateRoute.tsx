import type { ReactNode } from "react";
import { AuthSessionGate } from "../features/auth/components/AuthSessionGate";

type PrivateRouteProps = {
  children: ReactNode;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  return <AuthSessionGate access="private">{children}</AuthSessionGate>;
}
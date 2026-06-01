import type { Service } from "./service.types";

export type ServiceActionType =
  | "publish"
  | "unpublish"
  | "activate"
  | "deactivate";

export type PendingServiceAction = {
  type: ServiceActionType;
  service: Service;
} | null;
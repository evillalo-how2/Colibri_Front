import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { endpoints } from "./endpoints";
import { env } from "../shared/config/env";
import type { AccessTokenResponse } from "../features/auth/types/auth.types";

type RetriableAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let accessTokenMemory: string | null = null;
let refreshPromise: Promise<string> | null = null;
let sessionExpiredHandler: (() => void) | null = null;
let accessTokenRefreshedHandler: ((accessToken: string) => void) | null = null;

const authPathsToSkipRefresh = new Set<string>([
  endpoints.auth.login,
  endpoints.auth.refresh,
  endpoints.auth.logout,
  endpoints.auth.logoutAll,
  endpoints.auth.changePassword,
]);

export function setHttpAccessToken(accessToken: string | null): void {
  accessTokenMemory = accessToken;
}

export function getHttpAccessToken(): string | null {
  return accessTokenMemory;
}

export function setSessionExpiredHandler(handler: (() => void) | null): void {
  sessionExpiredHandler = handler;
}

export function setAccessTokenRefreshedHandler(
  handler: ((accessToken: string) => void) | null,
): void {
  accessTokenRefreshedHandler = handler;
}

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Cliente limpio, sin interceptors.
 * Se usa exclusivamente para refresh automático y evitar loops.
 */
const refreshHttp = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

function shouldSkipRefresh(url?: string): boolean {
  if (!url) {
    return true;
  }

  return authPathsToSkipRefresh.has(url);
}

async function refreshAccessTokenOnce(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshHttp
      .post<AccessTokenResponse>(endpoints.auth.refresh)
      .then((response) => {
        const newAccessToken = response.data.access_token;

        setHttpAccessToken(newAccessToken);
        accessTokenRefreshedHandler?.(newAccessToken);

        return newAccessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

http.interceptors.request.use((config) => {
  if (accessTokenMemory) {
    config.headers.Authorization = `Bearer ${accessTokenMemory}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | RetriableAxiosRequestConfig
      | undefined;

    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry || shouldSkipRefresh(originalRequest.url)) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshAccessTokenOnce();

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return http(originalRequest as AxiosRequestConfig);
    } catch (refreshError) {
      setHttpAccessToken(null);
      sessionExpiredHandler?.();

      return Promise.reject(refreshError);
    }
  },
);
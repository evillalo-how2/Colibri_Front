import { create } from "zustand";
import {
  setAccessTokenRefreshedHandler,
  setHttpAccessToken,
  setSessionExpiredHandler,
} from "../../../api/http";
import { getApiErrorMessage } from "../../../shared/utils/apiError";
import { authService } from "../services/authService";
import type { CurrentUser, LoginRequest } from "../types/auth.types";

type AuthState = {
  accessToken: string | null;
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isBootstrapping: boolean;
  hasBootstrapped: boolean;
  errorMessage: string | null;

  login: (payload: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  logoutLocal: () => void;
  bootstrapSession: () => Promise<void>;
  refreshSession: () => Promise<void>;
  loadCurrentUser: () => Promise<void>;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  isBootstrapping: false,
  hasBootstrapped: false,
  errorMessage: null,

  async login(payload) {
    set({ isLoading: true, errorMessage: null });

    try {
      const tokenResponse = await authService.login(payload);

      setHttpAccessToken(tokenResponse.access_token);

      const currentUser = await authService.getCurrentUser();

      set({
        accessToken: tokenResponse.access_token,
        currentUser,
        isAuthenticated: true,
        isLoading: false,
        isBootstrapping: false,
        hasBootstrapped: true,
        errorMessage: null,
      });
    } catch (error) {
      const message = getApiErrorMessage(error);

      setHttpAccessToken(null);

      set({
        accessToken: null,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
        isBootstrapping: false,
        hasBootstrapped: true,
        errorMessage: message,
      });

      throw error;
    }
  },

  async logout() {
    set({ isLoading: true });

    try {
      await authService.logout();
    } catch {
      /*
       * Aunque el backend falle al cerrar sesión,
       * el frontend debe limpiar sesión local para no dejar
       * al usuario atrapado.
       */
    } finally {
      get().logoutLocal();

      set({
        isLoading: false,
      });
    }
  },

  logoutLocal() {
    setHttpAccessToken(null);

    set({
      accessToken: null,
      currentUser: null,
      isAuthenticated: false,
      isBootstrapping: false,
      hasBootstrapped: true,
      errorMessage: null,
    });
  },

  async bootstrapSession() {
    const { hasBootstrapped, isBootstrapping } = get();

    if (hasBootstrapped || isBootstrapping) {
      return;
    }

    await get().refreshSession();
  },

  async refreshSession() {
    set({ isBootstrapping: true, errorMessage: null });

    try {
      const tokenResponse = await authService.refreshAccessToken();

      setHttpAccessToken(tokenResponse.access_token);

      const currentUser = await authService.getCurrentUser();

      set({
        accessToken: tokenResponse.access_token,
        currentUser,
        isAuthenticated: true,
        isBootstrapping: false,
        hasBootstrapped: true,
        errorMessage: null,
      });
    } catch {
      setHttpAccessToken(null);

      set({
        accessToken: null,
        currentUser: null,
        isAuthenticated: false,
        isBootstrapping: false,
        hasBootstrapped: true,
        errorMessage: null,
      });
    }
  },

  async loadCurrentUser() {
    set({ isLoading: true, errorMessage: null });

    try {
      const currentUser = await authService.getCurrentUser();

      set({
        currentUser,
        isAuthenticated: true,
        isLoading: false,
        hasBootstrapped: true,
      });
    } catch (error) {
      const message = getApiErrorMessage(error);

      get().logoutLocal();

      set({
        isLoading: false,
        errorMessage: message,
      });

      throw error;
    }
  },

  clearError() {
    set({ errorMessage: null });
  },
}));

setAccessTokenRefreshedHandler((accessToken) => {
  setHttpAccessToken(accessToken);

  useAuthStore.setState({
    accessToken,
    isAuthenticated: true,
    hasBootstrapped: true,
  });
});

setSessionExpiredHandler(() => {
  useAuthStore.getState().logoutLocal();
});
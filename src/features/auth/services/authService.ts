import { endpoints } from "../../../api/endpoints";
import { http } from "../../../api/http";
import type {
  AccessTokenResponse,
  CurrentUser,
  LoginRequest,
  TokenResponse,
} from "../types/auth.types";

export const authService = {
  async login(payload: LoginRequest): Promise<TokenResponse> {
    const response = await http.post<TokenResponse>(
      endpoints.auth.login,
      payload,
    );

    return response.data;
  },

  async getCurrentUser(): Promise<CurrentUser> {
    const response = await http.get<CurrentUser>(endpoints.auth.me);

    return response.data;
  },

  async refreshAccessToken(): Promise<AccessTokenResponse> {
    const response = await http.post<AccessTokenResponse>(
      endpoints.auth.refresh,
    );

    return response.data;
  },

  async logout(): Promise<{ message: string }> {
    const response = await http.post<{ message: string }>(
      endpoints.auth.logout,
    );

    return response.data;
  },

  async logoutAll(): Promise<{ message: string }> {
    const response = await http.post<{ message: string }>(
      endpoints.auth.logoutAll,
    );

    return response.data;
  },
};
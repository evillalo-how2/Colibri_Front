export type UserType = "admin" | "psychologist" | "assistant" | "client";

export type LoginRequest = {
  email: string;
  password: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
};

export type AccessTokenResponse = {
  access_token: string;
  token_type: string;
};

export type CurrentUser = {
  id: string;
  email: string;
  full_name: string;
  user_type: UserType;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
};
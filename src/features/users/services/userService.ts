import { endpoints } from "../../../api/endpoints";
import { http } from "../../../api/http";
import type {
  ChangeUserRoleRequest,
  CreateUserRequest,
  EmployeeProfile,
  EmployeeProfileUpsertRequest,
  UpdateUserRequest,
  User,
  UsersListQuery,
  UsersListResponse,
  MessageResponse,
  UpdateUserPasswordRequest,
} from "../types/user.types";

function buildUsersQueryParams(query?: UsersListQuery) {
  if (!query) {
    return {};
  }

  return {
    search: query.search || undefined,
    user_type: query.user_type || undefined,
    is_active: query.is_active,
    page: query.page,
    limit: query.limit,
  };
}

export const userService = {
  async getUsers(query?: UsersListQuery): Promise<UsersListResponse> {
    const response = await http.get<UsersListResponse>(endpoints.users.base, {
      params: buildUsersQueryParams(query),
    });

    return response.data;
  },

  async getUserById(userId: string): Promise<User> {
    const response = await http.get<User>(endpoints.users.byId(userId));

    return response.data;
  },

  async createUser(payload: CreateUserRequest): Promise<User> {
    const response = await http.post<User>(endpoints.users.base, payload);

    return response.data;
  },

  async updateUser(
    userId: string,
    payload: UpdateUserRequest,
  ): Promise<User> {
    const response = await http.patch<User>(
      endpoints.users.byId(userId),
      payload,
    );

    return response.data;
  },

  async changeUserRole(
    userId: string,
    payload: ChangeUserRoleRequest,
  ): Promise<User> {
    const response = await http.patch<User>(
      endpoints.users.role(userId),
      payload,
    );

    return response.data;
  },

  async activateUser(userId: string): Promise<User> {
    const response = await http.patch<User>(endpoints.users.activate(userId));

    return response.data;
  },

  async deactivateUser(userId: string): Promise<User> {
    const response = await http.patch<User>(endpoints.users.deactivate(userId));

    return response.data;
  },

  async getUserProfile(userId: string): Promise<EmployeeProfile> {
  const response = await http.get<EmployeeProfile>(
    endpoints.users.profile(userId),
  );

  return response.data;
},

async upsertUserProfile(
  userId: string,
  payload: EmployeeProfileUpsertRequest,
): Promise<EmployeeProfile> {
  const response = await http.put<EmployeeProfile>(
    endpoints.users.profile(userId),
    payload,
  );

  return response.data;
},

async updateUserPassword(
  userId: string,
  payload: UpdateUserPasswordRequest,
): Promise<MessageResponse> {
  const response = await http.patch<MessageResponse>(
    endpoints.users.password(userId),
    payload,
  );

  return response.data;
},
};
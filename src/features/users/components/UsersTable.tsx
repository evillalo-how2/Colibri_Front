import type { User } from "../types/user.types";
import { UserActionsMenu } from "./UserActionsMenu";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserStatusBadge } from "./UserStatusBadge";
import type { CurrentUser } from "../../auth/types/auth.types";
import { canChangeUserPasswordForTarget } from "../utils/userPermissions";
import { canToggleUserStatusForTarget } from "../utils/userPermissions";

type UsersTableProps = {
  users: User[];
  currentUser: CurrentUser | null;
  onEditUser: (user: User) => void;
  onEditEmployeeProfile: (user: User) => void;
  onChangeUserRole: (user: User) => void;
  onChangeUserPassword: (user: User) => void;
  onToggleUserStatus: (user: User) => void;
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

export function UsersTable({
  users,
  currentUser,
  onEditUser,
  onEditEmployeeProfile,
  onChangeUserRole,
  onChangeUserPassword,
  onToggleUserStatus,
}: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#d6e2e0] text-xs uppercase tracking-[0.25em] text-[#9fb8b4]">
              <th className="px-6 py-5 font-normal">Nombre</th>
              <th className="px-6 py-5 font-normal">Email</th>
              <th className="px-6 py-5 font-normal">Rol</th>
              <th className="px-6 py-5 font-normal">Estado</th>
              <th className="px-6 py-5 font-normal">Creado</th>
              <th className="px-6 py-5 font-normal">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[#d6e2e0]/70 text-sm text-[#4b4b4b] last:border-b-0 hover:bg-[#f5f7f6]/80"
              >
                <td className="px-6 py-6">
                  <div>
                    <p className="font-medium">{user.full_name}</p>
                    {user.is_superuser ? (
                      <p className="mt-1 text-xs text-[#9fb8b4]">
                        Superusuario
                      </p>
                    ) : null}
                  </div>
                </td>

                <td className="px-6 py-6 text-[#7a8588]">{user.email}</td>

                <td className="px-6 py-6">
                  <UserRoleBadge role={user.user_type} />
                </td>

                <td className="px-6 py-6">
                  <UserStatusBadge isActive={user.is_active} />
                </td>

                <td className="px-6 py-6 text-[#7a8588]">
                  {formatDate(user.created_at)}
                </td>

                <td className="px-6 py-6">
                  <UserActionsMenu
                    user={user}
                    canChangeUserPassword={canChangeUserPasswordForTarget(
                      currentUser,
                      user,
                    )}
                    canToggleUserStatus={canToggleUserStatusForTarget(
                      currentUser,
                      user,
                    )}
                    onEditUser={onEditUser}
                    onEditEmployeeProfile={onEditEmployeeProfile}
                    onChangeUserRole={onChangeUserRole}
                    onChangeUserPassword={onChangeUserPassword}
                    onToggleUserStatus={onToggleUserStatus}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

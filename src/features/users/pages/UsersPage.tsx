import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "../../../shared/components/ui/Button";
import { ConfirmModal } from "../../../shared/components/ui/ConfirmModal";
import { PageHeader } from "../../../shared/components/ui/PageHeader";
import { getApiErrorMessage } from "../../../shared/utils/apiError";
import { useAuthStore } from "../../auth/store/authStore";
import { ChangeUserRoleModal } from "../components/ChangeUserRoleModal";
import { ChangeUserPasswordModal } from "../components/ChangeUserPasswordModal";
import { CreateUserModal } from "../components/CreateUserModal";
import { EditEmployeeProfileModal } from "../components/EditEmployeeProfileModal";
import { EditUserModal } from "../components/EditUserModal";
import {
  type UsersFiltersValue,
  UsersFilters,
} from "../components/UsersFilters";
import { UsersTable } from "../components/UsersTable";
import type { EmployeeProfileFormValues } from "../schemas/employeeProfile.schema";
import type {
  ChangeUserRoleFormValues,
  CreateUserFormValues,
  UpdateUserFormValues,
} from "../schemas/user.schema";
import type { UserPasswordFormValues } from "../schemas/userPassword.schema";
import { userService } from "../services/userService";
import type {
  EmployeeProfile,
  EmployeeProfileUpsertRequest,
  User,
  UsersListQuery,
  UsersListResponse,
} from "../types/user.types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const DEFAULT_FILTERS: UsersFiltersValue = {
  search: "",
  userType: "all",
  status: "all",
};

function buildUsersQuery(filters: UsersFiltersValue): UsersListQuery {
  return {
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
    search: filters.search.trim() || undefined,
    user_type: filters.userType === "all" ? undefined : filters.userType,
    is_active:
      filters.status === "all" ? undefined : filters.status === "active",
  };
}

const internalUserTypes: CreateUserFormValues["user_type"][] = [
  "admin",
  "psychologist",
  "assistant",
];

function buildEmployeeProfilePayload(
  values: CreateUserFormValues,
): EmployeeProfileUpsertRequest {
  return {
    legal_name: values.legal_name ?? null,
    preferred_name: values.preferred_name ?? null,
    birth_date: values.birth_date ?? null,
    gender: values.gender ?? null,

    phone: values.phone ?? null,
    emergency_contact_name: values.emergency_contact_name ?? null,
    emergency_contact_phone: values.emergency_contact_phone ?? null,

    address_line: values.address_line ?? null,
    neighborhood: values.neighborhood ?? null,
    city: values.city ?? null,
    state: values.state ?? null,
    zip_code: values.zip_code ?? null,
    country: values.country ?? null,

    job_title: values.job_title ?? null,
    department: values.department ?? null,
    employment_type: values.employment_type ?? null,
    hire_date: values.hire_date ?? null,
    termination_date: values.termination_date ?? null,
    work_schedule: values.work_schedule ?? null,
    notes: values.notes ?? null,

    curp: values.curp ?? null,
    rfc: values.rfc ?? null,
    nss: values.nss ?? null,
    professional_license: values.professional_license ?? null,

    ine_document_note: values.ine_document_note ?? null,
    curp_document_note: values.curp_document_note ?? null,
    rfc_document_note: values.rfc_document_note ?? null,
    nss_document_note: values.nss_document_note ?? null,
    proof_of_address_note: values.proof_of_address_note ?? null,
    professional_license_note: values.professional_license_note ?? null,
    contract_document_note: values.contract_document_note ?? null,
    documents_notes: values.documents_notes ?? null,
  };
}

function buildEmployeeProfileUpsertPayload(
  values: EmployeeProfileFormValues,
): EmployeeProfileUpsertRequest {
  return {
    legal_name: values.legal_name ?? null,
    preferred_name: values.preferred_name ?? null,
    birth_date: values.birth_date ?? null,
    gender: values.gender ?? null,

    phone: values.phone ?? null,
    emergency_contact_name: values.emergency_contact_name ?? null,
    emergency_contact_phone: values.emergency_contact_phone ?? null,

    address_line: values.address_line ?? null,
    neighborhood: values.neighborhood ?? null,
    city: values.city ?? null,
    state: values.state ?? null,
    zip_code: values.zip_code ?? null,
    country: values.country ?? null,

    job_title: values.job_title ?? null,
    department: values.department ?? null,
    employment_type: values.employment_type ?? null,
    hire_date: values.hire_date ?? null,
    termination_date: values.termination_date ?? null,
    work_schedule: values.work_schedule ?? null,
    notes: values.notes ?? null,

    curp: values.curp ?? null,
    rfc: values.rfc ?? null,
    nss: values.nss ?? null,
    professional_license: values.professional_license ?? null,

    ine_document_note: values.ine_document_note ?? null,
    curp_document_note: values.curp_document_note ?? null,
    rfc_document_note: values.rfc_document_note ?? null,
    nss_document_note: values.nss_document_note ?? null,
    proof_of_address_note: values.proof_of_address_note ?? null,
    professional_license_note: values.professional_license_note ?? null,
    contract_document_note: values.contract_document_note ?? null,
    documents_notes: values.documents_notes ?? null,
  };
}

function hasEmployeeProfileData(
  payload: EmployeeProfileUpsertRequest,
): boolean {
  return Object.values(payload).some((value) => {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === "string") {
      return value.trim() !== "";
    }

    return true;
  });
}

function shouldCreateEmployeeProfile(values: CreateUserFormValues): boolean {
  return internalUserTypes.includes(values.user_type);
}

export function UsersPage() {
  const currentUser = useAuthStore((state) => state.currentUser);

  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<UsersListResponse | null>(null);
  const [filters, setFilters] = useState<UsersFiltersValue>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [createErrorMessage, setCreateErrorMessage] = useState<string | null>(
    null,
  );

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [editErrorMessage, setEditErrorMessage] = useState<string | null>(null);

  const [roleUser, setRoleUser] = useState<User | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isChangingRole, setIsChangingRole] = useState(false);
  const [roleErrorMessage, setRoleErrorMessage] = useState<string | null>(null);

  const [statusUser, setStatusUser] = useState<User | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [employeeProfile, setEmployeeProfile] =
    useState<EmployeeProfile | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileErrorMessage, setProfileErrorMessage] = useState<string | null>(
    null,
  );

  const [passwordUser, setPasswordUser] = useState<User | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >(null);

  async function fetchUsers(nextFilters: UsersFiltersValue) {
    const response = await userService.getUsers(buildUsersQuery(nextFilters));

    setUsers(response.items);
    setMeta(response);
    setErrorMessage(null);
  }

  async function loadUsers(nextFilters: UsersFiltersValue = filters) {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await fetchUsers(nextFilters);
    } catch (error) {
      setUsers([]);
      setMeta(null);
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateUser(values: CreateUserFormValues) {
    setIsCreatingUser(true);
    setCreateErrorMessage(null);

    try {
      const createdUser = await userService.createUser({
        email: values.email,
        full_name: values.full_name,
        password: values.password,
        user_type: values.user_type,
        is_active: values.is_active,
      });

      if (shouldCreateEmployeeProfile(values)) {
        const profilePayload = buildEmployeeProfilePayload(values);

        if (hasEmployeeProfileData(profilePayload)) {
          try {
            await userService.upsertUserProfile(createdUser.id, profilePayload);

            toast.success("Usuario y perfil laboral creados correctamente.");
          } catch (profileError) {
            toast.error(
              `Usuario creado, pero no se pudo guardar el perfil laboral: ${getApiErrorMessage(
                profileError,
              )}`,
            );
          }
        } else {
          toast.success("Usuario creado correctamente.");
        }
      } else {
        toast.success("Usuario creado correctamente.");
      }

      setIsCreateModalOpen(false);

      await loadUsers(filters);
    } catch (error) {
      const message = getApiErrorMessage(error);

      setCreateErrorMessage(message);
      toast.error(message);

      throw error;
    } finally {
      setIsCreatingUser(false);
    }
  }

  async function handleUpdateUser(values: UpdateUserFormValues) {
    if (!selectedUser) {
      return;
    }

    setIsUpdatingUser(true);
    setEditErrorMessage(null);

    try {
      await userService.updateUser(selectedUser.id, values);

      toast.success("Usuario actualizado correctamente.");
      setIsEditModalOpen(false);
      setSelectedUser(null);

      await loadUsers(filters);
    } catch (error) {
      const message = getApiErrorMessage(error);

      setEditErrorMessage(message);
      toast.error(message);

      throw error;
    } finally {
      setIsUpdatingUser(false);
    }
  }

  async function handleChangeUserRole(values: ChangeUserRoleFormValues) {
    if (!roleUser) {
      return;
    }

    setIsChangingRole(true);
    setRoleErrorMessage(null);

    try {
      await userService.changeUserRole(roleUser.id, values);

      toast.success("Rol actualizado correctamente.");
      setIsRoleModalOpen(false);
      setRoleUser(null);

      await loadUsers(filters);
    } catch (error) {
      const message = getApiErrorMessage(error);

      setRoleErrorMessage(message);
      toast.error(message);

      throw error;
    } finally {
      setIsChangingRole(false);
    }
  }

  async function handleConfirmToggleUserStatus() {
    if (!statusUser) {
      return;
    }

    setIsChangingStatus(true);

    try {
      if (statusUser.is_active) {
        await userService.deactivateUser(statusUser.id);
        toast.success("Usuario desactivado correctamente.");
      } else {
        await userService.activateUser(statusUser.id);
        toast.success("Usuario activado correctamente.");
      }

      setIsStatusModalOpen(false);
      setStatusUser(null);

      await loadUsers(filters);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsChangingStatus(false);
    }
  }

  async function handleOpenEmployeeProfileModal(user: User) {
    setProfileUser(user);
    setEmployeeProfile(null);
    setProfileErrorMessage(null);
    setIsProfileModalOpen(true);
    setIsLoadingProfile(true);

    try {
      const profile = await userService.getUserProfile(user.id);

      setEmployeeProfile(profile);
    } catch (error) {
      const message = getApiErrorMessage(error);

      if (message.toLowerCase().includes("not found")) {
        setEmployeeProfile(null);
        return;
      }

      setProfileErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoadingProfile(false);
    }
  }

  function handleCloseEmployeeProfileModal() {
    if (isLoadingProfile || isUpdatingProfile) {
      return;
    }

    setIsProfileModalOpen(false);
    setProfileUser(null);
    setEmployeeProfile(null);
    setProfileErrorMessage(null);
  }

  async function handleUpdateEmployeeProfile(
    values: EmployeeProfileFormValues,
  ) {
    if (!profileUser) {
      return;
    }

    setIsUpdatingProfile(true);
    setProfileErrorMessage(null);

    try {
      await userService.upsertUserProfile(
        profileUser.id,
        buildEmployeeProfileUpsertPayload(values),
      );

      toast.success("Perfil laboral actualizado correctamente.");
      setIsProfileModalOpen(false);
      setProfileUser(null);
      setEmployeeProfile(null);

      await loadUsers(filters);
    } catch (error) {
      const message = getApiErrorMessage(error);

      setProfileErrorMessage(message);
      toast.error(message);

      throw error;
    } finally {
      setIsUpdatingProfile(false);
    }
  }

  async function handleChangeUserPassword(values: UserPasswordFormValues) {
    if (!passwordUser) {
      return;
    }

    setIsUpdatingPassword(true);
    setPasswordErrorMessage(null);

    try {
      await userService.updateUserPassword(passwordUser.id, {
        new_password: values.new_password,
      });

      toast.success("Contraseña actualizada correctamente.");
      setIsPasswordModalOpen(false);
      setPasswordUser(null);
    } catch (error) {
      const message = getApiErrorMessage(error);

      setPasswordErrorMessage(message);
      toast.error(message);

      throw error;
    } finally {
      setIsUpdatingPassword(false);
    }
  }

  function handleOpenEditModal(user: User) {
    setEditErrorMessage(null);
    setSelectedUser(user);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setEditErrorMessage(null);
    setIsEditModalOpen(false);
    setSelectedUser(null);
  }

  function handleOpenRoleModal(user: User) {
    setRoleErrorMessage(null);
    setRoleUser(user);
    setIsRoleModalOpen(true);
  }

  function handleCloseRoleModal() {
    setRoleErrorMessage(null);
    setIsRoleModalOpen(false);
    setRoleUser(null);
  }

  function handleOpenStatusModal(user: User) {
    setStatusUser(user);
    setIsStatusModalOpen(true);
  }

  function handleCloseStatusModal() {
    if (isChangingStatus) {
      return;
    }

    setIsStatusModalOpen(false);
    setStatusUser(null);
  }

  function handleOpenPasswordModal(user: User) {
    setPasswordErrorMessage(null);
    setPasswordUser(user);
    setIsPasswordModalOpen(true);
  }

  function handleClosePasswordModal() {
    if (isUpdatingPassword) {
      return;
    }

    setPasswordErrorMessage(null);
    setIsPasswordModalOpen(false);
    setPasswordUser(null);
  }

  function handleFilterChange<K extends keyof UsersFiltersValue>(
    key: K,
    value: UsersFiltersValue[K],
  ) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  }

  function handleSubmitFilters() {
    void loadUsers(filters);
  }

  function handleClearFilters() {
    setFilters(DEFAULT_FILTERS);
    void loadUsers(DEFAULT_FILTERS);
  }

  function handleOpenCreateModal() {
    setCreateErrorMessage(null);
    setIsCreateModalOpen(true);
  }

  function handleCloseCreateModal() {
    setCreateErrorMessage(null);
    setIsCreateModalOpen(false);
  }

  useEffect(() => {
    let shouldIgnore = false;

    async function loadInitialUsers() {
      try {
        const response = await userService.getUsers(
          buildUsersQuery(DEFAULT_FILTERS),
        );

        if (shouldIgnore) {
          return;
        }

        setUsers(response.items);
        setMeta(response);
        setErrorMessage(null);
      } catch (error) {
        if (shouldIgnore) {
          return;
        }

        setUsers([]);
        setMeta(null);
        setErrorMessage(getApiErrorMessage(error));
      } finally {
        if (!shouldIgnore) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialUsers();

    return () => {
      shouldIgnore = true;
    };
  }, []);

  return (
    <section>
      <PageHeader
        eyebrow="Administración"
        title="Usuarios"
        description="Gestiona los accesos internos y los perfiles disponibles dentro de la plataforma Psicomichi."
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-[#d6e2e0] px-4 py-2 text-sm text-[#4b4b4b]">
              {meta ? `${meta.total} usuarios encontrados` : "Usuarios"}
            </span>

            <span className="rounded-full bg-[#f5f7f6] px-4 py-2 text-sm text-[#7a8588]">
              Página {meta?.page ?? DEFAULT_PAGE} · Límite{" "}
              {meta?.limit ?? DEFAULT_LIMIT}
            </span>
          </div>

          <Button type="button" onClick={handleOpenCreateModal}>
            Crear usuario
          </Button>
        </div>
      </PageHeader>

      <UsersFilters
        values={filters}
        isLoading={isLoading}
        onChange={handleFilterChange}
        onSubmit={handleSubmitFilters}
        onClear={handleClearFilters}
      />

      {isLoading ? (
        <div className="rounded-[2rem] border border-white/80 bg-white/80 p-8 text-center shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
            Cargando
          </p>
          <h2 className="mt-3 text-2xl font-light text-[#1f1f1f]">
            Preparando usuarios
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#7a8588]">
            Estamos consultando los accesos registrados en el backend.
          </p>

          <div className="mx-auto mt-6 h-2 w-24 overflow-hidden rounded-full bg-[#d6e2e0]">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#afc4c0]" />
          </div>
        </div>
      ) : null}

      {!isLoading && errorMessage ? (
        <div className="rounded-[2rem] border border-[#e98ba3]/30 bg-white/80 p-8 shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-[#e98ba3]">
            Error
          </p>
          <h2 className="mt-3 text-2xl font-light text-[#1f1f1f]">
            No pudimos cargar los usuarios
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#9f4f64]">
            {errorMessage}
          </p>

          <Button
            type="button"
            variant="secondary"
            onClick={() => void loadUsers(filters)}
            className="mt-6"
          >
            Intentar de nuevo
          </Button>
        </div>
      ) : null}

      {!isLoading && !errorMessage && users.length === 0 ? (
        <div className="rounded-[2rem] border border-white/80 bg-white/80 p-8 text-center shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
            Sin registros
          </p>
          <h2 className="mt-3 text-2xl font-light text-[#1f1f1f]">
            No encontramos usuarios
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#7a8588]">
            Ajusta los filtros o limpia la búsqueda para volver a consultar
            todos los usuarios disponibles.
          </p>
        </div>
      ) : null}

      {!isLoading && !errorMessage && users.length > 0 ? (
        <UsersTable
          users={users}
          currentUser={currentUser}
          onEditUser={handleOpenEditModal}
          onEditEmployeeProfile={handleOpenEmployeeProfileModal}
          onChangeUserRole={handleOpenRoleModal}
          onChangeUserPassword={handleOpenPasswordModal}
          onToggleUserStatus={handleOpenStatusModal}
        />
      ) : null}

      <CreateUserModal
        isOpen={isCreateModalOpen}
        isSubmitting={isCreatingUser}
        errorMessage={createErrorMessage}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateUser}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        user={selectedUser}
        isSubmitting={isUpdatingUser}
        errorMessage={editErrorMessage}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdateUser}
      />

      <ChangeUserRoleModal
        isOpen={isRoleModalOpen}
        user={roleUser}
        isSubmitting={isChangingRole}
        errorMessage={roleErrorMessage}
        onClose={handleCloseRoleModal}
        onSubmit={handleChangeUserRole}
      />

      <EditEmployeeProfileModal
        isOpen={isProfileModalOpen}
        user={profileUser}
        profile={employeeProfile}
        isLoadingProfile={isLoadingProfile}
        isSubmitting={isUpdatingProfile}
        errorMessage={profileErrorMessage}
        onClose={handleCloseEmployeeProfileModal}
        onSubmit={handleUpdateEmployeeProfile}
      />

      <ChangeUserPasswordModal
        isOpen={isPasswordModalOpen}
        user={passwordUser}
        isSubmitting={isUpdatingPassword}
        errorMessage={passwordErrorMessage}
        onClose={handleClosePasswordModal}
        onSubmit={handleChangeUserPassword}
      />

      <ConfirmModal
        isOpen={isStatusModalOpen}
        title={statusUser?.is_active ? "Desactivar usuario" : "Activar usuario"}
        description={
          statusUser?.is_active
            ? `¿Seguro que deseas desactivar a ${statusUser.full_name}? Esta persona perderá acceso al sistema.`
            : `¿Seguro que deseas activar a ${
                statusUser?.full_name ?? "este usuario"
              }? Esta persona podrá volver a acceder al sistema.`
        }
        confirmLabel={statusUser?.is_active ? "Desactivar" : "Activar"}
        variant={statusUser?.is_active ? "danger" : "default"}
        isSubmitting={isChangingStatus}
        onClose={handleCloseStatusModal}
        onConfirm={handleConfirmToggleUserStatus}
      />
    </section>
  );
}
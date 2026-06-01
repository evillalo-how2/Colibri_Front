import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/authStore";
import { PrivateMobileHeader } from "./components/PrivateMobileHeader";
import { PrivateSidebar } from "./components/PrivateSidebar";

export function PrivateLayout() {
  const navigate = useNavigate();

  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const isLoading = useAuthStore((state) => state.isLoading);

  async function handleLogout() {
    await logout();

    toast.success("Sesión cerrada correctamente.");
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#f5f7f6]">
      <PrivateSidebar
        currentUser={currentUser}
        isLoading={isLoading}
        onLogout={handleLogout}
      />

      <PrivateMobileHeader
        currentUser={currentUser}
        isLoading={isLoading}
        onLogout={handleLogout}
      />

      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-[1800px] px-4 py-5 sm:px-5 lg:px-8 lg:py-6 2xl:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

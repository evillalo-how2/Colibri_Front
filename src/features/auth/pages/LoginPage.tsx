import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/ui/Button";
import { FormError } from "../../../shared/components/ui/FormError";
import { Input } from "../../../shared/components/ui/Input";
import { getApiErrorMessage } from "../../../shared/utils/apiError";
import { PageTransition } from "../../../shared/components/ui/PageTransition";
import {
  type LoginFormValues,
  loginSchema,
} from "../schemas/login.schema";
import { useAuthStore } from "../store/authStore";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const clearError = useAuthStore((state) => state.clearError);

  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    clearError();

    try {
      await login(values);

      toast.success("Sesión iniciada correctamente.");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#f5f7f6]">
        <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          <div className="relative hidden overflow-hidden bg-white lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(233,139,163,0.55),transparent_24%),radial-gradient(circle_at_20%_55%,rgba(92,190,181,0.45),transparent_28%),radial-gradient(circle_at_35%_35%,rgba(250,187,93,0.45),transparent_25%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-12">
              <p className="text-xl tracking-wide text-[#4b4b4b]">
                PSICÓLOGA KAREN CHICO
              </p>

              <div>
                <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#7a8588]">
                  Reconecta
                </p>
                <h1 className="max-w-md text-5xl font-light leading-tight text-[#1f1f1f]">
                  Tu mente, tu cuerpo y tu espacio terapéutico.
                </h1>
                <p className="mt-6 max-w-sm text-sm leading-7 text-[#4b4b4b]">
                  Accede al panel privado para administrar servicios, agenda,
                  clientes, productos y contenido profesional.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-xl shadow-[#afc4c0]/20 backdrop-blur">
              <div className="mb-8 text-center">
                <p className="mb-2 text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
                  Psicomichi
                </p>
                <h2 className="text-3xl font-light text-[#1f1f1f]">
                  Iniciar sesión
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#7a8588]">
                  Accede al panel privado para administrar la plataforma.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@psicomichi.com"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <Input
                  id="password"
                  label="Contraseña"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  error={errors.password?.message}
                  {...register("password")}
                />

                <FormError message={errorMessage} />

                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Entrar
                </Button>
              </form>

              <p className="mt-6 text-center text-xs leading-6 text-[#9aa5a8]">
                El acceso está protegido con sesión segura y cookie HttpOnly.
              </p>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
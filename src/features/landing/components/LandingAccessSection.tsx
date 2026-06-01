import { Link } from "react-router-dom";
import { FiArrowRight, FiLock } from "react-icons/fi";

export function LandingAccessSection() {
    return (
        <section className="bg-[#f5f7f6] px-5 py-16 lg:px-8">
            <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#d6e2e0] bg-white/80 p-8 text-center shadow-sm md:p-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d6e2e0] text-[#4b4b4b]">
                    <FiLock size={22} />
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-[#9fb8b4]">
                    Acceso privado
                </p>

                <h2 className="mt-3 text-3xl font-semibold text-[#4b4b4b]">
                    ¿Ya tienes una cuenta?
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#7a8588]">
                    Ingresa al portal para consultar tu información, acceder a servicios
                    disponibles o utilizar las herramientas internas de Colibrí by Karen.
                </p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#afc4c0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9fb8b4]"
                    >
                        Iniciar sesión
                        <FiArrowRight />
                    </Link>

                    <a
                        href="#contacto"
                        className="inline-flex items-center justify-center rounded-full border border-[#d6e2e0] bg-white px-6 py-3 text-sm font-semibold text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
                    >
                        Solicitar información
                    </a>
                </div>
            </div>
        </section>
    );
}
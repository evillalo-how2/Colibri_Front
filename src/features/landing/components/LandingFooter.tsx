import { Link } from "react-router-dom";

export function LandingFooter() {
    return (
        <footer className="border-t border-[#d6e2e0] bg-[#4b4b4b] px-5 py-8 text-white lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="font-semibold tracking-[0.22em]">COLIBRÍ by Karen</p>
                    <p className="mt-1 text-white/60">
                        Terapia, cursos y experiencias de reconexión personal.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-5 text-white/70">
                    <a href="#inicio" className="transition hover:text-white">
                        Inicio
                    </a>
                    <a href="#servicios" className="transition hover:text-white">
                        Servicios
                    </a>
                    <a href="#eventos" className="transition hover:text-white">
                        Eventos
                    </a>
                    <a href="#contacto" className="transition hover:text-white">
                        Contacto
                    </a>
                    <Link to="/login" className="transition hover:text-white">
                        Login
                    </Link>
                </div>
            </div>
        </footer>
    );
}
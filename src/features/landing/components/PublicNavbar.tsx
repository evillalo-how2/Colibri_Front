import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navItems } from "../data/landingContent";

export function PublicNavbar() {
    return (
        <motion.header
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="sticky top-0 z-50 border-b border-[#d6e2e0]/70 bg-white/85 backdrop-blur-xl"
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
                <a href="#inicio" className="group">
                    <div className="flex flex-col leading-none">
                        <span className="text-lg font-semibold tracking-[0.22em] text-[#4b4b4b]">
                            COLIBRÍ
                        </span>
                        <span className="mt-1 text-xs tracking-[0.24em] text-[#7a8588]">
                            by Karen
                        </span>
                    </div>
                </a>

                <div className="hidden items-center gap-7 lg:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-[#7a8588] transition hover:text-[#4b4b4b]"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="#contacto"
                        className="hidden rounded-full border border-[#d6e2e0] bg-white px-5 py-2.5 text-sm font-semibold text-[#4b4b4b] transition hover:bg-[#f5f7f6] sm:inline-flex"
                    >
                        Agenda tu consulta
                    </a>

                    <Link
                        to="/login"
                        className="rounded-full bg-[#afc4c0] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9fb8b4] hover:shadow-md"
                    >
                        Iniciar sesión
                    </Link>
                </div>
            </nav>
        </motion.header>
    );
}
import { motion } from "framer-motion";
import { FiArrowRight, FiHeart } from "react-icons/fi";

import { LandingAnimatedBackground } from "./LandingAnimatedBackground";

export function LandingHero() {
    return (
        <section
            id="inicio"
            className="relative overflow-hidden bg-[#f5f7f6] px-5 py-20 lg:px-8 lg:py-28"
        >
            <LandingAnimatedBackground />
            <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
                <motion.div
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d6e2e0] bg-white/70 px-4 py-2 text-sm text-[#7a8588] shadow-sm">
                        <FiHeart className="text-[#9fb8b4]" />
                        Psicóloga Karen Chico
                    </div>

                    <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#4b4b4b] md:text-6xl">
                        Reconecta con tu bienestar emocional, mental y espiritual.
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-[#7a8588] md:text-lg">
                        Soy Karen Chico, psicóloga y acompañante terapéutica. A través de
                        terapia, cursos, talleres y experiencias de reconexión, te acompaño
                        a sanar, comprenderte y fortalecer tu proceso personal.
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <a
                            href="#contacto"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4b4b4b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#3f4647]"
                        >
                            Agenda tu consulta
                            <FiArrowRight />
                        </a>

                        <a
                            href="#servicios"
                            className="inline-flex items-center justify-center rounded-full border border-[#d6e2e0] bg-white/70 px-6 py-3 text-sm font-semibold text-[#4b4b4b] transition hover:-translate-y-0.5 hover:bg-white"
                        >
                            Ver servicios
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    className="relative"
                >
                    <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/70 p-4 shadow-2xl shadow-[#9fb8b4]/20 backdrop-blur">
                        <div className="h-full rounded-[2rem] bg-gradient-to-br from-[#e98ba3]/70 via-[#f7e7c8]/70 to-[#afc4c0]/80 p-8">
                            <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/50 bg-white/65 p-7 backdrop-blur-md">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-[#7a8588]">
                                        Reconecta
                                    </p>
                                    <h2 className="mt-4 text-5xl font-semibold text-[#4b4b4b]">
                                        Colibrí
                                    </h2>
                                    <p className="mt-3 text-sm leading-6 text-[#7a8588]">
                                        Terapia, cursos y experiencias para acompañar tu proceso de
                                        reconexión.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {["Terapia", "Cursos", "Talleres", "Eventos"].map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm font-medium text-[#4b4b4b]"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.97 }}
                        animate={{
                            opacity: 1,
                            y: [0, -8, 0],
                            scale: [1, 1.015, 1],
                        }}
                        transition={{
                            opacity: { duration: 0.45, ease: "easeOut" },
                            scale: {
                                duration: 4.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                            y: {
                                duration: 4.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                        }}
                        className="absolute -bottom-5 -left-4 rounded-3xl border border-[#d6e2e0] bg-white px-5 py-4 shadow-lg shadow-[#9fb8b4]/15 transform-gpu will-change-transform"
                    >
                        <p className="text-xs uppercase tracking-[0.22em] text-[#9fb8b4]">
                            Acompañamiento
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#4b4b4b]">
                            Terapéutico y humano
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
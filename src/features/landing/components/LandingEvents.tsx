import { motion } from "framer-motion";
import { eventItems } from "../data/landingContent";
import { LandingSectionHeader } from "./LandingSectionHeader";

export function LandingEvents() {
    return (
        <section id="eventos" className="bg-white px-5 py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <LandingSectionHeader
                    eyebrow="Eventos"
                    title="Próximas experiencias y encuentros."
                    description="Retiros, talleres y eventos grupales enfocados en sanar, reconectar y compartir procesos de crecimiento personal."
                    align="center"
                />

                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {eventItems.map((event, index) => (
                        <motion.article
                            key={event.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 0.45,
                                delay: index * 0.08,
                                ease: "easeOut",
                            }}
                            className="overflow-hidden rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6]"
                        >
                            <div className="h-44 bg-gradient-to-br from-[#e98ba3]/50 via-[#f7e7c8]/70 to-[#afc4c0]/70" />

                            <div className="p-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9fb8b4]">
                                    Colibrí by Karen
                                </p>

                                <h3 className="mt-3 text-xl font-semibold text-[#4b4b4b]">
                                    {event.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-[#7a8588]">
                                    {event.description}
                                </p>

                                <a
                                    href="#contacto"
                                    className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#4b4b4b] transition hover:bg-[#d6e2e0]"
                                >
                                    Pedir información
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
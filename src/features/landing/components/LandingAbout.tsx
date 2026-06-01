import { motion } from "framer-motion";
import { focusItems } from "../data/landingContent";
import { LandingSectionHeader } from "./LandingSectionHeader";

export function LandingAbout() {
    return (
        <section id="sobre-karen" className="bg-[#d6e2e0]/70 px-5 py-20 lg:px-8">
            <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="rounded-[2.5rem] bg-white/60 p-6 shadow-xl shadow-[#9fb8b4]/10"
                >
                    <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-[#4b4b4b]/80 via-[#7a8588]/60 to-[#afc4c0]/70 p-8">
                        <div className="flex h-full flex-col justify-end rounded-[1.5rem] border border-white/30 bg-white/10 p-6 text-white backdrop-blur-sm">
                            <p className="text-sm uppercase tracking-[0.28em] text-white/80">
                                Karen Chico
                            </p>
                            <h3 className="mt-3 text-3xl font-semibold">
                                Psicóloga y acompañante terapéutica
                            </h3>
                        </div>
                    </div>
                </motion.div>

                <div>
                    <LandingSectionHeader
                        eyebrow="Sobre Karen"
                        title="Un acompañamiento cálido para sanar, comprender y reconectar."
                        description="Profesional especialista en apoyo terapéutico por medio de técnicas y dinámicas orientadas al bienestar físico, mental y espiritual de las personas."
                    />

                    <div className="mt-8 grid gap-4">
                        {focusItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{
                                    duration: 0.45,
                                    delay: index * 0.08,
                                    ease: "easeOut",
                                }}
                                className="flex gap-4 rounded-3xl border border-white/70 bg-white/65 p-5"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#afc4c0] text-white">
                                    <item.icon size={20} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#4b4b4b]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-[#7a8588]">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
import { motion } from "framer-motion";
import { productItems } from "../data/landingContent";
import { LandingSectionHeader } from "./LandingSectionHeader";

export function LandingProducts() {
    return (
        <section className="bg-[#f5f7f6] px-5 py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <LandingSectionHeader
                    eyebrow="Productos y recursos"
                    title="Espacios y herramientas para seguir trabajando en ti."
                    description="Además de la terapia, Colibrí by Karen puede integrar cursos, talleres, recursos y productos pensados para acompañar tu crecimiento personal."
                    align="center"
                />

                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {productItems.map((item, index) => (
                        <motion.article
                            key={item.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 0.45,
                                delay: index * 0.08,
                                ease: "easeOut",
                            }}
                            className="rounded-[2rem] border border-[#d6e2e0] bg-white/80 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#9fb8b4]/15"
                        >
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d6e2e0] text-[#4b4b4b]">
                                <item.icon size={22} />
                            </div>

                            <h3 className="text-xl font-semibold text-[#4b4b4b]">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-[#7a8588]">
                                {item.description}
                            </p>

                            <a
                                href="#contacto"
                                className="mt-6 inline-flex text-sm font-semibold text-[#7a8588] transition hover:text-[#4b4b4b]"
                            >
                                Solicitar información
                            </a>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
import { motion } from "framer-motion";
import type { IconType } from "react-icons";

type LandingServiceCardProps = {
    title: string;
    description: string;
    icon: IconType;
    index: number;
};

export function LandingServiceCard({
    title,
    description,
    icon: Icon,
    index,
}: LandingServiceCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
            className="group rounded-[2rem] border border-[#d6e2e0] bg-white/75 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#9fb8b4]/15"
        >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f7f6] text-[#7a8588] transition group-hover:bg-[#afc4c0] group-hover:text-white">
                <Icon size={22} />
            </div>

            <h3 className="text-lg font-semibold text-[#4b4b4b]">{title}</h3>

            <p className="mt-3 text-sm leading-7 text-[#7a8588]">{description}</p>
        </motion.article>
    );
}
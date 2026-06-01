import { motion } from "framer-motion";

export function LandingAnimatedBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
                animate={{
                    x: [0, 180, 40, -80, 0],
                    y: [0, -90, 120, 50, 0],
                    scale: [1, 1.45, 1.05, 1.3, 1],
                    rotate: [0, 18, -10, 12, 0],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -left-28 top-4 h-[34rem] w-[34rem] rounded-full bg-[#e98ba3]/45 blur-3xl"
            />

            <motion.div
                animate={{
                    x: [0, -160, -40, 90, 0],
                    y: [0, 110, -70, 80, 0],
                    scale: [1, 1.25, 1.55, 1.1, 1],
                    rotate: [0, -14, 10, -8, 0],
                }}
                transition={{
                    duration: 19,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute right-0 top-8 h-[38rem] w-[38rem] rounded-full bg-[#afc4c0]/55 blur-3xl"
            />

            <motion.div
                animate={{
                    x: [0, 100, -130, 70, 0],
                    y: [0, -130, 90, -40, 0],
                    scale: [1, 1.4, 1.1, 1.5, 1],
                    rotate: [0, 12, -16, 8, 0],
                }}
                transition={{
                    duration: 17,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[-8rem] left-[25%] h-[36rem] w-[36rem] rounded-full bg-[#f7e7c8]/70 blur-3xl"
            />

            <motion.div
                animate={{
                    x: [0, -90, 120, -50, 0],
                    y: [0, 120, -90, 60, 0],
                    scale: [1, 1.6, 1.15, 1.35, 1],
                    rotate: [0, -10, 18, -12, 0],
                }}
                transition={{
                    duration: 21,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-16 right-[18%] h-[32rem] w-[32rem] rounded-full bg-[#d6e2e0]/70 blur-3xl"
            />

            <motion.div
                animate={{
                    x: [0, 80, -60, 100, 0],
                    y: [0, 60, -90, 40, 0],
                    scale: [1, 1.35, 1.1, 1.45, 1],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute left-[38%] top-[18%] h-[24rem] w-[24rem] rounded-full bg-[#ffffff]/60 blur-2xl"
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(233,139,163,0.28),transparent_32%),radial-gradient(circle_at_75%_20%,rgba(175,196,192,0.35),transparent_36%),radial-gradient(circle_at_42%_85%,rgba(247,231,200,0.42),transparent_38%),radial-gradient(circle_at_88%_75%,rgba(214,226,224,0.38),transparent_34%)]" />

            <div className="absolute inset-0 bg-white/15" />
        </div>
    );
}
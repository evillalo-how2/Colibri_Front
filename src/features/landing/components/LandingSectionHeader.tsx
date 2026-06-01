type LandingSectionHeaderProps = {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
};

export function LandingSectionHeader({
    eyebrow,
    title,
    description,
    align = "left",
}: LandingSectionHeaderProps) {
    const isCenter = align === "center";

    return (
        <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
            {eyebrow && (
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9fb8b4]">
                    {eyebrow}
                </p>
            )}

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#4b4b4b] md:text-4xl">
                {title}
            </h2>

            {description && (
                <p className="mt-4 text-base leading-7 text-[#7a8588]">
                    {description}
                </p>
            )}
        </div>
    );
}
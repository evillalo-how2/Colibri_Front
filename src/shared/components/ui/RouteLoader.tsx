type RouteLoaderProps = {
    eyebrow?: string;
    title?: string;
    description?: string;
};

export function RouteLoader({
    eyebrow = "Colibrí",
    title = "Preparando tu espacio",
    description = "Estamos cargando la información de forma segura.",
}: RouteLoaderProps) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f5f7f6] px-6">
            <section className="w-full max-w-sm rounded-[2rem] border border-white/80 bg-white/80 p-8 text-center shadow-xl shadow-[#afc4c0]/20 backdrop-blur">
                <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
                    {eyebrow}
                </p>

                <h1 className="text-2xl font-light text-[#1f1f1f]">{title}</h1>

                <p className="mt-3 text-sm leading-6 text-[#7a8588]">
                    {description}
                </p>

                <div className="mx-auto mt-6 h-2 w-24 overflow-hidden rounded-full bg-[#d6e2e0]">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-[#afc4c0]" />
                </div>
            </section>
        </main>
    );
}
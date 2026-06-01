type ModuleCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function ModuleCard({
  eyebrow = "Módulo futuro",
  title,
  description,
}: ModuleCardProps) {
  return (
    <article className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-lg shadow-[#afc4c0]/10 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#afc4c0]/20">
      <p className="text-sm uppercase tracking-[0.25em] text-[#9fb8b4]">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-2xl font-light text-[#1f1f1f]">{title}</h2>

      <p className="mt-3 text-sm leading-6 text-[#7a8588]">{description}</p>
    </article>
  );
}
type DashboardMetricCardProps = {
  label: string;
  value: number | string;
  description: string;
};

export function DashboardMetricCard({
  label,
  value,
  description,
}: DashboardMetricCardProps) {
  return (
    <article className="rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#9fb8b4]">
        {label}
      </p>

      <p className="mt-4 text-3xl font-light text-[#1f1f1f]">{value}</p>

      <p className="mt-2 text-sm leading-6 text-[#7a8588]">{description}</p>
    </article>
  );
}
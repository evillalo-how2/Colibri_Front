type DashboardAlert = {
  label: string;
  value: number;
  description: string;
};

type DashboardAlertsPanelProps = {
  alerts: DashboardAlert[];
};

export function DashboardAlertsPanel({ alerts }: DashboardAlertsPanelProps) {
  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#9fb8b4]">
        Alertas
      </p>

      <h2 className="mt-3 text-xl font-medium text-[#1f1f1f]">
        Pendientes operativos
      </h2>

      <div className="mt-6 space-y-3">
        {alerts.map((alert) => (
          <article
            key={alert.label}
            className="rounded-2xl border border-[#d6e2e0] bg-white p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-[#4b4b4b]">{alert.label}</p>
                <p className="mt-1 text-sm text-[#7a8588]">
                  {alert.description}
                </p>
              </div>

              <span className="rounded-full bg-[#d6e2e0] px-3 py-1 text-sm font-medium text-[#4b4b4b]">
                {alert.value}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
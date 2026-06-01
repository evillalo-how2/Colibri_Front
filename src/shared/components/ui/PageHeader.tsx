type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-8 rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
          {eyebrow}
        </p>
      ) : null}

      <h1 className="mt-3 text-4xl font-light text-[#1f1f1f]">{title}</h1>

      {description ? (
        <p className="mt-3 max-w-2xl text-[#7a8588]">{description}</p>
      ) : null}

      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
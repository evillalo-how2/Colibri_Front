type FormErrorProps = {
  message?: string | null;
};

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[#e98ba3]/30 bg-[#e98ba3]/10 px-4 py-3 text-sm leading-6 text-[#9f4f64]">
      {message}
    </div>
  );
}
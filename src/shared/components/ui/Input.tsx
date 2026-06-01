import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ id, label, error, className = "", ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-[#4b4b4b]">
        {label}
      </label>

      <input
        id={id}
        className={`w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-[#4b4b4b] outline-none transition placeholder:text-[#a8b2b4] focus:border-[#afc4c0] focus:ring-4 focus:ring-[#afc4c0]/20 ${className}`}
        {...props}
      />

      {error ? <p className="mt-2 text-sm text-[#e98ba3]">{error}</p> : null}
    </div>
  );
}
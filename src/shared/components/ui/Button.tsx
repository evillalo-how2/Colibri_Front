import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#afc4c0] text-white hover:bg-[#9fb8b4]",
  secondary:
    "border border-[#afc4c0] bg-white/60 text-[#4b4b4b] hover:bg-[#f5f7f6]",
  ghost: "text-[#4b4b4b] hover:bg-[#f5f7f6]",
};

export function Button({
  children,
  className = "",
  disabled,
  isLoading = false,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`rounded-2xl px-4 py-3 text-sm transition disabled:cursor-not-allowed disabled:opacity-70 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {isLoading ? "Cargando..." : children}
    </button>
  );
}
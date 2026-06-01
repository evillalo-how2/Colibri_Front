import { NavLink } from "react-router-dom";

type NavItemProps = {
  to?: string;
  label: string;
  disabled?: boolean;
};

export function NavItem({ to, label, disabled = false }: NavItemProps) {
  if (disabled || !to) {
    return (
      <span className="block rounded-2xl px-4 py-3 text-[#9aa5a8]">
        {label}
      </span>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded-2xl px-4 py-3 transition ${
          isActive
            ? "bg-[#d6e2e0] text-[#4b4b4b]"
            : "text-[#7a8588] hover:bg-[#f5f7f6] hover:text-[#4b4b4b]"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
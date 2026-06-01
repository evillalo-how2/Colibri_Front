import { useEffect, useRef, useState } from "react";
import { Button } from "../../../shared/components/ui/Button";
import type { Patient } from "../types/patient.types";

type PatientActionsMenuProps = {
  patient: Patient;
  onEditPatient: (patient: Patient) => void;
  onChangePatientStatus: (patient: Patient) => void;
};

export function PatientActionsMenu({
  patient,
  onEditPatient,
  onChangePatientStatus,
}: PatientActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function handleEdit() {
    setIsOpen(false);
    onEditPatient(patient);
  }

  function handleChangeStatus() {
    setIsOpen(false);
    onChangePatientStatus(patient);
  }

  return (
    <div ref={menuRef} className="relative inline-flex">
      <Button
        type="button"
        variant="secondary"
        aria-label={`Acciones para ${patient.full_name}`}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="px-4 py-2 text-xs"
      >
        Acciones
      </Button>

      {isOpen ? (
        <div className="absolute right-0 top-12 z-20 w-52 overflow-hidden rounded-2xl border border-[#d6e2e0] bg-white shadow-xl shadow-[#afc4c0]/20">
          <button
            type="button"
            onClick={handleEdit}
            className="block w-full px-4 py-3 text-left text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
          >
            Editar paciente
          </button>

          <button
            type="button"
            onClick={handleChangeStatus}
            className="block w-full px-4 py-3 text-left text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
          >
            Cambiar estado
          </button>

          <button
            type="button"
            disabled
            className="block w-full cursor-not-allowed px-4 py-3 text-left text-sm text-[#a8b2b4]"
          >
            Ver seguimiento
          </button>
        </div>
      ) : null}
    </div>
  );
}
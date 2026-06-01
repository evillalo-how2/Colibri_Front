import type { Patient } from "../types/patient.types";
import { PatientActionsMenu } from "./PatientActionsMenu";
import { PatientModalityBadge } from "./PatientModalityBadge";
import { PatientStatusBadge } from "./PatientStatusBadge";

type PatientsTableProps = {
  patients: Patient[];
  onEditPatient: (patient: Patient) => void;
  onChangePatientStatus: (patient: Patient) => void;
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

export function PatientsTable({
  patients,
  onEditPatient,
  onChangePatientStatus,
}: PatientsTableProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#d6e2e0] text-xs uppercase tracking-[0.25em] text-[#9fb8b4]">
              <th className="px-6 py-5 font-normal">Paciente</th>
              <th className="px-6 py-5 font-normal">Contacto</th>
              <th className="px-6 py-5 font-normal">Modalidad</th>
              <th className="px-6 py-5 font-normal">Estado</th>
              <th className="px-6 py-5 font-normal">Origen</th>
              <th className="px-6 py-5 font-normal">Registro</th>
              <th className="px-6 py-5 font-normal">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="border-b border-[#d6e2e0]/70 text-sm text-[#4b4b4b] last:border-b-0 hover:bg-[#f5f7f6]/80"
              >
                <td className="px-6 py-6">
                  <div>
                    <p className="font-medium">{patient.full_name}</p>
                    {patient.initial_reason ? (
                      <p className="mt-1 line-clamp-1 max-w-xs text-xs text-[#7a8588]">
                        {patient.initial_reason}
                      </p>
                    ) : null}
                  </div>
                </td>

                <td className="px-6 py-6">
                  <div className="space-y-1 text-[#7a8588]">
                    <p>{patient.email ?? "Sin email"}</p>
                    <p className="text-xs">{patient.phone ?? "Sin teléfono"}</p>
                  </div>
                </td>

                <td className="px-6 py-6">
                  <PatientModalityBadge modality={patient.preferred_modality} />
                </td>

                <td className="px-6 py-6">
                  <div>
                    <PatientStatusBadge status={patient.status} />
                    {patient.status_note ? (
                      <p className="mt-2 line-clamp-1 max-w-xs text-xs text-[#7a8588]">
                        {patient.status_note}
                      </p>
                    ) : null}
                  </div>
                </td>

                <td className="px-6 py-6 text-[#7a8588]">
                  {patient.source ?? "Sin origen"}
                </td>

                <td className="px-6 py-6 text-[#7a8588]">
                  {formatDate(patient.created_at)}
                </td>

                <td className="px-6 py-6">
                  <PatientActionsMenu
                    patient={patient}
                    onEditPatient={onEditPatient}
                    onChangePatientStatus={onChangePatientStatus}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { contactInfo } from "../data/landingContent";
import { LandingSectionHeader } from "./LandingSectionHeader";

export function LandingContact() {
    return (
        <section id="contacto" className="bg-white px-5 py-20 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <LandingSectionHeader
                    eyebrow="Agenda tu consulta"
                    title="Da el primer paso para reconectar contigo."
                    description="Puedes solicitar información sobre terapia presencial, terapia online, cursos, talleres, eventos o productos disponibles."
                />

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6] p-6">
                        <FiMail className="text-[#9fb8b4]" size={24} />
                        <p className="mt-5 text-sm font-semibold text-[#4b4b4b]">
                            Correo
                        </p>
                        <p className="mt-2 break-all text-sm text-[#7a8588]">
                            {contactInfo.email}
                        </p>
                    </div>

                    <div className="rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6] p-6">
                        <FiPhone className="text-[#9fb8b4]" size={24} />
                        <p className="mt-5 text-sm font-semibold text-[#4b4b4b]">
                            Teléfono
                        </p>
                        <p className="mt-2 text-sm text-[#7a8588]">{contactInfo.phone}</p>
                    </div>

                    <div className="rounded-[2rem] border border-[#d6e2e0] bg-[#f5f7f6] p-6">
                        <FiMapPin className="text-[#9fb8b4]" size={24} />
                        <p className="mt-5 text-sm font-semibold text-[#4b4b4b]">
                            Ubicación
                        </p>
                        <p className="mt-2 text-sm text-[#7a8588]">
                            {contactInfo.location}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
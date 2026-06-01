import { services } from "../data/landingContent";
import { LandingSectionHeader } from "./LandingSectionHeader";
import { LandingServiceCard } from "./LandingServiceCard";

export function LandingServices() {
    return (
        <section id="servicios" className="bg-white px-5 py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <LandingSectionHeader
                    eyebrow="Servicios"
                    title="Terapia, cursos y experiencias para acompañar tu proceso."
                    description="Colibrí by Karen ofrece espacios presenciales y online para reconectar contigo, trabajar tus emociones y fortalecer tu bienestar personal."
                    align="center"
                />

                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <LandingServiceCard
                            key={service.title}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
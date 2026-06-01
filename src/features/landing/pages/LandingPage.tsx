import { PageTransition } from "../../../shared/components/ui/PageTransition";

import { LandingAbout } from "../components/LandingAbout";
import { LandingAccessSection } from "../components/LandingAccessSection";
import { LandingContact } from "../components/LandingContact";
import { LandingEvents } from "../components/LandingEvents";
import { LandingFooter } from "../components/LandingFooter";
import { LandingHero } from "../components/LandingHero";
import { LandingProducts } from "../components/LandingProducts";
import { LandingServices } from "../components/LandingServices";
import { PublicNavbar } from "../components/PublicNavbar";

export function LandingPage() {
    return (
        <PageTransition>
            <main className="min-h-screen bg-[#f5f7f6] font-sans">
                <PublicNavbar />
                <LandingHero />
                <LandingAbout />
                <LandingServices />
                <LandingProducts />
                <LandingEvents />
                <LandingContact />
                <LandingAccessSection />
                <LandingFooter />
            </main>
        </PageTransition>
    );
}
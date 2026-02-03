import HeroSection from "@/components/sections/HeroSection";
import BrandStorySection from "@/components/sections/BrandStorySection";
import FeatureCardsSection from "@/components/sections/FeatureCardsSection";
import ValuePropositionSection from "@/components/sections/ValuePropositionSection";
import SoftCTASection from "@/components/sections/SoftCTASection";
import MapSection from "@/components/sections/MapSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <BrandStorySection />
      <FeatureCardsSection />
      <ValuePropositionSection />
      <SoftCTASection />
      <MapSection />
    </main>
  );
}

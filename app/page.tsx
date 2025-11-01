import BgGradient from "@/components/common/bg-gradient";
import CTASection from "@/components/home/cta-section";
import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import PricingSection from "@/components/home/pricing-section";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient></BgGradient>
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection></DemoSection>
        <HowItWorksSection></HowItWorksSection>
        <PricingSection></PricingSection>
        <CTASection></CTASection>
      </div>
    </div>
  );
}

import Hero from "./Hero";
import Features from "./Features";
import FAQ from "./FAQ";
import CTA from "./CTA";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col w-full">
      <Hero />
      <Features />
      <FAQ />
      <CTA />
    </div>
  );
}

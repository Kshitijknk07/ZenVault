import Navbar from "@/components/LandingPage/navbar";
import Hero from "@/components/LandingPage/hero";
import Footer from "@/components/LandingPage/footer";
import FeaturesSection from "@/components/LandingPage/FeatureSection";

export function Landing_Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#2c2c2e]">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}

export default Landing_Page;

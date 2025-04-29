import Navbar from "@/components/LandingPage/navbar";
import Hero from "@/components/LandingPage/hero";
import Footer from "@/components/LandingPage/footer";

export function Landing_Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

export default Landing_Page;

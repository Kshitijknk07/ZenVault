import {
  Header,
  Hero,
  Features,
  HowItWorks,
  Testimonials,
  CallToAction,
  Footer,
} from "./components";
import "./LandingPage.css";

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <main className="pt-16">
        {" "}
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

import Navbar from "../components/LandingPage/Navbar";
import HeroSection from "../components/LandingPage/HeroSection";
import FeatureSection from "../components/LandingPage/FeatureSection";
import Workflow from "../components/LandingPage/Workflow";
import Footer from "../components/LandingPage/Footer";
import Pricing from "../components/LandingPage/Pricing";
import Testimonials from "../components/LandingPage/Testimonials";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div id="hero" className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        <Pricing />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;

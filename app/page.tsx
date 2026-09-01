import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Results from "../components/sections/Results";
import About from "../components/sections/About";
import HowItWorks from "../components/sections/HowItWorks";
import Tools from "../components/sections/Tools";
import Testimonials from "../components/sections/Testimonials";
import FAQ from "../components/sections/FAQ";
import Contact from "../components/sections/Contact";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main id="main-content" className="pt-[76px]">
        <Hero />
        <Services /> {/* id="services" */}
        <Results /> {/* id="results" */}
        <About /> {/* id="about" */}
        <HowItWorks /> {/* id="process" */}
        <Tools /> {/* id="tools" */}
        <Testimonials />
        <FAQ />
        <Contact /> {/* id="contact" */}
      </main>
      <Footer />
    </div>
  );
}


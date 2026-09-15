import Navbar from "./components/Navbar";
import BentoGrid from "./components/BentoGrid";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Silk from "./components/Silk";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink text-paper overflow-hidden">
      {/* Animated Silk Background */}
      <div className="fixed inset-0 z-0">
        <Silk
          speed={3.9}
          scale={0.8}
          color="#464349"
          noiseIntensity={0.4}
          rotation={0}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <BentoGrid />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}


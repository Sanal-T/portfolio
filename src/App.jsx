import Navbar from "./components/Navbar";
import BentoGrid from "./components/BentoGrid";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Ferrofluid from "./components/Ferrofluid";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink text-paper overflow-hidden">
      {/* Animated Ferrofluid Background */}
      <div className="fixed inset-0 z-0">
        <Ferrofluid
          colors={["#ffffff", "#ffffff", "#ffffff"]}
          speed={0.1}
          scale={1.6}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={2.5}
          shimmer={1.5}
          glow={2}
          flowDirection="down"
          opacity={1}
          mouseInteraction={true}
          mouseStrength={0.9}
          mouseRadius={0.35}
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


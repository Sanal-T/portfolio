import Navbar from "./components/Navbar";
import InfoHero from "./components/InfoHero";
import DescriptionCapabilities from "./components/DescriptionCapabilities";
import VerticalExperience from "./components/VerticalExperience";
import Certifications from "./components/Certifications";
import ToolsFamiliar from "./components/ToolsFamiliar";
import GithubDetails from "./components/GithubDetails";
import ProjectsSection from "./components/ProjectsSection";
import CommunicationSection from "./components/CommunicationSection";
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

      {/* Main Content in exact user-requested sequence */}
      <div className="relative z-10">
        <Navbar />
        <main>
          {/* 1. Info section with photo */}
          <InfoHero />
          
          {/* 2. Description and capabilities */}
          <DescriptionCapabilities />
          
          {/* 3. Experience as a vertical line connecting downwards */}
          <VerticalExperience />
          
          {/* 4. Certifications */}
          <Certifications />
          
          {/* 5. Tools familiar */}
          <ToolsFamiliar />
          
          {/* 6. Github details */}
          <GithubDetails />
          
          {/* 7. Projects */}
          <ProjectsSection />
          
          {/* 8. Communication */}
          <CommunicationSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

import Navbar from "./components/Navbar";
import BentoGrid from "./components/BentoGrid";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main>
        <BentoGrid />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}

import AnimatedAboutSection from "@/components/AboutSection/page";
import FeaturedSection from "@/components/FeaturedSection/page";
import HeroSection from "@/components/HeroSection/page";
import Navbar from "@/components/Navbar/page";
import Divider from "@/components/ui/divider";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full relative bg-black text-white overflow-hidden">
      {/* Violet Storm Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Main Content Above Background */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <Divider color="#6b6b6c" thickness={0.1} className="px-6" >Features</Divider>
        <FeaturedSection />
      </div>
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FleetSection from "@/components/FleetSection";
import BookNowSection from "@/components/BookNowSection";
import WhyUsSection from "@/components/WhyUsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0A0A0A]">
        <Hero />
        <FleetSection />
        <BookNowSection />
        <WhyUsSection />
        <FAQSection />
        <Footer />
      </main>
    </>
  );
}

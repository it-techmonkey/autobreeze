import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FleetSection from "@/components/FleetSection";
import BookNowSection from "@/components/BookNowSection";
import WhyUsSection from "@/components/WhyUsSection";
import FAQSection from "@/components/FAQSection";
import BrandMarquee from "@/components/BrandMarquee";
import Footer from "@/components/Footer";
import { homePageCars } from "@/lib/cars";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0A0A0A] overflow-x-hidden">
        <Hero />
        <FleetSection carsOverride={homePageCars} />
        <BookNowSection />
        <WhyUsSection />
        <FAQSection />
        <BrandMarquee />
        <Footer />
      </main>
    </>
  );
}

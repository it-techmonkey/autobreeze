import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FleetSection from "@/components/FleetSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Cars | AutoBreeze",
  description: "Browse the full AutoBreeze fleet. Luxury sedans, SUVs, and more in Dubai.",
};

export default function CarsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0A] pt-24 overflow-x-hidden" id="cars-page">
        <div className="min-h-[50vh]">
          <FleetSection enableReveal={false} />
        </div>
      </main>
      <Footer />
    </>
  );
}

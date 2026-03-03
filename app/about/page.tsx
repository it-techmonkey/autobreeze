import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | AutoBreeze",
  description: "Learn about AutoBreeze premium car rental in Dubai.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
          <div className="absolute inset-0 glass-panel-strong rounded-none opacity-30" aria-hidden />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold mb-2">Our Story</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">About Us</h1>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              AutoBreeze offers premium car rental in Dubai. We combine luxury vehicles with
              reliable service so you can focus on the road.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-white/80 space-y-6">
          <p className="leading-relaxed">
            Based in Dubai, we provide a curated fleet of luxury sedans, SUVs, and premium
            vehicles for daily, weekly, and monthly rental. Our team is dedicated to making
            every rental smooth and memorable.
          </p>
          <p className="leading-relaxed">
            For inquiries or bookings, reach out via our contact details or WhatsApp. We look
            forward to serving you.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

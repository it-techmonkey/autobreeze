import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | AutoBreeze",
  description: "Terms of use for AutoBreeze car rental services.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
          <div className="absolute inset-0 glass-panel-strong rounded-none opacity-30" aria-hidden />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold mb-2">Legal</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">Terms of Use</h1>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Please read these terms before using our website and services.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-white/80 space-y-8">
          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-2">Use of Service</h2>
            <p className="leading-relaxed">
              By using AutoBreeze&apos;s website and rental services, you agree to these terms.
              Our services are subject to availability and applicable laws in the UAE.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-2">Bookings & Payments</h2>
            <p className="leading-relaxed">
              Bookings are confirmed subject to availability and our acceptance. Payment terms
              and cancellation policies will be communicated at the time of booking.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-2">Contact</h2>
            <p className="leading-relaxed">
              For questions about these terms, contact us at info@autobreezecarrental.com or
              via the contact details on our website.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

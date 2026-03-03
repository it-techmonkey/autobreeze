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
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-white/80 space-y-8">
          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-2">Introduction</h2>
            <p className="leading-relaxed">
              These Terms of Use govern your vehicle rental with AutoBreeze Car Rentals. By renting from us, you agree to follow these terms in accordance with Dubai, UAE laws.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-2">Eligibility</h2>
            <p className="leading-relaxed">
              - You must be at least 21 years old to rent, or 25 years old for specific vehicle categories.<br />
              - A valid driver&apos;s license recognized by the UAE is required.<br />
              - For non-residents of the UAE, an international driving license or permit is required along with your home country&apos;s driver&apos;s license.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-2">Rental Agreement</h2>
            <p className="leading-relaxed">
              - A formal rental agreement will be issued when you collect the vehicle, specifying the rental period, fees, and conditions.<br />
              - The rental period is calculated on a 24-hour basis.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-2">Fees and Payment</h2>
            <p className="leading-relaxed">
              - Rental fees must be paid upfront or as agreed in the rental contract.<br />
              - Additional charges may apply for late returns, fuel, insurance, or any damages.<br />
              - A refundable security deposit will be held and returned within 10 days, following the vehicle inspection.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-2">Vehicle Use</h2>
            <p className="leading-relaxed">
              - The vehicle may only be used for lawful purposes and in accordance with UAE traffic laws.<br />
              - Only authorized drivers are permitted to operate the vehicle.<br />
              - Off-road driving is prohibited unless expressly permitted by the rental agreement.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-2">Insurance and Liability</h2>
            <p className="leading-relaxed">
              - Basic insurance is included, with the option to purchase additional coverage.<br />
              - You are responsible for any damage, theft, or loss of the vehicle during the rental period.<br />
              - Liability for accidents or third-party damages may apply, as per UAE law.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-2">Maintenance and Return</h2>
            <p className="leading-relaxed">
              - You are responsible for regular checks (e.g., fuel, tire pressure) during the rental period.<br />
              - The vehicle must be returned in the same condition, except for normal wear and tear.<br />
              - The vehicle must be returned at the agreed-upon location and time specified in the rental agreement.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-2">Cancellations and Changes</h2>
            <p className="leading-relaxed">
              - Cancellations made at least 24 hours before the rental period begins are eligible for a full refund.<br />
              - Changes to the rental terms may incur additional fees.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-2">Governing Law</h2>
            <p className="leading-relaxed">
              These terms are governed by UAE laws, and any disputes will be resolved in the courts of Dubai.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-2">Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these terms. Notice of any changes will be posted on our website or communicated via email.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

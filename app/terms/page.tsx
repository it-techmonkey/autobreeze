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
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-white/90">
          <div className="space-y-10">
            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Introduction</h2>
              <p className="leading-relaxed text-left">
                These Terms of Use govern your vehicle rental with AutoBreeze Car Rentals. By renting from us, you agree to follow these terms in accordance with Dubai, UAE laws.
              </p>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Eligibility</h2>
              <ul className="list-disc list-outside pl-5 space-y-2 leading-relaxed text-left">
                <li>You must be at least 21 years old to rent, or 25 years old for specific vehicle categories.</li>
                <li>A valid driver&apos;s license recognized by the UAE is required.</li>
                <li>For non-residents of the UAE, an international driving license or permit is required along with your home country&apos;s driver&apos;s license.</li>
              </ul>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Rental Agreement</h2>
              <ul className="list-disc list-outside pl-5 space-y-2 leading-relaxed text-left">
                <li>A formal rental agreement will be issued when you collect the vehicle, specifying the rental period, fees, and conditions.</li>
                <li>The rental period is calculated on a 24-hour basis.</li>
              </ul>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Fees and Payment</h2>
              <ul className="list-disc list-outside pl-5 space-y-2 leading-relaxed text-left">
                <li>Rental fees must be paid upfront or as agreed in the rental contract.</li>
                <li>Additional charges may apply for late returns, fuel, insurance, or any damages.</li>
                <li>A refundable security deposit will be held and returned within 10 days, following the vehicle inspection.</li>
              </ul>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Vehicle Use</h2>
              <ul className="list-disc list-outside pl-5 space-y-2 leading-relaxed text-left">
                <li>The vehicle may only be used for lawful purposes and in accordance with UAE traffic laws.</li>
                <li>Only authorized drivers are permitted to operate the vehicle.</li>
                <li>Off-road driving is prohibited unless expressly permitted by the rental agreement.</li>
              </ul>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Insurance and Liability</h2>
              <ul className="list-disc list-outside pl-5 space-y-2 leading-relaxed text-left">
                <li>Basic insurance is included, with the option to purchase additional coverage.</li>
                <li>You are responsible for any damage, theft, or loss of the vehicle during the rental period.</li>
                <li>Liability for accidents or third-party damages may apply, as per UAE law.</li>
              </ul>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Maintenance and Return</h2>
              <ul className="list-disc list-outside pl-5 space-y-2 leading-relaxed text-left">
                <li>You are responsible for regular checks (e.g., fuel, tire pressure) during the rental period.</li>
                <li>The vehicle must be returned in the same condition, except for normal wear and tear.</li>
                <li>The vehicle must be returned at the agreed-upon location and time specified in the rental agreement.</li>
              </ul>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Cancellations and Changes</h2>
              <ul className="list-disc list-outside pl-5 space-y-2 leading-relaxed text-left">
                <li>Cancellations made at least 24 hours before the rental period begins are eligible for a full refund.</li>
                <li>Changes to the rental terms may incur additional fees.</li>
              </ul>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Payment & Rental Period</h2>
              <ul className="list-disc list-outside pl-5 space-y-2 leading-relaxed text-left">
                <li>Rentals operate on a 24-hour basis.</li>
                <li>Payments are due upon receiving the vehicle.</li>
              </ul>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Vehicle Inspection</h2>
              <p className="leading-relaxed text-left">
                The Hirer must verify and sign the inspection report during both check-out and check-in.
              </p>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Other Charges & Policies</h2>
              <ul className="list-disc list-outside pl-5 space-y-2 leading-relaxed text-left">
                <li><strong>Smoking:</strong> Strictly prohibited; a fine of AED 500 applies.</li>
                <li><strong>Interior Damage:</strong> Torn seats or other damages incur a minimum charge of AED 700.</li>
                <li><strong>Fuel:</strong> Vehicles must be returned with the same fuel level as received. A refuelling charge of the prevailing fuel price plus AED 10 applies otherwise.</li>
                <li><strong>Lost Keys:</strong> Charges vary by vehicle category.</li>
              </ul>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Traffic Fines & Violations</h2>
              <ul className="list-disc list-outside pl-5 space-y-2 leading-relaxed text-left">
                <li>Customers are responsible for settling fines within 24 hours of notification.</li>
                <li>AutoBreeze can pay on your behalf for a surcharge of AED 50 per fine.</li>
                <li>Impounding involves a AED 250 inconvenience fee plus a daily fee of AED 100 and loss of rental charges.</li>
              </ul>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Vehicle Usage</h2>
              <ul className="list-disc list-outside pl-5 space-y-2 leading-relaxed text-left">
                <li>The vehicle must not be used for illegal purposes, racing, towing, or carrying hazardous substances or alcohol.</li>
                <li>Drivers must be at least 21 years old and properly licensed.</li>
              </ul>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Termination</h2>
              <p className="leading-relaxed text-left">
                AutoBreeze reserves the right to terminate the agreement and repossess the vehicle in cases of non-payment, breach of terms, or if the Hirer is unresponsive for two consecutive days.
              </p>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Governing Law</h2>
              <p className="leading-relaxed text-left">
                These terms are governed by UAE laws, and any disputes will be resolved in the courts of Dubai.
              </p>
            </article>

            <article>
              <h2 className="font-display text-xl font-semibold text-gold mb-3">Changes to Terms</h2>
              <p className="leading-relaxed text-left">
                We reserve the right to modify these terms. Notice of any changes will be posted on our website or communicated via email.
              </p>
            </article>

            <article>
              <p className="leading-relaxed text-left">
                Please let us know if you have any questions regarding these terms.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

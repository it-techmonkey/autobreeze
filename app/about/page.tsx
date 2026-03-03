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
        <section className="relative pt-24 pb-0 overflow-hidden">
          <div className="relative h-[280px] sm:h-[340px] w-full brightness-125 saturate-150">
            <div className="absolute inset-0 bg-[#0A0A0A]/40" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178559!2d55.2708!3d25.1857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682b1c5b3b3b%3A0x1e3e5f682b1c5b3b!2sBusiness%20Bay%2C%20Dubai!5e0!3m2!1sen!2sae!4v1635000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dubai map"
              className="absolute inset-0 opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]/60 pointer-events-none" />
            {/* Pulse hotspot marker */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" style={{ animationDuration: "2s" }} />
              <span className="relative flex h-4 w-4 rounded-full border-2 border-gold bg-gold/80 shadow-lg shadow-gold/30" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-gold font-display text-sm uppercase tracking-widest drop-shadow-md">Dubai · Business Bay</p>
            </div>
          </div>
        </section>
        <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold mb-2">Our Story</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">About Us</h1>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-white/80 space-y-6">
          <p className="leading-relaxed">
            Welcome to AutoBreeze Car Rental in Dubai! We are a trusted and reliable rental company that provides a wide range of vehicles for all your long-term car rental needs. Our goal is to make your rental experience a seamless and stress-free one.
          </p>
          <p className="leading-relaxed">
            Mission statement: At AutoBreeze Car Rental, we strive to provide flexible, reliable, and affordable long-term car rentals tailored to meet the unique needs of each customer. We are committed to delivering exceptional service and ensuring customer satisfaction by offering a wide range of high-quality vehicles.
          </p>
          <p className="leading-relaxed">
            At AutoBreeze Car Rental, we prioritize safety and cleanliness, with all our vehicles regularly maintained and thoroughly cleaned. Our team of experienced professionals is here to assist you in finding the perfect vehicle to suit your needs and budget.
          </p>
          <p className="leading-relaxed">
            With our commitment to top-notch customer service and hassle-free rental experiences, AutoBreeze Car Rental ensures that you stay on the road with confidence and ease. Drive with us, where your journey is our priority.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

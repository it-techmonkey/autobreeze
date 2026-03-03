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
        <section className="relative pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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

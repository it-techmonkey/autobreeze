"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin } from "lucide-react";

const FOOTER_LOGO = "/img/logo.png";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=906+Park+Lane+Park+Regis+Business+Bay+Dubai";

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/autobreezecar", label: "Instagram", Icon: Instagram },
  { href: "https://www.facebook.com/profile.php?id=61565346815233", label: "Facebook", Icon: Facebook },
  { href: "https://www.linkedin.com/company/autobreeze-car-rental/", label: "LinkedIn", Icon: Linkedin },
  {
    href: "https://www.tiktok.com/@autobreezecars?lang=en",
    label: "TikTok",
    Icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.88-4.64 2.93 2.93 0 0 1 .62.06V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal-dark py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="relative h-12 w-36 shrink-0">
              <Image
                src={FOOTER_LOGO}
                alt="AutoBreeze"
                fill
                className="object-contain object-left"
                sizes="144px"
                unoptimized
              />
            </div>
            <p className="mt-2 text-sm text-white/60">
              Premium car rental in Dubai. Luxury meets reliability.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/#fleet" className="text-sm text-white/70 hover:text-gold transition-colors">
                  Explore Cars
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/70 hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white/70 hover:text-gold transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <a href="https://wa.me/971527074847" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-gold transition-colors">
                  Book on WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div id="contact">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
              Contact Us
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-3">
                <span className="rounded-lg border border-white/10 bg-white/5 p-2 text-gold/90">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                <a href="mailto:info@autobreezecarrental.com" className="hover:text-gold transition-colors">
                  info@autobreezecarrental.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-lg border border-white/10 bg-white/5 p-2 text-gold/90">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                <a href="tel:+971246724786" className="hover:text-gold transition-colors">
                  +971 2467 24786
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="rounded-lg border border-white/10 bg-white/5 p-2 text-gold/90 shrink-0">
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  906, Park Lane, Park Regis Business Bay, Dubai
                </a>
              </li>
              <li className="flex flex-wrap gap-2 pt-2">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2.5 text-white/70 transition-all duration-300 hover:border-gold/40 hover:text-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                    aria-label={label}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
          © {new Date().getFullYear()} AutoBreeze. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const FOOTER_LOGO = "/img/logo.png";

function IconMail() {
  return (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function IconMapPin() {
  return (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconLinkedin() {
  return (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=906+Park+Lane+Park+Regis+Business+Bay+Dubai";
const FOOTER_WHATSAPP_URL =
  "https://wa.me/971527074847?text=Hi%2C%20I%20want%20to%20book%20a%20car.";

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/autobreezecar", label: "Instagram", Icon: IconInstagram },
  { href: "https://www.facebook.com/profile.php?id=61565346815233", label: "Facebook", Icon: IconFacebook },
  { href: "https://www.linkedin.com/company/autobreeze-car-rental/", label: "LinkedIn", Icon: IconLinkedin },
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
                <a href={FOOTER_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-gold transition-colors">
                  Enquire on WhatsApp
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
                  <IconMail />
                </span>
                <a href="mailto:info@autobreezecarrental.com" className="hover:text-gold transition-colors">
                  info@autobreezecarrental.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-lg border border-white/10 bg-white/5 p-2 text-gold/90">
                  <IconPhone />
                </span>
                <a href="tel:+971246724786" className="hover:text-gold transition-colors">
                  +971 2467 24786
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="rounded-lg border border-white/10 bg-white/5 p-2 text-gold/90 shrink-0">
                  <IconMapPin />
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

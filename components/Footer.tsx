"use client";

import Link from "next/link";
import Image from "next/image";

const FOOTER_LOGO = "/img/logoblack.png";

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/autobreezecar", label: "Instagram" },
  { href: "https://www.facebook.com/profile.php?id=61565346815233", label: "Facebook" },
  { href: "https://www.linkedin.com/company/autobreeze-car-rental/", label: "LinkedIn" },
  { href: "https://www.tiktok.com/@autobreezecars?lang=en", label: "TikTok" },
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
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a href="mailto:info@autobreezecarrental.com" className="hover:text-gold transition-colors">
                  info@autobreezecarrental.com
                </a>
              </li>
              <li>
                <a href="tel:+971246724786" className="hover:text-gold transition-colors">
                  +971 2467 24786
                </a>
              </li>
              <li>
                <span className="block mt-1">906, Park Lane, Park Regis Business Bay, Dubai</span>
              </li>
              <li className="flex flex-wrap gap-3 pt-2">
                {SOCIAL_LINKS.map(({ href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-gold transition-colors" aria-label={label}>
                    {label}
                  </a>
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

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoBreeze | Premium Car Rental",
  description: "Luxury car rental in Dubai. Experience premium vehicles with world-class service.",
  icons: {
    icon: "/img/favicon.ico",
    apple: "/img/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans min-h-screen bg-matte-black">
        {/* Page content: children must be rendered here to avoid blank screens */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

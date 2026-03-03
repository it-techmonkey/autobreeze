import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        matte: {
          black: "#0A0A0A",
          "black-soft": "#0D0D0D",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          light: "#2A2A2A",
          dark: "#141414",
        },
        gold: {
          DEFAULT: "#D4AF37",
          metallic: "#C9A227",
          champagne: "#F7E7CE",
          light: "#E8D5A3",
        },
        luxury: {
          bg: "#0A0A0A",
          card: "#141414",
          border: "rgba(212, 175, 55, 0.2)",
          "border-hover": "rgba(212, 175, 55, 0.5)",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 30px rgba(212, 175, 55, 0.15)",
        "glow-lg": "0 0 50px rgba(212, 175, 55, 0.2)",
        "inner-gold": "inset 0 0 0 1px rgba(212, 175, 55, 0.3)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.33, 1, 0.68, 1) forwards",
        marquee: "marquee 45s linear infinite",
      },
      animationDelay: {
        "150": "150ms",
      },
    },
  },
  plugins: [],
};

export default config;

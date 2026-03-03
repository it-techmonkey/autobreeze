"use client";

import { motion } from "framer-motion";

const defaultVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const defaultTransition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
};

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  delay?: number;
  once?: boolean;
  amount?: number;
}

const MotionComponents = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
} as const;

export default function RevealOnScroll({
  children,
  className = "",
  as = "div",
  delay = 0,
  once = true,
  amount = 0.15,
}: RevealOnScrollProps) {
  const Component = MotionComponents[as];
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={defaultVariants}
      transition={{ ...defaultTransition, delay }}
      className={className}
    >
      {children}
    </Component>
  );
}

"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface FlipButtonProps {
  frontText: string;
  backText?: string;
  href?: string;
  className?: string;
}

const frontVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 120,
  damping: 18,
  duration: 0.5,
};

export default function FlipTextButton({
  frontText,
  backText = "Click Me",
  href = "#",
  className = "",
}: FlipButtonProps) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ perspective: "600px" }}
      whileHover="hover"
      initial="initial"
    >
      <motion.a
        href={href}
        className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-whiterounded-xl shadow-lg shadow-[#7a26a1] transition-colors rounded-md duration-300  overflow-hidden"
        style={{ transformStyle: "preserve-3d" ,background:"radial-gradient(125% 125% at 50% 10%, #000000 40%, #010133 100%)"}}
      >
        {/* FRONT TEXT */}
        <motion.span
          className="block"
          variants={frontVariants}
          transition={sharedTransition}
          style={{
            transformOrigin: "center bottom",
            backfaceVisibility: "hidden",
          }}
        >
          {frontText}
        </motion.span>
        
        {/* BACK TEXT */}
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          variants={backVariants}
          transition={sharedTransition}
          style={{
            transformOrigin: "center top",
            transform: "rotateX(90deg)",
            backfaceVisibility: "hidden",
          }}
        >
          {backText}
        </motion.span>
      </motion.a>
    </motion.div>
  );
}

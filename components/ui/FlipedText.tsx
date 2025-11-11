'use client';

import React from 'react';
import { motion, Variants, Transition } from 'framer-motion';

interface FlipIconButtonProps {
  frontIcon?: React.ReactNode;
  frontText?:string;
  backText?:string;
  backIcon?: React.ReactNode;
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

const sharedTransition: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 26,
  duration: 0.8,
};

export default function FlipedText({
  frontIcon,
  frontText='',
  backText='',
  backIcon,
  className = '',
}: FlipIconButtonProps) {
  return (
    <motion.button
      className={`relative flex items-center cursor-pointer justify-center  text-white rounded-full bg-transparent ${className}`}
      style={{
        perspective: '600px',
        transformStyle: 'preserve-3d',
      }}
      whileHover="hover"
      initial="initial"
    >
      {/* Front Icon */}
      <motion.span
        className="block"
        variants={frontVariants}
        transition={sharedTransition}
        style={{
          transformOrigin: 'center bottom',
          backfaceVisibility: 'hidden',
        }}
      >
        {frontIcon}  {frontText}
      </motion.span>

      {/* Back Icon */}
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        variants={backVariants}
        transition={sharedTransition}
        style={{
          transformOrigin: 'center top',
          transform: 'rotateX(90deg)',
          backfaceVisibility: 'hidden',
        }}
      >
        {backIcon}  {backText}
      </motion.span>
    </motion.button>
  );
}

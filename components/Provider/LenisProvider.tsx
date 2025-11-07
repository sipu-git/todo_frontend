"use client";
import React, { ReactNode } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisOptions = {
    lerp: 0.05,
    duration: 1.05,
    smoothTouch: true,
    smoothWheel: true,
  };

  return <ReactLenis root options={lenisOptions}>{children}</ReactLenis>;
};

export default SmoothScroll;

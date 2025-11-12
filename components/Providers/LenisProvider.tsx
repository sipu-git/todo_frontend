// "use client";

// import React, { useEffect, useRef } from "react";
// import Lenis from "lenis";

// interface LenisProviderProps {
//   children: React.ReactNode;
//   duration?: number; // scroll duration (smoothness)
// }

// export default function LenisProvider({
//   children,
//   duration = 2,
// }: LenisProviderProps) {
//   const lenisRef = useRef<Lenis | null>(null);
//   const rafRef = useRef<number | null>(null);

//   useEffect(() => {
//     const lenis = new Lenis({
//       duration,
//       lerp: 0.1,
//       wheelMultiplier: 1,
//       touchMultiplier: 1.5,
//       infinite: false,
//       orientation: "vertical",
//       gestureOrientation: "vertical",
//       easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     });

//     lenisRef.current = lenis;

//     const raf = (time: number) => {
//       lenis.raf(time);
//       rafRef.current = requestAnimationFrame(raf);
//     };
//     rafRef.current = requestAnimationFrame(raf);

//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       lenis.destroy();
//     };
//   }, [duration]);

//   return <>{children}</>;
// }

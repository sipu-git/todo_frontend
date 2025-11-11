'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type Props = {
  size?: number;
  color?: string;
  ringColor?: string;
  zIndex?: number;
  spring?: { stiffness?: number; damping?: number; mass?: number };
  hoverScale?: number;
  showOnTouch?: boolean;
};

export default function CustomCursor({
  size = 32,
  color = '#ffffff',
  ringColor = 'rgba(255,255,255,0.55)',
  zIndex = 9999,
  spring = { stiffness: 140, damping: 14, mass: 0.35 },
  hoverScale = 1.25,
  showOnTouch = false,
}: Props) {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  // Opacity + scale springs
  const opacity = useSpring(0, { stiffness: 200, damping: 20 });
  const baseScale = useSpring(1, { stiffness: 250, damping: 18 });

  // Smooth subtle pulsing for a “live” feel
  const timeRef = useRef<number>(0);
  const [enabled, setEnabled] = useState(false);

  // Respect prefers-reduced-motion + pointer capability
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setEnabled((canHover || showOnTouch) && !reduce);

    const onMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      opacity.set(1);
    };

    const onMouseLeave = () => opacity.set(0);

    // On scroll/wheel, snap springs to current target to avoid laggy feel
    const onWheelOrScroll = () => {
      x.set(rawX.get());
      y.set(rawY.get());
    };

    if ((canHover || showOnTouch) && !reduce) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('mouseleave', onMouseLeave, { passive: true });
      window.addEventListener('wheel', onWheelOrScroll, { passive: true });
      window.addEventListener('scroll', onWheelOrScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('wheel', onWheelOrScroll as EventListener);
      window.removeEventListener('scroll', onWheelOrScroll as EventListener);
    };
  }, [rawX, rawY, x, y, opacity, showOnTouch]);

  // Grow cursor when hovering interactive elements (a, button, input, [data-cursor=hover])
  useEffect(() => {
    if (!enabled) return;
    const sel = 'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]';

    const enter = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest(sel)) baseScale.set(hoverScale);
    };
    const leave = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest(sel)) baseScale.set(1);
    };

    window.addEventListener('mouseover', enter, { passive: true });
    window.addEventListener('mouseout', leave, { passive: true });
    return () => {
      window.removeEventListener('mouseover', enter as EventListener);
      window.removeEventListener('mouseout', leave as EventListener);
    };
  }, [enabled, baseScale, hoverScale]);

  // Gentle idle micro-bob (sine), very subtle
  useEffect(() => {
    let raf = 0;
    const step = (t: number) => {
      timeRef.current = t;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Slight ring/inner offset for a “living” cursor
  const bob = useTransform(x, () => {
    const t = timeRef.current || 0;
    return Math.sin((t / 1600) * Math.PI * 2) * 0.75; // ±0.75px
  });

  if (!enabled) return null;

  const half = size / 2;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] [contain:layout_paint]"
      style={{ zIndex }}
    >
      <motion.div
        // Follows the pointer
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ x, y, opacity, scale: baseScale }}
      >
        {/* Outer ring */}
        <motion.svg
          viewBox="0 0 150 150"
          width={size + 10}
          height={size + 10}
          className="block"
          style={{ x: bob, y: bob, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' }}
        >
          <circle
            cx="75"
            cy="75"
            r={half + 3}
            fill="none"
            stroke={ringColor}
            strokeWidth="1.5"
          />
        </motion.svg>

        {/* Inner blob */}
        <motion.div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            background: color,
            mixBlendMode: 'difference',
            marginTop: -(size + 10), // stack inside the same center
            marginLeft: 5,
            translateZ: 0,
          }}
        />
      </motion.div>
    </div>
  );
}

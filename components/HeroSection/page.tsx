'use client';
import React from 'react';
import PixelBlast from '@/components/PixelBlast'; // adjust the path to where it’s stored
import { RainbowButton } from '../ui/rainbow-button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* PixelBlast Background */}
      <div className="absolute inset-0 z-0">
        <PixelBlast
          variant="circle"
          pixelSize={3}
          color="#9D8EFF"
          liquid
          liquidStrength={0.2}
          patternScale={2}
          enableRipples
          transparent
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to My World</h1>
        <p className="text-lg max-w-xl mx-auto">
          Experience the interactive motion magic in the background.
        </p>
       <Link href="/user-login" className=''><RainbowButton className='mt-4' variant="outline">Explore Tasks</RainbowButton></Link>
      </div>
    </section>
  );
}

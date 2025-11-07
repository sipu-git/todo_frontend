"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import AnimatedButton from "../ui/AnimatedButton";

export default function HeroSection() {
  return (
    <div id="HeroSection" className="relative mx-6 w-full h-[80vh] flex items-center bg-transparent
 justify-center overflow-hidden">
      {/* Animated Background Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[60%]  blur-[100px] opacity-40 rounded-full"
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-bold text-gray-800 leading-tight"
        >
          Organize Your Day <br />
          <span className="text-blue-600">with TodoMate</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="mt-4 text-gray-600 text-lg"
        >
          Stay focused and productive with smart task tracking, progress visualization, and smooth animations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <AnimatedButton frontText="Register Now" backText="Register Now"/>

        </motion.div>

        {/* Floating Icon Animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-10 flex justify-center"
        >
          <CheckCircle2 size={60} className="text-blue-500 drop-shadow-lg" />
        </motion.div>
      </div>
    </div>
  );
}

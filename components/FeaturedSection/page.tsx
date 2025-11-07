"use client";

import { motion } from "framer-motion";
import { Sparkles, CheckCircle, Clock, Rocket } from "lucide-react";

export default function FeaturedSection() {
  const features = [
    {
      icon: <Sparkles size={32} className="text-violet-400" />,
      title: "Smart Task Management",
      description:
        "Organize your to-dos effortlessly with smart categorization, reminders, and progress tracking.",
    },
    {
      icon: <Clock size={32} className="text-violet-400" />,
      title: "Real-time Sync",
      description:
        "Your data stays updated across all devices with blazing-fast real-time synchronization.",
    },
    {
      icon: <CheckCircle size={32} className="text-violet-400" />,
      title: "Focus Mode",
      description:
        "Stay productive and distraction-free with an immersive task view designed for focus.",
    },
    {
      icon: <Rocket size={32} className="text-violet-400" />,
      title: "Performance Insights",
      description:
        "Track your productivity metrics with smart analytics and goal-setting insights.",
    },
  ];

  return (
    <section id="FeaturedSetion" className="relative py-24 px-6 md:px-16 text-white bg-transparent">
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-900/10 to-transparent opacity-70 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Section Heading */}
      <motion.div
        className="text-center relative z-10 mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
          Powerful Features
        </h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Everything you need to plan, organize, and conquer your daily tasks — beautifully designed for productivity.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-violet-950/20 shadow-lg transition-all duration-500"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-violet-300 mb-2 text-center">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-center">{feature.description}</p>
            <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-violet-400 to-pink-400 transition-all duration-500 mx-auto rounded-full"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { CheckCircle, Clock, Star, User } from 'lucide-react';

/**
 * AnimatedAboutSection.jsx
 * A drop-in, responsive "About" / "Features" section for a To‑Do app.
 * - Uses Tailwind CSS + Framer Motion
 * - Exports a single React component you can place on your page
 *
 * Usage:
 * import AnimatedAboutSection from '@/components/AnimatedAboutSection';
 * <AnimatedAboutSection />
 */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 14 } },
  hover: { scale: 1.02, y: -4, transition: { type: 'spring', stiffness: 300 } },
};

const sparkleVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1.15, transition: {
  repeat: Infinity,        // loop forever
  repeatType: 'reverse',   // 'reverse' = yoyo-style (back-and-forth)
  duration: 2
} },
};

const stats = [
  { id: 1, label: 'Tasks Completed', value: '1.2k', icon: <CheckCircle className="h-5 w-5" /> },
  { id: 2, label: 'Active Lists', value: '24', icon: <Star className="h-5 w-5" /> },
  { id: 3, label: 'Avg. Completion', value: '87%', icon: <Clock className="h-5 w-5" /> },
  { id: 4, label: 'Contributors', value: '3', icon: <User className="h-5 w-5" /> },
];

export default function AnimatedAboutSection() {
  return (
    <section id='AboutSection' className="w-full py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', stiffness: 90, damping: 14 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">About TaskFlow</h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            TaskFlow helps you capture, organize and finish your to‑dos with delightful micro‑interactions and a focus on
            flow. Lightweight, fast and built for people who actually want to get things done.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left column: feature cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4 lg:col-span-2"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              style={{background:"radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b092b 100%)"}}
              className="relative overflow-hidden rounded-2xl p-6 border border-white/10 shadow-md"
            >
                
              <motion.div
                className="absolute -right-8 -top-8 w-40 h-40 rounded-full mix-blend-screen pointer-events-none"
                variants={sparkleVariants}
                initial="initial"
                animate="animate"
              style={{background:"radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b092b 100%)"}}
              />

              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div style={{background:"radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b092b 100%)"}} className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Focus Mode & Quick Add</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 max-w-xl">Add tasks in fewer than 3 keystrokes and use Focus Mode to finish a single task list without distractions.</p>

                  <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
                    <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-gray-100/60 dark:bg-white/6">Fast keyboard input</span>
                    <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-gray-100/60 dark:bg-white/6">Subtasks</span>
                    <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-gray-100/60 dark:bg-white/6">Reminders</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover" style={{background:"radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b092b 100%)"}} className="rounded-2xl p-6 border border-white/10 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Smart Lists & Filters</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Create smart lists that update automatically based on tags, priority, or deadlines. Save filters for one-click access.</p>

              <div className="mt-4 flex gap-3 flex-wrap">
                <div className="p-2 rounded-lg bg-white/30 dark:bg-white/6 border border-white/8 text-sm">Due Today</div>
                <div className="p-2 rounded-lg bg-white/30 dark:bg-white/6 border border-white/8 text-sm">High Priority</div>
                <div className="p-2 rounded-lg bg-white/30 dark:bg-white/6 border border-white/8 text-sm">No Date</div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover" style={{background:"radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b092b 100%)"}} className="rounded-2xl p-6 border border-white/10 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Collaboration & Sharing</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Share lists with friends or teammates, assign tasks, and track progress. Lightweight permissions keep control in your hands.</p>
            </motion.div>
          </motion.div>

          {/* Right column: stats card */}
          <motion.aside
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.2 }}
            style={{background:"radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b092b 100%)"}}
            className="rounded-2xl p-6 border border-white/10 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-300 font-medium">Your progress</h4>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">Stay on top of your day</p>
              </div>
              <div className="text-sm text-gray-500">✨</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/30 dark:bg-white/6">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-gray-800 dark:text-gray-200">{s.icon}</div>
                  <div>
                    <div className="text-sm text-gray-500">{s.label}</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button className="w-full py-2 rounded-lg font-medium border border-transparent bg-gradient-to-r from-indigo-600 to-blue-500 text-white">Open Insights</button>
            </div>
          </motion.aside>
        </div>

        {/* Footer micro timeline */}
        <motion.div className="mt-10" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <div className="max-w-3xl mx-auto text-center text-sm text-gray-600 dark:text-gray-300">
            <span className="inline-block font-medium">Made for focus</span>
            <span className="mx-2">•</span>
            <span>Keyboard-first UX</span>
            <span className="mx-2">•</span>
            <span>Privacy-first data model</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

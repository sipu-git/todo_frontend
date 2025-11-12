'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Users, Sparkles } from 'lucide-react';
import Heading1 from '../Headings/Heading1';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full flex flex-col items-center   py-20 overflow-hidden bg-gradient-to-b from-white to-blue-50"
    >
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[60%] bg-blue-300/30 blur-[120px] rounded-full"
      />

      {/* Section Title */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="mb-6 flex gap-2 items-center text-center"
      >
       <Heading1 text='About TodoMate'/>
      </motion.div>
      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-gray-600 text-center max-w-2xl mb-16"
      >
        TodoMate helps you stay productive, organized, and motivated. Designed for simplicity and focus, it makes your daily planning feel effortless — and even fun!
      </motion.p>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl w-full">
        {[
          {
            icon: <CheckCircle2 size={40} className="text-blue-500" />,
            title: 'Smart Task Tracking',
            desc: 'Stay on top of your goals with clear visualization and task completion tracking.',
          },
          {
            icon: <Target size={40} className="text-purple-500" />,
            title: 'Focused Productivity',
            desc: 'Organize your tasks efficiently and focus only on what matters most.',
          },
          {
            icon: <Users size={40} className="text-pink-500" />,
            title: 'Collaborative Spirit',
            desc: 'Connect with your team and sync your progress effortlessly.',
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Decorative Icon Animation */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-20 flex justify-center"
      >
        <Sparkles size={60} className="text-yellow-400 drop-shadow-lg" />
      </motion.div>
    </section>
  );
}

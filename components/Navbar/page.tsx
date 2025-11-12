'use client';
import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Home, Settings, Bell, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { RainbowButton } from '../ui/rainbow-button';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: 'Home',
    href: '#',
    gradient:
      'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)',
    iconColor: 'group-hover:text-blue-500',
  },
  {
    icon: <Bell className="h-5 w-5" />,
    label: 'About Us',
    href: '#about',
    gradient:
      'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)',
    iconColor: 'group-hover:text-orange-500',
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: 'Our Feature',
    href: '#features',
    gradient:
      'radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)',
    iconColor: 'group-hover:text-green-500',
  },
  {
    icon: <User className="h-5 w-5" />,
    label: 'Faqs',
    href: '#faqs',
    gradient:
      'radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)',
    iconColor: 'group-hover:text-red-500',
  },
];

const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5 },
      scale: { duration: 0.5, type: 'spring', stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants: Variants = {
  initial: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.5 } },
};

const sharedTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export default function Navbar(): React.JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div className="w-full fixed top-4 z-50 flex justify-center items-center px-4">
      <motion.nav
        initial="initial"
        whileHover="hover"
        animate={{
          backgroundColor: scrolled
            ? 'rgba(255,255,255,0.9)'
            : 'rgba(255,255,255,0.05)',
          boxShadow: scrolled
            ? '0px 2px 20px rgba(0,0,0,0.1)'
            : '0px 0px 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-7xl flex items-center justify-between p-3 rounded-2xl backdrop-blur-xl shadow-lg border border-white/10 dark:border-gray-800/40 relative overflow-visible"
      >
        {/* Glow background */}
        <motion.div
          className="absolute -inset-2 rounded-3xl z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(55,1,88,0.1) 0%, rgba(46,2,54,0.1) 50%, rgba(239,68,68,0.1) 100%)',
          }}
          variants={navGlowVariants}
        />

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-semibold relative z-10 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
          TaskMaster
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden relative z-20 text-gray-700 dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4 relative z-10">
          {menuItems.map((item) => (
            <motion.li key={item.label} className="relative">
              <motion.div
                className="block rounded-xl overflow-visible group relative"
                style={{ perspective: '600px' }}
                whileHover="hover"
                initial="initial"
              >
                {/* Glow */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
                  variants={glowVariants}
                  style={{ background: item.gradient, opacity: 0 }}
                />

                {/* Front-facing link */}
                <motion.a
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 relative z-10 rounded-xl transition-colors duration-300 ${
                    scrolled
                      ? 'text-gray-800 hover:text-blue-600'
                      : 'text-gray-200 hover:text-white'
                  }`}
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center bottom',
                  }}
                >
                  <span className={item.iconColor}>{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </motion.a>

                {/* Back face */}
                <motion.a
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-gray-400 rounded-xl"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center top',
                    transform: 'rotateX(90deg)',
                  }}
                >
                  <span className={item.iconColor}>{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </motion.a>
              </motion.div>
            </motion.li>
          ))}
        </ul>

        {/* Login Button (Desktop) */}
        <div className="hidden md:block relative z-10">
          <Link href="/user-login">
            <RainbowButton className="bg-gray-400" variant="outline">
              Login
            </RainbowButton>
          </Link>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: menuOpen ? 1 : 0,
            y: menuOpen ? 0 : -20,
            pointerEvents: menuOpen ? 'auto' : 'none',
          }}
          transition={{ duration: 0.4 }}
          className="absolute top-full left-0 w-full md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-b-2xl shadow-lg border-t border-white/10 overflow-hidden z-10"
        >
          <ul className="flex flex-col p-4 gap-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200/40 text-gray-800 dark:text-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
            <Link href="/user-login" onClick={() => setMenuOpen(false)}>
              <RainbowButton className="w-full mt-2">Login</RainbowButton>
            </Link>
          </ul>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
}

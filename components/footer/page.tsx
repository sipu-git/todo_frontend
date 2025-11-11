"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, CheckCircle2, GitBranch } from "lucide-react";
import Link from "next/link";
import FlipedText from "../ui/FlipedText";

export default function Footer() {
  const linksItems= [
    {
      linkData:"Home",
      reference:"#"
    },
    {
      linkData:"About",
      reference:"#about"
    },
    {
      linkData:"Features",
      reference:"#features"
    },
    {
      linkData:"Faqs",
      reference:"#faqs"
    },
  ]

  return (
    <div style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
        }} className="relative  overflow-hidden">
        
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-blue-400/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Brand Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left space-y-2"
        >
          <div className="flex items-center justify-center md:justify-start gap-2">
            <CheckCircle2 className="text-indigo-600 dark:text-indigo-400 w-7 h-7" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-300 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          <p className="text-gray-600 dark:text-slate-400 text-sm max-w-sm">
            Simplify your workflow, focus on what matters, and get things done efficiently with TaskFlow.
          </p>
        </motion.div>

        {/* Navigation Links */}
        <motion.ul
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center md:justify-end gap-6 text-gray-700 dark:text-slate-300 font-medium"
        >
          {linksItems.map((items,index) => (
            <li key={index}>
              <Link
                href={items.reference}
                className="relative"
              >
                <FlipedText frontText={items.linkData} backText={items.linkData}/>
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Divider */}
      <div className="relative border-t border-white/30 dark:border-slate-700" />

      {/* Bottom Section */}
      <div className="relative flex flex-col md:flex-row items-center justify-between px-6 py-6 max-w-7xl mx-auto text-gray-500 dark:text-slate-400 text-sm">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-5 mt-3 md:mt-0"
        >
          <Link
            href="#"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="GitHub"
          >
            <FlipedText frontIcon={<Github/>} backIcon={<Github/>}/>
          </Link>
          <Link
            href="#"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FlipedText frontIcon={<Linkedin/>} backIcon={<Linkedin/>}/>
          </Link>
          <Link
            href="#"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="Twitter"
          >
            <FlipedText frontIcon={<Twitter/>} backIcon={<Twitter/>}/>
          </Link>
          <Link
            href="#"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="Instagram"
          >
            <FlipedText frontIcon={<Instagram/>} backIcon={<Instagram/>}/>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

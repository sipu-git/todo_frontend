"use client";
import React, { useState } from "react";
import { motion, AnimatePresence,Variants } from "framer-motion";
import {
  Home,
  ListTodo,
  User,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
}

const AnimatedSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Framer Motion sidebar animation variants
  const sidebarVariants:Variants = {
    open: { width: 240, transition: { type: "spring", stiffness: 100 } },
    closed: { width: 70, transition: { type: "spring", stiffness: 200 } },
  };

  // Sidebar menu items
  const items: SidebarItem[] = [
    { icon: <Home />, label: "Home" },
    { icon: <ListTodo />, label: "Tasks" },
    { icon: <User />, label: "Profile" },
    { icon: <Settings />, label: "Settings" },
    { icon: <LogOut />, label: "Logout" },
  ];

  return (
    <div className="h-screen w-full relative bg-black text-white overflow-hidden">
      {/* 🔮 Violet storm glow background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Sidebar */}
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="relative z-10 h-full bg-gradient-to-b from-gray-900/80 to-gray-950/90 backdrop-blur-xl border-r border-gray-800/50 flex flex-col"
      >
        {/* 🔹 Sidebar Header / Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            className="text-lg font-semibold text-blue-400"
          >
            TaskMaster
          </motion.h1>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 text-blue-400 transition-all"
          >
            <Menu />
          </button>
        </div>

        {/* 🔹 Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59,130,246,0.1)" }}
              className="flex items-center gap-4 cursor-pointer p-2 rounded-lg hover:text-blue-400 transition-colors"
            >
              <div className="text-xl">{item.icon}</div>

              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </nav>

        {/* 🔹 Footer Section */}
        <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
          <AnimatePresence>
            {isOpen && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                © 2025 TaskMaster Inc.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedSidebar;

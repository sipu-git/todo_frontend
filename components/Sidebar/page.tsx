'use client';

import React, { useState } from "react";
import { motion, AnimatePresence, Variant, Variants } from "framer-motion";
import { Home, ListTodo, User, Settings, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  reference?: string;
}

const AnimatedSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const sidebarVariants:Variants = {
    open: { x: 0, transition: { type: "spring", stiffness: 80 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 200 } },
  };

  const items: SidebarItem[] = [
    { icon: <Home />, label: "Home", reference: "/dashboard" },
    { icon: <ListTodo />, label: "Add Tasks", reference: "/dashboard/add-task" },
    { icon: <ListTodo />, label: "View Tasks", reference: "/dashboard/view-tasks" },
    { icon: <User />, label: "Profile", reference: "/profile" },
    { icon: <LogOut />, label: "Logout", reference: "/user-login" },
  ];

  const GlowIndicator = ({ active }: { active: boolean }) => (
    <motion.div
      layoutId="activeIndicator"
      className={`absolute left-0 w-1.5 h-8 rounded-r-full bg-gradient-to-b from-indigo-400 to-cyan-400 ${
        active ? "opacity-100" : "opacity-0"
      }`}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    />
  );

  return (
    <div className="relative text-white">
      {/* 🔹 Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 left-4 z-30 md:hidden p-2 rounded-lg bg-gray-900/70 hover:bg-gray-800 text-blue-400 transition-all"
      >
        <Menu />
      </button>

      {/* 🔹 Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-60 h-screen bg-gradient-to-b from-gray-900/80 to-gray-950/90 border-r border-gray-800/40 backdrop-blur-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]">
        <div className="p-5 border-b border-gray-800 text-indigo-400 font-semibold text-lg tracking-wide">
          <Link href='/'>TaskMaster</Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 relative">
          {items.map((item, index) => {
            const active = pathname === item.reference;
            return (
              <Link key={index} href={item.reference || "#"} className="relative">
                {active && <GlowIndicator active={true} />}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    x: 4,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all relative ${
                    active
                      ? "bg-gradient-to-r from-indigo-600/30 to-cyan-500/20 text-indigo-300"
                      : "hover:bg-gray-800/60 text-gray-300 hover:text-indigo-300"
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="text-xl"
                  >
                    {item.icon}
                  </motion.div>
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
          © 2025 TaskMaster Inc.
        </div>
      </div>

      {/* 🔹 Mobile / Tablet Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dim Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-20 md:hidden"
            />

            {/* Sliding Sidebar */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed top-0 left-0 z-30 w-64 h-screen bg-gradient-to-b from-gray-900/95 to-gray-950/95 backdrop-blur-xl border-r border-gray-800/50 p-5 flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center mb-5">
                <h1 className="text-indigo-400 font-semibold text-lg">TaskMaster</h1>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-800 text-blue-400"
                >
                  <X />
                </button>
              </div>

              <nav className="flex-1 space-y-2">
                {items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.reference || "#"}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-10 p-3 rounded-lg cursor-pointer transition-all ${
                      pathname === item.reference
                        ? "bg-gradient-to-r from-indigo-600/30 to-cyan-500/20 text-indigo-300"
                        : "hover:bg-gray-800/70 text-gray-300 hover:text-indigo-300"
                    }`}
                  >
                    <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="text-xl">
                      {item.icon}
                    </motion.div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="border-t border-gray-800 pt-3 text-xs text-gray-500 text-center">
                © 2025 TaskMaster Inc.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSidebar;

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Link from "next/link";
import { LogOut } from "lucide-react";

interface TokenDecoded {
  _id: string;
  username: string;
  email: string;
  profile: string;
  exp?: number;
  lastLogin?: Date;
}

export default function Dashboard() {
  const [viewUser, setViewUser] = useState<TokenDecoded | null>(null);
  const [totalTasks, setTotalTasks] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("verifyUser");
      const token = localStorage.getItem("authToken");

      if (!storedUser || !token) {
        console.warn("No token or user found — redirecting...");
        window.location.href = "/user-login";
        return;
      }

      const decoded: TokenDecoded & { exp?: number } = jwtDecode(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.warn("Token expired — redirecting...");
        localStorage.removeItem("authToken");
        localStorage.removeItem("verifyUser");
        window.location.href = "/user-login";
        return;
      }

      setViewUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Error verifying token:", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("verifyUser");
      window.location.href = "/user-login";
    }
  }, []);

  // ✅ Fetch task count
  useEffect(() => {
    const findTasksCount = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      try {
        setLoading(true);
        const response = await axios.get(
          "https://todo-backend-1hic.onrender.com/api/task/viewTasks",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const totalData = response.data.tasks;
        setTotalTasks(totalData.length);
      } catch (error) {
        console.error("Error fetching tasks count:", error);
      } finally {
        setLoading(false);
      }
    };
    findTasksCount();
  }, []);

  const cards = [
    { title: "Total Users", value: "1,204", desc: "Active this week" },
    {
      title: "Tasks Completed",
      value: loading ? "..." : totalTasks,
      links: "/dashboard/view-tasks",
      desc: "Last 7 days",
    },
    { title: "Revenue", value: "$12,430", desc: "This month" },
    { title: "New Messages", value: "34", desc: "Unread notifications" },
  ];

  const imageUrl =
    viewUser?.profile && viewUser.profile.startsWith("http")
      ? `${viewUser.profile}?t=${Date.now()}`
      : "/default-avatar.png";

  return (
    <div
      className="flex flex-col md:flex-row w-full min-h-screen text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(600px 400px at 10% 20%, rgba(99,102,241,0.18), transparent 15%), radial-gradient(500px 350px at 90% 80%, rgba(16,185,129,0.12), transparent 12%), #0b1020",
      }}
    >
      <div className="flex-1 flex flex-col overflow-y-auto w-full">
        <div className="flex flex-wrap justify-between items-center gap-4 p-4 sm:p-6 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">
              Dashboard Overview
            </h1>
            {viewUser?.lastLogin && (
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Last Login: {new Date(viewUser.lastLogin).toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-end items-center gap-3 sm:gap-5">
            {viewUser && (
              <Link href="/dashboard/user-profile">
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full relative overflow-hidden border border-white/20">
                    <Image
                      src={imageUrl}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="flex flex-col">
                    <p className="font-medium text-sm sm:text-base">
                      {viewUser.username}
                    </p>
                    <span className="text-xs sm:text-sm text-[#bbb8b8] truncate max-w-[150px] sm:max-w-none">
                      {viewUser.email}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Logout Button */}
            <motion.button
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-600/20 border border-red-500/40 rounded-lg text-red-300 flex items-center gap-1 cursor-pointer hover:bg-red-600/30 transition-all"
              onClick={() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("verifyUser");
                window.location.href = "/user-login";
              }}
            >
              <LogOut size={14} className="sm:w-4 sm:h-4" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>

        {/* --- Dashboard Cards --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-8"
        >
          {cards.map((card, index) => (
            <Link key={index} href={card.links ?? "#"}>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-md cursor-pointer transition-transform text-center sm:text-left"
              >
                <h3 className="text-base sm:text-lg font-semibold text-indigo-300 mb-1">
                  {card.title}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold mb-1">
                  {card.value}
                </p>
                <p className="text-xs sm:text-sm text-gray-400">{card.desc}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

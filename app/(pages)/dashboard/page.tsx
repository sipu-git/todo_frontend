"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSidebar from "@/components/Sidebar/page";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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
  const [totalTasks,setTotalTasks] = useState(0)
  const [loading,setLoading] = useState(false)

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

  useEffect(()=>{
    const findTasksCount = async ()=>{
      const token = localStorage.getItem("authToken")
      console.log(token);
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/task/viewTasks",{
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const totalData = response.data.tasks;
        setTotalTasks(totalData.length);
      } catch (error) {
               console.error("Error fetching tasks count:", error);
      }
      finally{
        setLoading(false)
      }
    }
    findTasksCount()
  },[])
  const cards = [
    { title: "Total Users", value: "1,204", desc: "Active this week" },
    { title: "Tasks Completed", value: loading?"...":totalTasks, desc: "Last 7 days" },
    { title: "Revenue", value: "$12,430", desc: "This month" },
    { title: "New Messages", value: "34", desc: "Unread notifications" },
  ];

  return (
    <div
      className="flex w-full min-h-screen text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(600px 400px at 10% 20%, rgba(99,102,241,0.18), transparent 15%), radial-gradient(500px 350px at 90% 80%, rgba(16,185,129,0.12), transparent 12%), #0b1020",
      }}
    >
      {/* Sidebar */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* --- Top Navbar --- */}
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
            {viewUser?.lastLogin && (
              <p className="text-sm text-gray-400">
                Last Login: {new Date(viewUser.lastLogin).toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {viewUser && (
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full relative overflow-hidden"
                >
                  <Image
                    src={viewUser.profile || "/default-avatar.png"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="text-right">
                  <p className="font-medium text-sm md:text-base">{viewUser.username}</p>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="ml-4 px-4 py-2 text-sm bg-red-600/20 hover:bg-red-600/40 border border-red-500/40 rounded-lg text-red-300 transition-all"
              onClick={() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("verifyUser");
                window.location.href = "/user-login";
              }}
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* --- Dashboard Cards --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-md cursor-pointer transition-transform"
            >
              <h3 className="text-lg font-semibold text-indigo-300 mb-1">
                {card.title}
              </h3>
              <p className="text-3xl font-bold mb-1">{card.value}</p>
              <p className="text-sm text-gray-400">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

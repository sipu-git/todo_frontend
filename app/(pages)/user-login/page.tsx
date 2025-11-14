"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setAuthToken } from "@/lib/authToken";
import { motion } from "framer-motion";
import { ShineBorder } from "@/components/ui/shine-border";

interface LoginData {
  email: string;
  password: string;
}

export default function UserLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://todo-backend-1hic.onrender.com/api/user/loginUser",
        formData,
        { withCredentials: true }
      );

      const { token, user, message } = res.data;

      if (token && user) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("verifyUser", JSON.stringify(user));
        setAuthToken(token);

        toast.success(message || "Login successful!", {
          position: "top-center",
        });

        router.push("/dashboard");
      } else {
        toast.error("Invalid response from server", { position: "top-center" });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border border-white/15 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition";

  return (
    <div
      className="w-full h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "radial-gradient(600px 400px at 10% 20%, rgba(99,102,241,0.18), transparent 15%), radial-gradient(500px 350px at 90% 80%, rgba(16,185,129,0.12), transparent 12%), #0b1020",
      }}
    >
      {/* Animated gradient blobs */}
      <div
        aria-hidden
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-40 animate-blob"
        style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000"
        style={{ background: "linear-gradient(135deg,#06b6d4,#f472b6)" }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto rounded-2xl">
        <ShineBorder
          borderWidth={2}
          duration={10}
          shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          className="rounded-2xl"
        />

        {/* Actual Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative px-8 py-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className={inputClass}
              value={formData.email}
              onChange={handleChange}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className={inputClass}
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-teal-400 hover:scale-[1.02] active:scale-95 transition-transform font-semibold shadow-lg"
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              )}
              <span>{loading ? "Logging in..." : "Login"}</span>
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => router.push("/user-register")}
                className="text-sm cursor-pointer text-white/70 underline"
              >
                Don’t have an account? Register
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* ===== Blob Animation Styles ===== */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(20px, -10px) scale(1.05);
          }
          66% {
            transform: translate(-10px, 20px) scale(0.95);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        .animate-blob {
          animation: blob 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import axios from "axios";
// import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/lib/authToken";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";

type FormState = {
  username: string;
  email: string;
  phone: string;
  age: string;
  password: string;
  address: string;
};

export default function UserRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({
    username: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    address: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
     const userData = new FormData()
     userData.append("username", formData.username);
      userData.append("email", formData.email);
      userData.append("phone", formData.phone);
      userData.append("age", formData.age);
      userData.append("password", formData.password);
      userData.append("address", formData.address);

      if (file) userData.append("profile", file);

      const result = await axios.post(
        "http://localhost:5000/api/user/addUser",
        userData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success(result.data.message || "User registered successfully",{position:"top-center"});

      const userInfo = { ...formData };
      localStorage.setItem("verifyUser", JSON.stringify(userInfo));

      // Reset form
      setFormData({
        username: "",
        email: "",
        phone: "",
        age: "",
        password: "",
        address: "",
      });
      setFile(null);
      setPreview(null);

      // Redirect immediately
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast.error(error.result?.data?.message || "Something went wrong",{
        position:"top-center"
      });
    } finally {
      setLoading(false);
    }
  };

  // Single input class
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
      {/* Background orbs */}
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

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl mx-auto px-8 py-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Left Section */}
          <div className="flex flex-col justify-center space-y-5 text-left">
            <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
            <p className="text-white/80 text-sm max-w-sm leading-relaxed">
              Join SkillShala — build skills, collect certificates, and track your
              progress. It’s quick, secure, and free!
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-white/90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 11c2.21 0 4-1.79 4-4S14.21 3 12 3 8 4.79 8 7s1.79 4 4 4zM6 21v-1a4 4 0 014-4h4a4 4 0 014 4v1"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/70">Secure</p>
                <p className="text-sm font-medium text-white/90">
                  httpOnly & encrypted
                </p>
              </div>
            </div>

            <div className="hidden md:block pt-6">
              <img
                src="/assets/hero-illus.png"
                alt="illustration"
                width={260}
                height={200}
                className="select-none mx-auto"
              />
            </div>
          </div>

          {/* Right Section */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="username" placeholder="Username" className={inputClass} value={formData.username} onChange={handleFieldChange} />
                <input name="email" type="email" placeholder="Email" className={inputClass} value={formData.email} onChange={handleFieldChange} />
              </div>

              {/* Phone & Age */}
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="phone" placeholder="Phone" className={inputClass} value={formData.phone} onChange={handleFieldChange} />
                <input name="age" placeholder="Age" className={inputClass} value={formData.age} onChange={handleFieldChange} />
              </div>

              {/* Password */}
              <input
                name="password"
                type="password"
                placeholder="Password"
                className={inputClass}
                value={formData.password}
                onChange={handleFieldChange}
              />
              <p className="text-xs text-white/60 -mt-2">
                Minimum 8 characters, mix of upper, lower, number & symbol.
              </p>

              {/* Address */}
              <input name="address" placeholder="Address" className={inputClass} value={formData.address} onChange={handleFieldChange} />

              {/* Profile Image + Submit */}
              <div className="flex flex-col gap-4 items-center mt-2 w-full">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                    {preview ? (
                      <Image src={preview} alt="preview" width={64} height={64} className="object-cover rounded-full" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-7 h-7 text-white/80"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M5 7a2 2 0 012-2h10a2 2 0 012 2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11l2 2 4-4" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-white/70" />
                    <p className="text-xs text-white/50">Profile image</p>
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-teal-400 hover:scale-[1.02] active:scale-95 transition-transform font-semibold shadow-lg"
                >
                  {loading && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  )}
                  <span>{loading ? "Registering..." : "Create Account"}</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button type="button" onClick={() => router.push("/login")} className="text-sm text-white/70 underline">
                  Already have an account? Login
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center text-xs text-white/40 mt-6">
          By registering, you agree to our Terms & Privacy.
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0,0) scale(1); }
          33% { transform: translate(20px,-10px) scale(1.05); }
          66% { transform: translate(-10px,20px) scale(0.95); }
          100% { transform: translate(0,0) scale(1); }
        }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}

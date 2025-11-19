'use client';

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ITask {
  title: string;
  description: string;
  status: string;
  dueDate: string;
  priority: string;
}

export default function AddTaskPage() {
  const [createTask, setCreateTask] = useState<ITask>({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
    priority: "medium",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setCreateTask({ ...createTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("authToken")
    console.log(localStorage.getItem("authToken"));
    try {
      const response = await axios.post("https://todo-backend-tujg.onrender.com/api/task/addTask", createTask, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const displayMessage = response.data.message || "Task added successfully!";
      toast.success(displayMessage);

      // Reset form
      setCreateTask({
        title: "",
        description: "",
        status: "pending",
        dueDate: "",
        priority: "medium",
      });
    } catch (error: any) {
      console.error("Error adding task:", error);
      const errorMsg = error.response?.data?.message || "Failed to add task!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.6 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen text-white p-4"
      style={{
        background:
          "radial-gradient(600px 400px at 10% 20%, rgba(99,102,241,0.18), transparent 15%), radial-gradient(500px 350px at 90% 80%, rgba(16,185,129,0.12), transparent 12%), #0b1020",
      }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-semibold mb-8 text-center text-indigo-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        >
          Add New Task
        </motion.h1>

        {/* Title & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={inputVariants}>
            <label className="block mb-2 text-sm text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={createTask.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none transition-all duration-300"
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <label className="block mb-2 text-sm text-gray-300">Status</label>
            <select
              name="status"
              value={createTask.status}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none transition-all duration-300"
            >
              <option value="pending" className="text-gray-800">Pending</option>
              <option value="in-progress" className="text-gray-800">In Progress</option>
              <option value="completed" className="text-gray-800">Completed</option>
            </select>
          </motion.div>
        </div>

        {/* Status & Due Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <motion.div variants={inputVariants}>
            <label className="block mb-2 text-sm text-gray-300">Priority</label>
            <select
              name="priority"
              value={createTask.priority}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none transition-all duration-300"
            >
              <option
                value="low"
                className="text-gray-800"
              >
                Low
              </option>
              <option
                value="medium"
                className="text-gray-800"
              >
                Medium
              </option>
              <option
                value="high"
                className="text-gray-800"
              >
                High
              </option>
            </select>
          </motion.div>

          <motion.div variants={inputVariants}>
            <label className="block mb-2 text-sm text-gray-300">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={createTask.dueDate}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Priority */}
        <motion.div variants={inputVariants}>
          <label className="block mb-2 text-sm text-gray-300">Description</label>
          <textarea
            name="description"
            value={createTask.description}
            onChange={handleChange}
            placeholder="Enter task description"
            className="w-full p-3 h-[120px] rounded-lg bg-white/5 border border-white/20 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none transition-all duration-300 resize-none"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full mt-8 py-3 rounded-lg text-white font-medium transition-all duration-300 ${loading
              ? "bg-indigo-400/70 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700"
            }`}
        >
          {loading ? "Adding Task..." : "Add Task"}
        </motion.button>
      </motion.form>
    </div>
  );
}

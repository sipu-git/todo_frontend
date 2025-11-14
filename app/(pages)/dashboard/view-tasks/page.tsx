"use client";

import { motion, Variants } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ITask {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  dueDate?: string;
  priority?: "low" | "medium" | "high";
}

export default function ViewTasks() {
  const [viewTasks, setViewTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const findTasks = async () => {
    const token = localStorage.getItem("authToken");
    try {
      setLoading(true);
      const response = await axios.get(
        "https://todo-backend-1hic.onrender.com/api/task/viewTasks",
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message || "Tasks fetched successfully!");
      setViewTasks(response.data.tasks || []);
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
      setMessage(error.response?.data?.message || "Failed to load tasks!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findTasks();
  }, []);

  const deleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `https://todo-backend-5uyj.onrender.com/api/task/deleteTask/${taskId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setViewTasks((prev) => prev.filter((task) => task._id !== taskId));
      setMessage("Task deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting task:", error);
      setMessage(error.response?.data?.message || "Failed to delete task!");
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-400 border-red-400";
      case "medium":
        return "text-yellow-400 border-yellow-400";
      default:
        return "text-green-400 border-green-400";
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen text-white p-6"
      style={{
        background:
          "radial-gradient(600px 400px at 10% 20%, rgba(99,102,241,0.18), transparent 15%), radial-gradient(500px 350px at 90% 80%, rgba(16,185,129,0.12), transparent 12%), #0b1020",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-8 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-green-400"
      >
        🧾 Task List
      </motion.h1>

      {loading ? (
        <p className="text-gray-400 animate-pulse">Loading tasks...</p>
      ) : viewTasks.length === 0 ? (
        <p className="text-gray-400">{message || "No tasks available!"}</p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-5xl rounded-xl shadow-lg backdrop-blur-md bg-white/5 border border-white/10"
        >
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="text-indigo-400 border-b border-white/10 text-base">
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Due Date</th>
                <th className="py-4 px-6">Priority</th>
                <th className="py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {viewTasks.map((task, index) => (
                <motion.tr
                  key={task._id || index}
                  variants={rowVariants}
                  whileHover={{
                    scale: 1.0,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                  className="border-b border-white/5 transition-all duration-300"
                >
                  <td className="py-3 px-6 font-semibold">{task.title}</td>
                  <td className="py-3 px-6 text-gray-300">
                    {task.description || "—"}
                  </td>
                  <td
                    className={`py-3 px-6 ${
                      task.status === "completed"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {task.status}
                  </td>
                  <td className="py-3 px-6 text-gray-400">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                        task.priority || "low"
                      )}`}
                    >
                      {task.priority || "low"}
                    </span>
                  </td>
                  <td className="flex justify-center items-center gap-2 py-3">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/modify-task/${task._id}`)
                      }
                      className="p-2 rounded-full bg-indigo-500/20 hover:bg-indigo-500/40 transition"
                      title="Edit"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="p-2 cursor-pointer rounded-full bg-red-500/20 hover:bg-red-500/40 transition"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}

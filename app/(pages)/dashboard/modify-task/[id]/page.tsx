"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {  useParams, useRouter } from "next/navigation";
import Heading1 from "@/components/Headings/Heading1";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  dueDate?: string;
  priority?: "low" | "medium" | "high";
}

export default function ModifyTask() {
  const searchParams = useParams<{id:string}>();
  const taskId = searchParams?.id;
  const router = useRouter();

  const [formData, setFormData] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
    priority: "low",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) {
        toast.error("No task ID provided.");
        setFetching(false);
        return;
      }

      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `https://todo-backend-tujg.onrender.com/api/task/viewTask/${taskId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFormData(response.data.task);
      } catch (error: any) {
        console.error("Error fetching task:", error);
        toast.error(error.response?.data?.message || "Failed to fetch task!");
      } finally {
        setFetching(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Handle submit to update the task ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId) return toast.error("Task ID missing!");

    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.put(
        `https://todo-backend-tujg.onrender.com/api/task/editTask/${taskId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const msg = response.data.message || "Task updated successfully!";
      toast.success(msg);
      router.push("/dashboard/view-tasks"); 
    } catch (error: any) {
      console.error("Error updating task:", error);
      toast.error(error.response?.data?.message || "Failed to update task!");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Loading task...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0b1020] text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl shadow-lg w-full max-w-lg"
      >
        <Heading1 text="Edit Task" />
        <p className="text-gray-400 mb-4">
          Modify the task details and save your changes.
        </p>

        <div className="space-y-3">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate ? formData.dueDate.split("T")[0] : ""}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

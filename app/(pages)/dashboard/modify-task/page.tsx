"use client";

import React, { useState } from "react";
import axios from "axios";
import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Heading1 from "@/components/Headings/Heading1";

interface EditTaskProps {
    task: {
        _id: string;
        title: string;
        description: string;
        status: string;
        dueDate: string;
        priority: string;
    };
    onTaskUpdated: () => void;
}

export default function ModifyTask({ task, onTaskUpdated }: EditTaskProps) {
    const [formData, setFormData] = useState({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pending",
        dueDate: task.dueDate || "",
        priority: task.priority || "low",
    });

    const [loading, setLoading] = useState(false);
    //   const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem("authToken");

        try {
            const response = await axios.put(
                `https://todo-backend-5uyj.onrender.com/api/task/editTask/${task._id}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            const displayMessage = response.data.message || "Task updated successfully!";
            toast.success(displayMessage)
            onTaskUpdated();

        } catch (error: any) {
            console.error("Error deleting task:", error);
            const errorMsg = error.response?.data?.message || "Failed to delete task!";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
                <DialogTitle><Heading1 text="Edit Task" /></DialogTitle>
                <DialogDescription>
                    Modify the task details and save your changes.
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
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

            <DialogFooter>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>

                <DialogClose asChild>
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition"
                    >
                        Cancel
                    </button>
                </DialogClose>
            </DialogFooter>
        </form>
    );
}

"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Pencil, Save, X, Upload } from "lucide-react";
import { toast } from "sonner";

interface IUser {
    _id: string;
    username: string;
    email: string;
    phone: string;
    age: string;
    address?: string;
    profileImage?: string;
}

export default function UserProfile() {
    const [profileData, setProfileData] = useState<IUser | null>(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        age: "",
        address: "",
    });
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [editField, setEditField] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    // const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("authToken");
            console.log("token", token)
            try {
                setLoading(true);
                const response = await axios.get("https://todo-backend-1hic.onrender.com/api/user/viewProfile", {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    },
                });

                setProfileData(response.data.user);
                setFormData({
                    username: response.data.user.username || "",
                    email: response.data.user.email || "",
                    phone: response.data.user.phone || "",
                    age: response.data.user.age || "",
                    address: response.data.user.address || "",
                });
            } catch (error: any) {
                console.error(error.response?.data?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
            if (profileImage) formDataToSend.append("profile", profileImage);

            const response = await axios.put(
                "https://todo-backend-1hic.onrender.com/api/user/viewProfileAndUpdate",
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            setProfileData(response.data.user);
            setEditField(null);
            const displayMsg = response.data.message || "Profile updated successfully!";
            toast.success(displayMsg);
            localStorage.setItem("verifyUser", JSON.stringify(response.data.user));

        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center mt-8 text-gray-300">Loading profile...</p>;
    if (!profileData) return <p className="text-center mt-8 text-gray-400">No profile found.</p>;

    return (
        <div
            className="min-h-screen flex justify-center items-center p-8"
            style={{
                background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-6xl text-white border border-white/10"
            >
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-purple-500 shadow-xl">
                            <Image
                                src={previewImage || profileData.profileImage || "/default-avatar.png"}
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <label
                            htmlFor="profileImage"
                            className="flex items-center gap-2 mt-3 cursor-pointer bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-full text-sm shadow-md"
                        >
                            <Upload size={16} />
                            Change Image
                        </label>
                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                    <div className="">
                        <h2 className="text-3xl font-bold mb-10 text-center text-purple-300 tracking-wide">
                            Edit & Update Profile
                        </h2>

                    </div>
                </div>
                {/* Right Side – Form Fields */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 mt-4 gap-6">
                    {["username", "email", "phone", "age", "address"].map((field) => (
                        <div key={field} className="flex flex-col">
                            <div className="flex justify-between items-center mb-2">
                                <label className="capitalize text-sm text-gray-300 font-medium">
                                    {field}
                                </label>
                                {editField === field ? (
                                    <button
                                        type="button"
                                        onClick={() => setEditField(null)}
                                        className="text-red-400 hover:text-red-500"
                                    >
                                        <X size={18} className="cursor-pointer" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setEditField(field)}
                                        className="text-purple-400 hover:text-purple-500"
                                    >
                                        <Pencil size={18} className="cursor-pointer" />
                                    </button>
                                )}
                            </div>

                            {editField === field ? (
                                <input
                                    type="text"
                                    name={field}
                                    value={(formData as any)[field]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-purple-400 bg-transparent text-white focus:ring-2 focus:ring-purple-500 transition"
                                />
                            ) : (
                                <p className="text-gray-300 px-3 py-2 bg-white/5 rounded-lg">
                                    {(formData as any)[field] || "Not provided"}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Save Button */}
                <div className="mt-10 flex justify-start items-start">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex cursor-pointer items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-lg font-medium transition-all shadow-lg"
                    >
                        <Save size={20} />
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}

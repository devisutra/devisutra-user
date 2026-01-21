"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, Mail, Phone, MapPin, Lock, Package, 
  Bell, ChevronRight, LogOut, Edit, Save, X,
  Settings, HelpCircle, Shield, FileText
} from "lucide-react";
import { useToast } from "@/lib/useToast";

interface UserData {
  id: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  address?: string;
  pincode?: string;
  addresses: Array<{
    fullName?: string;
    phone?: string;
    address?: string;
    city?: string;
    pincode?: string;
    isDefault?: boolean;
  }>;
}

export default function AccountPage() {
  const router = useRouter();
  const { showToast, ToastContainer } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/session");
      const data = await response.json();

      if (data.success && data.user) {
        setUserData(data.user);
        
        // Set initial edit data
        const defaultAddress = data.user.addresses?.find((addr: { isDefault?: boolean }) => addr.isDefault) || data.user.addresses?.[0];
        setEditData({
          name: data.user.fullName || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          address: defaultAddress?.address || "",
          pincode: defaultAddress?.pincode || "",
        });
      } else {
        // Not authenticated, redirect to login
        router.push("/login?redirect=/account");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      router.push("/login?redirect=/account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: editData.name,
          address: editData.address,
          pincode: editData.pincode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local user data
        await fetchUserData();
        showToast("Profile updated successfully!", "success");
      } else {
        showToast(data.error || "Failed to update profile", "error");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      showToast("Failed to save changes. Please try again.", "error");
    } finally {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    // Reset edit data to current user data
    if (userData) {
      const defaultAddress = userData.addresses?.find(addr => addr.isDefault) || userData.addresses?.[0];
      setEditData({
        name: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: defaultAddress?.address || "",
        pincode: defaultAddress?.pincode || "",
      });
    }
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        showToast("Logged out successfully!", "success");
        // Small delay to show toast before redirect
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      } else {
        showToast("Failed to logout. Please try again.", "error");
      }
    } catch (error) {
      console.error("Logout error:", error);
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A2F1B] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }
<ToastContainer />
      
  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-linear-to-br from-[#4A2F1B] to-[#C2A14D] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User size={40} className="text-[#4A2F1B]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{userData.fullName}</h1>
              <p className="text-sm opacity-90">{userData.email || userData.phone || "User"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Sidebar - Quick Actions */}
          <div className="md:col-span-1 space-y-4">
            
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Orders</span>
                  <span className="font-semibold text-[#4A2F1B]">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Spent</span>
                  <span className="font-semibold text-[#4A2F1B]">₹0</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <Link
                href="/orders"
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Package size={20} className="text-[#C2A14D]" />
                  <span className="font-medium text-gray-800">My Orders</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>

              <Link
                href="/contact"
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={20} className="text-[#C2A14D]" />
                  <span className="font-medium text-gray-800">Help & Support</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Main Content - Profile Details */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User size={20} className="text-[#C2A14D]" />
                  <h2 className="font-semibold text-gray-800">Personal Information</h2>
                </div>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-[#4A2F1B] text-white rounded-lg text-sm font-medium hover:bg-[#C2A14D] transition"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4">
                {/* Full Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="text-[#C2A14D]" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="text-[#C2A14D]" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                      disabled={!!userData.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.email || "Not provided"}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="text-[#C2A14D]" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleChange}
                      disabled={!!userData.phone}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.phone || "Not provided"}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="text-[#C2A14D]" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={editData.address}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.address}</p>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="text-[#C2A14D]" />
                    Pincode
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="pincode"
                      value={editData.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.pincode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Settings & Preferences */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center gap-2">
                <Settings size={20} className="text-[#C2A14D]" />
                <h2 className="font-semibold text-gray-800">Settings & Preferences</h2>
              </div>

              <div className="divide-y divide-gray-100">
                <Link
                  href="/change-password"
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <Lock size={20} className="text-gray-400" />
                    <span className="text-gray-700">Change Password</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>

                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-gray-400" />
                    <span className="text-gray-700">Notification Preferences</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>

                <Link
                  href="/privacy"
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <Shield size={20} className="text-gray-400" />
                    <span className="text-gray-700">Privacy Policy</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>

                <Link
                  href="/terms"
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-gray-400" />
                    <span className="text-gray-700">Terms of Service</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>
              </div>
            </div>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut size={20} />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

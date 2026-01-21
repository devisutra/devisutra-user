"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowLeft, Check } from "lucide-react";

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check password strength for new password
    if (name === "newPassword") {
      setPasswordStrength({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  const toggleShowPassword = (field: "current" | "new" | "confirm") => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    // Check password strength
    const isStrong = Object.values(passwordStrength).every((val) => val === true);
    if (!isStrong) {
      alert("Please create a stronger password!");
      return;
    }

    setLoading(true);

    // Simulate password change API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      setTimeout(() => {
        window.location.href = "/account";
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Back Button */}
        <Link href="/account" className="flex items-center gap-2 text-gray-600 hover:text-[#C2A14D] mb-6">
          <ArrowLeft size={20} />
          <span>Back to Account</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#4A2F1B] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-serif text-[#4A2F1B]">Change Password</h1>
          <p className="mt-2 text-sm text-gray-600">
            Keep your account secure with a strong password
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <Check className="text-green-600" size={24} />
            <div>
              <p className="text-green-800 font-medium">Password changed successfully!</p>
              <p className="text-green-600 text-sm">Redirecting to your account...</p>
            </div>
          </div>
        )}

        {/* Change Password Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6">
          
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Current Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="currentPassword"
                name="currentPassword"
                type={showPasswords.current ? "text" : "password"}
                required
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => toggleShowPassword("current")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              New Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="newPassword"
                name="newPassword"
                type={showPasswords.new ? "text" : "password"}
                required
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => toggleShowPassword("new")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {formData.newPassword && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-3">Password Strength:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${passwordStrength.length ? "bg-green-500" : "bg-gray-300"}`}>
                    {passwordStrength.length && <Check size={12} className="text-white m-auto" />}
                  </div>
                  <span className={`text-sm ${passwordStrength.length ? "text-green-700" : "text-gray-600"}`}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${passwordStrength.uppercase ? "bg-green-500" : "bg-gray-300"}`}>
                    {passwordStrength.uppercase && <Check size={12} className="text-white m-auto" />}
                  </div>
                  <span className={`text-sm ${passwordStrength.uppercase ? "text-green-700" : "text-gray-600"}`}>
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${passwordStrength.lowercase ? "bg-green-500" : "bg-gray-300"}`}>
                    {passwordStrength.lowercase && <Check size={12} className="text-white m-auto" />}
                  </div>
                  <span className={`text-sm ${passwordStrength.lowercase ? "text-green-700" : "text-gray-600"}`}>
                    One lowercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${passwordStrength.number ? "bg-green-500" : "bg-gray-300"}`}>
                    {passwordStrength.number && <Check size={12} className="text-white m-auto" />}
                  </div>
                  <span className={`text-sm ${passwordStrength.number ? "text-green-700" : "text-gray-600"}`}>
                    One number
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${passwordStrength.special ? "bg-green-500" : "bg-gray-300"}`}>
                    {passwordStrength.special && <Check size={12} className="text-white m-auto" />}
                  </div>
                  <span className={`text-sm ${passwordStrength.special ? "text-green-700" : "text-gray-600"}`}>
                    One special character (!@#$%^&*)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Confirm New Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => toggleShowPassword("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Security Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900 mb-2">💡 Security Tips:</p>
            <ul className="text-xs text-blue-800 space-y-1 ml-4 list-disc">
              <li>Do not use common words or personal information</li>
              <li>Use a unique password for each account</li>
              <li>Consider using a password manager</li>
              <li>Change your password regularly</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 bg-[#4A2F1B] text-white py-3 rounded-lg font-semibold hover:bg-[#C2A14D] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : success ? "Updated!" : "Update Password"}
            </button>
            <Link
              href="/account"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition text-center"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Forgot your current password?{" "}
            <Link href="/forgot-password" className="text-[#C2A14D] hover:underline font-medium">
              Reset it here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

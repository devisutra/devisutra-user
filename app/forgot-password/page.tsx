"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, ArrowLeft, Lock } from "lucide-react";

type ResetMethod = "email" | "phone";

export default function ForgotPasswordPage() {
  const [resetMethod, setResetMethod] = useState<ResetMethod>("email");
  const [step, setStep] = useState<"send" | "verify" | "reset">("send");
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setStep("verify");
      alert(`Reset code sent to ${resetMethod === "email" ? formData.email : formData.phone}`);
    }, 1500);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setStep("reset");
    }, 1000);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      alert("Password reset successful! 🎉");
      window.location.href = "/user-login";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* Back Button */}
        <Link href="/user-login" className="flex items-center gap-2 text-gray-600 hover:text-[#C2A14D]">
          <ArrowLeft size={20} />
          <span>Back to Login</span>
        </Link>

        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-[#4A2F1B] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-serif text-[#4A2F1B]">
            {step === "send" && "Forgot Password?"}
            {step === "verify" && "Verify Code"}
            {step === "reset" && "Reset Password"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === "send" && "Enter your details to receive a reset code"}
            {step === "verify" && "Enter the verification code we sent"}
            {step === "reset" && "Create a new password for your account"}
          </p>
        </div>

        {/* Step 1: Send OTP */}
        {step === "send" && (
          <>
            {/* Reset Method Toggle */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex">
              <button
                type="button"
                onClick={() => setResetMethod("email")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition flex items-center justify-center gap-2 ${
                  resetMethod === "email"
                    ? "bg-[#4A2F1B] text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Mail size={16} />
                Email
              </button>
              <button
                type="button"
                onClick={() => setResetMethod("phone")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition flex items-center justify-center gap-2 ${
                  resetMethod === "phone"
                    ? "bg-[#4A2F1B] text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Phone size={16} />
                Phone
              </button>
            </div>

            <form onSubmit={handleSendOTP} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-6">
              {resetMethod === "email" ? (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4A2F1B] text-white py-3 rounded-lg font-semibold hover:bg-[#C2A14D] transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </form>
          </>
        )}

        {/* Step 2: Verify OTP */}
        {step === "verify" && (
          <form onSubmit={handleVerifyOTP} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength={6}
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D] text-center text-2xl tracking-widest"
                placeholder="000000"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  Code sent to {resetMethod === "email" ? formData.email : formData.phone}
                </p>
                <button
                  type="button"
                  onClick={() => handleSendOTP(new Event("submit") as any)}
                  className="text-xs text-[#C2A14D] hover:underline"
                >
                  Resend Code
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4A2F1B] text-white py-3 rounded-lg font-semibold hover:bg-[#C2A14D] transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4A2F1B] text-white py-3 rounded-lg font-semibold hover:bg-[#C2A14D] transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* Remember Password Link */}
        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link href="/user-login" className="font-medium text-[#C2A14D] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

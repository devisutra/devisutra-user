"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Phone, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { authAPI } from "@/lib/api-client";

type AuthMethod = "email" | "phone";

export default function LoginPage() {
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<AuthMethod>("email");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async () => {
    if (!formData.phone) {
      toast.error("Please enter phone number");
      return;
    }

    setLoading(true);
    try {
      const data = await authAPI.sendOTP(formData.phone);
      setOtpSent(true);
      toast.success("OTP sent successfully to your phone");
      
      // Show OTP in development
      if (data.otp) {
        toast.success(`Development OTP: ${data.otp}`);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (authMethod === "email") {
      if (!formData.email.trim()) {
        toast.error("Please enter your email");
        return;
      }
      if (!formData.password) {
        toast.error("Please enter your password");
        return;
      }
    } else {
      if (!formData.phone.trim()) {
        toast.error("Please enter your phone number");
        return;
      }
      if (!otpSent) {
        toast.error("Please request OTP first");
        return;
      }
      if (!formData.otp || formData.otp.length !== 6) {
        toast.error("Please enter valid 6-digit OTP");
        return;
      }
    }

    setLoading(true);

    try {
      // For phone login, verify OTP
      if (authMethod === "phone") {
        await authAPI.verifyOTP(formData.phone, formData.otp);
      } else {
        // For email login
        await authAPI.login({
          email: formData.email,
          password: formData.password,
        });
      }

      toast.success("🎉 Login successful! Welcome back");
      
      // Redirect after short delay
      setTimeout(() => {
        router.push("/account");
      }, 1500);
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please check your credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
      
        {/* Back Button */}
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-[#C2A14D]">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-serif text-[#4A2F1B]">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Login to your Devi Sutra account
          </p>
        </div>

        {/* Auth Method Toggle */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex">
          <button
            type="button"
            onClick={() => {
              setAuthMethod("email");
              setOtpSent(false);
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition flex items-center justify-center gap-2 ${
              authMethod === "email"
                ? "bg-[#4A2F1B] text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Mail size={16} />
            Email
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMethod("phone");
              setOtpSent(false);
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition flex items-center justify-center gap-2 ${
              authMethod === "phone"
                ? "bg-[#4A2F1B] text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Phone size={16} />
            Phone OTP
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          
          {authMethod === "email" ? (
            <>
              {/* Email */}
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
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <Link href="/forgot-password" className="text-xs text-[#C2A14D] hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
                      placeholder="1234567890"
                      disabled={otpSent}
                    />
                  </div>
                  {!otpSent && (
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={loading || !formData.phone}
                      className="px-6 py-3 bg-[#C2A14D] text-white rounded-lg font-medium hover:bg-[#4A2F1B] transition disabled:opacity-50 whitespace-nowrap"
                    >
                      {loading ? "Sending..." : "Send OTP"}
                    </button>
                  )}
                </div>
              </div>

              {/* OTP Input */}
              {otpSent && (
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
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
                      OTP sent to {formData.phone}
                    </p>
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      className="text-xs text-[#C2A14D] hover:underline"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Remember Me */}
          {authMethod === "email" && (
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-[#4A2F1B] border-gray-300 rounded focus:ring-[#C2A14D]"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || (authMethod === "phone" && !otpSent)}
            className="w-full bg-[#4A2F1B] text-white py-3 rounded-lg font-semibold hover:bg-[#C2A14D] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-[#C2A14D] hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Phone, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { authAPI } from "@/lib/api-client";

type AuthMethod = "email" | "phone";

export default function SignupPage() {
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<AuthMethod>("email");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (authMethod === "email") {
      if (!formData.email.trim()) {
        toast.error("Please enter your email");
        return;
      }
      if (!formData.password || formData.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
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
      // For phone signup, verify OTP first
      if (authMethod === "phone") {
        await authAPI.verifyOTP(formData.phone, formData.otp);
      } else {
        // For email signup
        await authAPI.signup({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });
      }

      toast.success("🎉 Account created successfully! Welcome to Devi Sutra");
      
      // Redirect after short delay
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Signup failed. Please try again");
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
          <h2 className="text-3xl font-serif text-[#4A2F1B]">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join Devi Sutra for exclusive handmade products
          </p>
        </div>

        {/* Auth Method Toggle */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex">
          <button
            type="button"
            onClick={() => setAuthMethod("email")}
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
            onClick={() => setAuthMethod("phone")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition flex items-center justify-center gap-2 ${
              authMethod === "phone"
                ? "bg-[#4A2F1B] text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Phone size={16} />
            Phone
          </button>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email or Phone based on method */}
          {authMethod === "email" ? (
            <>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
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
                  Password *
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
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
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
                    Enter OTP *
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

          {/* Terms & Conditions */}
          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 text-[#4A2F1B] border-gray-300 rounded focus:ring-[#C2A14D]"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <Link href="/terms" className="text-[#C2A14D] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#C2A14D] hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || (authMethod === "phone" && !otpSent)}
            className="w-full bg-[#4A2F1B] text-white py-3 rounded-lg font-semibold hover:bg-[#C2A14D] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#C2A14D] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

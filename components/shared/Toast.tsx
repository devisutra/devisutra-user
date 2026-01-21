"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  };

  const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200",
  };

  const textColors = {
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-yellow-800",
  };

  return (
    <div className="fixed top-4 right-4 z-10000 animate-slideIn">
      <div className={`${bgColors[type]} border rounded-lg shadow-lg p-4 flex items-start gap-3 min-w-[320px] max-w-md`}>
        <div className="shrink-0 mt-0.5">
          {icons[type]}
        </div>
        <p className={`${textColors[type]} text-sm font-medium flex-1`}>
          {message}
        </p>
        <button
          onClick={onClose}
          className={`${textColors[type]} hover:opacity-70 transition shrink-0`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

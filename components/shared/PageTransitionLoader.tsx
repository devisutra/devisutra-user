"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransitionLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Use requestAnimationFrame to avoid cascading renders
    const showLoader = () => {
      setLoading(true);
      
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);

      return timer;
    };

    const timer = showLoader();
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-10000 h-1 bg-gray-200">
      <div className="h-full bg-linear-to-r from-[#C2A14D] to-[#4A2F1B] animate-progressBar origin-left"></div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, Search, X, Home, Grid, Package, User, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { cartCount } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#C2A14D] text-white text-center py-2 px-4 text-xs sm:text-sm font-medium">
        Handmade | COD Available | Easy Returns
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Mobile: Hamburger Menu */}
            <div className="md:hidden">
              <Menu 
                size={24} 
                className="cursor-pointer text-[#4A2F1B] hover:text-[#C2A14D] transition" 
                onClick={() => setIsSidebarOpen(true)}
              />
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#C2A14D]/20">
                <Image 
                  src="/logo.png" 
                  alt="Devi Sutra Logo" 
                  fill
                  sizes="(max-width: 640px) 56px, 64px"
                  className="object-cover"
                  priority
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-serif text-[#4A2F1B] tracking-wide">Devi Sutra</h1>
            </Link>

            {/* Desktop: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Search for handmade bags, kurtis..." 
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D] text-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#C2A14D] text-white p-2 rounded-md hover:bg-[#4A2F1B] transition">
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* Desktop: Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 text-[#4A2F1B] font-medium text-sm">
              <Link href="/" className="hover:text-[#C2A14D] transition">Home</Link>
              <Link href="/shop" className="hover:text-[#C2A14D] transition">Shop</Link>
              <Link href="/about" className="hover:text-[#C2A14D] transition">About</Link>
              <Link href="/contact" className="hover:text-[#C2A14D] transition">Contact</Link>
              <Link href="/account" className="hover:text-[#C2A14D] transition">Account</Link>
            </div>

            {/* Cart Icon */}
            <Link href="/cart" className="relative group ml-4">
              <ShoppingBag size={22} className="text-[#4A2F1B] group-hover:text-[#C2A14D] transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C2A14D] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: Search Bar */}
          <div className="md:hidden pb-3">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search for handmade bags, kurtis..." 
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A14D] text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#C2A14D] text-white p-2 rounded-md">
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-100 animate-[fadeIn_0.3s_ease-in-out]"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="fixed left-0 top-0 h-screen w-[320px] sm:w-340px bg-white shadow-2xl animate-[slideInFromLeft_0.3s_ease-out] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#4A2F1B] shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-white shadow-md">
                  <Image 
                    src="/logo.png" 
                    alt="Devi Sutra Logo" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white tracking-wide">DEVI SUTRA</h2>
                  <span className="text-[10px] text-gray-300 tracking-wide">Threads of Heritage</span>
                </div>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="text-white hover:text-gray-300 transition p-1"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Sidebar Links */}
            <nav className="p-5 space-y-1.5 flex-1">
              <Link 
                href="/" 
                className="block py-3.5 px-4 text-[#4A2F1B] hover:bg-gray-100 rounded-lg transition-colors font-medium text-base"
                onClick={() => setIsSidebarOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                className="block py-3.5 px-4 text-[#4A2F1B] hover:bg-gray-100 rounded-lg transition-colors font-medium text-base"
                onClick={() => setIsSidebarOpen(false)}
              >
                Shop All
              </Link>
              <Link 
                href="/shop?category=Bags" 
                className="block py-3.5 px-4 text-[#4A2F1B] hover:bg-gray-100 rounded-lg transition-colors font-medium text-base"
                onClick={() => setIsSidebarOpen(false)}
              >
                Bags
              </Link>
              <Link 
                href="/shop?category=Clothes" 
                className="block py-3.5 px-4 text-[#4A2F1B] hover:bg-gray-100 rounded-lg transition-colors font-medium text-base"
                onClick={() => setIsSidebarOpen(false)}
              >
                Clothing
              </Link>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <Link 
                  href="/cart" 
                  className="py-3.5 px-4 text-[#4A2F1B] hover:bg-gray-100 rounded-lg transition-colors font-medium text-base flex items-center justify-between"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-[#4A2F1B] text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Follow Us Section */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <h3 className="text-[#4A2F1B] font-semibold mb-3 px-4 text-sm">Follow Us</h3>
                <div className="flex gap-3 px-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#F5F1EA] rounded-full flex items-center justify-center hover:bg-[#C2A14D] hover:text-white transition">
                    <Facebook size={18} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#F5F1EA] rounded-full flex items-center justify-center hover:bg-[#C2A14D] hover:text-white transition">
                    <Instagram size={18} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#F5F1EA] rounded-full flex items-center justify-center hover:bg-[#C2A14D] hover:text-white transition">
                    <Twitter size={18} />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#F5F1EA] rounded-full flex items-center justify-center hover:bg-[#C2A14D] hover:text-white transition">
                    <Youtube size={18} />
                  </a>
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <h3 className="text-[#4A2F1B] font-semibold mb-3 px-4 text-sm">Quick Links</h3>
                <div className="space-y-1 px-4">
                  <Link href="/about" className="block text-gray-600 hover:text-[#C2A14D] text-sm py-2 transition" onClick={() => setIsSidebarOpen(false)}>
                    About Us
                  </Link>
                  <Link href="/contact" className="block text-gray-600 hover:text-[#C2A14D] text-sm py-2 transition" onClick={() => setIsSidebarOpen(false)}>
                    Contact Us
                  </Link>
                  <Link href="/shipping-policy" className="block text-gray-600 hover:text-[#C2A14D] text-sm py-2 transition" onClick={() => setIsSidebarOpen(false)}>
                    Shipping Policy
                  </Link>
                  <Link href="/refund-policy" className="block text-gray-600 hover:text-[#C2A14D] text-sm py-2 transition" onClick={() => setIsSidebarOpen(false)}>
                    Refund Policy
                  </Link>
                  <Link href="/terms" className="block text-gray-600 hover:text-[#C2A14D] text-sm py-2 transition" onClick={() => setIsSidebarOpen(false)}>
                    Terms of Service
                  </Link>
                  <Link href="/privacy" className="block text-gray-600 hover:text-[#C2A14D] text-sm py-2 transition" onClick={() => setIsSidebarOpen(false)}>
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </nav>

            {/* Footer */}
            <div className="p-5 border-t border-gray-200 bg-gray-50 shrink-0">
              <p className="text-xs text-gray-600 text-center font-medium">© 2026 Devi Sutra</p>
              <p className="text-[10px] text-gray-500 text-center mt-1">All rights reserved</p>
              <p className="text-gray-600 text-sm">Developed and Maintained by <a href="https://www.rtcodex.dev/" className="text-[#C2A14D] hover:underline font-bold" target="_blank">RTcodeX</a>.</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="grid grid-cols-4 h-16">
          <Link 
            href="/" 
            className="flex flex-col items-center justify-center text-[#C2A14D] hover:bg-gray-50 transition"
          >
            <Home size={20} />
            <span className="text-[10px] mt-1 font-medium">Home</span>
          </Link>
          <Link 
            href="/shop" 
            className="flex flex-col items-center justify-center text-gray-600 hover:bg-gray-50 transition"
          >
            <Grid size={20} />
            <span className="text-[10px] mt-1 font-medium">Categories</span>
          </Link>
          <Link 
            href="/orders" 
            className="flex flex-col items-center justify-center text-gray-600 hover:bg-gray-50 transition"
          >
            <Package size={20} />
            <span className="text-[10px] mt-1 font-medium">My Orders</span>
          </Link>
          <Link 
            href="/account" 
            className="flex flex-col items-center justify-center text-gray-600 hover:bg-gray-50 transition"
          >
            <User size={20} />
            <span className="text-[10px] mt-1 font-medium">Account</span>
          </Link>
        </div>
      </div>
    </>
  );
}

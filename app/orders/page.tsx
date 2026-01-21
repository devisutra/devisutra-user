"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, Clock, Truck, CheckCircle, XCircle, ArrowLeft, Phone, Mail } from "lucide-react";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  customerDetails: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  orderItems: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // For now, fetch all orders from localStorage or API
      // In production, you'd filter by user ID
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="text-yellow-500" size={20} />;
      case "shipped":
        return <Truck className="text-blue-500" size={20} />;
      case "delivered":
        return <CheckCircle className="text-green-500" size={20} />;
      case "cancelled":
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Package className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C2A14D] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="md:hidden">
              <ArrowLeft size={24} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif text-[#4A2F1B]">
                My Orders
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Track and manage your orders
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {["All", "Pending", "Shipped", "Delivered", "Cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  filterStatus === status
                    ? "bg-[#4A2F1B] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status}
                {status === "All" && ` (${orders.length})`}
                {status !== "All" &&
                  ` (${orders.filter((o) => o.status === status).length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No orders found
            </h2>
            <p className="text-gray-600 mb-6">
              {filterStatus === "All"
                ? "You haven't placed any orders yet."
                : `No ${filterStatus.toLowerCase()} orders found.`}
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#4A2F1B] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#C2A14D] transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-4 md:px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="text-sm text-gray-600">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 md:p-6">
                  <div className="space-y-4">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={
                              item.image ||
                              "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=200"
                            }
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold text-[#4A2F1B] mt-1">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        Total Amount
                      </span>
                      <span className="text-xl font-bold text-[#4A2F1B]">
                        ₹{order.totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Payment: {order.paymentMethod}
                    </p>
                  </div>

                  {/* Delivery Address */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-800 mb-2">
                      Delivery Address
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.customerDetails.fullName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.customerDetails.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.customerDetails.city}, {order.customerDetails.pincode}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      📞 {order.customerDetails.phone}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {order.status === "Pending" && (
                      <button className="flex-1 min-w-140px px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition">
                        Cancel Order
                      </button>
                    )}
                    {order.status === "Shipped" && (
                      <button className="flex-1 min-w-140px px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                        Track Order
                      </button>
                    )}
                    {order.status === "Delivered" && (
                      <button className="flex-1 min-w-140px px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                        Rate Product
                      </button>
                    )}
                    <Link
                      href="/contact"
                      className="flex-1 min-w-140px px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition text-center"
                    >
                      Need Help?
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Help Section */}
      {orders.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-[#F5F1EA] rounded-lg p-6 md:p-8">
            <h3 className="text-lg font-semibold text-[#4A2F1B] mb-4">
              Need Help with Your Order?
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="tel:+917479903041"
                className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition"
              >
                <Phone className="text-[#C2A14D]" size={24} />
                <div>
                  <p className="font-medium text-gray-800">Call Us</p>
                  <p className="text-sm text-gray-600">+91 74799 03041</p>
                </div>
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition"
              >
                <Mail className="text-[#C2A14D]" size={24} />
                <div>
                  <p className="font-medium text-gray-800">Email Us</p>
                  <p className="text-sm text-gray-600">support@devisutra.com</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

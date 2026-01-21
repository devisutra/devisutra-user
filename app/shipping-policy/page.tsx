import { Package, Truck, Clock, MapPin, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Shipping Policy | Devi Sutra",
  description: "Learn about our shipping methods, delivery timelines, and shipping charges for orders across India.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F5F1EA] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C2A14D]/20 rounded-full mb-4">
            <Package className="text-[#4A2F1B]" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-[#4A2F1B] mb-3">
            Shipping Policy
          </h1>
          <p className="text-gray-600">
            Last Updated: January 15, 2026
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            At Devi Sutra, we are committed to delivering your handcrafted products safely and promptly. 
            This shipping policy outlines our delivery process, timelines, and charges across India.
          </p>
        </div>

        {/* Shipping Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="border-2 border-[#E5DCC5] rounded-xl p-6">
            <Truck className="text-[#C2A14D] mb-3" size={28} />
            <h3 className="text-lg font-semibold text-[#4A2F1B] mb-2">
              Delivery Partners
            </h3>
            <p className="text-gray-600 text-sm">
              We work with trusted courier partners including Blue Dart, Delhivery, and India Post 
              to ensure safe delivery of your orders.
            </p>
          </div>

          <div className="border-2 border-[#E5DCC5] rounded-xl p-6">
            <Clock className="text-[#C2A14D] mb-3" size={28} />
            <h3 className="text-lg font-semibold text-[#4A2F1B] mb-2">
              Processing Time
            </h3>
            <p className="text-gray-600 text-sm">
              Orders are processed within 1-2 business days. Handcrafted items may take 3-5 business 
              days for preparation before shipping.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          {/* Delivery Timeline */}
          <section>
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4 flex items-center gap-2">
              <MapPin size={24} />
              Delivery Timeline
            </h2>
            <div className="bg-[#F5F1EA] rounded-lg p-6 space-y-3">
              <div className="flex justify-between items-center border-b border-[#E5DCC5] pb-3">
                <span className="font-medium text-[#4A2F1B]">Metro Cities</span>
                <span className="text-gray-700">3-5 business days</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#E5DCC5] pb-3">
                <span className="font-medium text-[#4A2F1B]">Tier 2 Cities</span>
                <span className="text-gray-700">5-7 business days</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#E5DCC5] pb-3">
                <span className="font-medium text-[#4A2F1B]">Remote Areas</span>
                <span className="text-gray-700">7-10 business days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-[#4A2F1B]">International</span>
                <span className="text-gray-700">Currently Not Available</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              * Delivery timelines may vary during festive seasons, natural calamities, or due to courier delays.
            </p>
          </section>

          {/* Shipping Charges */}
          <section>
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4">
              Shipping Charges
            </h2>
            <div className="prose prose-gray max-w-none">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#C2A14D] mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>FREE Shipping</strong> on orders above ₹999
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C2A14D] mt-1">✓</span>
                  <span className="text-gray-700">
                    ₹49 flat shipping charge for orders below ₹999
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C2A14D] mt-1">✓</span>
                  <span className="text-gray-700">
                    Additional charges may apply for remote areas or expedited shipping
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Order Tracking */}
          <section>
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4">
              Order Tracking
            </h2>
            <div className="bg-[#F5F1EA] rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Once your order is shipped, you will receive a tracking number via email and SMS. 
                You can track your order through:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Your Account Dashboard under `My Orders`</li>
                <li>The tracking link provided in the shipping confirmation email</li>
                <li>Courier partners website using the tracking number</li>
              </ol>
            </div>
          </section>

          {/* Shipping Address */}
          <section>
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4">
              Shipping Address Guidelines
            </h2>
            <div className="prose prose-gray max-w-none">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#C2A14D] mt-1">•</span>
                  <span className="text-gray-700">
                    Please provide complete and accurate delivery address with landmark
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C2A14D] mt-1">•</span>
                  <span className="text-gray-700">
                    Include a valid mobile number for delivery coordination
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C2A14D] mt-1">•</span>
                  <span className="text-gray-700">
                    P.O. Box addresses are not accepted for delivery
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C2A14D] mt-1">•</span>
                  <span className="text-gray-700">
                    Address cannot be changed once the order is dispatched
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Packaging */}
          <section>
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4">
              Packaging & Safety
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All products are carefully packaged to ensure they reach you in perfect condition. 
              We use eco-friendly packaging materials wherever possible. Fragile items are bubble-wrapped 
              and packed in sturdy boxes to prevent damage during transit.
            </p>
          </section>

          {/* Failed Delivery */}
          <section>
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4">
              Failed Delivery Attempts
            </h2>
            <div className="bg-[#FEF3C7] border-l-4 border-[#F59E0B] p-6 rounded-r-lg">
              <p className="text-gray-700 mb-3">
                If delivery fails due to incorrect address, unavailability, or refusal to accept:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>The courier will attempt delivery up to 3 times</li>
                <li>After 3 failed attempts, the order will be returned to us</li>
                <li>Return shipping charges will be deducted from your refund</li>
                <li>Please ensure someone is available to receive the package</li>
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <section className="border-t-2 border-[#E5DCC5] pt-8">
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4">
              Need Help?
            </h2>
            <p className="text-gray-700 mb-4">
              For any shipping-related queries, please contact us:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="text-[#C2A14D]" size={20} />
                <a href="mailto:support@devisutra.com" className="hover:text-[#C2A14D]">
                  support@devisutra.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="text-[#C2A14D]" size={20} />
                <a href="tel:+917479903041" className="hover:text-[#C2A14D]">
                  +91 74799 03041
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t-2 border-[#E5DCC5] text-center">
          <p className="text-sm text-gray-500">
            Devi Sutra reserves the right to modify this shipping policy at any time. 
            Changes will be effective immediately upon posting on the website.
          </p>
        </div>
      </div>
    </div>
  );
}

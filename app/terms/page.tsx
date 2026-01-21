import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Devi Sutra",
  description: "Read the terms and conditions for using Devi Sutra's website and purchasing our handcrafted products.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-[#4A2F1B] mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Last Updated: January 15, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing and using Devi Sutra website (`devisutra.com``), you accept
              and agree to be bound by these Terms of Service. If you do not agree to
              these terms, please do not use our website or services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of
              the website after changes constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              2. Products and Services
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All products sold on Devi Sutra are handmade and may have slight
              variations in color, size, and design. These variations are part of the
              unique character of handcrafted items.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Product images are for illustration purposes and may differ slightly from the actual product</li>
              <li>We strive to provide accurate descriptions, but slight variations may occur</li>
              <li>All prices are in Indian Rupees (INR) and include applicable taxes</li>
              <li>We reserve the right to modify product prices without prior notice</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              3. Orders and Payment
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By placing an order, you agree to provide accurate and complete
              information. We currently accept Cash on Delivery (COD) as our payment
              method.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Order confirmation will be sent via email/phone after placement</li>
              <li>We reserve the right to refuse or cancel any order at our discretion</li>
              <li>COD orders may be subject to verification before processing</li>
              <li>Payment must be made in full upon delivery</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              4. Shipping and Delivery
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We aim to deliver your orders within 5-7 business days. Delivery times
              may vary based on location and product availability.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Shipping charges may apply based on order value and location</li>
              <li>We are not responsible for delays caused by courier services or unforeseen circumstances</li>
              <li>Risk of loss passes to you upon delivery</li>
              <li>Please inspect packages upon delivery and report any damage immediately</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              5. Returns and Refunds
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We want you to be completely satisfied with your purchase. Our return
              policy allows for returns within 7 days of delivery.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Products must be unused, unwashed, and in original condition with tags</li>
              <li>Custom or personalized items cannot be returned</li>
              <li>Refunds will be processed within 5-7 business days after receiving the returned item</li>
              <li>Return shipping costs are the responsibility of the customer unless the product is defective</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All content on this website, including text, images, logos, and designs,
              is the property of Devi Sutra and protected by intellectual property laws.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>You may not reproduce, distribute, or use our content without permission</li>
              <li>Product designs and patterns are proprietary to Devi Sutra</li>
              <li>Unauthorized use may result in legal action</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Devi Sutra shall not be liable for any indirect, incidental, or
              consequential damages arising from the use of our products or website.
              Our liability is limited to the purchase price of the product.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              8. Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service shall be governed by the laws of India. Any
              disputes arising from these terms shall be subject to the exclusive
              jurisdiction of the courts in [Your City], India.
            </p>
          </section>

          {/* Contact Section */}
          <section className="mb-8 bg-[#F5F1EA] p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="text-gray-600 space-y-1">
              <li><strong>Email:</strong> support@devisutra.com</li>
              <li><strong>Phone:</strong> +91 74799 03041</li>
              <li><strong>Address:</strong> Ranchi, Jharkhand India</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

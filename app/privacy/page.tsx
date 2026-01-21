import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Devi Sutra",
  description: "Learn how Devi Sutra collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-[#4A2F1B] mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last Updated: January 15, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-600 leading-relaxed mb-4">
              At Devi Sutra, we are committed to protecting your privacy and ensuring
              the security of your personal information. This Privacy Policy explains
              how we collect, use, and safeguard your data when you visit our website
              or make a purchase.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information that you provide directly to us and information
              automatically collected when you use our website.
            </p>
            
            <h3 className="text-xl font-semibold text-[#4A2F1B] mb-3 mt-6">
              Personal Information
            </h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Name and contact information (email, phone number)</li>
              <li>Shipping and billing address</li>
              <li>Order history and preferences</li>
              <li>Payment information (for COD verification)</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#4A2F1B] mb-3 mt-6">
              Automatically Collected Information
            </h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Pages visited and time spent on the website</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Order Processing:</strong> To process and fulfill your orders, including shipping and delivery</li>
              <li><strong>Communication:</strong> To send order confirmations, updates, and customer service responses</li>
              <li><strong>Improvement:</strong> To improve our website, products, and services</li>
              <li><strong>Marketing:</strong> To send promotional emails (with your consent)</li>
              <li><strong>Security:</strong> To detect and prevent fraud and unauthorized access</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our terms</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              3. Information Sharing and Disclosure
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We do not sell or rent your personal information to third parties. We may
              share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operations (shipping, payment processing)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to share your information</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect
              your personal information from unauthorized access, disclosure, or
              destruction.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Secure server infrastructure with encryption</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal information by authorized personnel only</li>
              <li>Secure data transmission using SSL/TLS protocols</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              However, no method of transmission over the internet is 100% secure, and
              we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              5. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your browsing
              experience and analyze website traffic.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for website functionality (shopping cart, login)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              You can control cookies through your browser settings, but disabling
              cookies may affect website functionality.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              6. Your Rights and Choices
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time</li>
              <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              To exercise these rights, please contact us at privacy@devisutra.com.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              7. Childrens Privacy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our website is not intended for children under 18 years of age. We do not
              knowingly collect personal information from children. If you believe we
              have collected information from a child, please contact us immediately.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              8. Data Retention
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill
              the purposes outlined in this policy, unless a longer retention period is
              required by law. Order information is typically retained for 7 years for
              tax and accounting purposes.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in
              our practices or legal requirements. We will notify you of significant
              changes by posting the updated policy on our website with a new `Last
              Updated` date.
            </p>
          </section>

          {/* Contact Section */}
          <section className="mb-8 bg-[#F5F1EA] p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-[#4A2F1B] mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              If you have any questions or concerns about this Privacy Policy or our
              data practices, please contact us:
            </p>
            <ul className="text-gray-600 space-y-1">
              <li><strong>Email:</strong> privacy@devisutra.com</li>
              <li><strong>Phone:</strong> +91 98765 43210</li>
              <li><strong>Address:</strong> Devi Sutra, India</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

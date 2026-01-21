import { Metadata } from "next";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Twitter, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ & Social Media - Devi Sutra",
  description: "Frequently asked questions and social media links for Devi Sutra. Connect with us on Facebook, Instagram, Twitter, and YouTube.",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 5-7 business days. We ship across India. You'll receive a tracking number once your order is dispatched.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "Currently, we accept Cash on Delivery (COD). Online payment options including UPI, Credit/Debit Cards, and Net Banking will be available soon.",
    },
    {
      question: "Can I return or exchange products?",
      answer:
        "Yes! We offer a 7-day return policy. Products must be unused, unwashed, and in original condition with tags. Custom items cannot be returned.",
    },
    {
      question: "Are your products really handmade?",
      answer:
        "Absolutely! Every product is handcrafted by skilled artisans. Slight variations in color, size, and design are natural characteristics of handmade items.",
    },
    {
      question: "Do you offer custom orders?",
      answer:
        "Yes, we do! Contact us with your requirements, and our team will work with you to create a custom product. Please allow 2-3 weeks for custom orders.",
    },
    {
      question: "How do I care for my handmade products?",
      answer:
        "Each product comes with care instructions. Generally, we recommend gentle hand washing for bags and dry cleaning for kurtis to preserve their quality.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we ship within India only. International shipping will be available soon. Follow our social media for updates!",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking number via email/SMS. You can use this to track your order on the courier's website.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#F5F1EA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-[#4A2F1B] mb-4">
              FAQ & Social Media
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions and connect with us on social media
            </p>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-[#4A2F1B] to-[#C2A14D] rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-serif mb-4">Follow Us on Social Media</h2>
            <p className="text-lg mb-8 opacity-90">
              Stay updated with our latest products, offers, and behind-the-scenes
              content. Join our community!
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {/* Facebook */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 hover:bg-white hover:text-[#4A2F1B] p-6 rounded-xl transition flex flex-col items-center gap-2 min-w-140px"
              >
                <Facebook size={40} />
                <span className="font-medium">Facebook</span>
                <span className="text-sm opacity-75 group-hover:opacity-100">
                  @devisutra
                </span>
              </a>

              {/* Instagram */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 hover:bg-white hover:text-[#4A2F1B] p-6 rounded-xl transition flex flex-col items-center gap-2 min-w-140px"
              >
                <Instagram size={40} />
                <span className="font-medium">Instagram</span>
                <span className="text-sm opacity-75 group-hover:opacity-100">
                  @devisutra
                </span>
              </a>

              {/* Twitter */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 hover:bg-white hover:text-[#4A2F1B] p-6 rounded-xl transition flex flex-col items-center gap-2 min-w-140px"
              >
                <Twitter size={40} />
                <span className="font-medium">Twitter</span>
                <span className="text-sm opacity-75 group-hover:opacity-100">
                  @devisutra
                </span>
              </a>

              {/* YouTube */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 hover:bg-white hover:text-[#4A2F1B] p-6 rounded-xl transition flex flex-col items-center gap-2 min-w-140px"
              >
                <Youtube size={40} />
                <span className="font-medium">YouTube</span>
                <span className="text-sm opacity-75 group-hover:opacity-100">
                  @devisutra
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917479903041"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 hover:bg-white hover:text-[#4A2F1B] p-6 rounded-xl transition flex flex-col items-center gap-2 min-w-140px"
              >
                <MessageCircle size={40} />
                <span className="font-medium">WhatsApp</span>
                <span className="text-sm opacity-75 group-hover:opacity-100">
                  Chat Now
                </span>
              </a>
            </div>

            <p className="text-sm opacity-75">
              Tag us in your photos with #DeviSutraStyle to get featured!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#F5F1EA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-[#4A2F1B] mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-[#4A2F1B] mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Can not find the answer you are looking for? Our customer support team is
            here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-[#4A2F1B] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#C2A14D] transition"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/917479903041"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

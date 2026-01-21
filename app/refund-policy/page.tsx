import { RefreshCw, Shield, AlertCircle, Clock, CheckCircle, XCircle, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Cancellation & Refund Policy | Devi Sutra",
  description: "Learn about our cancellation, return, and refund policies for a hassle-free shopping experience.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F5F1EA] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C2A14D]/20 rounded-full mb-4">
            <RefreshCw className="text-[#4A2F1B]" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-[#4A2F1B] mb-3">
            Cancellation & Refund Policy
          </h1>
          <p className="text-gray-600">
            Last Updated: January 15, 2026
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            At Devi Sutra, customer satisfaction is our priority. We understand that sometimes plans change, 
            and we have made our cancellation and refund process as simple as possible. Please read this policy 
            carefully to understand your rights and obligations.
          </p>
        </div>

        {/* Quick Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="border-2 border-[#E5DCC5] rounded-xl p-6 text-center">
            <Clock className="text-[#C2A14D] mb-3 mx-auto" size={28} />
            <h3 className="text-lg font-semibold text-[#4A2F1B] mb-2">
              7 Days Return
            </h3>
            <p className="text-gray-600 text-sm">
              Return products within 7 days of delivery
            </p>
          </div>

          <div className="border-2 border-[#E5DCC5] rounded-xl p-6 text-center">
            <Shield className="text-[#C2A14D] mb-3 mx-auto" size={28} />
            <h3 className="text-lg font-semibold text-[#4A2F1B] mb-2">
              Quality Assured
            </h3>
            <p className="text-gray-600 text-sm">
              100% refund for damaged/defective items
            </p>
          </div>

          <div className="border-2 border-[#E5DCC5] rounded-xl p-6 text-center">
            <RefreshCw className="text-[#C2A14D] mb-3 mx-auto" size={28} />
            <h3 className="text-lg font-semibold text-[#4A2F1B] mb-2">
              Quick Process
            </h3>
            <p className="text-gray-600 text-sm">
              Refunds processed within 5-7 business days
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          {/* Order Cancellation */}
          <section>
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4 flex items-center gap-2">
              <XCircle size={24} />
              Order Cancellation
            </h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-green-800 mb-2">Before Shipping</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Orders can be cancelled anytime before they are shipped</li>
                  <li>100% refund will be initiated within 24-48 hours</li>
                  <li>Cancel from `My Orders` section or contact customer support</li>
                  <li>No cancellation charges apply</li>
                </ul>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-orange-800 mb-2">After Shipping</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Once shipped, orders cannot be cancelled</li>
                  <li>You can refuse delivery when the courier arrives</li>
                  <li>You can initiate a return request after receiving the product</li>
                  <li>Return shipping charges may apply based on the reason</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Return Policy */}
          <section>
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4 flex items-center gap-2">
              <RefreshCw size={24} />
              Return Policy
            </h2>

            <div className="bg-[#F5F1EA] rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-[#4A2F1B] mb-3">Return Eligibility (7 Days from Delivery)</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-800">Damaged/Defective Products</p>
                    <p className="text-sm text-gray-600">Product received in damaged or defective condition</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-800">Wrong Product Delivered</p>
                    <p className="text-sm text-gray-600">Received a different product than ordered</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-800">Missing Items</p>
                    <p className="text-sm text-gray-600">Incomplete order or items missing from package</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-800">Quality Issues</p>
                    <p className="text-sm text-gray-600">Product quality not as described or expected</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h3 className="font-semibold text-red-800 mb-3">Non-Returnable Items</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Products with tampered or missing tags/packaging</li>
                <li>Used, worn, or damaged products (customer responsibility)</li>
                <li>Customized or personalized items</li>
                <li>Products marked as `Non-Returnable` at the time of purchase</li>
                <li>Items returned after 7 days from delivery date</li>
              </ul>
            </div>
          </section>

          {/* Return Process */}
          <section>
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4">
              How to Return an Item
            </h2>
            <div className="bg-[#F5F1EA] rounded-lg p-6">
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C2A14D] text-white font-bold shrink-0">
                    1
                  </span>
                  <div>
                    <p className="font-semibold text-[#4A2F1B] mb-1">Initiate Return Request</p>
                    <p className="text-gray-700 text-sm">
                      Go to `My Orders` and click on `Return` for the product. Select reason for return 
                      and upload images if applicable.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C2A14D] text-white font-bold shrink-0">
                    2
                  </span>
                  <div>
                    <p className="font-semibold text-[#4A2F1B] mb-1">Approval & Pickup</p>
                    <p className="text-gray-700 text-sm">
                      Once approved, we will arrange a pickup from your address. Keep the product ready 
                      with original packaging, tags, and invoice.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C2A14D] text-white font-bold shrink-0">
                    3
                  </span>
                  <div>
                    <p className="font-semibold text-[#4A2F1B] mb-1">Quality Check</p>
                    <p className="text-gray-700 text-sm">
                      Returned product will be inspected at our warehouse for eligibility and condition.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C2A14D] text-white font-bold shrink-0">
                    4
                  </span>
                  <div>
                    <p className="font-semibold text-[#4A2F1B] mb-1">Refund Processed</p>
                    <p className="text-gray-700 text-sm">
                      If approved, refund will be initiated to your original payment method within 5-7 business days.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Refund Policy */}
          <section>
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4">
              Refund Policy
            </h2>
            
            <div className="space-y-4">
              <div className="bg-[#F5F1EA] rounded-lg p-6">
                <h3 className="font-semibold text-[#4A2F1B] mb-3">Refund Methods & Timeline</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-[#E5DCC5] pb-3">
                    <span className="font-medium text-gray-800">Credit/Debit Card</span>
                    <span className="text-gray-700">5-7 business days</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#E5DCC5] pb-3">
                    <span className="font-medium text-gray-800">UPI/Net Banking</span>
                    <span className="text-gray-700">3-5 business days</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#E5DCC5] pb-3">
                    <span className="font-medium text-gray-800">Wallet (Paytm, PhonePe)</span>
                    <span className="text-gray-700">2-3 business days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Cash on Delivery (COD)</span>
                    <span className="text-gray-700">Bank transfer in 7-10 days</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Important Notes</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Refund amount will be the product price minus any applicable charges</li>
                  <li>Shipping charges are non-refundable unless we made an error</li>
                  <li>For COD orders, we will need your bank account details for refund</li>
                  <li>Refund timeline may vary depending on your banks processing time</li>
                  <li>You will receive email and SMS updates on refund status</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Exchange Policy */}
          <section>
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4">
              Exchange Policy
            </h2>
            <p className="text-gray-700 mb-4">
              Currently, we do not offer direct product exchanges. If you wish to exchange a product:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
              <li>Initiate a return for the original product</li>
              <li>Once refund is processed, place a new order for the desired product</li>
              <li>Use the refund amount to purchase the new product</li>
            </ol>
            <p className="text-sm text-gray-600">
              This ensures transparency and allows you to choose any product from our catalog.
            </p>
          </section>

          {/* Return Charges */}
          <section>
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4">
              Return Shipping Charges
            </h2>
            <div className="bg-[#F5F1EA] rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">
                    <strong>FREE return pickup</strong> for damaged, defective, or wrong products
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">
                    <strong>FREE return pickup</strong> if we made an error in the order
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="text-orange-600 shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">
                    ₹99 return shipping fee for other reasons (size issue, did not like, etc.)
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <section className="border-t-2 border-[#E5DCC5] pt-8">
            <h2 className="text-2xl font-serif text-[#4A2F1B] mb-4">
              Need Assistance?
            </h2>
            <p className="text-gray-700 mb-4">
              For any queries regarding cancellations, returns, or refunds, please reach out to us:
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
            <p className="text-sm text-gray-600 mt-4">
              Our customer support team is available Monday to Saturday, 10:00 AM - 6:00 PM IST
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t-2 border-[#E5DCC5] text-center">
          <p className="text-sm text-gray-500">
            Devi Sutra reserves the right to modify this cancellation and refund policy at any time. 
            Changes will be effective immediately upon posting on the website. Final decision on returns 
            and refunds lies with Devi Sutra management.
          </p>
        </div>
      </div>
    </div>
  );
}

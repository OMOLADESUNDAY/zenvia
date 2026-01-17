import React from "react";

const CustomerService = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 md:p-10 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">Customer Service</h1>

        <p className="mb-4 text-gray-600">
          We’re here to help. If you have any questions about your orders,
          payments, or account, feel free to reach out.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="font-semibold">📦 Orders & Delivery</h2>
            <p className="text-gray-600 text-sm mt-1">
              For questions about order status, shipping, or delivery delays,
              please contact our support team.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">💳 Payments & Refunds</h2>
            <p className="text-gray-600 text-sm mt-1">
              We support secure payments. Refunds are processed according to our
              refund policy.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">📧 Contact Us</h2>
            <p className="text-gray-600 text-sm mt-1">
              Email: <span className="font-medium">support@zenvia.com</span>
            </p>
            <p className="text-gray-600 text-sm">
              Phone: <span className="font-medium">(+234) 706 925 8526</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;

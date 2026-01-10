import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccessModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green-50/80 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-sm sm:max-w-md rounded-2xl bg-white shadow-xl p-6 sm:p-8 text-center">
        {/* Close Button */}
       

        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-green-500 shadow-lg">
          <svg
            className="h-10 w-10 sm:h-12 sm:w-12 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful 🎉
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-500 mb-6">
          Your payment has been successfully processed. Now you can go to the
          homepage & discover new products.
        </p>

        {/* Action Button */}
        <Link to='/'
          className="w-full rounded-xl bg-green-500 py-3 px-3 text-white font-medium
                     hover:bg-green-600 active:scale-[0.98] transition cursor-pointer"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;

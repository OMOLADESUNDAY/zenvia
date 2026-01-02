import React from "react";

const cartItems = [
  {
    id: 1,
    title: "SROK Smart Phone 128GB, Oled Retina",
    price: 579,
    image: "/images/phone.png",
    badge: "SAVE $199.00",
    badgeColor: "bg-green-500",
    shipping: "FREE SHIPPING",
  },
  {
    id: 2,
    title: "aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB",
    price: 979,
    image: "/images/tablet.png",
    badge: "NEW",
    badgeColor: "bg-black",
    shipping: "$2.98 SHIPPING",
  },
  {
    id: 3,
    title: "Samsung Galaxy X6 Ultra LTE 4G/128 Gb, Black Smartphone",
    price: 659,
    image: "/images/samsung.png",
    badge: "NEW",
    badgeColor: "bg-black",
    shipping: "FREE SHIPPING",
    extra: "FREE GIFT",
  },
];

export default function Cart() {
  return (
    <div className="bg-gray-50 min-h-screen p-4 lg:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 shadow-sm"
            >
              {/* Image */}
              <div className="relative w-full sm:w-40 flex-shrink-0">
                <span
                  className={`absolute top-2 left-2 text-xs text-white px-2 py-1 rounded ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-contain"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">
                  {item.title}
                </h3>

                <p className="text-red-500 font-semibold mt-2">
                  ${item.price.toFixed(2)}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-3 mt-3">
                  <button className="w-8 h-8 border rounded">-</button>
                  <span>1</span>
                  <button className="w-8 h-8 border rounded">+</button>
                </div>

                {/* Shipping */}
                <div className="flex items-center gap-3 text-sm mt-3">
                  <span className="text-green-600 font-medium">
                    {item.shipping}
                  </span>
                  {item.extra && (
                    <span className="text-red-500 font-medium">
                      {item.extra}
                    </span>
                  )}
                </div>

                {/* Stock */}
                <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  In stock
                </div>
              </div>

              {/* Color options */}
              <div className="flex sm:flex-col gap-2 justify-start">
                <span className="w-6 h-6 rounded-full bg-gray-300 border" />
                <span className="w-6 h-6 rounded-full bg-pink-200 border" />
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm h-fit sticky top-6">
          <h3 className="font-semibold text-lg mb-4">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Sub Total:</span>
              <span className="font-medium">$1,000.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Shipping estimate:</span>
              <span className="font-medium">$600.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Tax estimate:</span>
              <span className="font-medium">$137.00</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold">
              <span>Order Total:</span>
              <span>$1,737.00</span>
            </div>
          </div>

          <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition">
            CHECKOUT
          </button>
        </div>

      </div>
    </div>
  );
}

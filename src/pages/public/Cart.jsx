import React, { useEffect, useState } from "react";
import BackButton from "../../components/common/BackButton";
import { Trash2 } from "react-lucide";
import useAuthStore from "../../store/useAuthStore";
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const url=`${import.meta.env.VITE_BACKEND_URL}/api/cart`
  const token=useAuthStore((state)=>state.token)
  // Fetch cart items from API
  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch(url,
          {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)}
        ); // Replace with your actual API endpoint
        const data = await res.json();
        setCartItems(data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    }

    fetchCart();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-4 lg:p-10">
      <div className="py-5">
        <BackButton />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 sm:p-6 flex items-center justify-between shadow-sm"
            >
              {/* Image and Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <p className="text-red-500 font-semibold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Trash Icon */}
              <Trash2 className="text-red-500 cursor-pointer" size={20} />
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm h-fit sticky top-6">
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

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

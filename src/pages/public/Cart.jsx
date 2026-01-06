import React, { useEffect } from "react";
import BackButton from "../../components/common/BackButton";
import { Trash2 } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";

export default function Cart() {
  const token = useAuthStore((state) => state.token);

  const {
    cartItems,
    setCartItems,
    updateItemQuantity,
    removeItem,
    clearCartItems,
    setCartCount,
  } = useCartStore();

  const url = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;

  // -----------------------------
  // FETCH CART (SOURCE OF TRUTH)
  // -----------------------------
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const items = data?.data?.products || [];

        setCartItems(items);
        setCartCount(items.length);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setCartItems([]);
        setCartCount(0);
      }
    };

    if (token) fetchCart();
  }, [token, url, setCartItems, setCartCount]);

  // -----------------------------
  // UPDATE QUANTITY (PER ITEM)
  // -----------------------------
  const changeQuantity = async (productId, newQty) => {
    if (newQty < 1) return;

    try {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: newQty,
        }),
      });

      updateItemQuantity(productId, newQty);
    } catch (err) {
      console.error("Quantity update failed:", err);
    }
  };

  // -----------------------------
  // REMOVE SINGLE ITEM
  // -----------------------------
  const handleRemoveItem = async (productId) => {
    try {
      await fetch(`${url}/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      removeItem(productId);
      setCartCount(cartItems.length - 1);
    } catch (err) {
      console.error("Remove item failed:", err);
    }
  };

  // -----------------------------
  // CLEAR CART
  // -----------------------------
  const handleClearCart = async () => {
    try {
      await fetch(`${url}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      clearCartItems();
      setCartCount(0);
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  };

  // -----------------------------
  // CALCULATIONS
  // -----------------------------
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="bg-gray-50 min-h-screen p-4 lg:p-10">
      <div className="flex justify-between py-5">
        <BackButton />
        {cartItems.length > 0 && (
          <button
            onClick={handleClearCart}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 && (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}

          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="bg-white rounded-xl p-4 sm:p-6 flex justify-between shadow-sm"
            >
              <div className="flex gap-4">
                <img
                  src={item.product.images}
                  alt={item.product.name}
                  className="w-20 h-20 object-contain"
                />

                <div>
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-red-500 font-semibold">
                    ${item.product.price.toFixed(2)}
                  </p>

                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="w-8 h-8 border rounded"
                      onClick={() =>
                        changeQuantity(
                          item.product._id,
                          item.quantity - 1
                        )
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="w-8 h-8 border rounded"
                      onClick={() =>
                        changeQuantity(
                          item.product._id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <Trash2
                size={20}
                className="text-red-500 cursor-pointer"
                onClick={() => handleRemoveItem(item.product._id)}
              />
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6 h-fit">
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$600.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$137.00</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${(subtotal + 737).toFixed(2)}</span>
            </div>
          </div>

          <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

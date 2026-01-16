import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
const Modal = ({ id, setModalOpen }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const url = import.meta.env.VITE_BACKEND_URL;
  const token =useAuthStore((state)=>state.token)
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${url}/api/order/orders/${id}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setOrder(data.data);
        console.log(data)
      } catch (err) {
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => setModalOpen(false)}
    >
      <div
        className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setModalOpen(false)}
          className="absolute right-4 top-4 text-gray-400 cursor-pointer hover:text-gray-600"
        >
          ✕
        </button>

        {/* Content */}
        {loading && (
          <p className="text-center text-gray-500">Loading order...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {order && (
          <>
            <h2 className="mb-4 text-xl font-semibold text-center">Order Details</h2>

            {/* Summary */}
            <div className="mb-4 space-y-1 text-sm  text-left">
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className="capitalize">{order.status}</span>
              </p>
              <p>
                <span className="font-medium">Total:</span> $
                {order.totalPrice}
              </p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                {order.isPaid ? "Paid" : "Not Paid"}
              </p>
            </div>

            <hr className="my-4" />

            {/* Shipping */}
            <div className="mb-4 text-left">
              <h3 className="mb-2 font-medium">Shipping Address</h3>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName}
              </p>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.street}
              </p>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.state}
              </p>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.country}
              </p>
              <p className="text-sm text-gray-600">
                📞 {order.shippingAddress.phone}
              </p>
            </div>

            <hr className="my-4" />

            {/* Products */}
            <div>
              <h3 className="mb-2 font-medium">Products</h3>

              <div className="space-y-3">
                {order.products.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-3 text-sm"
                  >
                    <span>Qty: {item.quantity}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;

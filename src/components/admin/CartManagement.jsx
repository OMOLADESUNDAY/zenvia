import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingCart,
  Eye,
  XCircle,
  User,
  Box,
  Hash,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

/* ================= MODAL ================= */
const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <XCircle />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* ================= MAIN ================= */
const CartManagement = () => {
  const token = useAuthStore((state) => state.token);
  const headers = { Authorization: `Bearer ${token}` };

  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCart, setSelectedCart] = useState(null);

  /* ================= FETCH CARTS ================= */
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/get-all-cart`,
          { headers }
        );
        setCarts(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  /* ================= UI ================= */
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="bg-gray-100 rounded-2xl p-4 mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart /> Cart Management
        </h1>
        <span className="text-sm text-gray-500">
          {carts.length} carts
        </span>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading carts...</p>
        ) : carts.length === 0 ? (
          <p className="text-center text-gray-500">No carts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">S/N</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Items</th>
                  <th className="p-3 text-left">Last Updated</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {carts.map((cart, index) => (
                  <tr key={cart._id} className="border-b">
                    <td className="p-3">{index + 1}</td>

                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <div>
                          <p className="font-semibold">
                            {cart.user?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {cart.user?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      {cart.products.length} items
                    </td>

                    <td className="p-3 text-sm text-gray-500">
                      {new Date(cart.updatedAt).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelectedCart(cart);
                          setModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                      >
                        <Eye size={18} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      <Modal
        open={modalOpen}
        title="Cart Details"
        onClose={() => setModalOpen(false)}
      >
        {selectedCart && (
          <div>
            {/* USER INFO */}
            <div className="mb-4 p-4 rounded-xl bg-gray-100">
              <h3 className="font-bold mb-1 flex items-center gap-2">
                <User size={18} /> User
              </h3>
              <p>{selectedCart.user?.name}</p>
              <p className="text-sm text-gray-600">
                {selectedCart.user?.email}
              </p>
            </div>

            {/* PRODUCTS */}
            <div>
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Box size={18} /> Products
              </h3>

              <div className="space-y-3">
                {selectedCart.products.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-4 rounded-xl border"
                  >
                    <div>
                      <p className="font-semibold">
                        {item.product?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.product?.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Hash size={16} />
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CartManagement;

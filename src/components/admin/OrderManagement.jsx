import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ListOrdered,
  Eye,
  Trash2,
  RefreshCw,
  X,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

/* ---------- Reusable Modal ---------- */
const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const OrderManagement = () => {
  const token = useAuthStore((state) => state.token);
  const headers = { Authorization: `Bearer ${token}` };
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ---------- Fetch Orders ---------- */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/admin/orders`, { headers });
      setOrders(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  /* ---------- Update Status ---------- */
  const updateStatus = async () => {
    try {
      await axios.patch(
        `${API_BASE}/api/admin/orders/${selectedOrder._id}/status`,
        { status: newStatus },
        { headers }
      );
      fetchOrders();
      setViewModal(false);
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  /* ---------- Delete Order ---------- */
  const deleteOrder = async () => {
    try {
      await axios.delete(
        `${API_BASE}/api/admin/orders/${selectedOrder._id}`,
        { headers }
      );
      fetchOrders();
      setDeleteModal(false);
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  const statusBadge = (status) => {
    const map = {
      pending: "bg-yellow-100 text-yellow-700",
      paid: "bg-green-100 text-green-700",
      shipped: "bg-blue-100 text-blue-700",
      delivered: "bg-emerald-100 text-emerald-700",
      cancelled: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm capitalize ${
          map[status] || "bg-gray-100"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
        >
          <RefreshCw size={18} /> Refresh
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-2 mb-4 font-semibold">
          <ListOrdered /> All Orders
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">S/N</th>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order._id} className="border-b">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3 text-sm">{order._id}</td>
                    <td className="p-3">
                      {order.user?.name || "Guest"}
                    </td>
                    <td className="p-3 font-semibold">
                      ${order.totalPrice}
                    </td>
                    <td className="p-3">{statusBadge(order.status)}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        className="px-3 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-1"
                        onClick={() => {
                          setSelectedOrder(order);
                          setNewStatus(order.status);
                          setViewModal(true);
                        }}
                      >
                        <Eye size={16} /> View
                      </button>

                      <button
                        className="px-3 py-2 rounded-lg bg-red-600 text-white flex items-center gap-1"
                        onClick={() => {
                          setSelectedOrder(order);
                          setDeleteModal(true);
                        }}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View / Update Modal */}
      <Modal
        open={viewModal}
        title="Order Details"
        onClose={() => setViewModal(false)}
      >
        {selectedOrder && (
          <div className="space-y-4">
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Customer:</strong> {selectedOrder.user?.name}</p>
            <p><strong>Total:</strong> ${selectedOrder.totalAmount}</p>

            <div>
              <label className="block mb-1 font-medium">Update Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <button
              onClick={updateStatus}
              className="w-full py-2 rounded-xl bg-green-600 text-white"
            >
              Update Status
            </button>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={deleteModal}
        title="Delete Order"
        onClose={() => setDeleteModal(false)}
      >
        <p>Are you sure you want to delete this order?</p>
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 py-2 rounded-xl bg-gray-200"
            onClick={() => setDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2 rounded-xl bg-red-600 text-white"
            onClick={deleteOrder}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderManagement;

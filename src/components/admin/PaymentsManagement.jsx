import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CreditCard,
  Eye,
  RefreshCw,
  RotateCcw,
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

const PaymentsManagement = () => {
  const token = useAuthStore((state) => state.token);
  const headers = { Authorization: `Bearer ${token}` };
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewModal, setViewModal] = useState(false);
  const [refundModal, setRefundModal] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  /* ---------- Fetch Payments ---------- */
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/admin/payments`, { headers });
      setPayments(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  /* ---------- Refund Payment ---------- */
  const refundPayment = async () => {
    try {
      await axios.patch(
        `${API_BASE}/api/admin/payments/${selectedPayment._id}/refund`,
        {},
        { headers }
      );
      fetchPayments();
      setRefundModal(false);
    } catch (err) {
      console.log(err);
      alert("Refund failed");
    }
  };

  const statusBadge = (status) => {
    const map = {
      paid: "bg-green-100 text-green-700",
      refunded: "bg-blue-100 text-blue-700",
      failed: "bg-red-100 text-red-700",
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
        <h1 className="text-2xl font-bold">Payments Management</h1>
        <button
          onClick={fetchPayments}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
        >
          <RefreshCw size={18} /> Refresh
        </button>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-2 mb-4 font-semibold">
          <CreditCard /> All Payments
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading payments...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">S/N</th>
                  <th className="p-3">Payment ID</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment, idx) => (
                  <tr key={payment._id} className="border-b">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3 text-sm">{payment._id}</td>
                    <td className="p-3">
                      {payment.user?.name || "Guest"}
                    </td>
                    <td className="p-3 font-semibold">
                      ${payment.amount}
                    </td>
                    <td className="p-3 capitalize">
                      {payment.method || "card"}
                    </td>
                    <td className="p-3">{statusBadge(payment.status)}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        className="px-3 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-1"
                        onClick={() => {
                          setSelectedPayment(payment);
                          setViewModal(true);
                        }}
                      >
                        <Eye size={16} /> View
                      </button>

                      {payment.status === "paid" && (
                        <button
                          className="px-3 py-2 rounded-lg bg-orange-600 text-white flex items-center gap-1"
                          onClick={() => {
                            setSelectedPayment(payment);
                            setRefundModal(true);
                          }}
                        >
                          <RotateCcw size={16} /> Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Payment Modal */}
      <Modal
        open={viewModal}
        title="Payment Details"
        onClose={() => setViewModal(false)}
      >
        {selectedPayment && (
          <div className="space-y-3">
            <p><strong>Payment ID:</strong> {selectedPayment._id}</p>
            <p><strong>User:</strong> {selectedPayment.user?.name}</p>
            <p><strong>Amount:</strong> ${selectedPayment.amount}</p>
            <p><strong>Method:</strong> {selectedPayment.method}</p>
            <p><strong>Status:</strong> {statusBadge(selectedPayment.status)}</p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedPayment.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </Modal>

      {/* Refund Modal */}
      <Modal
        open={refundModal}
        title="Refund Payment"
        onClose={() => setRefundModal(false)}
      >
        <p>
          Are you sure you want to refund this payment? This action cannot be
          undone.
        </p>

        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 py-2 rounded-xl bg-gray-200"
            onClick={() => setRefundModal(false)}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2 rounded-xl bg-orange-600 text-white"
            onClick={refundPayment}
          >
            Refund
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentsManagement;

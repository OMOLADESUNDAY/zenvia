import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  Trash2,
  CheckCircle,
  Slash,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const UserManagement = () => {
  const token = useAuthStore((state) => state.token);
  const headers = { Authorization: `Bearer ${token}` };
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/admin/users`, { headers });
      setUsers(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE}/api/admin/users/${selectedUserId}`, {
        headers,
      });
      setLoading(false);
      fetchUsers();
      setDeleteModalOpen(false);
      alert("User deleted!");
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Delete failed.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>

      {/* Only one tab */}
      <div className="flex gap-3 bg-gray-100 rounded-2xl p-2">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow">
          <List /> View Users
        </button>
      </div>

      {loading && (
        <div className="mt-6 text-center text-gray-500">Loading...</div>
      )}

      {/* View Users */}
      <div className="mt-6 bg-white p-6 rounded-2xl shadow">
        <h3 className="font-bold mb-4">All Users</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">S/N</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className="border-b">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role || "User"}</td>
                  <td className="p-3">
                    {user.isBanned ? (
                      <span className="flex items-center gap-2 text-red-500">
                        <Slash size={16} /> Banned
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-green-500">
                        <CheckCircle size={16} /> Active
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    <button
                      className="px-3 py-2 rounded-xl bg-red-600 text-white flex items-center gap-2"
                      onClick={() => {
                        setSelectedUserId(user._id);
                        setDeleteModalOpen(true);
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
      </div>

      {/* Delete Modal */}
      <Modal
        open={deleteModalOpen}
        title="Delete User"
        onClose={() => setDeleteModalOpen(false)}
      >
        <div className="p-4">
          <p>Are you sure you want to delete this user?</p>
          <div className="flex gap-3 mt-4">
            <button
              className="flex-1 py-2 rounded-xl bg-gray-200"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="flex-1 py-2 rounded-xl bg-red-600 text-white"
              onClick={deleteUser}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;

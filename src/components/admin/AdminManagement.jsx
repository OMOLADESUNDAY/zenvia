// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   UserPlus,
//   Users,
//   Trash2,
//   Shield,
//   Mail,
//   Lock,
// } from "lucide-react";
// import useAuthStore from "../../store/useAuthStore";

// const AdminManagement = () => {
//   const token = useAuthStore((state) => state.token);
//   const BASE_URL = import.meta.env.VITE_BACKEND_URL;

//   const CREATE_ADMIN_URL = `${BASE_URL}/api/admin/admin-account/create`;
//   const DELETE_ADMIN_URL = `${BASE_URL}/api/admin/admin-account/delete`;
//   const GET_ADMINS_URL = `${BASE_URL}/api/admin/admin-all`;

//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };

//   const [activeTab, setActiveTab] = useState("create");
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   // ================= FETCH ADMINS =================
//   const fetchAdmins = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(GET_ADMINS_URL, { headers });
//       setAdmins(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeTab === "view") fetchAdmins();
//   }, [activeTab]);

//   // ================= CREATE ADMIN =================
//   const handleCreateAdmin = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await axios.post(CREATE_ADMIN_URL, formData, { headers });
//       setFormData({ name: "", email: "", password: "" });
//       setActiveTab("view");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= DELETE ADMIN =================
//   const handleDeleteAdmin = async (id) => {
//     if (!confirm("Delete this admin permanently?")) return;
//     try {
//       await axios.delete(`${DELETE_ADMIN_URL}/${id}`, {
//         headers
//       });
//       fetchAdmins();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="bg-gray-200 rounded-2xl p-6">
//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-6">
//         <Shield className="text-green-600" />
//         <h2 className="text-xl font-semibold">Admin Management</h2>
//       </div>

//       {/* TABS */}
//       <div className="flex gap-6 mb-8 border-b">
//         <button
//           onClick={() => setActiveTab("create")}
//           className={`flex items-center gap-2 pb-3 font-medium transition ${
//             activeTab === "create"
//               ? "border-b-2 border-green-500 text-green-600"
//               : "text-gray-600 hover:text-black"
//           }`}
//         >
//           <UserPlus size={18} /> Create Admin
//         </button>

//         <button
//           onClick={() => setActiveTab("view")}
//           className={`flex items-center gap-2 pb-3 font-medium transition ${
//             activeTab === "view"
//               ? "border-b-2 border-green-500 text-green-600"
//               : "text-gray-600 hover:text-black"
//           }`}
//         >
//           <Users size={18} /> View Admins
//         </button>
//       </div>

//       {/* ================= CREATE ADMIN ================= */}
//       {activeTab === "create" && (
//         <div className="flex justify-center">
//           <form
//             onSubmit={handleCreateAdmin}
//             className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md"
//           >
//             <h3 className="text-lg font-semibold mb-6 text-center">
//               Create New Admin
//             </h3>

//             {/* NAME */}
//             <div className="mb-4">
//               <label className="text-sm mb-1 block">Full Name</label>
//               <div className="flex items-center gap-2 border rounded-lg px-3">
//                 <Shield size={16} className="text-gray-400" />
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   className="w-full py-2 outline-none"
//                 />
//               </div>
//             </div>

//             {/* EMAIL */}
//             <div className="mb-4">
//               <label className="text-sm mb-1 block">Email Address</label>
//               <div className="flex items-center gap-2 border rounded-lg px-3">
//                 <Mail size={16} className="text-gray-400" />
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   className="w-full py-2 outline-none"
//                 />
//               </div>
//             </div>

//             {/* PASSWORD */}
//             <div className="mb-6">
//               <label className="text-sm mb-1 block">Password</label>
//               <div className="flex items-center gap-2 border rounded-lg px-3">
//                 <Lock size={16} className="text-gray-400" />
//                 <input
//                   type="password"
//                   required
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                   className="w-full py-2 outline-none"
//                 />
//               </div>
//             </div>

//             <button
//               disabled={loading}
//               className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition"
//             >
//               {loading ? "Creating..." : "Create Admin"}
//             </button>
//           </form>
//         </div>
//       )}

//       {/* ================= VIEW ADMINS ================= */}
//       {activeTab === "view" && (
//         <div className="bg-white rounded-2xl shadow-sm p-6">
//           <div className="flex items-center gap-2 mb-4">
//             <Users size={18} />
//             <h3 className="font-semibold">Admin List</h3>
//           </div>

//           {loading ? (
//             <p>Loading admins...</p>
//           ) : admins.length === 0 ? (
//             <p>No admins found.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="text-left py-3 px-4">S/N</th>
//                     <th className="text-left py-3 px-4">Name</th>
//                     <th className="text-left py-3 px-4">Email</th>
//                     <th className="text-right py-3 px-4">Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {admins.map((admin, index) => (
//                     <tr
//                       key={admin._id}
//                       className="border-b hover:bg-gray-50 transition"
//                     >
//                       <td className="py-3 px-4">{index + 1}</td>
//                       <td className="py-3 px-4 font-medium">
//                         {admin.name}
//                       </td>
//                       <td className="py-3 px-4 text-gray-600">
//                         {admin.email}
//                       </td>
//                       <td className="py-3 px-4 text-right">
//                         <button
//                           onClick={() => handleDeleteAdmin(admin._id)}
//                           className="inline-flex items-center gap-1 text-red-500 hover:text-red-700"
//                         >
//                           <Trash2 size={16} /> Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminManagement;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UserPlus,
  Users,
  Trash2,
  Shield,
  Mail,
  Lock,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import ConfirmModal from "../common/ConfirmModal";

const AdminManagement = () => {
  const token = useAuthStore((state) => state.token);
  const currentAdminId = useAuthStore((state) => state.user._id); // <-- IMPORTANT

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const CREATE_ADMIN_URL = `${BASE_URL}/api/admin/admin-account/create`;
  const DELETE_ADMIN_URL = `${BASE_URL}/api/admin/admin-account/delete`;
  const GET_ADMINS_URL = `${BASE_URL}/api/admin/admin-all`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [activeTab, setActiveTab] = useState("create");
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await axios.get(GET_ADMINS_URL, { headers });
      setAdmins(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "view") fetchAdmins();
  }, [activeTab]);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(CREATE_ADMIN_URL, formData, { headers });
      setFormData({ name: "", email: "", password: "" });
      setActiveTab("view");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (admin) => {
    if (admin._id === currentAdminId) return; // ❌ prevents deleting yourself
    setSelectedAdmin(admin);
    setModalOpen(true);
  };

  const handleDeleteAdmin = async () => {
    if (!selectedAdmin) return;

    try {
      setDeleteLoading(true);
      await axios.delete(`${DELETE_ADMIN_URL}/${selectedAdmin._id}`, {
        headers,
       
      });
      setModalOpen(false);
      setSelectedAdmin(null);
      fetchAdmins();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-green-600" />
        <h2 className="text-xl font-semibold">Admin Management</h2>
      </div>

      <div className="flex gap-6 mb-8 border-b">
        <button
          onClick={() => setActiveTab("create")}
          className={`flex items-center gap-2 pb-3 font-medium transition ${
            activeTab === "create"
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <UserPlus size={18} /> Create Admin
        </button>

        <button
          onClick={() => setActiveTab("view")}
          className={`flex items-center gap-2 pb-3 font-medium transition ${
            activeTab === "view"
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <Users size={18} /> View Admins
        </button>
      </div>

      {activeTab === "create" && (
        <div className="flex justify-center">
          <form
            onSubmit={handleCreateAdmin}
            className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-6 text-center">
              Create New Admin
            </h3>

            <div className="mb-4">
              <label className="text-sm mb-1 block">Full Name</label>
              <div className="flex items-center gap-2 border rounded-lg px-3">
                <Shield size={16} className="text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full py-2 outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm mb-1 block">Email Address</label>
              <div className="flex items-center gap-2 border rounded-lg px-3">
                <Mail size={16} className="text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full py-2 outline-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm mb-1 block">Password</label>
              <div className="flex items-center gap-2 border rounded-lg px-3">
                <Lock size={16} className="text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full py-2 outline-none"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition"
            >
              {loading ? "Creating..." : "Create Admin"}
            </button>
          </form>
        </div>
      )}

      {activeTab === "view" && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} />
            <h3 className="font-semibold">Admin List</h3>
          </div>

          {loading ? (
            <p>Loading admins...</p>
          ) : admins.length === 0 ? (
            <p>No admins found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-3 px-4">S/N</th>
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-right py-3 px-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {admins.map((admin, index) => (
                    <tr
                      key={admin._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4 font-medium">
                        {admin.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {admin.email}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          disabled={admin._id === currentAdminId}
                          onClick={() => openDeleteModal(admin)}
                          className={`inline-flex items-center gap-1 ${
                            admin._id === currentAdminId
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-500 hover:text-red-700"
                          }`}
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
      )}

      <ConfirmModal
        open={modalOpen}
        title="Delete Admin"
        message={`Are you sure you want to delete ${selectedAdmin?.name}?`}
        onConfirm={handleDeleteAdmin}
        onCancel={() => setModalOpen(false)}
        loading={deleteLoading}
      />
    </div>
  );
};

export default AdminManagement;

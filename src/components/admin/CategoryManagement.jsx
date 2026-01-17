import React, { useEffect, useState } from "react";
import {
  Plus,
  List,
  Edit2,
  Trash2,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import Modal from "../common/Modal";

const CategoryManagement = () => {
  const token = useAuthStore((state) => state.token);
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  const [activeTab, setActiveTab] = useState("create");

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  const [createForm, setCreateForm] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const [updateForm, setUpdateForm] = useState({
    id: "",
    name: "",
    slug: "",
    description: "",
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/admin/categories`, {
        headers,
      });
      setCategories(res.data.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // ===== Slug Generator =====
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // ===== Create Category =====
  const createCategory = async () => {
    if (!createForm.name || !createForm.description) {
      alert("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${API_BASE}/api/admin/categories`,
        createForm,
        { headers }
      );
      setLoading(false);
      fetchCategories();
      setCreateForm({ name: "", slug: "", description: "" });
      alert("Category created successfully.");
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // ===== Update Category =====
  const updateCategory = async () => {
    if (!updateForm.name || !updateForm.description) {
      alert("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `${API_BASE}/api/admin/categories/${updateForm.id}`,
        {
          name: updateForm.name,
          slug: updateForm.slug,
          description: updateForm.description,
        },
        { headers }
      );
      setLoading(false);
      fetchCategories();
      alert("Category updated successfully.");
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // ===== Delete Category =====
  const deleteCategory = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${API_BASE}/api/admin/categories/${deleteCategoryId}`,
        { headers }
      );
      setLoading(false);
      fetchCategories();
      setDeleteModalOpen(false);
      alert("Category deleted successfully.");
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // ===== Fill Update Form =====
  const fillUpdateForm = (category) => {
    setUpdateForm({
      id: category._id,
      name: category.name,
      slug: category.slug,
      description: category.description,
    });
    setActiveTab("update");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Category Management</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 bg-gray-100 rounded-2xl p-2">
        <TabButton
          active={activeTab === "create"}
          onClick={() => setActiveTab("create")}
          icon={<Plus />}
          label="Create Category"
        />
        <TabButton
          active={activeTab === "view"}
          onClick={() => setActiveTab("view")}
          icon={<List />}
          label="View All"
        />
        <TabButton
          active={activeTab === "update"}
          onClick={() => setActiveTab("update")}
          icon={<Edit2 />}
          label="Update Category"
        />
      </div>

      {loading && (
        <div className="mt-6 text-center text-gray-500">Loading...</div>
      )}

      {/* Create Tab */}
      {activeTab === "create" && (
        <div className="mt-6 max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
          <h3 className="font-bold mb-4">Create Category</h3>

          <Input
            label="Name"
            value={createForm.name}
            onChange={(e) =>
              setCreateForm({
                ...createForm,
                name: e.target.value,
                slug: generateSlug(e.target.value),
              })
            }
          />

          <Input
            label="Slug"
            value={createForm.slug}
            onChange={(e) =>
              setCreateForm({ ...createForm, slug: generateSlug(e.target.value) })
            }
          />

          <Input
            label="Description"
            value={createForm.description}
            onChange={(e) =>
              setCreateForm({ ...createForm, description: e.target.value })
            }
          />

          <button
            onClick={createCategory}
            className="w-full mt-4 bg-green-600 text-white p-3 rounded-xl flex justify-center items-center gap-2"
          >
            <CheckCircle size={18} />
            Create Category
          </button>
        </div>
      )}

      {/* View Tab */}
      {activeTab === "view" && (
        <div className="mt-6 bg-white p-6 rounded-2xl shadow">
          <h3 className="font-bold mb-4">All Categories</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">S/N</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Slug</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={cat._id} className="border-b">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">{cat.name}</td>
                    <td className="p-3">{cat.slug}</td>
                    <td className="p-3">{cat.description}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => fillUpdateForm(cat)}
                        className="px-3 py-2 rounded-xl bg-yellow-500 text-white flex items-center gap-2"
                      >
                        <Edit2 size={16} /> Update
                      </button>

                      <button
                        onClick={() => {
                          setDeleteCategoryId(cat._id);
                          setDeleteModalOpen(true);
                        }}
                        className="px-3 py-2 rounded-xl bg-red-600 text-white flex items-center gap-2"
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
      )}

      {/* Update Tab */}
      {activeTab === "update" && (
        <div className="mt-6 max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
          <h3 className="font-bold mb-4">Update Category</h3>

          <Input
            label="Name"
            value={updateForm.name}
            onChange={(e) =>
              setUpdateForm({
                ...updateForm,
                name: e.target.value,
                slug: generateSlug(e.target.value),
              })
            }
          />

          <Input
            label="Slug"
            value={updateForm.slug}
            onChange={(e) =>
              setUpdateForm({ ...updateForm, slug: generateSlug(e.target.value) })
            }
          />

          <Input
            label="Description"
            value={updateForm.description}
            onChange={(e) =>
              setUpdateForm({ ...updateForm, description: e.target.value })
            }
          />

          <button
            onClick={updateCategory}
            className="w-full mt-4 bg-green-600 text-white p-3 rounded-xl flex justify-center items-center gap-2"
          >
            <CheckCircle size={18} />
            Update Category
          </button>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <Modal onClose={() => setDeleteModalOpen(false)}>
          <div className="p-6">
            <h3 className="font-bold text-xl mb-4">
              Delete Category
            </h3>
            <p className="mb-4">Are you sure you want to delete this category?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 py-2 rounded-xl bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={deleteCategory}
                className="flex-1 py-2 rounded-xl bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CategoryManagement;

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
      active ? "bg-white shadow" : "text-gray-500"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Input = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-600 mb-1">{label}</label>
    <input
      value={value}
      onChange={onChange}
      className="w-full p-3 border rounded-xl focus:outline-none focus:ring"
    />
  </div>
);

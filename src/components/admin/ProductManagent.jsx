import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PlusCircle,
  List,
  Edit,
  Archive,
  Trash2,
  Eye,
  Box,
  CheckCircle,
  XCircle,
  Upload,
  Tag,
  DollarSign,
  Layers,
  CheckSquare,
  X,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

// ====== Modal Component ======
const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <XCircle size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const ProductManagement = () => {
  const token = useAuthStore((state) => state.token);
  const headers = { Authorization: `Bearer ${token}` };

  const [activeTab, setActiveTab] = useState("create");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // create product state
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    stock: "",
    isFeatured: false,
    images: null,
  });

  // update product state
  const [updateForm, setUpdateForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    categories: [],
    stock: "",
    isFeatured: false,
    images: null,
  });

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const stockTabUI = (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Stock Management</h2>
        <span className="text-sm text-gray-500">{products.length} products</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">S/N</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, idx) => (
              <tr key={product._id} className="border-b">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">
                  <button
                    className="px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200"
                    onClick={() => openUpdate(product)}
                  >
                    Edit Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // fetch all products + categories
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/product`, { headers }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/categories`, { headers }),
        ]);
        setProducts(prodRes.data.data);
        setCategories(catRes.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // ====== CREATE PRODUCT ======
  const createProduct = async () => {
    if (
      !createForm.name ||
      !createForm.description ||
      !createForm.price ||
      createForm.categories.length === 0 ||
      !createForm.stock ||
      !createForm.images
    ) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", createForm.name);
    formData.append("description", createForm.description);
    formData.append("price", createForm.price);
    formData.append("stock", createForm.stock);
    formData.append("isFeatured", createForm.isFeatured);
    createForm.categories.forEach((cat) => formData.append("categories", cat));
    formData.append("images", createForm.images);

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/product`,
        formData,
        { headers: { ...headers, "Content-Type": "multipart/form-data" } }
      );

      setProducts((prev) => [...prev, res.data.data]);
      alert("Product created successfully!");
      setCreateForm({
        name: "",
        description: "",
        price: "",
        categories: [],
        stock: "",
        isFeatured: false,
        images: null,
      });
    } catch (err) {
      console.log(err);
      alert("Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  // ====== UPDATE PRODUCT ======
  const openUpdate = (product) => {
    setActiveTab("update");
    setUpdateForm({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      categories: product.categories || [],
      stock: product.stock,
      isFeatured: product.isFeatured,
      images: null,
    });
  };

  const updateProduct = async () => {
    if (
      !updateForm.name ||
      !updateForm.description ||
      !updateForm.price ||
      updateForm.categories.length === 0 ||
      !updateForm.stock
    ) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", updateForm.name);
    formData.append("description", updateForm.description);
    formData.append("price", updateForm.price);
    formData.append("stock", updateForm.stock);
    formData.append("isFeatured", updateForm.isFeatured);
    updateForm.categories.forEach((cat) => formData.append("categories", cat));

    if (updateForm.images) {
      formData.append("images", updateForm.images);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/product/${updateForm.id}`,
        formData,
        { headers: { ...headers, "Content-Type": "multipart/form-data" } }
      );

      setProducts((prev) =>
        prev.map((p) => (p._id === updateForm.id ? res.data.data : p))
      );
      alert("Product updated successfully!");
      setActiveTab("view");
    } catch (err) {
      console.log(err);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  // ====== DELETE PRODUCT ======
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/product/${id}`, {
        headers,
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product deleted!");
    } catch (err) {
      console.log(err);
      alert("Failed to delete.");
    } finally {
      setLoading(false);
    }
  };

  // ====== TABLE VIEW ======
  const productTable = (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">All Products</h2>
        <span className="text-sm text-gray-500">{products.length} products</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">S/N</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Featured</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, idx) => (
              <tr key={product._id} className="border-b">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">${product.price}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">
                  {product.isFeatured ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <XCircle size={18} className="text-red-500" />
                  )}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    onClick={() => {
                      setModalProduct(product);
                      setModalOpen(true);
                    }}
                  >
                    <Eye size={18} /> View
                  </button>

                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200"
                    onClick={() => openUpdate(product)}
                  >
                    <Edit size={18} /> Edit
                  </button>

                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ====== CREATE FORM ======
  const createFormUI = (
    <div className="bg-white rounded-2xl shadow p-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <PlusCircle size={22} /> Create Product
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          icon={<Tag size={18} />}
          label="Product Name"
          value={createForm.name}
          onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
        />

        <Input
          icon={<DollarSign size={18} />}
          label="Price"
          value={createForm.price}
          type="number"
          onChange={(e) => setCreateForm({ ...createForm, price: e.target.value })}
        />

        <div className="col-span-1">
          <label className="text-sm font-semibold mb-1 flex items-center gap-2">
            <Layers size={18} /> Category
          </label>
          <div className="flex gap-2">
            <select
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
              onChange={(e) => {
                const value = e.target.value;
                if (value && !createForm.categories.includes(value)) {
                  setCreateForm({
                    ...createForm,
                    categories: [...createForm.categories, value]
                  });
                }
                e.target.value = ""; // Reset the select
              }}
            >
              <option value="">Select a category</option>
              {categories
                .filter(cat => !createForm.categories.includes(cat._id))
                .map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          
          {/* Selected categories tags */}
          {createForm.categories.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Selected categories:</p>
              <div className="flex flex-wrap gap-2">
                {createForm.categories.map((catId) => {
                  const category = categories.find(c => c._id === catId);
                  return category ? (
                    <span
                      key={catId}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                    >
                      {category.name}
                      <button
                        type="button"
                        onClick={() => {
                          setCreateForm({
                            ...createForm,
                            categories: createForm.categories.filter(id => id !== catId)
                          });
                        }}
                        className="hover:text-red-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">Select categories one by one</p>
        </div>

        <Input
          icon={<Box size={18} />}
          label="Stock"
          value={createForm.stock}
          type="number"
          onChange={(e) => setCreateForm({ ...createForm, stock: e.target.value })}
        />

        <Toggle
          icon={<CheckSquare size={18} />}
          label="Featured"
          checked={createForm.isFeatured}
          onChange={(val) => setCreateForm({ ...createForm, isFeatured: val })}
        />

        <FileUpload
          icon={<Upload size={18} />}
          label="Product Image"
          onChange={(file) => setCreateForm({ ...createForm, images: file })}
        />

        <TextArea
          icon={<Archive size={18} />}
          label="Description"
          value={createForm.description}
          onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
          cols={2}
        />
      </div>

      <button
        className="mt-6 w-full py-3 rounded-2xl bg-green-500 text-white font-bold hover:bg-green-600 disabled:opacity-50"
        onClick={createProduct}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Product"}
      </button>
    </div>
  );

  // ====== UPDATE FORM ======
  const updateFormUI = (
    <div className="bg-white rounded-2xl shadow p-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Edit size={22} /> Update Product
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          icon={<Tag size={18} />}
          label="Product Name"
          value={updateForm.name}
          onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
        />

        <Input
          icon={<DollarSign size={18} />}
          label="Price"
          value={updateForm.price}
          type="number"
          onChange={(e) => setUpdateForm({ ...updateForm, price: e.target.value })}
        />

        <div className="col-span-1">
          <label className="text-sm font-semibold mb-1 flex items-center gap-2">
            <Layers size={18} /> Category
          </label>
          <div className="flex gap-2">
            <select
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
              onChange={(e) => {
                const value = e.target.value;
                if (value && !updateForm.categories.includes(value)) {
                  setUpdateForm({
                    ...updateForm,
                    categories: [...updateForm.categories, value]
                  });
                }
                e.target.value = ""; // Reset the select
              }}
            >
              <option value="">Select a category</option>
              {categories
                .filter(cat => !updateForm.categories.includes(cat._id))
                .map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          
          {/* Selected categories tags */}
          {updateForm.categories.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Selected categories:</p>
              <div className="flex flex-wrap gap-2">
                {updateForm.categories.map((catId) => {
                  const category = categories.find(c => c._id === catId);
                  return category ? (
                    <span
                      key={catId}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                    >
                      {category.name}
                      <button
                        type="button"
                        onClick={() => {
                          setUpdateForm({
                            ...updateForm,
                            categories: updateForm.categories.filter(id => id !== catId)
                          });
                        }}
                        className="hover:text-red-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">Select categories one by one</p>
        </div>

        <Input
          icon={<Box size={18} />}
          label="Stock"
          value={updateForm.stock}
          type="number"
          onChange={(e) => setUpdateForm({ ...updateForm, stock: e.target.value })}
        />

        <Toggle
          icon={<CheckSquare size={18} />}
          label="Featured"
          checked={updateForm.isFeatured}
          onChange={(val) => setUpdateForm({ ...updateForm, isFeatured: val })}
        />

        <FileUpload
          icon={<Upload size={18} />}
          label="Change Image (optional)"
          onChange={(file) => setUpdateForm({ ...updateForm, images: file })}
        />

        <TextArea
          icon={<Archive size={18} />}
          label="Description"
          value={updateForm.description}
          onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
          cols={2}
        />
      </div>

      <button
        className="mt-6 w-full py-3 rounded-2xl bg-green-500 text-white font-bold hover:bg-green-600 disabled:opacity-50"
        onClick={updateProduct}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Product"}
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="bg-gray-100 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${
                activeTab === "create" ? "bg-white shadow" : "bg-gray-200"
              }`}
            >
              <PlusCircle size={18} /> Create
            </button>

            <button
              onClick={() => setActiveTab("view")}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${
                activeTab === "view" ? "bg-white shadow" : "bg-gray-200"
              }`}
            >
              <List size={18} /> View All
            </button>

            <button
              onClick={() => setActiveTab("update")}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${
                activeTab === "update" ? "bg-white shadow" : "bg-gray-200"
              }`}
            >
              <Edit size={18} /> Update
            </button>

            <button
              onClick={() => setActiveTab("stock")}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${
                activeTab === "stock" ? "bg-white shadow" : "bg-gray-200"
              }`}
            >
              <Archive size={18} /> Stock
            </button>
          </div>
        </div>
      </div>

      {activeTab === "create" && createFormUI}
      {activeTab === "view" && productTable}
      {activeTab === "update" && updateFormUI}
      {activeTab === "stock" && stockTabUI}

      {/* Modal */}
      <Modal
        open={modalOpen}
        title="Product Details"
        onClose={() => setModalOpen(false)}
      >
        {modalProduct && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img
                src={modalProduct.images?.[0] || modalProduct.image || "https://via.placeholder.com/300x300?text=No+Image"}
                alt={modalProduct.name}
                className="w-full rounded-2xl"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">{modalProduct.name}</h2>
              <p className="text-gray-600 mb-2">{modalProduct.description}</p>
              <div className="flex items-center gap-3 mb-2">
                <DollarSign size={18} />
                <span className="font-bold">${modalProduct.price}</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Box size={18} />
                <span>Stock: {modalProduct.stock}</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Layers size={18} />
                <span>
                  Categories: {modalProduct.categories && modalProduct.categories.length > 0 
                    ? modalProduct.categories.map(catId => {
                        const cat = categories.find(c => c._id === catId);
                        return cat ? cat.name : '';
                      }).filter(Boolean).join(', ')
                    : 'None'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckSquare size={18} />
                <span>
                  Featured: {modalProduct.isFeatured ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductManagement;

// ====== Helper UI components ======
const Input = ({ icon, label, value, onChange, type = "text" }) => (
  <div className="col-span-1">
    <label className="text-sm font-semibold mb-1 flex items-center gap-2">
      {icon} {label}
    </label>
    <input
      className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
      value={value}
      onChange={onChange}
      type={type}
    />
  </div>
);

const TextArea = ({ icon, label, value, onChange, cols = 1 }) => (
  <div className={`col-span-${cols}`}>
    <label className="text-sm font-semibold mb-1 flex items-center gap-2">
      {icon} {label}
    </label>
    <textarea
      className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
      value={value}
      onChange={onChange}
      rows={4}
    />
  </div>
);

const Toggle = ({ icon, label, checked, onChange }) => (
  <div className="col-span-1 flex items-center gap-3">
    {icon}
    <span className="font-semibold">{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-5 w-5"
    />
  </div>
);

const FileUpload = ({ icon, label, onChange }) => (
  <div className="col-span-1">
    <label className="text-sm font-semibold mb-1 flex items-center gap-2">
      {icon} {label}
    </label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => onChange(e.target.files[0])}
      className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
    />
  </div>
);

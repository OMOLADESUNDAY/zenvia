import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import userpic from "../../assets/user.jpg";
import useAuthStore from "../../store/useAuthStore";
import axios from "axios";
import Modal from "../../components/common/Modal";
import Navbar from "../../components/common/Navbar";
import Dashboard from "../../components/admin/Dashboard";
/* ---------------- Admin Tab Components ---------------- */
const AdminsTab = () => <div>Admins Management Here</div>;
const ProductsTab = () => <div>Products Management Here</div>;
const CategoriesTab = () => <div>Categories Management Here</div>;
const UsersTab = () => <div>Users Management Here</div>;
const OrdersTab = () => <div>Orders Management Here</div>;
const PaymentsTab = () => <div>Payments Management Here</div>;
const ShippingTab = () => <div>Shipping Management Here</div>;
const ReportsTab = () => <div>Reports Here</div>;
const CartTab = () => <div>All Carts Here</div>;

/* ---------------- Sidebar Button ---------------- */
const SidebarButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center justify-between rounded-md px-4 py-2 text-sm font-medium transition ${
      active ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    {label}
    <span>→</span>
  </button>
);

/* ---------------- Admin Dashboard ---------------- */
const AdminDashboard = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (



    <>
        <Navbar/>
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl rounded-lg bg-white shadow-sm">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full  md:w-1/4 border-b md:border-b-0 md:border-r p-6 flex flex-col justify-between">
            <div className="max-h-105 overflow-y-auto custom-scrollbar pr-2">
              {/* Profile Info */}
              <div className="flex flex-col items-center text-center">
                <img
                  src={userpic}
                  alt="User Avatar"
                  className="h-24 w-24 rounded-full bg-gray-200"
                />
                <h2 className="mt-4 text-lg font-semibold">Admin</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              {/* Navigation */}
              <nav className="mt-8 space-y-2">
                  <SidebarButton
                  active={activeTab === "dashboard"}
                  onClick={() => setActiveTab("dashboard")}
                  label="Dashboard"
                />
                <SidebarButton
                  active={activeTab === "admins"}
                  onClick={() => setActiveTab("admins")}
                  label="Admins"
                />
                <SidebarButton
                  active={activeTab === "products"}
                  onClick={() => setActiveTab("products")}
                  label="Products"
                />
                <SidebarButton
                  active={activeTab === "categories"}
                  onClick={() => setActiveTab("categories")}
                  label="Categories"
                />
                <SidebarButton
                  active={activeTab === "users"}
                  onClick={() => setActiveTab("users")}
                  label="Users"
                />
                <SidebarButton
                  active={activeTab === "orders"}
                  onClick={() => setActiveTab("orders")}
                  label="Orders"
                />
                <SidebarButton
                  active={activeTab === "payments"}
                  onClick={() => setActiveTab("payments")}
                  label="Payments"
                />
                <SidebarButton
                  active={activeTab === "shipping"}
                  onClick={() => setActiveTab("shipping")}
                  label="Shipping"
                />
              
                <SidebarButton
                  active={activeTab === "cart"}
                  onClick={() => setActiveTab("cart")}
                  label="Cart"
                />
              </nav>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="mt-10 flex items-center justify-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-3/4 p-6 md:p-10">
            {activeTab === "admins" && <AdminsTab />}
            {activeTab === "products" && <ProductsTab />}
            {activeTab === "categories" && <CategoriesTab />}
            {activeTab === "users" && <UsersTab />}
            {activeTab === "orders" && <OrdersTab />}
            {activeTab === "payments" && <PaymentsTab />}
            {activeTab === "shipping" && <ShippingTab />}
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "cart" && <CartTab />}
          </main>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default AdminDashboard;

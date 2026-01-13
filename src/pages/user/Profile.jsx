import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import userpic from "../../assets/user.jpg";
import useAuthStore from "../../store/useAuthStore";
const AccountInfo = () => {
  const [activeTab, setActiveTab] = useState("account");
  const navigate = useNavigate();

  // ---------------- Logout Function ----------------
  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    const logout=useAuthStore((state)=>state.logout)
    // Clear local storage auth info
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log(logout)
    const testing="bugging"
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl rounded-lg bg-white shadow-sm">
        <div className="flex flex-col md:flex-row">

          {/* Sidebar */}
          <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r p-6 flex flex-col justify-between">
            
            {/* Profile Info */}
            <div>
              <div className="flex flex-col items-center text-center">
                <img
                  src={userpic}
                  alt="User Avatar"
                  className="h-24 w-24 rounded-full bg-gray-200"
                />
                <h2 className="mt-4 text-lg font-semibold">Mark Cole</h2>
                <p className="text-sm text-gray-500">swoo@gmail.com</p>
              </div>

              {/* Navigation */}
              <nav className="mt-8 space-y-2">
                <SidebarButton
                  active={activeTab === "account"}
                  onClick={() => setActiveTab("account")}
                  label="Account info"
                />
                <SidebarButton
                  active={activeTab === "orders"}
                  onClick={() => setActiveTab("orders")}
                  label="My order"
                />
                <SidebarButton
                  active={activeTab === "address"}
                  onClick={() => setActiveTab("address")}
                  label="My address"
                />
                <SidebarButton
                  active={activeTab === "password"}
                  onClick={() => setActiveTab("password")}
                  label="Change password"
                />
              </nav>
            </div>

            {/* Logout Button */}
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
            {activeTab === "account" && <AccountForm />}
            {activeTab === "orders" && <MyOrders />}
            {activeTab === "address" && <MyAddress />}
            {activeTab === "password" && <ChangePassword />}
          </main>

        </div>
      </div>
    </div>
  );
};

/* ---------- Sidebar Button ---------- */
const SidebarButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center justify-between rounded-md px-4 py-2 text-sm font-medium transition ${
      active
        ? "bg-green-500 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    {label}
    <span>→</span>
  </button>
);

/* ---------- Account Form ---------- */
const AccountForm = () => (
  <>
    <h1 className="mb-6 text-xl font-semibold">Account Info</h1>

    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="First Name" defaultValue="Mark" />
        <Input label="Last Name" defaultValue="Cole" />
      </div>

      <Input label="Email Address" type="email" defaultValue="swoo@gmail.com" />
      <Input label="Phone Number" defaultValue="+1 0231 4554 452" optional />

      <button className="rounded-md bg-green-500 px-6 py-2 text-sm font-medium text-white hover:bg-green-600">
        Save
      </button>
    </form>
  </>
);

/* ---------- My Orders ---------- */
const MyOrders = () => (
  <>
    <h1 className="mb-6 text-xl font-semibold">My Orders</h1>

    <div className="space-y-4">
      {[
        { id: "ORD-1001", date: "Jan 12, 2025", total: "$120", status: "Delivered" },
        { id: "ORD-1002", date: "Jan 18, 2025", total: "$75", status: "Pending" },
      ].map((order) => (
        <div key={order.id} className="rounded-md border p-4 flex justify-between">
          <div>
            <p className="font-medium">{order.id}</p>
            <p className="text-sm text-gray-500">{order.date}</p>
          </div>
          <div className="text-right">
            <p>{order.total}</p>
            <p className={`text-sm ${order.status === "Delivered" ? "text-green-600" : "text-yellow-600"}`}>
              {order.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  </>
);

/* ---------- Address ---------- */
const MyAddress = () => (
  <>
    <h1 className="mb-6 text-xl font-semibold">My Address</h1>

    <div className="space-y-2 text-gray-700">
      <p>Mark Cole</p>
      <p>123 Main Street</p>
      <p>New York, NY 10001</p>
      <p>+1 0231 4554 452</p>

      <button className="mt-4 text-green-600 hover:underline text-sm">
        Edit Address
      </button>
    </div>
  </>
);

/* ---------- Change Password ---------- */
const ChangePassword = () => (
  <>
    <h1 className="mb-6 text-xl font-semibold">Change Password</h1>

    <form className="space-y-4 max-w-sm">
      <input
        type="password"
        placeholder="Current Password"
        className="w-full rounded-md border px-3 py-2"
      />
      <input
        type="password"
        placeholder="New Password"
        className="w-full rounded-md border px-3 py-2"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        className="w-full rounded-md border px-3 py-2"
      />

      <button className="rounded-md bg-green-500 px-6 py-2 text-sm font-medium text-white">
        Update Password
      </button>
    </form>
  </>
);

/* ---------- Reusable Input ---------- */
const Input = ({ label, defaultValue, type = "text", optional }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">
      {label} {!optional && <span className="text-red-500">*</span>}
      {optional && <span className="text-gray-400"> (Optional)</span>}
    </label>
    <input
      type={type}
      defaultValue={defaultValue}
      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
    />
  </div>
);

export default AccountInfo;

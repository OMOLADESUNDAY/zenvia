import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import userpic from "../../assets/user.jpg";
import useAuthStore from "../../store/useAuthStore";
import axios from "axios";
import Modal from "../../components/common/Modal";
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

const MyOrders = ({ myOrder,modal,setModalOpen }) => (
  <>
    <h1 className="mb-6 text-xl font-semibold">My Orders</h1>
    <div className="space-y-4">
      {myOrder.map((order) => (
        <div
          key={order._id}
          className="rounded-md border p-4 flex justify-between cursor-pointer"
          onClick={()=>setModalOpen(true)}
        >
          <div>
            <small className="font-medium">Order No: {order._id}</small>
            <p className="text-sm text-gray-500">
              {new Date(order.paidAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="text-right">
            <p>Price: ${order.itemsPrice}</p>
            <p
              className= 'text-sm'
            >
              Status: {order.status}
            </p>
             {modal?<Modal id={order._id} setModalOpen={setModalOpen}/>:''}
          </div>
        </div>
      ))}
    </div>
   
  </>
);

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

const AccountInfo = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const [myOrder, setMyOrders] = useState([]);
  const [modalOpen, setModalOpen]=useState(false)
  // ✅ Orders is now the default active tab
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const myOrders = async () => {
    const response = await axios.get(`${url}/api/order/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMyOrders(response.data.data);
  };
  useEffect(() => {
    myOrders();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl rounded-lg bg-white shadow-sm">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r p-6 flex flex-col justify-between">
            <div>
              {/* Profile Info */}
              <div className="flex flex-col items-center text-center">
                <img
                  src={userpic}
                  alt="User Avatar"
                  className="h-24 w-24 rounded-full bg-gray-200"
                />
                <h2 className="mt-4 text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              {/* Navigation */}
              <nav className="mt-8 space-y-2">
                <SidebarButton
                  active={activeTab === "orders"}
                  onClick={() => setActiveTab("orders")}
                  label="My order"
                />

                {/* <SidebarButton
                  active={activeTab === "password"}
                  onClick={() => setActiveTab("password")}
                  label="Change password"
                /> */}
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
            {activeTab === "orders" && <MyOrders modal={modalOpen} setModalOpen={setModalOpen} myOrder={myOrder} />}
            {/* {activeTab === "password" && <ChangePassword />} */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;

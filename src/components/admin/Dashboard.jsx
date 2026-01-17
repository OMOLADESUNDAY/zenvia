import { PackageOpen, ShoppingCart, Users } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import SimpleAreaChart from "../common/SimpleAreaChart";
import SimpleBarChart from "../common/SimpleBarChart";
import useAuthStore from "../../store/useAuthStore";

const Dashboard = () => {
  const token = useAuthStore((state) => state.token);

  const [revenueData, setRevenueData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  const RevenueUrl = `${import.meta.env.VITE_BACKEND_URL}/api/admin/payments`;
  const OrderUrl = `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`;
  const UserUrl = `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`;
  const ProductUrl = `${import.meta.env.VITE_BACKEND_URL}/api/admin/product`;

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const fetchData = async () => {
      try {
        setLoading(true);

        const [revenueRes, orderRes, userRes, productRes] =
          await Promise.all([
            axios.get(RevenueUrl, { headers }),
            axios.get(OrderUrl, { headers }),
            axios.get(UserUrl, { headers }),
            axios.get(ProductUrl, { headers }),
          ]);
          console.log(orderRes.data.data)
        setRevenueData(revenueRes.data.data || []);
        setOrderData(orderRes.data.data || []);
        setUserData(userRes.data.data || []);
        setProductData(productRes.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // ---------------- YEAR FILTER ----------------
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const availableYears = useMemo(() => {
    return [
      ...new Set(
        revenueData.map((item) =>
          new Date(item.createdAt).getFullYear()
        )
      ),
    ].sort((a, b) => b - a);
  }, [revenueData]);

  // ---------------- TOTAL REVENUE ----------------
  const totalRevenue = useMemo(() => {
    return revenueData.reduce((sum, item) => sum + item.amount, 0);
  }, [revenueData]);

  // ---------------- MONTHS ----------------
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  // ---------------- REVENUE (AREA CHART) ----------------
  const monthlyRevenueData = useMemo(() => {
    return months.map((month, index) => {
      const total = revenueData.reduce((sum, item) => {
        const date = new Date(item.createdAt);
        if (date.getFullYear() !== selectedYear) return sum;
        if (date.getMonth() !== index) return sum;
        return sum + item.amount;
      }, 0);

      return { name: month, uv: total };
    });
  }, [revenueData, selectedYear]);

  // ---------------- ORDERS (BAR CHART) ----------------
  const monthlyOrderData = useMemo(() => {
    return months.map((month, index) => {
      const count = orderData.reduce((sum, order) => {
        const date = new Date(order.createdAt);
        if (date.getFullYear() !== selectedYear) return sum;
        if (date.getMonth() !== index) return sum;
        return sum + 1;
      }, 0);

      return { name: month, orders: count };
    });
  }, [orderData, selectedYear]);

  // ---------------- SKELETON ----------------
  const SkeletonCard = () => (
    <div className="bg-gray-200 rounded-2xl p-6 min-w-44 animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-3" />
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-300 rounded w-1/3" />
    </div>
  );

  return (
    <div>
      {/* STATS */}
      <section className="flex justify-between gap-4">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <div className="bg-gray-200 rounded-2xl p-6 min-w-44">
              <p>Total Revenue</p>
              <h2 className="text-3xl font-bold text-green-500">
                ${totalRevenue.toFixed(2)}
              </h2>
              <small>sales</small>
            </div>

            <div className="bg-gray-200 rounded-2xl p-6 min-w-44">
              <p>Active Users</p>
              <h2 className="text-3xl font-bold text-green-500 flex items-center gap-2">
                <Users size={28} /> {userData.length}
              </h2>
              <small>users</small>
            </div>

            <div className="bg-gray-200 rounded-2xl p-6 min-w-44">
              <p>Total Orders</p>
              <h2 className="text-3xl font-bold text-green-500 flex items-center gap-2">
                <ShoppingCart /> {orderData.length}
              </h2>
              <small>orders</small>
            </div>

            <div className="bg-gray-200 rounded-2xl p-6 min-w-44">
              <p>Total Products</p>
              <h2 className="text-3xl font-bold text-green-500 flex items-center gap-2">
                <PackageOpen /> {productData.length}
              </h2>
              <small>products</small>
            </div>
          </>
        )}
      </section>

      {/* CHARTS */}
      {!loading && (
        <section className="w-full flex gap-4 mt-6">
          {/* REVENUE */}
          <div className="w-1/2 bg-gray-200 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">Revenue</h3>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="p-1 text-sm rounded border bg-white"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <SimpleAreaChart data={monthlyRevenueData} />
          </div>

          {/* ORDERS */}
          <div className="w-1/2 bg-gray-200 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">Orders</h3>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="p-1 text-sm rounded border bg-white"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <SimpleBarChart data={monthlyOrderData} />
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;

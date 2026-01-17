import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import Home from "./pages/public/Home";
import SingleProductPage from "./pages/public/SingleProduct";
import About from "./pages/public/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/public/Cart";
import AccountInfo from "./pages/user/Profile";
import ContactPage from "./pages/public/Contact";
import CheckoutPageWrapper from "./layouts/CheckoutPageWrapper";
import PaymentSuccessModal from "./components/ui/PaymentSuccessModal";
import CategoryPage from "./pages/public/Category";
import AdminDashboard from "./pages/user/AdminDashboard";

// Route Guards
import UserProtected from "./route/UserProtected";
import AdminProtected from "./route/AdminProtected";
import Navbar from "./components/common/Navbar";
import CustomerService from "./pages/public/CustomerService";
import Policy from "./pages/public/Policy";
import Terms from "./pages/public/Terms";

function App() {
  return (
    <Routes>
      {/* PUBLIC LAYOUT */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/single/:id" element={<SingleProductPage />} />
        <Route path="/categories/:slug" element={<CategoryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/cart"
          element={
            <UserProtected>
              <Cart />
            </UserProtected>
          }
        />

        <Route
          path="/checkout"
          element={
            <UserProtected>
              <CheckoutPageWrapper />
            </UserProtected>
          }
        />

        <Route
          path="/profile"
          element={
            <UserProtected>
              <AccountInfo />
            </UserProtected>
          }
        />

        <Route
          path="/payment-successful"
          element={
            <UserProtected>
              <PaymentSuccessModal />
            </UserProtected>
          }
        />
      </Route>

      {/* ADMIN LAYOUT (NO NAVBAR / FOOTER) */}
      <Route
        element={
          <AdminProtected>
            <AdminLayout />
          </AdminProtected>
        }
      >
        <Route path="/user/myadmin/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;

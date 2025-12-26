import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";

// AUTH
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// USER
import Shops from "./pages/user/Shops";
import Products from "./pages/user/Products";
import AllProducts from "./pages/user/AllProducts";
import Cart from "./pages/user/Cart";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import UserDashboard from "./pages/user/UserDashboard";

// OWNER
import MyShop from "./pages/owner/MyShop";
import AddProduct from "./pages/owner/AddProduct";
import MyProducts from "./pages/owner/MyProducts";
import OrderManagement from "./pages/owner/OrderManagement";
import OwnerDashboard from "./pages/owner/OwnerDashboard";

// ADMIN
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageShops from "./pages/admin/ManageShops";

/* ---------------- ROUTES WITH LAYOUT CONTROL ---------------- */

function AppRoutes() {
  const location = useLocation();

  // ❌ Hide Navbar on dashboards
  const hideNavbar =
  location.pathname.startsWith("/login") ||
  location.pathname.startsWith("/register") ||
  location.pathname.startsWith("/dashboard") ||
  location.pathname.startsWith("/owner") ||
  location.pathname.startsWith("/products") ||
  location.pathname.startsWith("/profile") ||
  location.pathname.startsWith("/orders") ||
  location.pathname.startsWith("/cart") ||
  location.pathname.startsWith("/admin");


  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ---------- AUTH ---------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ---------- PUBLIC ---------- */}
        <Route path="/" element={<Shops />} />
        <Route path="/shop/:id" element={<Products />} />
        <Route path="/products" element={<AllProducts />} />

        {/* ---------- USER ---------- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute role="USER">
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute role="USER">
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute role="USER">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ---------- SHOP OWNER ---------- */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute role="SHOP_OWNER">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/shop"
          element={
            <ProtectedRoute role="SHOP_OWNER">
              <MyShop />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/add-product"
          element={
            <ProtectedRoute role="SHOP_OWNER">
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/products"
          element={
            <ProtectedRoute role="SHOP_OWNER">
              <MyProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/orders"
          element={
            <ProtectedRoute role="SHOP_OWNER">
              <OrderManagement />
            </ProtectedRoute>
          }
        />

        {/* ---------- ADMIN ---------- */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/shops"
          element={
            <ProtectedRoute role="ADMIN">
              <ManageShops />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

/* ---------------- ROOT APP ---------------- */

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

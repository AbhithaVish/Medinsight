import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

/* ================= AUTH ================= */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* ================= USER ================= */
import Shops from "./pages/user/Shops";
import Products from "./pages/user/Products";
import AllProducts from "./pages/user/AllProducts";
import Cart from "./pages/user/Cart";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import UserDashboard from "./pages/user/UserDashboard";

/* ================= OWNER ================= */
import MyShop from "./pages/owner/MyShop";
import AddProduct from "./pages/owner/AddProduct";
import MyProducts from "./pages/owner/MyProducts";
import OrderManagement from "./pages/owner/OrderManagement";
import OwnerDashboard from "./pages/owner/OwnerDashboard";

/* ================= ADMIN ================= */
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageShops from "./pages/admin/ManageShops";

/* ================= ASSISTANT ================= */
import AssistantLogin from "./pages/assistants/AssistantLogin";
import AssistantRegister from "./pages/assistants/AssistantRegister";
import AssistantDashboard from "./pages/assistants/AssistantDashboard";
import AssistantProfile from "./pages/assistants/AssistantProfile";
import AssistantPublicList from "./pages/assistants/AssistantPublicList";

/* ================= CONSULTANT ================= */
import ConsultantLogin from "./pages/consultants/ConsultantLogin";
import ConsultantRegister from "./pages/consultants/ConsultantRegister";
import ConsultantDashboard from "./pages/consultants/ConsultantDashboard";
import ConsultantProfile from "./pages/consultants/ConsultantProfile";
import ConsultantPublicList from "./pages/consultants/ConsultantPublicList";

/* ================= ROUTES ================= */

function AppRoutes() {
  const location = useLocation();

  /* 🔐 Hide navbar on ALL dashboards + assistant + consultant pages */
  const hideNavbar =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/owner") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/assistants") ||
    location.pathname.startsWith("/consultants");

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

        {/* ---------- ASSISTANTS ---------- */}
        <Route path="/assistants" element={<AssistantPublicList />} />
        <Route path="/assistants/login" element={<AssistantLogin />} />
        <Route path="/assistants/register" element={<AssistantRegister />} />
        <Route
          path="/assistants/dashboard"
          element={
            <ProtectedRoute role="ASSISTANT">
              <AssistantDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assistants/profile"
          element={
            <ProtectedRoute role="ASSISTANT">
              <AssistantProfile />
            </ProtectedRoute>
          }
        />

        {/* ---------- CONSULTANTS ---------- */}
        <Route path="/consultants" element={<ConsultantPublicList />} />
        <Route path="/consultants/login" element={<ConsultantLogin />} />
        <Route path="/consultants/register" element={<ConsultantRegister />} />
        <Route
          path="/consultants/dashboard"
          element={
            <ProtectedRoute role="CONSULTANT">
              <ConsultantDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consultants/profile"
          element={
            <ProtectedRoute role="CONSULTANT">
              <ConsultantProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

/* ================= ROOT ================= */

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

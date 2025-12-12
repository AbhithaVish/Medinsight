// frontend/src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginApp from "./components/LoginApp";
import HomeLayout from "./pages/Home/Layout";
import Dashboard from "./pages/Home/Dashboard";
import XRayAnalysis from "./pages/Home/XRayAnalysis";
import Pharmacy from "./pages/Home/Pharmacy";
import Booking from "./pages/Home/Booking";
import PatientHome from "./pages/ShopOwner/ShopOwnerHome";


function getAuth() {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");
  let user = null;
  try {
    if (userRaw) user = JSON.parse(userRaw);
  } catch (e) {
    user = null;
  }
  return { token, user };
}

/**
 * Role-aware protected route. If not authenticated -> redirect to login.
 * If authenticated but requiredRole is provided and doesn't match the user's role,
 * redirect the user to their correct landing (patient -> /patient, shopowner -> /home).
 */
function ProtectedRoute({ children, requiredRole }) {
  const { token, user } = getAuth();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // redirect to the user's home if trying to access a route they shouldn't
    if (user.role === "shopowner") return <Navigate to="/patient" replace />;
    if (user.role === "patient") return <Navigate to="/home" replace />;
    // fallback to login
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<LoginApp />} />

      {/* Shopowner area (protected) */}
      <Route
        path="/home/*"
        element={
          <ProtectedRoute requiredRole="patient">
            <HomeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="xray" element={<XRayAnalysis />} />
        <Route path="pharmacy" element={<Pharmacy />} />
        <Route path="booking" element={<Booking />} />
      </Route>

      {/* Patient area (protected) */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute requiredRole="shopowner">
            <PatientHome />
          </ProtectedRoute>
        }
      />

      {/* catch-all -> login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

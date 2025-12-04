import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginApp from "./components/LoginApp";
import HomeLayout from "./pages/Home/Layout";
import Dashboard from "./pages/Home/Dashboard";
import XRayAnalysis from "./pages/Home/XRayAnalysis";
import Pharmacy from "./pages/Home/Pharmacy";
import Booking from "./pages/Home/Booking";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginApp />} />
      <Route path="/home" element={<ProtectedRoute><HomeLayout/></ProtectedRoute>}>
        <Route index element={<Dashboard/>} />
        <Route path="xray" element={<XRayAnalysis/>} />
        <Route path="pharmacy" element={<Pharmacy/>} />
        <Route path="booking" element={<Booking/>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./styles/common.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);

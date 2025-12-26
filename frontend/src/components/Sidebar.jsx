import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      <h2 className="logo">MediInsight</h2>

      {user?.role === "USER" && (
        <>
          <Link to="/dashboard">Dashboard</Link>
           <Link to="/cart">Cart</Link>
          <Link to="/products">All Products</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/profile">Profile</Link>
        </>
      )}

      {user?.role === "SHOP_OWNER" && (
        <>
          <Link to="/owner/dashboard">Dashboard</Link>
          <Link to="/owner/shop">My Shop</Link>
          <Link to="/owner/add-product">Add Product</Link>
          <Link to="/owner/products">My Products</Link>
          <Link to="/owner/orders">Orders</Link>
        </>
      )}

      {user?.role === "ADMIN" && (
        <>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/shops">Manage Shops</Link>
        </>
      )}

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </aside>
  );
}

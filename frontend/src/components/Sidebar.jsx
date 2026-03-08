import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {

  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={styles.navbar}>

      {/* LOGO */}
      <div style={styles.logo}>
        MediInsight
      </div>

      {/* MENU */}
      <div style={styles.menu}>

        {/* ================= USER ================= */}
        {user?.role === "USER" && (
          <>
            <NavItem to="/dashboard" label="Dashboard" />
            <NavItem to="/products" label="Products" />
            <NavItem to="/cart" label="Cart" />
            <NavItem to="/orders" label="Orders" />
            <NavItem to="/assistants" label="Assistants" />
            <NavItem to="/consultants" label="Consultants" />
            <NavItem to="/ai-xray" label="AI X-Ray" />
            <NavItem to="/profile" label="Profile" />
          </>
        )}

        {/* ================= SHOP OWNER ================= */}
        {user?.role === "SHOP_OWNER" && (
          <>
            <NavItem to="/owner/dashboard" label="Dashboard" />
            <NavItem to="/owner/shop" label="My Shop" />
            <NavItem to="/owner/add-product" label="Add Product" />
            <NavItem to="/owner/products" label="Products" />
            <NavItem to="/owner/orders" label="Orders" />
          </>
        )}

        {/* ================= ADMIN ================= */}
        {user?.role === "ADMIN" && (
          <>
            <NavItem to="/admin/dashboard" label="Dashboard" />
            <NavItem to="/admin/shops" label="Manage Shops" />
            {/* <NavItem to="/admin/orders" label="Manage orders" /> */}
          </>
        )}

      </div>

      {/* LOGOUT */}
      <button style={styles.logout} onClick={logout}>
        Logout
      </button>

    </nav>
  );
}


/* ===== NAV ITEM ===== */

function NavItem({ to, label }) {
  return (
    <Link to={to} style={styles.link}>
      {label}
    </Link>
  );
}


/* ===== STYLES ===== */

const styles = {

  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "16px 40px",
    background: "#ffffff",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)"
  },

  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#2563eb"
  },

  menu: {
    display: "flex",
    alignItems: "center",
    gap: "22px",
    flexWrap: "wrap"
  },

  link: {
    textDecoration: "none",
    color: "#334155",
    fontWeight: "500",
    fontSize: "15px",
    transition: "0.3s"
  },

  logout: {
    background: "#ef4444",
    border: "none",
    color: "white",
    padding: "8px 18px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};
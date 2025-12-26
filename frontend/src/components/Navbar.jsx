import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>MultiVendor</h2>

      <div style={styles.links}>
        {/* NOT LOGGED IN */}
        {!user?.token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* USER */}
        {user?.role === "USER" && (
  <>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}


        {/* SHOP OWNER */}
        {user?.role === "SHOP_OWNER" && (
            <>
              <Link to="/owner/shop">My Shop</Link>
               <Link to="/owner/add-product">Add Product</Link>
              <Link to="/owner/products">My Products</Link>
              <Link to="/owner/orders">Orders</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}

        {/* ADMIN */}
        {user?.role === "ADMIN" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#222",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center"
  }
};

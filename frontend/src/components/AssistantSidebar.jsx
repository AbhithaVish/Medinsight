import { NavLink, useNavigate } from "react-router-dom";

export default function AssistantSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/assistants/login");
  };

  return (
    <aside
      style={{
        width: 260,
        minHeight: "100vh",
        background: "#0f172a",
        color: "#fff",
        padding: 20
      }}
    >
      <h2 style={{ marginBottom: 30, color: "#38bdf8" }}>
        🏥 Assistant
      </h2>

      <NavItem to="/assistants/dashboard" label="Dashboard" />
      <NavItem to="/assistants/profile" label="My Profile" />
      <NavItem to="/assistants" label="Public Listing" />

      <button
        onClick={logout}
        style={{
          marginTop: 40,
          width: "100%",
          padding: "12px",
          borderRadius: 10,
          border: "none",
          background: "#ef4444",
          color: "#fff"
        }}
      >
        Logout
      </button>
    </aside>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "block",
        padding: "12px 14px",
        marginBottom: 10,
        borderRadius: 10,
        color: "#fff",
        textDecoration: "none",
        background: isActive ? "#1e293b" : "transparent"
      })}
    >
      {label}
    </NavLink>
  );
}

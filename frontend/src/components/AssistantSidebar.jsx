import { NavLink, useNavigate } from "react-router-dom";
import "./AssistantSidebar.css";

export default function AssistantSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/assistants/login");
  };

  return (
    <aside className="assistant-sidebar">

      <div className="sidebar-logo">
        🏥 CareConnect
      </div>

      <nav className="sidebar-menu">
        <NavItem to="/assistants/dashboard" label="Dashboard" />
        <NavItem to="/assistants/profile" label="My Profile" />
        <NavItem to="/assistants" label="Public Listing" />
      </nav>
      <div className="sidebar-bottom">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

    </aside>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "menu-item active" : "menu-item"
      }
    >
      {label}
    </NavLink>
  );
}
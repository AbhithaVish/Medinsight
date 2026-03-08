import Sidebar from "./Sidebar";
import "../styles/dashboard.css";

export default function DashboardLayout({ title, children }) {
  return (
    <div className="dashboard-root">

      {/* TOP NAVBAR */}
      <Sidebar />

      {/* PAGE CONTENT */}
      <main className="dashboard-main">
        {title && <h1 className="dashboard-title">{title}</h1>}
        {children}
      </main>

    </div>
  );
}
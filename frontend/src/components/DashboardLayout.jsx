import Sidebar from "./Sidebar";
import "../styles/dashboard.css";

export default function DashboardLayout({ title, children }) {
  return (
    <div className="dashboard-root">
      <Sidebar />
      <main className="dashboard-main">
        <h1 className="dashboard-title">{title}</h1>
        {children}
      </main>
    </div>
  );
}

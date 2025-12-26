import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    shops: 0,
    pendingShops: 0,
    orders: 0
  });

  useEffect(() => {
    api.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  return (
    <DashboardLayout title="Admin Dashboard">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20
        }}
      >
        <StatCard label="Total Users" value={stats.users} />
        <StatCard label="Total Shops" value={stats.shops} />
        <StatCard label="Pending Shops" value={stats.pendingShops} />
        <StatCard label="Total Orders" value={stats.orders} />
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h3 style={{ fontSize: 32 }}>{value}</h3>
      <p style={{ color: "#6b7280" }}>{label}</p>
    </div>
  );
}

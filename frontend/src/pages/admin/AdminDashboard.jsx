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
    <DashboardLayout title="Admin Analytics Dashboard">

      {/* KPI SECTION */}
      <div className="kpiGrid">
        <StatCard
          label="Total Users"
          value={stats.users}
          color="#3b82f6"
          icon="👤"
        />
        <StatCard
          label="Total Shops"
          value={stats.shops}
          color="#10b981"
          icon="🏬"
        />
        <StatCard
          label="Pending Shops"
          value={stats.pendingShops}
          color="#f59e0b"
          icon="⏳"
        />
        <StatCard
          label="Total Orders"
          value={stats.orders}
          color="#8b5cf6"
          icon="📦"
        />
      </div>

      {/* MAIN ANALYTICS SECTION */}
      <div className="analyticsGrid">
        <div className="card largeCard">
          <h3>Platform Growth</h3>
          <div className="chartPlaceholder">
            Chart area (Integrate Chart.js or Recharts)
          </div>
        </div>

        <div className="card">
          <h3>Recent Activity</h3>
          <ul className="activityList">
            <li>🆕 New user registered</li>
            <li>🏬 New shop submitted for approval</li>
            <li>📦 New order placed</li>
            <li>✅ Shop approved</li>
          </ul>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .kpiGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .analyticsGrid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
        }

        .card {
          background: #ffffff;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }

        .largeCard {
          min-height: 300px;
        }

        .chartPlaceholder {
          margin-top: 20px;
          height: 220px;
          background: linear-gradient(
            135deg,
            #f3f4f6,
            #e5e7eb
          );
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          font-size: 14px;
        }

        .activityList {
          list-style: none;
          padding: 0;
          margin-top: 20px;
        }

        .activityList li {
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }

        .activityList li:last-child {
          border-bottom: none;
        }
      `}</style>
    </DashboardLayout>
  );
}

/* KPI CARD COMPONENT */
function StatCard({ label, value, color, icon }) {
  return (
    <div
      className="card"
      style={{
        borderTop: `5px solid ${color}`
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <p
            style={{
              color: "#6b7280",
              fontSize: 14,
              marginBottom: 8
            }}
          >
            {label}
          </p>
          <h2
            style={{
              fontSize: 32,
              margin: 0,
              fontWeight: 700
            }}
          >
            {value}
          </h2>
        </div>

        <div
          style={{
            fontSize: 36,
            background: color,
            color: "#fff",
            width: 60,
            height: 60,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
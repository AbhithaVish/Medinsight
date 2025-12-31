import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import DashboardLayout from "../../components/AssistantDashboardLayout";

export default function AssistantDashboard() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/assistants/me")
      .then(res => setProfile(res.data))
      .catch(() => setProfile(null));
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      {!profile ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          {/* ---------- STATS ---------- */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
              marginBottom: 30
            }}
          >
            <StatCard
              title="Status"
              value={profile.available ? "Available" : "Unavailable"}
              color={profile.available ? "#16a34a" : "#dc2626"}
            />

            <StatCard
              title="Hospital"
              value={profile.hospital || "Not set"}
            />

            <StatCard
              title="Rate"
              value={`Rs. ${profile.rate || "—"}`}
            />
          </div>

          {/* ---------- QUICK ACTIONS ---------- */}
          <div
            style={{
              display: "flex",
              gap: 15,
              flexWrap: "wrap"
            }}
          >
            <ActionButton
              label="Edit Profile"
              onClick={() => navigate("/assistants/profile")}
            />

            <ActionButton
              label={profile.available ? "Go Offline" : "Go Online"}
              color={profile.available ? "#ef4444" : "#22c55e"}
              onClick={async () => {
                await api.put("/assistants/me", {
                  ...profile,
                  available: !profile.available
                });
                setProfile(p => ({ ...p, available: !p.available }));
              }}
            />

            <ActionButton
              label="View Public Listing"
              color="#0ea5e9"
              onClick={() => navigate("/assistants")}
            />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function StatCard({ title, value, color = "#2563eb" }) {
  return (
    <div
      style={{
        padding: 20,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
      }}
    >
      <p style={{ color: "#6b7280", marginBottom: 6 }}>{title}</p>
      <h2 style={{ color, margin: 0 }}>{value}</h2>
    </div>
  );
}

function ActionButton({ label, onClick, color = "#2563eb" }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 20px",
        borderRadius: 12,
        background: color,
        color: "#fff",
        border: "none",
        fontSize: 15
      }}
    >
      {label}
    </button>
  );
}

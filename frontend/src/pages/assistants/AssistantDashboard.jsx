import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import DashboardLayout from "../../components/AssistantDashboardLayout";
import "./AssistantDashboard.css";

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
        <p className="dashboard-loading">Loading dashboard...</p>
      ) : (
        <div className="assistant-dashboard">

          {/* ---------- STATS ---------- */}

          <div className="stats-grid">

            <StatCard
              title="Status"
              value={profile.available ? "Available" : "Unavailable"}
              color={profile.available ? "green" : "red"}
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

          {/* ---------- ACTIONS ---------- */}

          <div className="actions-container">

            <ActionButton
              label="Edit Profile"
              onClick={() => navigate("/assistants/profile")}
            />

            <ActionButton
              label={profile.available ? "Go Offline" : "Go Online"}
              color={profile.available ? "danger" : "success"}
              onClick={async () => {
                await api.put("/assistants/me", {
                  ...profile,
                  available: !profile.available
                });

                setProfile(p => ({
                  ...p,
                  available: !p.available
                }));
              }}
            />

            <ActionButton
              label="View Public Listing"
              color="info"
              onClick={() => navigate("/assistants")}
            />

          </div>

        </div>
      )}

    </DashboardLayout>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({ title, value, color }) {

  return (
    <div className={`stat-card ${color}`}>
      <p className="stat-title">{title}</p>
      <h2 className="stat-value">{value}</h2>
    </div>
  );
}

function ActionButton({ label, onClick, color = "primary" }) {

  return (
    <button
      className={`dashboard-btn ${color}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
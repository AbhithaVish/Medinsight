import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function ConsultantDashboard() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    bio: "",
    experience_years: "",
    hourly_rate: ""
  });

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ===== LOAD CONSULTANT ===== */

  useEffect(() => {

    api.get("/consultants/me")
      .then(res => {

        setForm({
          name: res.data.name || "",
          bio: res.data.bio || "",
          experience_years: res.data.experience_years || "",
          hourly_rate: res.data.hourly_rate || ""
        });

        setHospitals(res.data.ConsultantHospitals || []);

      })
      .catch(() => alert("Failed to load consultant profile"))
      .finally(() => setLoading(false));

  }, []);

  /* ===== SAVE PROFILE ===== */

  const saveProfile = async () => {

    setSaving(true);

    try {

      await api.put("/consultants/me", form);

      alert("Profile updated successfully");

    } catch (err) {

      console.error(err);
      alert("Failed to update profile");

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Consultant Dashboard">
        <p>Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Consultant Dashboard">

      {/* ===== BACK BUTTON ===== */}

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: 20,
          padding: "8px 16px",
          borderRadius: 8,
          border: "none",
          background: "#64748b",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        ← Back to User Dashboard
      </button>

      {/* ===== PROFILE CARD ===== */}

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          marginBottom: 24
        }}
      >

        <h2 style={{ marginBottom: 12 }}>Consultant Profile</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
            gap: 16
          }}
        >

          <div>
            <label>Name</label>
            <input
              value={form.name}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div>
            <label>Experience (years)</label>
            <input
              type="number"
              value={form.experience_years}
              onChange={e =>
                setForm({
                  ...form,
                  experience_years: e.target.value
                })
              }
            />
          </div>

          <div>
            <label>Hourly Rate (Rs.)</label>
            <input
              type="number"
              value={form.hourly_rate}
              onChange={e =>
                setForm({
                  ...form,
                  hourly_rate: e.target.value
                })
              }
            />
          </div>

        </div>

        <div style={{ marginTop: 16 }}>

          <label>Professional Bio</label>

          <textarea
            rows={4}
            value={form.bio}
            onChange={e =>
              setForm({ ...form, bio: e.target.value })
            }
          />

        </div>

        <button
          onClick={saveProfile}
          disabled={saving}
          style={{
            marginTop: 18,
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>

      {/* ===== HOSPITAL LIST ===== */}

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
        }}
      >

        <h3 style={{ marginBottom: 16 }}>Working Hospitals</h3>

        {!hospitals.length ? (
          <p style={{ color: "#64748b" }}>
            No hospitals added yet
          </p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {hospitals.map(h => (
              <div
                key={h.id}
                style={{
                  padding: 14,
                  borderRadius: 12,
                  background: "#f8fafc",
                  border: "1px solid #e5e7eb"
                }}
              >
                <strong>{h.hospital_name}</strong>

                <p style={{ margin: 0, color: "#64748b" }}>
                  📍 {h.location || "Location not specified"}
                </p>

              </div>
            ))}
          </div>
        )}

      </div>

    </DashboardLayout>
  );
}
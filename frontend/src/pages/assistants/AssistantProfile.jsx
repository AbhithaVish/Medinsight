import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function AssistantProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience_years: "",
    hourly_rate: "",
    bio: ""
  });

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    api.get("/assistants/me")
      .then(res => {
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          experience_years: res.data.experience_years || "",
          hourly_rate: res.data.hourly_rate || "",
          bio: res.data.bio || ""
        });

        setHospitals(res.data.hospitals || []);
      })
      .catch(() => alert("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  /* ================= UPDATE PROFILE ================= */
  const saveProfile = async () => {
    setSaving(true);
    try {
      await api.put("/assistants/me", form);
      alert("Profile updated successfully");
    } catch {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ padding: 30 }}>Loading profile...</p>;

  return (
    <DashboardLayout title="My Assistant Profile">
      <div
        style={{
          maxWidth: 750,
          background: "#ffffff",
          padding: 30,
          borderRadius: 18,
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Profile Details</h2>

        {/* ===== BASIC DETAILS ===== */}
        <div className="grid-2">
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input value={form.email} disabled />
        </div>

        <div className="grid-2">
          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="number"
            placeholder="Years of Experience"
            value={form.experience_years}
            onChange={e =>
              setForm({ ...form, experience_years: e.target.value })
            }
          />
        </div>

        <input
          type="number"
          placeholder="Hourly Rate (Rs.)"
          value={form.hourly_rate}
          onChange={e =>
            setForm({ ...form, hourly_rate: e.target.value })
          }
          style={{ width: "100%", marginTop: 12 }}
        />

        <textarea
          placeholder="Bio (skills, background, care experience)"
          rows={4}
          value={form.bio}
          onChange={e => setForm({ ...form, bio: e.target.value })}
          style={{ width: "100%", marginTop: 15 }}
        />

        {/* ===== HOSPITALS ===== */}
        <div style={{ marginTop: 25 }}>
          <h3>Working Hospitals</h3>

          {hospitals.length === 0 && (
            <p style={{ color: "#64748b" }}>
              Hospitals added during registration
            </p>
          )}

          {hospitals.map((h, i) => (
            <div
              key={i}
              style={{
                marginTop: 10,
                padding: 12,
                borderRadius: 12,
                background: "#f8fafc",
                border: "1px solid #e5e7eb"
              }}
            >
              <strong>{h.hospital_name}</strong>
              <p style={{ margin: "4px 0", color: "#64748b" }}>
                📍 {h.location}
              </p>
            </div>
          ))}
        </div>

        {/* ===== SAVE BUTTON ===== */}
        <button
          onClick={saveProfile}
          disabled={saving}
          style={{
            marginTop: 30,
            padding: "14px 22px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 14,
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </DashboardLayout>
  );
}

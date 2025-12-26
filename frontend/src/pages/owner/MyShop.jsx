import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function MyShop() {
  const [shop, setShop] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);

  const loadShop = async () => {
    try {
      const res = await api.get("/shops/me");
      setShop(res.data);
    } catch (err) {
      setShop(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShop();
  }, []);

  const createShop = async () => {
    if (!form.name.trim()) {
      alert("Shop name required");
      return;
    }

    try {
      await api.post("/shops", form);
      alert("Shop created. Await admin approval.");
      loadShop();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create shop");
    }
  };

  return (
    <DashboardLayout title="My Shop">
      {loading && <p>Loading...</p>}

      {/* ---------------- EXISTING SHOP ---------------- */}
      {shop && (
        <div className="card">
          <h2>{shop.name}</h2>
          <p>{shop.description || "No description provided"}</p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "20px",
                background:
                  shop.status === "APPROVED"
                    ? "#dcfce7"
                    : shop.status === "BLOCKED"
                    ? "#fee2e2"
                    : "#fef9c3",
                color:
                  shop.status === "APPROVED"
                    ? "#166534"
                    : shop.status === "BLOCKED"
                    ? "#991b1b"
                    : "#92400e"
              }}
            >
              {shop.status}
            </span>
          </p>

          {shop.status === "PENDING" && (
            <p style={{ marginTop: "10px", color: "#92400e" }}>
              ⏳ Waiting for admin approval
            </p>
          )}

          {shop.status === "BLOCKED" && (
            <p style={{ marginTop: "10px", color: "#991b1b" }}>
              🚫 Shop blocked by admin
            </p>
          )}
        </div>
      )}

      {/* ---------------- CREATE SHOP ---------------- */}
      {!shop && !loading && (
        <div className="card" style={{ maxWidth: "500px" }}>
          <h2>Create My Shop</h2>

          <input
            placeholder="Shop Name"
            value={form.name}
            onChange={e =>
              setForm({ ...form, name: e.target.value })
            }
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={e =>
              setForm({ ...form, description: e.target.value })
            }
            rows={4}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <button onClick={createShop}>
            Create Shop
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}

import { useEffect, useState } from "react";
import api, { BASE_URL } from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [uploading, setUploading] = useState(null);

  const loadProducts = async () => {
    const res = await api.get("/products/my");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const uploadImage = async (id, file) => {
    const data = new FormData();
    data.append("image", file);
    setUploading(id);
    await api.post(`/products/${id}/image`, data);
    setUploading(null);
    loadProducts();
  };

  const saveEdit = async id => {
    await api.put(`/products/${id}`, editForm);
    setEditingId(null);
    loadProducts();
  };

  return (
    <DashboardLayout title="My Products">
      {products.length === 0 && (
        <p style={{ color: "#6b7280" }}>No products added yet</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24
        }}
      >
        {products.map(p => (
          <div
            key={p.id}
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 16,
              boxShadow: "0 10px 25px rgba(0,0,0,0.06)"
            }}
          >
            {/* IMAGE */}
            {p.image ? (
              <img
                src={`${BASE_URL}/uploads/${p.image}`}
                alt={p.name}
                style={{
                  width: "100%",
                  height: 170,
                  objectFit: "cover",
                  borderRadius: 12,
                  marginBottom: 10
                }}
              />
            ) : (
              <div
                style={{
                  height: 170,
                  background: "#f3f4f6",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9ca3af",
                  marginBottom: 10
                }}
              >
                No Image
              </div>
            )}

            {/* IMAGE UPLOAD */}
            <label
              style={{
                display: "block",
                fontSize: 13,
                color: "#6b7280",
                marginBottom: 6
              }}
            >
              Update image
            </label>

            <input
              type="file"
              accept="image/*"
              disabled={uploading === p.id}
              onChange={e => uploadImage(p.id, e.target.files[0])}
              style={{ marginBottom: 10 }}
            />

            {uploading === p.id && (
              <p style={{ fontSize: 12, color: "#2563eb" }}>
                Uploading image...
              </p>
            )}

            {/* EDIT MODE */}
            {editingId === p.id ? (
              <>
                <input
                  value={editForm.name}
                  onChange={e =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  style={inputStyle}
                />

                <input
                  type="number"
                  value={editForm.price}
                  onChange={e =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  style={inputStyle}
                />

                <input
                  type="number"
                  value={editForm.stock}
                  onChange={e =>
                    setEditForm({ ...editForm, stock: e.target.value })
                  }
                  style={inputStyle}
                />

                <div style={{ display: "flex", gap: 10 }}>
                  <button style={primaryBtn} onClick={() => saveEdit(p.id)}>
                    Save
                  </button>
                  <button
                    style={secondaryBtn}
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* VIEW MODE */}
                <h3 style={{ margin: "8px 0" }}>{p.name}</h3>
                <p style={{ margin: 0, color: "#374151" }}>
                  Rs. {p.price}
                </p>
                <p style={{ margin: "4px 0", color: "#6b7280" }}>
                  Stock: {p.stock}
                </p>

                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button
                    style={primaryBtn}
                    onClick={() => {
                      setEditingId(p.id);
                      setEditForm(p);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    style={dangerBtn}
                    onClick={() =>
                      api.delete(`/products/${p.id}`).then(loadProducts)
                    }
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

/* ---------- STYLES ---------- */

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  marginBottom: 10
};

const primaryBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: 10,
  background: "#2563eb",
  color: "#fff",
  border: "none",
  fontWeight: 600
};

const secondaryBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: 10,
  background: "#e5e7eb",
  color: "#111827",
  border: "none"
};

const dangerBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: 10,
  background: "#ef4444",
  color: "#fff",
  border: "none",
  fontWeight: 600
};

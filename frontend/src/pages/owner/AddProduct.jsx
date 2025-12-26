import { useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: ""
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.name || form.price <= 0 || form.stock < 0) {
      alert("Please enter valid product details");
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (image) data.append("image", image);

    try {
      setLoading(true);
      await api.post("/products", data);
      alert("Product added successfully");
      setForm({ name: "", price: "", stock: "" });
      setImage(null);
      setPreview(null);
    } catch {
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Add Product">
      <div
        style={{
          maxWidth: 520,
          background: "#fff",
          padding: 24,
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
        }}
      >
        <h2 style={{ marginBottom: 6 }}>New Product</h2>
        <p style={{ color: "#6b7280", marginBottom: 20 }}>
          Add a new product to your shop inventory
        </p>

        {/* PRODUCT NAME */}
        <label style={labelStyle}>Product Name</label>
        <input
          placeholder="e.g. Digital Blood Pressure Monitor"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />

        {/* PRICE & STOCK */}
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Price (Rs.)</label>
            <input
              type="number"
              placeholder="0.00"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Stock</label>
            <input
              type="number"
              placeholder="0"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        {/* IMAGE UPLOAD */}
        <label style={labelStyle}>Product Image</label>
        <div
          style={{
            border: "2px dashed #e5e7eb",
            borderRadius: 12,
            padding: 16,
            textAlign: "center",
            marginBottom: 16
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 10
              }}
            />
          ) : (
            <p style={{ color: "#9ca3af" }}>
              Click to upload product image
            </p>
          )}

          <input
            type="file"
            accept="image/*"
            style={{ marginTop: 10 }}
            onChange={e => {
              const file = e.target.files[0];
              if (file) {
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        {/* SUBMIT */}
        <button
          onClick={submit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 12,
            background: loading ? "#9ca3af" : "#2563eb",
            color: "#fff",
            border: "none",
            fontSize: 16,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </div>
    </DashboardLayout>
  );
}

/* ---------------- STYLES ---------------- */

const labelStyle = {
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 6,
  display: "block",
  color: "#374151"
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  marginBottom: 16,
  fontSize: 14
};

import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

const STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

const statusColors = {
  PENDING: "#facc15",
  PROCESSING: "#38bdf8",
  SHIPPED: "#a78bfa",
  DELIVERED: "#22c55e"
};

export default function OrderManagement() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/owner/orders/my").then(res => setItems(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/owner/orders/item/${id}/status`, { status });
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, status } : i))
    );
  };

  return (
    <DashboardLayout title="Order Management">
      {items.length === 0 && (
        <p style={{ color: "#666" }}>No orders yet</p>
      )}

      <div style={{ display: "grid", gap: "16px" }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "18px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
            }}
          >
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px"
              }}
            >
              <h3 style={{ margin: 0 }}>
                Order #{item.Order.id}
              </h3>

              <span
                style={{
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: statusColors[item.status],
                  color: "#fff"
                }}
              >
                {item.status}
              </span>
            </div>

            {/* PRODUCT INFO */}
            <div style={{ marginBottom: "12px" }}>
              <p style={{ margin: "4px 0" }}>
                <strong>Product:</strong> {item.Product.name}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Quantity:</strong> {item.qty}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Price:</strong> Rs. {item.price}
              </p>
            </div>

            {/* STATUS CONTROL */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <label style={{ fontSize: "14px", color: "#555" }}>
                Update status:
              </label>

              <select
                value={item.status}
                onChange={e =>
                  updateStatus(item.id, e.target.value)
                }
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd"
                }}
              >
                {STATUSES.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

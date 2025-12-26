import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function ManageShops() {
  const [shops, setShops] = useState([]);

  const loadShops = async () => {
    const res = await api.get("/admin/shops");
    setShops(res.data);
  };

  useEffect(() => {
    loadShops();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/admin/shops/${id}/status`, { status });
    loadShops();
  };

  return (
    <DashboardLayout title="Manage Shops">
      <table className="table">
        <thead>
          <tr>
            <th>Shop</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {shops.map(shop => (
            <tr key={shop.id}>
              <td>{shop.name}</td>
              <td>{shop.owner?.email}</td>
              <td>
                <StatusBadge status={shop.status} />
              </td>
              <td>
                {shop.status !== "APPROVED" && (
                  <button
                    onClick={() => updateStatus(shop.id, "APPROVED")}
                  >
                    Approve
                  </button>
                )}
                {shop.status !== "BLOCKED" && (
                  <button
                    style={{ marginLeft: 8, background: "#ef4444" }}
                    onClick={() => updateStatus(shop.id, "BLOCKED")}
                  >
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

function StatusBadge({ status }) {
  const colors = {
    APPROVED: "#16a34a",
    BLOCKED: "#dc2626",
    PENDING: "#ca8a04"
  };

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 20,
        color: "white",
        background: colors[status]
      }}
    >
      {status}
    </span>
  );
}

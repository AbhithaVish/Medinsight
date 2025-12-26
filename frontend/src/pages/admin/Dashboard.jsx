import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Dashboard() {
  const [shops, setShops] = useState([]);

  const loadShops = async () => {
    const res = await api.get("/shops/admin/all");
    setShops(res.data);
    };


  useEffect(() => {
    loadShops();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/shops/${id}/status`, { status });
    loadShops();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Shop</th>
            <th>Owner ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {shops.map(shop => (
            <tr key={shop.id}>
              <td>{shop.name}</td>
              <td>{shop.owner_id}</td>
              <td>{shop.status}</td>
              <td>
                {shop.status !== "APPROVED" && (
                  <button onClick={() => updateStatus(shop.id, "APPROVED")}>
                    Approve
                  </button>
                )}
                {shop.status !== "BLOCKED" && (
                  <button onClick={() => updateStatus(shop.id, "BLOCKED")}>
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

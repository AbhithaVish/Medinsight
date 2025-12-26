import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../../components/DashboardLayout";

export default function Shops() {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/shops").then(res => setShops(res.data));
  }, []);

  const [loading, setLoading] = useState(true);

        useEffect(() => {
        api.get("/shops")
            .then(res => setShops(res.data))
            .finally(() => setLoading(false));
        }, []);

        if (loading) return <p>Loading shops...</p>;


  return (
    <DashboardLayout title="Available Shops">
    <div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {shops.map(shop => (
          <div
            key={shop.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              width: "250px",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/shop/${shop.id}`)}
          >
            <h3>{shop.name}</h3>
            <p>{shop.description}</p>
          </div>
        ))}
      </div>
    </div>
    </DashboardLayout>
  );
}

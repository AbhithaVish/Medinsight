import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

export default function Shops() {

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/shops")
      .then(res => setShops(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <DashboardLayout title="Stores">
      <p>Loading stores...</p>
    </DashboardLayout>;

  return (
    <DashboardLayout title="Official Stores">

      <div style={storeGrid}>
        {shops.map(shop => (

          <div
            key={shop.id}
            style={storeCard}
            onClick={() => navigate(`/shop/${shop.id}`)}
          >

            <div style={storeBanner}>
              🏪
            </div>

            <h3>{shop.name}</h3>

            <p style={{ color:"#64748b" }}>
              {shop.description || "Trusted marketplace seller"}
            </p>

            <button style={visitBtn}>
              Visit Store →
            </button>

          </div>

        ))}
      </div>

    </DashboardLayout>
  );
}


/* ===== STYLES ===== */

const storeGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
  gap: "25px"
};

const storeCard = {
  background:"#fff",
  padding:"20px",
  borderRadius:"16px",
  cursor:"pointer",
  textAlign:"center",
  boxShadow:"0 15px 35px rgba(0,0,0,0.05)",
  transition:"0.3s"
};

const storeBanner = {
  fontSize:"50px",
  marginBottom:"10px"
};

const visitBtn = {
  marginTop:"12px",
  padding:"10px 15px",
  border:"none",
  background:"#2563eb",
  color:"#fff",
  borderRadius:"8px",
  cursor:"pointer"
};
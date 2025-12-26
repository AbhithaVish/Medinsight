import { useEffect, useState, useContext } from "react";
import api, { BASE_URL } from "../../api/axios";
import { CartContext } from "../../context/CartContext";
import DashboardLayout from "../../components/DashboardLayout";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <DashboardLayout title="All Products">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >
        {products.map(p => (
          <div
            key={p.id}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "15px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.06)"
            }}
          >
            {p.image && (
              <img
                src={`${BASE_URL}/uploads/${p.image}`}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px"
                }}
              />
            )}

            <h3 style={{ margin: "5px 0" }}>{p.name}</h3>
            <p style={{ color: "#555" }}>Rs. {p.price}</p>

            {p.Shop && (
              <p style={{ fontSize: "13px", color: "#777" }}>
                {p.Shop.name}
              </p>
            )}

            <button
              disabled={p.stock <= 0}
              onClick={() => addToCart(p)}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "10px",
                background: p.stock > 0 ? "#16a34a" : "#9ca3af",
                color: "#fff",
                border: "none",
                borderRadius: "10px"
              }}
            >
              {p.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

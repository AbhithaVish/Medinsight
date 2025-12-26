import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api, { BASE_URL } from "../../api/axios";
import { CartContext } from "../../context/CartContext";
// import DashboardLayout from "../../components/DashboardLayout";

export default function Products() {
  const { id } = useParams(); // shop id
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get(`/products/shop/${id}`).then(res => {
      setProducts(res.data);
    });
  }, [id]);

  return (
    <DashboardLayout title="Products">
    <div>
      <h1>Products</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map(p => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              width: "220px"
            }}
          >
            {/* PRODUCT IMAGE */}
            {p.image && (
              <img
                src={`${BASE_URL}/uploads/${p.image}`}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  marginBottom: "10px"
                }}
              />
            )}

            <h4>{p.name}</h4>
            <p>Price: Rs. {p.price}</p>
            <p>Stock: {p.stock}</p>

            <button
              disabled={p.stock <= 0}
              onClick={() => addToCart(p)}
            >
              {p.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
    </DashboardLayout>
  );
}

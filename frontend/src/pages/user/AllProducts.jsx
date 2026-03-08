import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api, { BASE_URL } from "../../api/axios";
import { CartContext } from "../../context/CartContext";
import DashboardLayout from "../../components/DashboardLayout";

export default function AllProducts() {

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const [alert, setAlert] = useState(null);

  /* ================= ALERT ================= */
  const showAlert = (msg, type="success") => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2500);
  };

  /* ================= PRICE ================= */
  const formatPrice = value =>
    Number(value || 0).toLocaleString("en-LK", {
      minimumFractionDigits: 2
    });

  /* ================= FETCH ================= */
  useEffect(() => {
    api.get("/products").then(res => {
      setProducts(res.data);
      setFiltered(res.data);
    });
  }, []);

  /* ================= FILTER ================= */
  useEffect(() => {

    let result = [...products];

    if (search)
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );

    if (maxPrice)
      result = result.filter(
        p => Number(p.price) <= Number(maxPrice)
      );

    if (inStockOnly)
      result = result.filter(p => p.stock > 0);

    setFiltered(result);

  }, [search, maxPrice, inStockOnly, products]);


  /* ================= ADD CART ================= */
  const handleAddCart = (p) => {

    if (p.stock <= 0) {
      showAlert("Product is out of stock!", "error");
      return;
    }

    addToCart(p);
    showAlert("Product added to cart ✅");
  };


  return (
    <DashboardLayout title="All Marketplace Products">

      {/* ALERT */}
      {alert && (
        <div style={{
          ...alertBox,
          background:
            alert.type === "error"
              ? "#ef4444"
              : "#16a34a"
        }}>
          {alert.msg}
        </div>
      )}

      {/* ================= TOP FILTER BAR ================= */}
      <div style={topFilterBar}>

        <input
          placeholder="Search products..."
          style={input}
          onChange={e => setSearch(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max price"
          style={input}
          onChange={e => setMaxPrice(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            onChange={e => setInStockOnly(e.target.checked)}
          />
          {" "} In Stock
        </label>

      </div>


      {/* ================= PRODUCTS ================= */}
      <div style={productGrid}>
        {filtered.map(p => (

          <div key={p.id} style={card}>

            {/* STORE ICON */}
            {p.Shop && (
              <div
                style={storeIcon}
                title="Visit Store"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/shop/${p.Shop.id}`);
                }}
              >
                🏪
              </div>
            )}

            {/* IMAGE */}
            <div style={imageWrapper}>
              <img
                src={`${BASE_URL}/uploads/${p.image}`}
                alt={p.name}
                style={image}
              />
            </div>

            <h4>{p.name}</h4>

            <p style={price}>
              Rs. {formatPrice(p.price)}
            </p>

            {p.Shop && (
              <p style={seller}>
                Sold by: {p.Shop.name}
              </p>
            )}

            <p style={stockBadge(p.stock)}>
              {p.stock > 0 ? "In Stock" : "Unavailable"}
            </p>

            <button
              onClick={() => handleAddCart(p)}
              style={
                p.stock > 0 ? addBtn : disabledBtn
              }
            >
              Add to Cart
            </button>

          </div>

        ))}
      </div>

    </DashboardLayout>
  );
}


/* ================= TOP FILTER ================= */

const topFilterBar = {
  display: "flex",
  gap: "15px",
  marginBottom: "25px",
  background: "#fff",
  padding: "15px",
  borderRadius: "14px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd"
};


/* ================= GRID ================= */

const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
  gap: "25px"
};


/* ================= CARD ================= */

const card = {
  background: "#fff",
  borderRadius: "16px",
  padding: "16px",
  position: "relative",
  boxShadow: "0 15px 35px rgba(0,0,0,0.05)"
};

const imageWrapper = {
  background: "#f8fafc",
  borderRadius: "12px",
  padding: "10px"
};

const image = {
  width: "100%",
  height: "180px",
  objectFit: "contain"
};

const price = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#2563eb"
};

const seller = {
  fontSize: "13px",
  background: "#f1f5f9",
  padding: "4px 8px",
  borderRadius: "6px",
  display: "inline-block"
};


/* ================= STORE ICON ================= */

const storeIcon = {
  position: "absolute",
  right: 15,
  top: 15,
  cursor: "pointer",
  fontSize: "20px"
};


/* ================= STOCK ================= */

const stockBadge = stock => ({
  marginTop: "6px",
  fontSize: "12px",
  padding: "4px 8px",
  borderRadius: "6px",
  background: stock > 0 ? "#dcfce7" : "#fee2e2"
});


/* ================= BUTTON ================= */

const addBtn = {
  width: "100%",
  marginTop: "12px",
  padding: "12px",
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const disabledBtn = {
  ...addBtn,
  background: "#cbd5e1"
};


/* ================= ALERT ================= */

const alertBox = {
  position: "fixed",
  top: 90,
  right: 20,
  color: "#fff",
  padding: "12px 18px",
  borderRadius: "10px",
  zIndex: 999
};
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api, { BASE_URL } from "../../api/axios";
import { CartContext } from "../../context/CartContext";
import DashboardLayout from "../../components/DashboardLayout";

export default function Products() {

  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [shop, setShop] = useState(null);

  const { addToCart } = useContext(CartContext);
  const [alert,setAlert]=useState(null);

  const showAlert=(msg)=>{
    setAlert(msg);
    setTimeout(()=>setAlert(null),2000);
  };

  useEffect(() => {

    api.get(`/shops/${id}`)
      .then(res => setShop(res.data));

    api.get(`/products/shop/${id}`)
      .then(res => setProducts(res.data));

  }, [id]);

  return (
    <DashboardLayout>

      {/* ALERT */}
      {alert && <div style={alertBox}>{alert}</div>}

      {/* STORE HEADER */}
      {shop && (
        <div style={storeHeader}>
          <div>
            <h1>{shop.name}</h1>
            <p>{shop.description}</p>
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      <div style={productGrid}>

        {products.map(p => (

          <div key={p.id} style={card}>

            <div style={imageWrapper}>
              {p.image && (
                <img
                  src={`${BASE_URL}/uploads/${p.image}`}
                  alt={p.name}
                  style={image}
                />
              )}
            </div>

            <h4>{p.name}</h4>

            <p style={price}>
              Rs. {Number(p.price).toLocaleString()}
            </p>

            <p style={stockBadge(p.stock)}>
              {p.stock>0 ? "In Stock":"Out of Stock"}
            </p>

            <button
              disabled={p.stock<=0}
              style={p.stock>0?addBtn:disableBtn}
              onClick={()=>{
                if(p.stock<=0){
                  showAlert("Product out of stock");
                  return;
                }
                addToCart(p);
                showAlert("Added to cart ✅");
              }}
            >
              Add To Cart
            </button>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}


/* ===== STORE HEADER ===== */

const storeHeader={
  background:"#fff",
  padding:"30px",
  borderRadius:"18px",
  marginBottom:"30px",
  boxShadow:"0 15px 35px rgba(0,0,0,0.05)"
};


/* ===== GRID ===== */

const productGrid={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
  gap:"25px"
};


/* ===== CARD ===== */

const card={
  background:"#fff",
  padding:"16px",
  borderRadius:"16px",
  boxShadow:"0 10px 25px rgba(0,0,0,0.05)"
};

const imageWrapper={
  background:"#f8fafc",
  borderRadius:"12px",
  padding:"10px"
};

const image={
  width:"100%",
  height:"180px",
  objectFit:"contain"
};

const price={
  fontWeight:"700",
  color:"#2563eb"
};

const stockBadge=stock=>({
  marginTop:"5px",
  padding:"4px 8px",
  borderRadius:"6px",
  fontSize:"12px",
  background:stock>0?"#dcfce7":"#fee2e2"
});


/* ===== BUTTON ===== */

const addBtn={
  width:"100%",
  marginTop:"10px",
  padding:"10px",
  background:"#16a34a",
  color:"#fff",
  border:"none",
  borderRadius:"8px"
};

const disableBtn={
  ...addBtn,
  background:"#cbd5e1"
};


/* ===== ALERT ===== */

const alertBox={
  position:"fixed",
  top:"90px",
  right:"20px",
  background:"#16a34a",
  color:"#fff",
  padding:"12px 18px",
  borderRadius:"10px"
};
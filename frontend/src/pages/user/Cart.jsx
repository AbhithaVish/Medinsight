import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

export default function Cart() {
  const { cart, updateQty, removeItem, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const checkout = async () => {
    if (!cart.length) return alert("Cart is empty");

    const cartItems = cart.map(item => ({
      product_id: item.id,
      qty: item.qty,
      price: item.price
    }));

    await api.post("/orders", { cartItems });
    clearCart();
    navigate("/orders");
  };

  return (
    <DashboardLayout title="Shopping Cart">
      {!cart.length ? (
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "16px",
            textAlign: "center",
            color: "#6b7280"
          }}
        >
          🛒 Your cart is empty
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px"
          }}
        >
          {/* ---------------- CART ITEMS ---------------- */}
          <div>
            {cart.map(item => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fff",
                  padding: "16px",
                  borderRadius: "14px",
                  marginBottom: "12px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.05)"
                }}
              >
                {/* PRODUCT INFO */}
                <div style={{ flex: 2 }}>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ margin: "6px 0", color: "#6b7280" }}>
                    Rs. {item.price}
                  </p>
                </div>

                {/* QTY CONTROLS */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}
                >
                  <button
                    onClick={() =>
                      updateQty(item.id, Math.max(1, item.qty - 1))
                    }
                    style={qtyBtn}
                  >
                    −
                  </button>

                  <span style={{ minWidth: 24, textAlign: "center" }}>
                    {item.qty}
                  </span>

                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    style={qtyBtn}
                  >
                    +
                  </button>
                </div>

                {/* ITEM TOTAL */}
                <div style={{ flex: 1, textAlign: "right" }}>
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    Rs. {(item.price * item.qty).toFixed(2)}
                  </p>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item.id)}
                  style={removeBtn}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* ---------------- ORDER SUMMARY ---------------- */}
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "16px",
              height: "fit-content",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
            }}
          >
            <h3>Order Summary</h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px"
              }}
            >
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "14px"
              }}
            >
              <span>Total</span>
              <span style={{ fontWeight: 600 }}>
                Rs. {total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={checkout}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                fontSize: "16px",
                fontWeight: 600
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

/* ---------- STYLES ---------- */

const qtyBtn = {
  width: 32,
  height: 32,
  borderRadius: 8,
  border: "1px solid #d1d5db",
  background: "#f9fafb",
  cursor: "pointer",
  fontSize: 18
};

const removeBtn = {
  marginLeft: 12,
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: 32,
  height: 32,
  cursor: "pointer"
};

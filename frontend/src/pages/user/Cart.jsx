import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import api, { BASE_URL } from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";
import "./Cart.css";

export default function Cart() {

  const { cart, updateQty, removeItem } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const userId =
    user?.id ||
    user?._id ||
    user?.userId ||
    user?.user?.id ||
    "Not available";

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  const checkout = async () => {

    // 🚨 Prevent duplicate checkout calls
    if (loading) return;

    if (!cart.length) {
      handleAlert("error", "Your cart is currently empty.");
      return;
    }

    try {

      setLoading(true);

      const { data } = await api.post("/payments/create-checkout-session", {
        cartItems: cart.map(item => ({
          id: item.id,
          qty: item.qty
        })),
        userId: user?.id
      });

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Stripe session creation failed.");
      }

    } catch (error) {

      const errorMsg =
        error.response?.data?.message ||
        "Payment initialization failed.";

      handleAlert("error", errorMsg);

      setLoading(false);

    }

  };

  return (
    <DashboardLayout title="Your Shopping Cart">

      <div className="cart-container">

        {/* Logged user debug */}
        <div
          style={{
            background: "#eef2ff",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "15px",
            fontSize: "14px"
          }}
        >
          Logged User ID: <strong>{userId}</strong>
        </div>

        {/* ALERT */}
        {alert && (
          <div className={`custom-alert ${alert.type}`}>
            <span>{alert.message}</span>
            <button onClick={() => setAlert(null)}>✕</button>
          </div>
        )}

        {!cart.length ? (

          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet.</p>

            <button
              className="continue-btn"
              onClick={() => window.history.back()}
            >
              Continue Shopping
            </button>
          </div>

        ) : (

          <div className="cart-grid">

            {/* ITEMS */}
            <div className="items-column">

              <div className="column-header">
                <span>{cart.length} Items in your cart</span>
              </div>

              {cart.map(item => (

                <div key={item.id} className="cart-item-card">

                  <div className="item-image">
                    <img
                      src={
                        item.image
                          ? `${BASE_URL}/${item.image}`
                          : "https://via.placeholder.com/80"
                      }
                      alt={item.name}
                    />
                  </div>

                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-price">
                      Rs. {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="qty-controls">

                    <button
                      onClick={() =>
                        updateQty(item.id, Math.max(1, item.qty - 1))
                      }
                      disabled={loading}
                    >
                      −
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() =>
                        updateQty(item.id, item.qty + 1)
                      }
                      disabled={loading}
                    >
                      +
                    </button>

                  </div>

                  <div className="item-subtotal">
                    <p>
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </p>
                  </div>

                  <button
                    className="remove-item-btn"
                    onClick={() => removeItem(item.id)}
                    disabled={loading}
                  >
                    ✕
                  </button>

                </div>

              ))}

            </div>

            {/* SUMMARY */}
            <div className="summary-column">

              <div className="summary-card">

                <h3>Order Summary</h3>

                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>

                <div className="summary-line">
                  <span>Shipping</span>
                  <span className="free-text">FREE</span>
                </div>

                <hr />

                <div className="summary-total">
                  <span>Estimated Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>

                {/* CHECKOUT BUTTON */}

                <button
                  className={`checkout-btn ${loading ? "loading" : ""}`}
                  onClick={checkout}
                  disabled={loading}
                >
                  {loading
                    ? <span className="spinner"></span>
                    : "Proceed to Checkout"}
                </button>

                <p className="secure-text">
                  🔒 Secure Checkout Powered by Stripe
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}
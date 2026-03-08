import { useEffect, useContext, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import api from "../../api/axios";

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useContext(CartContext);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your payment...");
  const navigate = useNavigate();

  useEffect(() => {
    const finalizeOrder = async () => {

      if (!sessionId) {
        setStatus("error");
        setMessage("Payment session not found.");
        return;
      }

      try {
        const { data } = await api.post("/payments/confirm-order", {
          session_id: sessionId
        });

        if (data.success) {
          clearCart();
        setStatus("success");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
        } else {
          setStatus("error");
          setMessage(data.message || "Order confirmation failed.");
        }

      } catch (err) {
        console.error("Confirm order error:", err);

        const errorMsg =
          err.response?.data?.message ||
          "Server error while confirming payment.";

        setStatus("error");
        setMessage(errorMsg);
      }
    };

    finalizeOrder();

  }, [sessionId, clearCart]);

  if (status === "loading") return <div style={msgStyle}>{message}</div>;

  if (status === "error") {
    return (
      <div style={msgStyle}>
        ❌ {message}
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1>🎉 Thank You!</h1>
      <p>Your order has been placed successfully.</p>

      <button onClick={() => navigate("/dashboard")} style={btnStyle}>
        Go to Dashboard
      </button>
    </div>
  );
}

const containerStyle = {
  textAlign: "center",
  padding: "100px",
  background: "#f3f4f6",
  minHeight: "100vh"
};

const msgStyle = {
  textAlign: "center",
  marginTop: "100px",
  fontSize: "20px"
};

const btnStyle = {
  padding: "10px 20px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};
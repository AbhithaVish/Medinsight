import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

const STATUS_FLOW = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then(res => setOrders(res.data));
  }, []);

  return (
    <DashboardLayout title="My Orders">
      {orders.map(order => (
        <div
          key={order.id}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "20px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.05)"
          }}
        >
          <h3>Order #{order.id}</h3>

          {order.OrderItems.map(item => (
            <div key={item.id} style={{ marginLeft: "10px" }}>
              <p>
                <b>{item.Product.name}</b> × {item.qty}
              </p>

              <div style={{ display: "flex", gap: "8px" }}>
                {STATUS_FLOW.map(step => (
                  <span
                    key={step}
                    style={{
                      padding: "5px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      background:
                        STATUS_FLOW.indexOf(step) <=
                        STATUS_FLOW.indexOf(item.status)
                          ? "#22c55e"
                          : "#e5e7eb",
                      color:
                        STATUS_FLOW.indexOf(step) <=
                        STATUS_FLOW.indexOf(item.status)
                          ? "#fff"
                          : "#555"
                    }}
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </DashboardLayout>
  );
}

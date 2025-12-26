import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <DashboardLayout title="All Orders">
      {orders.map(order => (
        <div key={order.id} className="card" style={{ marginBottom: 16 }}>
          <h4>Order #{order.id}</h4>
          <p>User: {order.User.email}</p>

          {order.OrderItems.map(item => (
            <p key={item.id}>
              {item.Product.name} × {item.qty} — {item.status}
            </p>
          ))}
        </div>
      ))}
    </DashboardLayout>
  );
}

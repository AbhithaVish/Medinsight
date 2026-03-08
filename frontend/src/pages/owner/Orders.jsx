import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";


export default function OwnerOrders() {
  const [items, setItems] = useState([]);

  const loadOrders = async () => {
    const res = await api.get("/owner/orders/my");
    setItems(res.data);
  };

 useEffect(() => {
  const fetchData = async () => {
    await loadOrders();
  };

  fetchData();
}, []);

  const updateStatus = async (id, status) => {
    await api.put(`/owner/orders/item/${id}/status`, { status });
    loadOrders();
  };

  return (
    <DashboardLayout title="Order Management">
  <div>
      <h1></h1>

      {!items.length && <p>No orders yet</p>}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.Order.id}</td>
              <td>{item.Product.name}</td>
              <td>{item.qty}</td>
              <td>${item.price}</td>
              <td>{item.status}</td>
              <td>
                <select
                  value={item.status}
                  onChange={e =>
                    updateStatus(item.id, e.target.value)
                  }
                >
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</DashboardLayout>

    
  );
}

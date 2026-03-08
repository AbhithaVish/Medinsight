import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

const TABS = ["ALL", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

const statusColors = {
  PENDING: "#f59e0b",
  PROCESSING: "#0ea5e9",
  SHIPPED: "#8b5cf6",
  DELIVERED: "#22c55e"
};

export default function OrderManagement() {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [alert, setAlert] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const loadOrders = async () => {
    try {
      const res = await api.get("/owner/orders/my");
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
      setItems([]);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setLoadingId(id);

      await api.put(`/owner/orders/item/${id}/status`, { status });

      setItems(prev =>
        prev.map(i => (i.id === id ? { ...i, status } : i))
      );

      setAlert({
        type: "success",
        message: `Order status updated to ${status}`
      });

    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to update order status"
      });
    } finally {
      setLoadingId(null);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const filteredItems =
    activeTab === "ALL"
      ? items
      : items.filter(i => i.status === activeTab);

  return (
    <DashboardLayout title="Order Management">
      
      {/* ALERT MESSAGE */}
      {alert && (
        <div className={`alert ${alert.type}`}>
          <span>{alert.message}</span>
          <button onClick={() => setAlert(null)}>✕</button>
        </div>
      )}

      {/* STATUS TABS */}
      <div className="tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ORDER LIST */}
      <div className="orderList">
        {filteredItems.length === 0 && (
          <p className="emptyText">No orders found</p>
        )}

        {filteredItems.map(item => (
          <div key={item.id} className="orderCard">
            
            {/* HEADER */}
            <div className="orderHeader">
              <div>
                <strong>Order #{item.Order?.id || "N/A"}</strong>
              </div>

              <span
                className="statusBadge"
                style={{
                  backgroundColor:
                    statusColors[item.status] || "#999"
                }}
              >
                {item.status}
              </span>
            </div>

            {/* BODY */}
            <div className="orderBody">
              <div className="productInfo">
                <h4>{item.Product?.name || "Product Deleted"}</h4>
                <p>Quantity: {item.qty}</p>
                <p>Price: Rs. {item.price}</p>
              </div>

              <div className="orderActions">
                <select
                  value={item.status}
                  disabled={loadingId === item.id}
                  onChange={e =>
                    updateStatus(item.id, e.target.value)
                  }
                >
                  {TABS.slice(1).map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <button className="secondaryBtn">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* STYLES */}
      <style>{`
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .tab {
          padding: 8px 18px;
          border-radius: 20px;
          border: none;
          background: #f1f5f9;
          cursor: pointer;
          font-weight: 500;
        }

        .tab.active {
          background: #2563eb;
          color: white;
        }

        .orderList {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .orderCard {
          background: white;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.05);
        }

        .orderHeader {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .statusBadge {
          color: white;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }

        .orderBody {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .productInfo h4 {
          margin: 0 0 6px 0;
        }

        .orderActions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        select {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .secondaryBtn {
          background: #e2e8f0;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
        }

        .emptyText {
          color: #666;
        }

        /* ALERT STYLES */
        .alert {
          padding: 14px 18px;
          border-radius: 10px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 500;
          animation: fadeIn 0.3s ease;
        }

        .alert.success {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #22c55e;
        }

        .alert.error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #ef4444;
        }

        .alert button {
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          color: inherit;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </DashboardLayout>
  );
}
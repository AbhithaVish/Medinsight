import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

const STATUS_TABS = ["ALL", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

const STATUS_COLORS = {
  PENDING: "#f59e0b",
  PROCESSING: "#0ea5e9",
  SHIPPED: "#8b5cf6",
  DELIVERED: "#16a34a"
};

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("NEWEST");

  useEffect(() => {
    api.get("/admin/orders").then(res => setOrders(res.data));
  }, []);

  /* FILTER + SORT */
  const processedOrders = useMemo(() => {
    let data = [...orders];

    if (activeStatus !== "ALL") {
      data = data.filter(order =>
        order.OrderItems.some(
          item => item.status === activeStatus
        )
      );
    }

    if (search) {
      data = data.filter(order =>
        order.User.email
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (sortOption === "NEWEST") {
      data.sort((a, b) => b.id - a.id);
    }

    if (sortOption === "OLDEST") {
      data.sort((a, b) => a.id - b.id);
    }

    return data;
  }, [orders, activeStatus, search, sortOption]);

  return (
    <DashboardLayout title="All Orders">

      {/* FILTER TABS */}
      <div className="tabs">
        {STATUS_TABS.map(tab => (
          <button
            key={tab}
            className={
              activeStatus === tab ? "tab active" : "tab"
            }
            onClick={() => setActiveStatus(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SEARCH + SORT */}
      <div className="toolbar">
        <input
          placeholder="Search by user email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
        >
          <option value="NEWEST">Newest</option>
          <option value="OLDEST">Oldest</option>
        </select>
      </div>

      {/* ORDER LIST */}
      {processedOrders.length === 0 && (
        <div className="empty">No orders found</div>
      )}

      {processedOrders.map(order => (
        <div key={order.id} className="orderCard">

          {/* HEADER */}
          <div className="orderHeader">
            <div>
              <h4>Order #{order.id}</h4>
              <p>User: {order.User.email}</p>
            </div>

            <span className="orderCount">
              {order.OrderItems.length} Items
            </span>
          </div>

          {/* ITEMS */}
          {order.OrderItems.map(item => (
            <div key={item.id} className="itemRow">
              <div>
                <strong>{item.Product?.name}</strong>
                <div className="itemMeta">
                  Qty: {item.qty}
                </div>
              </div>

              <span
                className="statusBadge"
                style={{
                  background:
                    STATUS_COLORS[item.status] || "#ccc"
                }}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      ))}

      {/* STYLES */}
      <style>{`
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .tab {
          padding: 8px 16px;
          border-radius: 20px;
          border: none;
          background: #f1f5f9;
          cursor: pointer;
        }

        .tab.active {
          background: #2563eb;
          color: white;
        }

        .toolbar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .toolbar input {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          width: 260px;
        }

        .toolbar select {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .orderCard {
          background: white;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }

        .orderHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }

        .orderHeader h4 {
          margin: 0;
        }

        .orderHeader p {
          margin: 4px 0 0;
          color: #6b7280;
          font-size: 13px;
        }

        .orderCount {
          background: #e5e7eb;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
        }

        .itemRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #f1f1f1;
        }

        .itemRow:last-child {
          border-bottom: none;
        }

        .itemMeta {
          font-size: 13px;
          color: #6b7280;
        }

        .statusBadge {
          color: white;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }

        .empty {
          padding: 20px;
          text-align: center;
          color: #6b7280;
        }
      `}</style>
    </DashboardLayout>
  );
}
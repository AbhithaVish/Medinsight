import { useEffect, useState, useMemo } from "react";
import api, { BASE_URL } from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

const STATUSES = ["ALL", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

const STATUS_COLORS = {
  PENDING: "#f59e0b",
  PROCESSING: "#0ea5e9",
  SHIPPED: "#8b5cf6",
  DELIVERED: "#22c55e"
};

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState("ALL");
  const [sortOption, setSortOption] = useState("NEWEST");

  useEffect(() => {
    api.get("/orders/my").then(res => setOrders(res.data));
  }, []);

  const processedOrders = useMemo(() => {

    let filtered = [...orders];

    if (activeStatus !== "ALL") {
      filtered = filtered.filter(order =>
        order.OrderItems.some(item => item.status === activeStatus)
      );
    }

    if (sortOption === "NEWEST") filtered.sort((a,b)=>b.id-a.id);
    if (sortOption === "OLDEST") filtered.sort((a,b)=>a.id-b.id);

    return filtered;

  }, [orders, activeStatus, sortOption]);

  return (
    <DashboardLayout title="My Orders">

      {/* FILTER TABS */}
      <div className="tabs">
        {STATUSES.map(status => (
          <button
            key={status}
            className={activeStatus === status ? "tab active" : "tab"}
            onClick={() => setActiveStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* SORT */}
      <div className="sortRow">
        <label>Sort By:</label>
        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
        >
          <option value="NEWEST">Newest</option>
          <option value="OLDEST">Oldest</option>
        </select>
      </div>

      {/* ORDERS */}
      {processedOrders.length === 0 && (
        <div className="empty">
          No orders found
        </div>
      )}

      {processedOrders.map(order => {

        const orderStatus = order.OrderItems[0]?.status || "PENDING";

        return (
          <div key={order.id} className="orderCard">

            {/* ORDER HEADER */}
            <div className="orderHeader">

              <div>
                <h3>Order #{order.id}</h3>
                <p className="date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className="statusBadge"
                style={{ background: STATUS_COLORS[orderStatus] }}
              >
                {orderStatus}
              </span>

            </div>

            {/* PRODUCTS */}
            {order.OrderItems.map(item => (

              <div key={item.id} className="itemRow">

                <div className="itemLeft">

                  <div className="imageWrapper">
                    <img
                      src={
                        item.Product?.image
                          ? `${BASE_URL}/${item.Product.image}`
                          : "https://via.placeholder.com/90"
                      }
                      alt={item.Product?.name}
                    />
                  </div>

                  <div className="productInfo">
                    <h4>{item.Product?.name}</h4>
                    <p>Quantity: {item.qty}</p>
                    <p className="price">Rs. {item.price}</p>
                  </div>

                </div>

              </div>

            ))}

            {/* ORDER TOTAL */}
            <div className="orderFooter">

              <div className="shopName">
                🏪 {order.shopName || "Shop"}
              </div>

              <div className="total">
                Total: Rs. {order.total}
              </div>

            </div>

          </div>
        );
      })}

      <style>{`

      .tabs{
        display:flex;
        gap:10px;
        margin-bottom:20px;
      }

      .tab{
        padding:8px 18px;
        border:none;
        border-radius:20px;
        background:#f1f5f9;
        cursor:pointer;
      }

      .tab.active{
        background:#2563eb;
        color:white;
      }

      .sortRow{
        margin-bottom:25px;
        display:flex;
        gap:10px;
        align-items:center;
      }

      .orderCard{
        background:white;
        border-radius:16px;
        padding:22px;
        margin-bottom:25px;
        box-shadow:0 8px 20px rgba(0,0,0,0.05);
      }

      .orderHeader{
        display:flex;
        justify-content:space-between;
        align-items:center;
        border-bottom:1px solid #eee;
        padding-bottom:12px;
        margin-bottom:20px;
      }

      .orderHeader h3{
        margin:0;
        font-size:18px;
      }

      .date{
        color:#777;
        font-size:13px;
      }

      .statusBadge{
        color:white;
        padding:6px 14px;
        border-radius:999px;
        font-size:12px;
        font-weight:600;
      }

      .itemRow{
        margin-bottom:18px;
      }

      .itemLeft{
        display:flex;
        gap:18px;
        align-items:center;
      }

      .imageWrapper{
        width:90px;
        height:90px;
      }

      .imageWrapper img{
        width:100%;
        height:100%;
        object-fit:cover;
        border-radius:10px;
        border:1px solid #eee;
      }

      .productInfo h4{
        margin:0 0 6px 0;
        font-size:15px;
      }

      .productInfo p{
        margin:0;
        font-size:13px;
        color:#666;
      }

      .price{
        margin-top:4px;
        font-weight:600;
        color:#111;
      }

      .orderFooter{
        display:flex;
        justify-content:space-between;
        align-items:center;
        border-top:1px solid #eee;
        margin-top:15px;
        padding-top:15px;
      }

      .total{
        font-weight:700;
        font-size:16px;
      }

      .shopName{
        font-size:14px;
        font-weight:600;
      }

      .empty{
        padding:40px;
        background:white;
        border-radius:14px;
        text-align:center;
        color:#666;
      }

      `}</style>

    </DashboardLayout>
  );
}